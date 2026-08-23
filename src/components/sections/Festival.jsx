import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiArrowLongRight } from 'react-icons/hi2'
import { festivals, whatsappLink } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import Illustration from '../illustrations/Illustration'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { useIsDesktop, useReducedMotion } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Festival collection.
 * --------------------
 * On desktop the eight festivals run as a horizontal reel driven by vertical
 * scroll: the section pins and the track translates, so the calendar reads as
 * a timeline you travel along rather than a grid you scan.
 *
 * Below 1024px — and under reduced motion — the same cards fall back to a
 * snap-scrolling row, which is the right interaction for a thumb anyway.
 */

const TONE = {
  gold: 'from-champagne/60',
  coral: 'from-peach/70',
  rose: 'from-rose-light/70',
  champagne: 'from-champagne-light/70',
  peach: 'from-peach/60',
}

function FestivalCard({ item, index }) {
  return (
    <article
      className={cn(
        'group relative flex w-[78vw] shrink-0 flex-col overflow-hidden rounded-luxe border border-beige/90 bg-porcelain shadow-soft transition-shadow duration-700 ease-luxe hover:shadow-float',
        'sm:w-[24rem] lg:w-[21rem]',
      )}
    >
      <div className="relative overflow-hidden">
        <Illustration
          imageKey={item.image}
          className="aspect-[4/5]"
          imgClassName="transition-transform duration-[1.8s] ease-luxe group-hover:scale-[1.07]"
        />
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-[900ms] group-hover:opacity-45',
            TONE[item.tone] || TONE.gold,
          )}
        />
        <span className="absolute left-5 top-5 rounded-pill bg-warm/85 px-3.5 py-1.5 text-[0.6rem] uppercase tracking-wider2 text-ink backdrop-blur-sm">
          {item.season}
        </span>
        <span className="absolute right-5 top-5 font-serif text-sm italic text-warm/90 drop-shadow">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl leading-tight text-ink">{item.name}</h3>
        <p className="mt-1.5 font-serif text-base italic text-gold-deep">{item.line}</p>
        <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-ink-soft">{item.body}</p>
        <span className="mt-6 inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-wider2 text-ink">
          <span className="link-wipe">Reserve early</span>
          <HiArrowLongRight className="h-4 w-4 transition-transform duration-700 ease-luxe group-hover:translate-x-1.5" />
        </span>
      </div>
    </article>
  )
}

export default function Festival() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const isDesktop = useIsDesktop()
  const reduced = useReducedMotion()

  useEffect(() => {
    const stage = stageRef.current
    const track = trackRef.current
    if (!stage || !track || !isDesktop || reduced) return

    const ctx = gsap.context(() => {
      // Pin the stage (exactly one viewport tall) rather than the section, so
      // the heading scrolls in normally and the pinned frame can never be
      // taller than the screen. Distance is a function so a resize or a font
      // swap recomputes it on ScrollTrigger.refresh() instead of desyncing.
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96)

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, stage)

    return () => ctx.revert()
  }, [isDesktop, reduced])

  const horizontal = isDesktop && !reduced

  return (
    <section id="festival" ref={sectionRef} className="section relative" aria-labelledby="festival-heading">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The calendar"
            index="09"
            title={'Stocked before\nthe festival,\nnot after'}
            accentWords={['before']}
            lede="Diwali, Rakhi, Karwa Chauth, wedding season, haldi, mehendi, birthdays and anniversaries — the front table changes eight times a year."
            className="max-w-2xl"
          />
          <span id="festival-heading" className="sr-only">
            Festival collection
          </span>

          <Reveal delay={0.2} className="shrink-0">
            <Button href={whatsappLink} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
              Reserve a hamper
            </Button>
          </Reveal>
        </div>
      </div>

      {/* ------------------------------ Reel ------------------------------- */}
      <div
        ref={stageRef}
        className={cn(
          'mt-16',
          horizontal
            ? 'flex h-screen items-center overflow-hidden'
            : 'no-scrollbar overflow-x-auto',
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            'flex w-max gap-5 px-gutter pb-4',
            horizontal ? 'will-transform' : 'snap-x snap-mandatory',
          )}
        >
          {festivals.map((f, i) => (
            <div key={f.id} className={cn(!horizontal && 'snap-start')}>
              <FestivalCard item={f} index={i} />
            </div>
          ))}

          {/* Closing plate at the end of the reel */}
          <div className="flex w-[78vw] shrink-0 flex-col justify-center rounded-luxe border border-gold/25 bg-gradient-to-br from-cream to-champagne/30 p-9 sm:w-[24rem] lg:w-[21rem]">
            <span className="eyebrow text-gold-deep">Any occasion</span>
            <p className="mt-5 font-display text-3xl leading-tight text-ink">
              Tell us the person and the budget.
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-ink-soft">
              We will build the hamper around them, wrap it in the house paper and have it ready before
              you arrive.
            </p>
            <div className="mt-8">
              <Button href={whatsappLink} target="_blank" rel="noopener noreferrer" size="sm">
                Start on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      {!horizontal && (
        <p className="shell mt-6 text-xs font-light text-ink-faint">Swipe to see the whole calendar.</p>
      )}
    </section>
  )
}
