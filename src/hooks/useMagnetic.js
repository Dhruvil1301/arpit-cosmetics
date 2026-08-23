import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { hasFinePointer, prefersReducedMotion } from '../lib/device'

/**
 * Magnetic hover.
 * ---------------
 * The element drifts toward the pointer while it is inside an expanded
 * hit area, then springs home on exit. Attach the returned ref to the
 * outer element; pass an inner ref to move label and background at
 * different rates for a subtle parallax inside the button.
 *
 * Disabled entirely on touch devices and under reduced motion.
 */
export function useMagnetic({ strength = 0.32, innerStrength = 0.18, padding = 28, scale = 1.03 } = {}) {
  const ref = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return

    const inner = innerRef.current
    const setX = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' })
    const setY = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' })
    const setS = gsap.quickTo(el, 'scale', { duration: 0.5, ease: 'power3.out' })
    const setIX = inner ? gsap.quickTo(inner, 'x', { duration: 0.9, ease: 'power3.out' }) : null
    const setIY = inner ? gsap.quickTo(inner, 'y', { duration: 0.9, ease: 'power3.out' }) : null

    let inside = false

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      const within =
        Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding

      if (within) {
        if (!inside) {
          inside = true
          setS(scale)
        }
        setX(dx * strength)
        setY(dy * strength)
        setIX?.(dx * innerStrength)
        setIY?.(dy * innerStrength)
      } else if (inside) {
        inside = false
        setX(0)
        setY(0)
        setS(1)
        setIX?.(0)
        setIY?.(0)
      }
    }

    const onLeaveWindow = () => {
      inside = false
      setX(0); setY(0); setS(1); setIX?.(0); setIY?.(0)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeaveWindow)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeaveWindow)
      gsap.killTweensOf(el)
      if (inner) gsap.killTweensOf(inner)
    }
  }, [strength, innerStrength, padding, scale])

  return { ref, innerRef }
}
