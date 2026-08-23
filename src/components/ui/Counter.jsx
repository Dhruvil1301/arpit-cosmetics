import { useCounter } from '../../hooks/useCounter'
import { cn } from '../../lib/utils'

/** Animated statistic. The full value is announced once, not on every tick. */
export default function Counter({ value, suffix = '', label, decimals = 0, className, valueClassName }) {
  const { ref, display } = useCounter(value, { decimals })

  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      <span
        className={cn('font-display text-display-sm leading-none text-ink', valueClassName)}
        aria-hidden="true"
      >
        {display}
        <span className="gold-text">{suffix}</span>
      </span>
      <span className="sr-only">
        {value.toLocaleString('en-IN')}
        {suffix} {label}
      </span>
      {label && (
        <span className="mt-3 text-[0.7rem] font-medium uppercase tracking-wider2 text-ink-soft" aria-hidden="true">
          {label}
        </span>
      )}
    </div>
  )
}
