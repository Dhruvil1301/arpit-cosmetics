import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

/** Hairline gold reading-progress bar pinned to the very top of the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[130] h-[2px] origin-left bg-gradient-to-r from-champagne via-gold to-gold-deep"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
    />
  )
}
