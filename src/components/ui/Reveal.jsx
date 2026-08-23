import { motion, useReducedMotion } from 'framer-motion'

/** The house easing, matched to --ease-luxe in CSS and 'expo.out' in GSAP. */
export const EASE_LUXE = [0.16, 1, 0.3, 1]

/**
 * Declarative viewport reveal. Direction controls the axis the element
 * travels along; `blur` adds a defocus that resolves as it settles.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  duration = 1.05,
  y = 30,
  x = 0,
  blur = false,
  scale,
  // 0.2, not 0.35: a full-width 16:9 panel is taller than the viewport space
  // left below it as it scrolls in, so a high threshold can never be met and
  // the element would sit invisibly at opacity 0.
  amount = 0.2,
  once = true,
  className,
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        y,
        x,
        ...(scale ? { scale } : null),
        ...(blur ? { filter: 'blur(10px)' } : null),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        ...(scale ? { scale: 1 } : null),
        ...(blur ? { filter: 'blur(0px)' } : null),
      }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_LUXE }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/** Container that staggers its direct `Reveal`-like children. */
export function RevealGroup({ children, stagger = 0.09, delay = 0, className, amount = 0.3, ...rest }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Child of `RevealGroup` — inherits the stagger timing. */
export function RevealItem({ children, y = 26, className, duration = 0.95, ...rest }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE_LUXE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
