import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { HiArrowLongRight, HiOutlineSparkles } from 'react-icons/hi2'
import { hero, marqueeWords, brand } from '../../data/site'
import Button from '../ui/Button'
import Counter from '../ui/Counter'
import Marquee from '../ui/Marquee'
import { EASE_LUXE } from '../ui/Reveal'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

// The hero artwork is inline SVG — a few kilobytes, no loading state, and it
// shares the illustration language used across the rest of the page.
const HeroArt = lazy(() => import('../illustrations/HeroArt'))

/**
 * Hero.
 * -----
 * Editorial split: the headline owns the left two-fifths, the 3D still-life
 * owns the right. On narrow viewports the still-life slides behind the type
 * at reduced opacity rather than being dropped — the page should still feel
 * three-dimensional on a phone.
 *
 * The whole content column parallaxes and fades as you scroll away, so the
 * hero hands over to the next section instead of simply scrolling off.
 */
export default function Hero() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  const { scrollTo } = useSmoothScroll()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25])

  const words = hero.headline

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-28 pt-28"
      aria-labelledby="hero-heading"
    >
      {/* ------------------------------- 3D ------------------------------- */}
      {/* Drifts away on a translate as the hero scrolls out. */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: sceneY, opacity: sceneOpacity }}
        aria-hidden="true"
      >
        {/* Held back on small screens: at 390px the artwork sits directly
            behind the headline and the lede, and legibility beats decoration.
            On desktop it is pushed right, clear of the type column. */}
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-40 sm:opacity-70 lg:left-[38%] lg:opacity-100">
            <HeroArt />
          </div>
        </Suspense>
      </motion.div>

      {/* Legibility wash under the headline on small screens. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-warm via-warm/80 to-warm/40 sm:bg-gradient-to-r sm:from-warm sm:via-warm/70 sm:to-transparent lg:from-warm/85 lg:via-warm/20 lg:to-transparent"
      />

      {/* ----------------------------- Content ---------------------------- */}
      <motion.div
        className="shell relative z-10"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-[46rem]">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: EASE_LUXE }}
          >
            <HiOutlineSparkles className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            {/* Tracked-out caps are wide: the full line orphans "2014" onto a
                second row at 390px, so the year only appears from `sm` up. */}
            <span className="eyebrow whitespace-nowrap text-[0.58rem] tracking-[0.3em] sm:text-eyebrow sm:tracking-luxe">
              Munshiganj · Amethi
              <span className="hidden sm:inline"> · Since {brand.established}</span>
            </span>
          </motion.div>

          {/* Wordmark headline — masked reveal, one line per word.
              The brand name is the largest thing on the page by a wide margin;
              the tagline sits under it as a subline. */}
          <h1 id="hero-heading" className="mt-6" aria-label={`${words.join(' ')} — ${hero.subline}`}>
            <span aria-hidden="true" className="block font-display text-display-xl font-normal leading-[0.88] text-ink">
              {words.map((word, i) => (
                <span key={word} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={i === 1 ? 'block gold-text' : 'block'}
                    initial={{ y: '112%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ delay: 0.28 + i * 0.12, duration: 1.25, ease: EASE_LUXE }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>

            <span aria-hidden="true" className="mt-4 block overflow-hidden sm:mt-5">
              <motion.span
                className="flex items-center gap-4 font-serif text-[clamp(1.15rem,2.6vw,2rem)] font-light italic text-ink-soft sm:gap-6"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.58, duration: 1.15, ease: EASE_LUXE }}
              >
                <span className="h-px w-8 shrink-0 bg-gold/60 sm:w-14" />
                {hero.subline}
              </motion.span>
            </span>
          </h1>

          {/* Lede */}
          <motion.p
            className="mt-7 max-w-lg text-body-lg font-light text-ink-soft sm:mt-8"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 1, ease: EASE_LUXE }}
          >
            {hero.lede}
          </motion.p>

          {/* Actions */}
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.92, duration: 1, ease: EASE_LUXE }}
          >
            <Button
              href={hero.primaryCta.href}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(hero.primaryCta.href, { offset: -70 })
              }}
              icon={<HiArrowLongRight className="h-4 w-4" />}
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                scrollTo(hero.secondaryCta.href, { offset: -70 })
              }}
            >
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.dl
            className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-beige/80 pt-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.18, duration: 1 }}
          >
            {hero.stats.map((s) => (
              <div key={s.label} className="min-w-[7rem]">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  valueClassName="text-[clamp(1.75rem,3vw,2.6rem)]"
                />
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* --------------------------- Floating card ------------------------ */}
      <motion.aside
        className="pointer-events-none absolute bottom-[11rem] right-gutter z-10 hidden w-64 2xl:block"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 1.35, duration: 1.2, ease: EASE_LUXE }}
      >
        <div className="glass gold-frame animate-float rounded-luxe p-6">
          <span className="eyebrow text-gold-deep">In store now</span>
          <p className="mt-3 font-display text-xl leading-snug text-ink">
            Wedding season sets &amp; free gift wrapping
          </p>
          <p className="mt-3 text-xs font-light leading-relaxed text-ink-soft">
            Bridal jewellery, bulk return gifts and hampers built to any budget — restocked weekly.
          </p>
        </div>
      </motion.aside>

      {/* ---------------------------- Scroll cue -------------------------- */}
      <motion.div
        className="absolute bottom-[6.5rem] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-hidden="true"
      >
        <span className="text-[0.6rem] uppercase tracking-luxe text-ink-faint">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-beige">
          <motion.span
            className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-transparent to-gold"
            animate={{ y: ['-100%', '280%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>

      {/* ----------------------------- Ribbon ----------------------------- */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-y border-beige/70 bg-warm/60 py-4 backdrop-blur-sm">
        <Marquee
          items={marqueeWords}
          speed={46}
          className="text-[0.7rem] font-medium uppercase tracking-luxe text-ink-soft"
        />
        <span className="sr-only">
          {brand.name} stocks {marqueeWords.join(', ')} and more.
        </span>
      </div>
    </section>
  )
}
