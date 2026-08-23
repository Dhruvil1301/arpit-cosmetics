import { cn } from '../../lib/utils'

/**
 * Infinite ribbon. The track holds the content twice and translates by -50%,
 * so the loop is seamless regardless of content width. Pure CSS — no JS
 * measurement, no scroll listener, and it pauses on hover.
 */
export default function Marquee({
  items,
  speed = 42,
  reverse = false,
  separator = '✦',
  className,
  itemClassName,
  pauseOnHover = true,
}) {
  const track = [...items, ...items]

  return (
    <div className={cn('group relative w-full overflow-hidden mask-fade-x', className)} aria-hidden="true">
      <div
        className={cn(
          'flex w-max animate-marquee items-center gap-10 will-change-transform',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {track.map((item, i) => (
          <span key={i} className={cn('flex shrink-0 items-center gap-10', itemClassName)}>
            <span>{item}</span>
            <span className="text-gold/60 text-[0.7em]">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
