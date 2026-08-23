import { useState, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'
import Reveal, { EASE_LUXE } from '../ui/Reveal'
import LuxeIcon from '../ui/LuxeIcon'
import { showroom } from '../../data/site'
import { PRODUCT_ART, Plinth } from '../illustrations/ProductArt'
import { I } from '../illustrations/palette'
import { cn } from '../../lib/utils'
import { useReducedMotion as usePrefersReduced } from '../../hooks/useMediaQuery'

/**
 * The shelf.
 * ----------
 * Eighteen pieces the shop keeps all year, each one drawn rather than
 * photographed — which means every piece is lit the same way, sits on the
 * same ground, and reads as one shelf instead of eighteen different camera
 * days. Stepping through them costs nothing to load.
 *
 * The drawing is keyed on the product id, so switching replays the entrance
 * rather than morphing one object into the next.
 */
export default function Showroom() {
  const [index, setIndex] = useState(0)
  const prefersReduced = usePrefersReduced()

  const product = showroom[index]
  const Art = useMemo(() => PRODUCT_ART[product.id] || PRODUCT_ART.lipstick, [product.id])

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + showroom.length) % showroom.length)
  }, [])

  /* The ground colour rotates through the palette so consecutive pieces never
     sit on the same panel — it keeps a long list of drawings from flattening. */
  const grounds = [I.blush, I.peach, I.cream, I.sand]
  const ground = grounds[index % grounds.length]

  return (
    <section id="showroom" className="section relative" aria-labelledby="showroom-heading">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The shelf"
            index="05"
            title={'Everything, drawn\npiece by piece'}
            accentWords={['drawn']}
            lede="Eighteen things we keep in stock the whole year round, drawn one at a time. Step through the shelf — and if what you want is not on it, ask, because most of it is in the back."
            className="max-w-2xl"
          />
          <span id="showroom-heading" className="sr-only">
            The shelf
          </span>

          <Reveal delay={0.2} className="shrink-0">
            <div className="flex items-center gap-3 text-ink-soft">
              <span className="h-5 w-5 text-gold" aria-hidden="true">
                <LuxeIcon name="sparkle" strokeWidth={1.8} />
              </span>
              <span className="text-[0.68rem] uppercase tracking-wider2">
                {showroom.length} pieces · in stock all year
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} y={40} amount={0.08} className="mt-14">
          <div className="grid overflow-hidden rounded-luxe border border-beige bg-warm shadow-float lg:grid-cols-[1.15fr_1fr]">
            {/* ------------------------------ The drawing ------------------- */}
            <div
              className="relative aspect-[4/5] w-full transition-colors duration-700 ease-luxe sm:aspect-[4/3] lg:aspect-auto lg:min-h-[34rem]"
              style={{ backgroundColor: ground }}
            >
              <AnimatePresence mode="wait">
                <motion.svg
                  key={product.id}
                  viewBox="0 0 240 240"
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute inset-0 h-full w-full p-8 sm:p-12"
                  role="img"
                  aria-label={`Illustration of ${product.name.toLowerCase()}. ${product.note}`}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReduced ? 0 : -18 }}
                  transition={{ duration: prefersReduced ? 0 : 0.5, ease: EASE_LUXE }}
                >
                  {/* Ground disc first, so every piece sits on the same shelf. */}
                  <Plinth />
                  <g className={prefersReduced ? undefined : 'shelf-float'}>
                    <Art />
                  </g>
                </motion.svg>
              </AnimatePresence>

              <span className="pointer-events-none absolute bottom-5 left-5 font-serif text-sm italic text-ink-faint tabular-nums sm:bottom-7 sm:left-7">
                {String(index + 1).padStart(2, '0')}
                <span className="mx-1.5 text-gold-deep/60">/</span>
                {String(showroom.length).padStart(2, '0')}
              </span>
            </div>

            {/* ------------------------------ Detail ----------------------- */}
            <div className="flex flex-col justify-between border-t border-beige/80 p-8 sm:p-10 lg:border-l lg:border-t-0">
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: prefersReduced ? 0 : 0.45, ease: EASE_LUXE }}
                  >
                    <span className="eyebrow text-gold-deep">{product.family}</span>
                    <h3 className="mt-4 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-tight text-ink">
                      {product.name}
                    </h3>
                    <p className="mt-4 max-w-sm text-body-lg font-light leading-relaxed text-ink-soft">
                      {product.note}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    data-cursor="link"
                    aria-label="Previous piece"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 text-ink transition-all duration-500 ease-luxe hover:-translate-x-0.5 hover:border-gold hover:bg-white/70"
                  >
                    <HiArrowLongLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    data-cursor="link"
                    aria-label="Next piece"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 text-ink transition-all duration-500 ease-luxe hover:translate-x-0.5 hover:border-gold hover:bg-white/70"
                  >
                    <HiArrowLongRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* The whole shelf, as a list — nobody should have to click
                  through eighteen pieces to find the one they came for. */}
              <div className="mt-10">
                <h4 className="eyebrow mb-4">Browse the shelf</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {showroom.map((p, i) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        data-cursor="link"
                        aria-current={i === index ? 'true' : undefined}
                        className={cn(
                          'rounded-pill px-3.5 py-2 text-[0.6rem] uppercase tracking-wider2 transition-all duration-500 ease-luxe',
                          i === index
                            ? 'bg-ink text-warm shadow-soft'
                            : 'bg-white/70 text-ink-soft hover:bg-white hover:text-ink',
                        )}
                      >
                        {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
