import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HiArrowLongRight } from 'react-icons/hi2'
import { collections, allCategories } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import LuxeIcon from '../ui/LuxeIcon'
import Illustration from '../illustrations/Illustration'
import Reveal from '../ui/Reveal'
import GoldRule from '../ui/GoldRule'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { cn } from '../../lib/utils'
import { EASE_LUXE } from '../ui/Reveal'

/**
 * Collections.
 * ------------
 * Twenty-nine categories is too many to present as twenty-nine cards — it
 * reads as a spreadsheet. They are grouped into six shopping worlds, each
 * card listing the categories it contains, with the complete flat index
 * printed underneath for anyone scanning for one specific thing.
 *
 * The grid is deliberately asymmetric (two wide cards, four standard) so it
 * reads as a layout rather than a loop over an array.
 */

const ACCENT = {
  gold: { wash: 'from-champagne/45 via-champagne/10', icon: 'text-gold-deep', dot: 'bg-gold' },
  rose: { wash: 'from-rose-light/60 via-rose-light/10', icon: 'text-rose-deep', dot: 'bg-rose-deep' },
  coral: { wash: 'from-peach/70 via-peach/10', icon: 'text-coral-deep', dot: 'bg-coral-deep' },
  peach: { wash: 'from-peach/60 via-peach/10', icon: 'text-coral-deep', dot: 'bg-peach-deep' },
  champagne: { wash: 'from-champagne-light/70 via-champagne-light/10', icon: 'text-gold-deep', dot: 'bg-champagne-deep' },
}

/** Two cards span two columns; the rest span one. */
const SPANS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-6']

function CollectionCard({ collection, index }) {
  const cardRef = useRef(null)
  const reduced = useReducedMotion()
  const accent = ACCENT[collection.accent] || ACCENT.gold
  const wide = SPANS[index] === 'lg:col-span-6'

  /** Pointer-following spotlight, written straight to CSS custom properties. */
  const onMove = (e) => {
    if (reduced || !cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    cardRef.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={onMove}
      data-cursor="link"
      className={cn(
        'group card-surface relative flex flex-col justify-between p-8 sm:p-10',
        SPANS[index],
        wide ? 'lg:flex-row lg:items-end lg:gap-14' : 'min-h-[30rem]',
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, delay: (index % 3) * 0.08, ease: EASE_LUXE }}
      style={{ '--mx': '50%', '--my': '50%' }}
    >
      {/* Tinted wash that fades in on hover */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-[900ms] ease-luxe group-hover:opacity-55',
          accent.wash,
        )}
      />
      {/* Pointer spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(22rem 22rem at var(--mx) var(--my), rgba(255,255,255,0.5), transparent 62%)',
        }}
      />

      <div className="relative z-10 flex-1">
        <div className="flex items-start justify-between gap-6">
          <span className="font-serif text-sm italic text-gold-deep/70">{collection.index}</span>
          <span
            className={cn(
              'h-14 w-14 shrink-0 transition-transform duration-[900ms] ease-luxe group-hover:-translate-y-1 group-hover:rotate-3',
              accent.icon,
            )}
          >
            <LuxeIcon name={collection.icon} strokeWidth={1.6} />
          </span>
        </div>

        {/* Photograph sits between the icon and the title: the card leads with
            the product, and the line icon stays as the family marker. */}
        <div className="relative mt-7 overflow-hidden rounded-2xl">
          <Illustration
            imageKey={collection.image}
            className={wide ? 'aspect-[16/7]' : 'aspect-[5/4]'}
            imgClassName="transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.06]"
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent opacity-20 transition-opacity duration-700 group-hover:opacity-0',
              accent.wash,
            )}
          />
        </div>

        <h3 className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink">
          {collection.title}
        </h3>
        <p className="mt-2 font-serif text-base italic text-gold-deep">{collection.subtitle}</p>
        <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-ink-soft">{collection.body}</p>
      </div>

      <div className={cn('relative z-10 mt-8', wide && 'lg:mt-0 lg:max-w-sm')}>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {collection.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[0.72rem] uppercase tracking-wider2 text-ink-soft">
              <span className={cn('h-1 w-1 rounded-full', accent.dot)} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <span className="mt-7 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-wider2 text-ink">
          <span className="link-wipe">Ask in store</span>
          <HiArrowLongRight className="h-4 w-4 transition-transform duration-700 ease-luxe group-hover:translate-x-1.5" />
        </span>
      </div>
    </motion.article>
  )
}

export default function Collections() {
  const [expanded, setExpanded] = useState(false)
  const { scrollTo } = useSmoothScroll()
  const visible = expanded ? allCategories : allCategories.slice(0, 14)

  return (
    <section id="collections" className="section tint tint-blush relative" aria-labelledby="collections-heading">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we stock"
            index="02"
            title={'Six worlds under\none quiet roof'}
            accentWords={['quiet']}
            lede="Beauty, jewellery, gifting, festival, fashion and the everyday — arranged the way you actually shop, not the way a catalogue lists things."
            className="max-w-3xl"
          />
          <span id="collections-heading" className="sr-only">
            Product collections
          </span>

          <Reveal delay={0.2} className="shrink-0">
            <p className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-ink/12">
              {allCategories.length}
              <span className="ml-2 align-top font-sans text-[0.7rem] uppercase tracking-luxe text-gold-deep">
                categories
              </span>
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-5 lg:grid-cols-6">
          {collections.map((c, i) => (
            <CollectionCard key={c.id} collection={c} index={i} />
          ))}
        </div>

        {/* Full flat index */}
        <div className="mt-24">
          <GoldRule className="mb-10" />
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <Reveal>
              <h3 className="max-w-xs font-display text-2xl leading-snug text-ink">
                Looking for one thing in particular?
              </h3>
              <p className="mt-3 max-w-sm text-sm font-light text-ink-soft">
                Here is the complete list. If it is not here, ask — most of it we can order in for the
                following week.
              </p>
            </Reveal>

            <div className="flex-1 md:max-w-3xl">
              <ul className="flex flex-wrap gap-2.5">
                {visible.map((cat, i) => (
                  <motion.li
                    key={cat}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: Math.min(i * 0.02, 0.5), ease: EASE_LUXE }}
                  >
                    <span className="inline-block rounded-pill border border-beige bg-white/60 px-4 py-2 text-[0.7rem] uppercase tracking-wider2 text-ink-soft transition-all duration-500 ease-luxe hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white hover:text-ink hover:shadow-soft">
                      {cat}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                {allCategories.length > 14 && (
                  <button
                    type="button"
                    onClick={() => setExpanded((e) => !e)}
                    data-cursor="link"
                    aria-expanded={expanded}
                    className="link-wipe text-[0.7rem] uppercase tracking-wider2 text-gold-deep"
                  >
                    {expanded ? 'Show fewer' : `Show all ${allCategories.length}`}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => scrollTo('#contact', { offset: -70 })}
                  data-cursor="link"
                  className="link-wipe text-[0.7rem] uppercase tracking-wider2 text-ink-soft"
                >
                  Ask about something else →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
