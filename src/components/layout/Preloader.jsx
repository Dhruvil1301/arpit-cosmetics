import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { brand } from '../../data/site'
import { EASE_LUXE } from '../ui/Reveal'

/**
 * Opening curtain.
 * ----------------
 * Two jobs, in order of importance:
 *   1. Give fonts, the ambient shader and the hero scene a moment to settle so
 *      the first thing the visitor sees is finished, not assembling.
 *   2. Set the tone — the wordmark draws in letter by letter over a gold rule
 *      that fills to 100%.
 *
 * It resolves on `window.load` **or** after `maxWait`, whichever comes first,
 * so a slow third-party font can never hold the page hostage. Under reduced
 * motion it is skipped entirely.
 */
export default function Preloader({ onDone, minDuration = 1000, maxWait = 2600 }) {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(!reduced)
  const doneRef = useRef(false)

  useEffect(() => {
    if (reduced) {
      onDone?.()
      return
    }

    const started = performance.now()
    let raf = 0
    let loaded = false

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      const elapsed = performance.now() - started
      const wait = Math.max(0, minDuration - elapsed)
      window.setTimeout(() => {
        setProgress(100)
        window.setTimeout(() => {
          setOpen(false)
          onDone?.()
        }, 480)
      }, wait)
    }

    const onLoad = () => {
      loaded = true
      finish()
    }

    // `window.load` waits on every subresource, including the webfont files
    // pulled in by the async stylesheet — which pushed the curtain past six
    // seconds in testing. What actually matters visually is that the fonts
    // have swapped in, so that is what the curtain waits for, with
    // `window.load` and a hard cap as backstops.
    if (document.fonts?.ready) {
      document.fonts.ready.then(onLoad).catch(onLoad)
    } else if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    const hardStop = window.setTimeout(finish, maxWait)

    // Progress is a believable curve, not a real byte count: it eases toward
    // 92% and only completes once the page is genuinely ready.
    const tick = () => {
      setProgress((p) => {
        if (doneRef.current) return p
        const ceiling = loaded ? 99 : 92
        return p + (ceiling - p) * 0.035
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('load', onLoad)
      window.clearTimeout(hardStop)
      cancelAnimationFrame(raf)
    }
  }, [reduced, onDone, minDuration, maxWait])

  const letters = brand.name.split('')

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center overflow-hidden bg-warm"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_LUXE }}
          role="status"
          aria-live="polite"
          aria-label="Loading Arpit Cosmetics"
        >
          {/* Curtain panels split apart on exit. */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-warm"
            exit={{ y: '-100%' }}
            transition={{ duration: 1.1, ease: EASE_LUXE }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-warm"
            exit={{ y: '100%' }}
            transition={{ duration: 1.1, ease: EASE_LUXE }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6"
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: EASE_LUXE }}
          >
            <span className="eyebrow mb-8 text-gold-deep/70">Munshiganj · Amethi</span>

            <h1 className="flex overflow-hidden font-display text-[clamp(2rem,7vw,4.5rem)] leading-none tracking-tight">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  className={ch === ' ' ? 'w-[0.28em]' : undefined}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1, delay: 0.18 + i * 0.045, ease: EASE_LUXE }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-5 font-serif text-base italic text-ink-soft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.9 }}
            >
              {brand.tagline}
            </motion.p>

            {/* Gold rule filling to the load percentage. */}
            <div className="mt-12 h-px w-[min(62vw,22rem)] overflow-hidden bg-beige">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-champagne via-gold to-gold-deep"
                style={{ scaleX: progress / 100 }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <span className="mt-4 font-sans text-[0.65rem] uppercase tracking-luxe text-ink-faint tabular-nums">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
