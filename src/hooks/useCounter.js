import { useEffect, useRef, useState } from 'react'
import { formatNumber } from '../lib/utils'
import { prefersReducedMotion } from '../lib/device'

/**
 * Counts up to `target` the first time the element enters the viewport.
 * Uses an expo-out curve so the number decelerates into place instead of
 * ticking linearly — small detail, big difference in perceived polish.
 */
export function useCounter(target, { duration = 2000, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(formatNumber(0, decimals))

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      setDisplay(formatNumber(target, decimals))
      return
    }

    let raf = 0
    let started = false

    const run = (t0) => {
      const step = (t) => {
        const p = Math.min(1, (t - t0) / duration)
        const eased = 1 - Math.pow(2, -10 * p) // expo-out
        setDisplay(formatNumber(target * (p === 1 ? 1 : eased), decimals))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          run(performance.now())
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration, decimals])

  return { ref, display }
}
