import { useEffect, useRef } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../../lib/device'

/**
 * Bespoke cursor.
 * ---------------
 * PERFORMANCE NOTE — this is the reason it is hand-rolled rather than driven
 * by GSAP tweens. A cursor is the one element on the page whose smoothness is
 * judged frame by frame, and the earlier tween-per-property version had three
 * problems:
 *
 *   · five concurrent `quickTo` tweens per pointer move, each writing a
 *     separate CSS property, so the compositor saw several style mutations
 *     per frame instead of one;
 *   · GSAP's ticker shares its clock with Lenis and ScrollTrigger, so cursor
 *     motion inherited scroll-driven jitter; and
 *   · the state change ran a fresh tween on every `pointerover`.
 *
 * What runs now: one rAF loop, one `transform` write per element per frame,
 * exponential smoothing that is frame-rate independent, and state changes
 * expressed as CSS custom properties so the transition is handled off the
 * main thread. Pointer events only ever touch two numbers.
 *
 * States, read from `data-cursor` on whatever is under the pointer:
 *   link | view | drag | text | hide
 */

/** Fraction of the remaining distance closed per second. Higher = snappier. */
const DOT_SMOOTHING = 0.0000001 // essentially 1:1, with just enough to de-jitter
const RING_SMOOTHING = 0.0000006 // the trailing ring — this is the signature

const STATES = {
  default: { scale: 1, border: 'rgba(185,150,83,0.6)', fill: 'rgba(185,150,83,0.07)', dot: 1, label: 0 },
  link:    { scale: 1.85, border: 'rgba(185,150,83,0.9)', fill: 'rgba(228,205,167,0.2)', dot: 0.3, label: 0 },
  view:    { scale: 3.4, border: 'rgba(17,17,17,0)', fill: 'rgba(17,17,17,0.92)', dot: 0, label: 1 },
  drag:    { scale: 3.1, border: 'rgba(143,111,50,0)', fill: 'rgba(185,150,83,0.95)', dot: 0, label: 1 },
  text:    { scale: 0.32, border: 'rgba(17,17,17,0.55)', fill: 'rgba(17,17,17,0.55)', dot: 0, label: 0 },
  hide:    { scale: 0, border: 'rgba(185,150,83,0)', fill: 'rgba(185,150,83,0)', dot: 0, label: 0 },
}

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('cursor-hidden')

    // --- Mutable frame state. Never React state: this changes 60× a second.
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const dotPos = { ...target }
    const ringPos = { ...target }
    let pressed = 0 // eased 0 → 1 while the pointer is down
    let pressTarget = 0
    let visible = 0
    let visibleTarget = 0
    let state = 'default'
    let raf = 0
    let last = performance.now()

    /* ------------------------------------------------------------------ *
     * Pointer input — two number writes, nothing else.                    *
     * ------------------------------------------------------------------ */
    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      visibleTarget = 1
    }

    /* ------------------------------------------------------------------ *
     * State — CSS custom properties, so colour/scale transitions are      *
     * declarative and the JS loop only ever writes `transform`.           *
     * ------------------------------------------------------------------ */
    const applyState = (next, text) => {
      const preset = STATES[next] || STATES.default
      if (next !== state) {
        state = next
        ring.style.setProperty('--c-scale', preset.scale)
        ring.style.setProperty('--c-border', preset.border)
        ring.style.setProperty('--c-fill', preset.fill)
        dot.style.setProperty('--c-dot', preset.dot)
      }
      if (label) {
        const wanted = preset.label && text ? text : ''
        if (label.textContent !== wanted) label.textContent = wanted
        label.style.setProperty('--c-label', wanted ? 1 : 0)
      }
    }

    const onOver = (e) => {
      const el = e.target
      if (!(el instanceof Element)) return

      const tagged = el.closest('[data-cursor]')
      if (tagged) {
        applyState(tagged.getAttribute('data-cursor') || 'link', tagged.getAttribute('data-cursor-label'))
        return
      }

      const interactive = el.closest('a, button, [role="button"], input, textarea, select, summary, label')
      if (!interactive) return applyState('default')

      const tag = interactive.tagName.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return applyState('text')
      applyState('link')
    }

    const onDown = () => { pressTarget = 1 }
    const onUp = () => { pressTarget = 0 }
    const onLeave = () => { visibleTarget = 0 }
    const onEnter = () => { visibleTarget = 1 }

    /* ------------------------------------------------------------------ *
     * The loop. Frame-rate independent easing: `1 - s^dt` closes the same *
     * fraction per *second* regardless of whether we are at 60 or 144 Hz. *
     * ------------------------------------------------------------------ */
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      const dotT = 1 - Math.pow(DOT_SMOOTHING, dt)
      const ringT = 1 - Math.pow(RING_SMOOTHING, dt)

      dotPos.x += (target.x - dotPos.x) * dotT
      dotPos.y += (target.y - dotPos.y) * dotT
      ringPos.x += (target.x - ringPos.x) * ringT
      ringPos.y += (target.y - ringPos.y) * ringT

      pressed += (pressTarget - pressed) * (1 - Math.pow(0.000001, dt))
      visible += (visibleTarget - visible) * (1 - Math.pow(0.0001, dt))

      // Sub-pixel rounding keeps the dot from shimmering on slow movement.
      const rx = Math.round(ringPos.x * 100) / 100
      const ry = Math.round(ringPos.y * 100) / 100

      // Exactly one transform write per element per frame.
      dot.style.transform = `translate3d(${Math.round(dotPos.x * 100) / 100}px, ${Math.round(dotPos.y * 100) / 100}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${1 - pressed * 0.18})`
      dot.style.opacity = visible
      ring.style.opacity = visible

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)
    raf = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('cursor-hidden')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" className="cursor-root">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
