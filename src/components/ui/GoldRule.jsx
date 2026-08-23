import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { EASE_LUXE } from './Reveal'

/** Hairline divider that draws itself in from the left when scrolled into view. */
export default function GoldRule({ className, delay = 0, thickness = 'h-px' }) {
  const reduced = useReducedMotion()

  if (reduced) return <span className={cn('block w-full bg-gold-line', thickness, className)} aria-hidden="true" />

  return (
    <motion.span
      aria-hidden="true"
      className={cn('block w-full origin-left bg-gold-line', thickness, className)}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.4, delay, ease: EASE_LUXE }}
    />
  )
}
