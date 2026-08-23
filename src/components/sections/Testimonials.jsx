import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Keyboard, A11y } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import 'swiper/css'
import 'swiper/css/effect-fade'

import { testimonials } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import GoldRule from '../ui/GoldRule'
import { cn } from '../../lib/utils'
import { EASE_LUXE } from '../ui/Reveal'

/**
 * Testimonials.
 * -------------
 * One quote at a time, set large. Five small cards competing for attention
 * would be read by nobody; a single quote at display size gets read.
 *
 * The avatar is a monogram in a slowly rotating gold ring rather than a stock
 * photograph — honest (these are real customers, not models) and it keeps the
 * page free of faces that obviously came from a stock library.
 */

const TONE = {
  rose: 'from-rose-light/70 to-peach/40',
  coral: 'from-peach/70 to-champagne-light/40',
  gold: 'from-champagne/60 to-cream',
  champagne: 'from-champagne-light/70 to-ivory',
  peach: 'from-peach/60 to-warm',
}

export default function Testimonials() {
  const swiperRef = useRef(null)
  const [active, setActive] = useState(0)
  const item = testimonials[active]

  return (
    <section id="testimonials" className="section tint tint-gold relative" aria-labelledby="testimonials-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="In their words"
          index="10"
          title={'What the town\nsays about us'}
          accentWords={['town']}
          align="center"
          className="mx-auto max-w-2xl"
        />
        <span id="testimonials-heading" className="sr-only">
          Customer testimonials
        </span>

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Tinted glow behind the card, keyed to the active quote. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-x-8 -inset-y-6 rounded-[3rem] bg-gradient-to-br blur-3xl',
                TONE[item.tone] || TONE.gold,
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE_LUXE }}
            />
          </AnimatePresence>

          <div className="glass gold-frame relative rounded-luxe px-7 py-14 sm:px-16 sm:py-20">
            {/* Oversized opening quote */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-6 top-2 font-display text-[8rem] leading-none text-gold/15 sm:left-12 sm:text-[12rem]"
            >
              “
            </span>

            <Swiper
              modules={[Autoplay, EffectFade, Keyboard, A11y]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={800}
              loop
              autoHeight
              keyboard={{ enabled: true }}
              autoplay={{ delay: 7000, disableOnInteraction: true, pauseOnMouseEnter: true }}
              a11y={{ prevSlideMessage: 'Previous testimonial', nextSlideMessage: 'Next testimonial' }}
              onSwiper={(s) => {
                swiperRef.current = s
              }}
              onSlideChange={(s) => setActive(s.realIndex)}
              className="swiper-luxe relative z-10"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <figure className="text-center">
                    <blockquote>
                      <p className="mx-auto max-w-3xl font-serif text-[clamp(1.35rem,2.8vw,2.15rem)] font-light leading-[1.45] text-ink">
                        {t.quote}
                      </p>
                    </blockquote>

                    <GoldRule className="mx-auto mt-10 max-w-[8rem]" />

                    <figcaption className="mt-8 flex flex-col items-center gap-4">
                      {/* Monogram avatar */}
                      <span className="relative flex h-16 w-16 items-center justify-center">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-gold/45"
                        />
                        <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-gradient-to-br from-champagne to-peach font-display text-lg text-ink shadow-soft">
                          {t.initials}
                        </span>
                      </span>
                      <span>
                        <span className="block font-display text-lg text-ink">{t.name}</span>
                        <span className="mt-1 block text-[0.65rem] uppercase tracking-luxe text-ink-faint">
                          {t.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Controls */}
            <div className="relative z-10 mt-12 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                data-cursor="link"
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-ink transition-all duration-500 ease-luxe hover:-translate-x-0.5 hover:border-gold hover:bg-white/70"
              >
                <HiArrowLongLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-2" role="tablist" aria-label="Choose a testimonial">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Testimonial from ${t.name}`}
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    data-cursor="link"
                    className={cn(
                      'h-[2px] transition-all duration-700 ease-luxe',
                      i === active ? 'w-10 bg-gold' : 'w-5 bg-ink/15 hover:bg-ink/30',
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                data-cursor="link"
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-ink transition-all duration-500 ease-luxe hover:translate-x-0.5 hover:border-gold hover:bg-white/70"
              >
                <HiArrowLongRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
