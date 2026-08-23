import MaskedHeading from './MaskedHeading'
import Reveal from './Reveal'
import { cn } from '../../lib/utils'

/**
 * The recurring section masthead: numbered eyebrow, gold hairline, display
 * heading and optional lede. Used by every section so the page has one rhythm.
 */
export default function SectionHeading({
  eyebrow,
  index,
  title,
  lede,
  accentWords = [],
  align = 'left',
  as = 'h2',
  className,
  titleClassName,
  children,
}) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'relative flex flex-col',
        centered ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {(eyebrow || index) && (
        <Reveal y={16} duration={0.8}>
          <div className={cn('flex items-center gap-4', centered && 'justify-center')}>
            {index && (
              <span className="font-serif text-sm italic text-gold-deep/80" aria-hidden="true">
                {index}
              </span>
            )}
            <span className="h-px w-10 bg-gradient-to-r from-gold/70 to-transparent" aria-hidden="true" />
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          </div>
        </Reveal>
      )}

      <MaskedHeading
        as={as}
        text={title}
        accentWords={accentWords}
        className={cn(
          'mt-7 text-display-md font-normal text-ink',
          centered && 'text-center',
          titleClassName,
        )}
      />

      {lede && (
        <Reveal delay={0.15} y={22}>
          <p
            className={cn(
              'mt-7 max-w-prose text-body-lg font-light text-ink-soft',
              centered && 'mx-auto text-center',
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  )
}
