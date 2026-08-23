import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/device'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll parallax on a single element.
 * `speed` is the fraction of the scrolled distance the element lags behind by;
 * negative values push it ahead of the scroll.
 */
export function useParallax({ speed = 0.12, axis = 'y', scale = false } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const distance = () => (axis === 'y' ? window.innerHeight : window.innerWidth) * speed

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        el,
        { [axis]: -distance(), ...(scale ? { scale: 1.12 } : null) },
        {
          [axis]: distance(),
          ...(scale ? { scale: 1 } : null),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
      return () => tween.scrollTrigger?.kill()
    }, el)

    return () => ctx.revert()
  }, [speed, axis, scale])

  return ref
}

/**
 * Staggered entrance for every `[data-reveal]` descendant of the container.
 * One ScrollTrigger per section rather than per element keeps the trigger
 * count low on a page this long.
 */
export function useRevealGroup({ y = 34, stagger = 0.09, duration = 1.05, start = 'top 82%' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y, willChange: 'transform, opacity' })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'expo.out',
        clearProps: 'willChange',
        scrollTrigger: { trigger: root, start, once: true },
      })
    }, root)

    return () => ctx.revert()
  }, [y, stagger, duration, start])

  return ref
}

/**
 * Word-by-word masked reveal for display headings.
 * Words are wrapped in overflow-hidden spans and slid up from below the mask,
 * which reads far more expensive than a plain fade.
 */
export function useMaskedHeading({ start = 'top 84%', stagger = 0.055, delay = 0 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = el.querySelectorAll('[data-word]')
    if (!words.length) return

    if (prefersReducedMotion()) {
      gsap.set(words, { yPercent: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 115, opacity: 0 })
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.25,
        delay,
        stagger,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start, once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [start, stagger, delay])

  return ref
}
