import { forwardRef } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'
import { cn } from '../../lib/utils'

/**
 * Magnetic CTA.
 * -------------
 * Renders as <a> when `href` is given, otherwise <button>. The outer shell is
 * what the magnet moves; the inner span drifts at a lower rate so the label
 * appears to lag inside the pill. A gold sheen sweeps across on hover.
 */
const Button = forwardRef(function Button(
  {
    children,
    href,
    variant = 'primary',
    size = 'md',
    icon,
    className,
    magnetic = true,
    onClick,
    type = 'button',
    ...rest
  },
  forwardedRef,
) {
  const { ref: magRef, innerRef } = useMagnetic({
    strength: magnetic ? 0.3 : 0,
    innerStrength: magnetic ? 0.16 : 0,
  })

  const base =
    'group relative inline-flex select-none items-center justify-center gap-3 overflow-hidden rounded-pill font-sans font-medium tracking-wider2 uppercase transition-colors duration-500 ease-luxe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm'

  const sizes = {
    sm: 'h-11 px-6 text-[0.68rem]',
    md: 'h-14 px-9 text-[0.72rem]',
    lg: 'h-16 px-11 text-[0.78rem]',
  }

  const variants = {
    // Filled ink — the primary action. Gold sheen sweeps left→right on hover.
    primary: 'bg-ink text-warm shadow-lift hover:text-white',
    // Metallic gold gradient.
    gold: 'text-ink shadow-gold bg-gold-sheen bg-[length:200%_100%] hover:bg-[position:100%_50%] transition-[background-position] duration-[1.2s]',
    // Hairline outline on the warm ground.
    outline:
      'border border-gold/40 bg-white/50 text-ink backdrop-blur-sm hover:border-gold hover:bg-white/80',
    // Quiet tertiary.
    ghost: 'text-ink hover:text-gold-deep',
  }

  const content = (
    <>
      {/* Sheen sweep — a single skewed highlight travelling across the pill. */}
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-champagne/45 to-transparent transition-transform duration-[1.1s] ease-luxe group-hover:translate-x-full"
        />
      )}
      <span ref={innerRef} className="relative z-10 inline-flex items-center gap-3">
        <span>{children}</span>
        {icon && (
          <span className="transition-transform duration-700 ease-luxe group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </>
  )

  const classes = cn(base, sizes[size], variants[variant], className)

  const setRefs = (node) => {
    magRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  if (href) {
    return (
      <a ref={setRefs} href={href} className={classes} data-cursor="link" onClick={onClick} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button ref={setRefs} type={type} className={classes} data-cursor="link" onClick={onClick} {...rest}>
      {content}
    </button>
  )
})

export default Button
