import { useMaskedHeading } from '../../hooks/useReveal'
import { cn } from '../../lib/utils'

/**
 * Display heading with a per-word masked reveal.
 * Each word sits in its own `overflow-hidden` box and slides up from below
 * the mask on scroll. Newlines in `text` become hard line breaks.
 *
 * The full string is exposed to assistive tech via `aria-label`, and the
 * split words are hidden from it, so the heading is never read word-by-word.
 */
export default function MaskedHeading({
  text,
  as: Tag = 'h2',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  start = 'top 84%',
  accentWords = [],
}) {
  const ref = useMaskedHeading({ delay, stagger, start })
  const lines = String(text).split('\n')

  return (
    <Tag ref={ref} className={cn('font-display', className)} aria-label={String(text).replace(/\n/g, ' ')}>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(' ').map((word, wi) => {
              const clean = word.replace(/[^\p{L}\p{N}]/gu, '')
              const isAccent = accentWords.includes(clean)
              return (
                <span key={`${li}-${wi}`} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
                  <span
                    data-word
                    className={cn(
                      'inline-block will-change-transform',
                      isAccent && 'gold-text font-serif italic',
                      wordClassName,
                    )}
                  >
                    {word}
                    {wi < line.split(' ').length - 1 ? ' ' : ''}
                  </span>
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </Tag>
  )
}
