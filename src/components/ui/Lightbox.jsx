import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineXMark, HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2'
import Illustration from '../illustrations/Illustration'
import { useScrollLock } from '../../hooks/useSmoothScroll'
import { EASE_LUXE } from './Reveal'

/**
 * Accessible gallery lightbox.
 * Escape closes, arrow keys navigate, focus is trapped to the dialog, and
 * page scroll (Lenis included) is locked while it is open.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const open = index !== null && index >= 0
  useScrollLock(open)

  const go = useCallback(
    (dir) => {
      if (!open) return
      onNavigate((index + dir + items.length) % items.length)
    },
    [open, index, items.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Tab') {
        // Simple trap: keep focus on the dialog's own controls.
        const focusables = document.querySelectorAll('[data-lightbox-focus]')
        if (!focusables.length) return
        const list = Array.from(focusables)
        const i = list.indexOf(document.activeElement)
        e.preventDefault()
        const next = e.shiftKey ? (i - 1 + list.length) % list.length : (i + 1) % list.length
        list[next].focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, go])

  const item = open ? items[index] : null

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.caption} — enlarged view`}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_LUXE }}
        >
          {/* Warm scrim, not black — keeps the light theme intact. */}
          <motion.button
            type="button"
            aria-label="Close enlarged view"
            data-cursor="hide"
            className="absolute inset-0 cursor-default bg-[rgba(28,20,10,0.55)] backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.figure
            className="relative z-10 flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-luxe bg-warm shadow-float"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.7, ease: EASE_LUXE }}
          >
            <Illustration
              imageKey={item.image}
              alt={item.alt}
              priority
              className="max-h-[70vh] w-full"
            />
            <figcaption className="flex flex-wrap items-baseline justify-between gap-3 border-t border-beige px-7 py-5">
              <span className="font-display text-xl text-ink">{item.caption}</span>
              <span className="text-sm font-light text-ink-soft">{item.detail}</span>
              <span className="ml-auto text-xs uppercase tracking-wider2 text-ink-faint">
                {index + 1} / {items.length}
              </span>
            </figcaption>

            <button
              type="button"
              data-lightbox-focus
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-warm/90 text-ink shadow-soft transition-transform duration-500 ease-luxe hover:scale-110"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>
          </motion.figure>

          <button
            type="button"
            data-lightbox-focus
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-warm/85 text-ink shadow-soft transition-transform duration-500 ease-luxe hover:scale-110 sm:left-8"
          >
            <HiOutlineArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            data-lightbox-focus
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-warm/85 text-ink shadow-soft transition-transform duration-500 ease-luxe hover:scale-110 sm:right-8"
          >
            <HiOutlineArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
