import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

const SmoothScrollContext = createContext({ lenis: null, scrollTo: () => {}, stop: () => {}, start: () => {} })

/**
 * Lenis + GSAP ScrollTrigger provider.
 * ------------------------------------
 * One RAF loop drives both libraries: Lenis is stepped from GSAP's ticker and
 * ScrollTrigger is updated from Lenis' scroll event. Running two independent
 * loops is the usual cause of jitter on sites like this one.
 *
 * Honours `prefers-reduced-motion` by not instantiating Lenis at all, which
 * hands scrolling back to the browser.
 */
export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setReady(true)
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      // Expo-out: fast pickup, long glide — the "expensive" scroll feel.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native momentum on touch beats an emulated one; only wheel is smoothed.
      syncTouch: false,
      autoRaf: false,
    })

    lenisRef.current = lenis

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()
    setReady(true)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  const scrollTo = useCallback((target, options = {}) => {
    const lenis = lenisRef.current
    const offset = options.offset ?? 0
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.4, ...options })
      return
    }
    // Reduced-motion / pre-init path.
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el instanceof Element) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: 'auto' })
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target + offset, behavior: 'auto' })
    }
  }, [])

  const stop = useCallback(() => lenisRef.current?.stop(), [])
  const start = useCallback(() => lenisRef.current?.start(), [])

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef, scrollTo, stop, start, ready }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export const useSmoothScroll = () => useContext(SmoothScrollContext)

/**
 * Locks page scroll (menu open, lightbox open) for both Lenis and native.
 * Keeps a counter so nested locks do not unlock each other prematurely.
 */
let lockCount = 0
export function useScrollLock(locked) {
  const { stop, start } = useSmoothScroll()

  useEffect(() => {
    if (!locked) return
    lockCount += 1
    stop()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.classList.add('lenis-stopped')

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        start()
        document.body.style.overflow = prev
        document.documentElement.classList.remove('lenis-stopped')
      }
    }
  }, [locked, stop, start])
}
