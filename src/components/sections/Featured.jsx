import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard, Pagination, A11y, Parallax } from 'swiper/modules'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import 'swiper/css'
import 'swiper/css/pagination'

import { featured } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import Illustration from '../illustrations/Illustration'
import Reveal from '../ui/Reveal'
import { cn } from '../../lib/utils'

/**
 * Featured collection.
 * --------------------
 * A dragged slider rather than a grid: the pieces are a curated selection,
 * and a slider says "these were chosen" where a grid says "here is inventory".
 *
 * Swiper handles the gesture, keyboard and a11y layers; the card treatment,
 * the parallax on the image inside each frame and the active-slide lift are
 * ours. Autoplay is slow (6.5s) and stops permanently on interaction.
 */

const TONE_RING = {
  gold: 'group-hover:border-gold/60',
  coral: 'group-hover:border-coral/70',
  rose: 'group-hover:border-rose-deep/60',
  peach: 'group-hover:border-peach-deep/70',
  champagne: 'group-hover:border-champagne-deep/70',
}

export default function Featured() {
  const swiperRef = useRef(null)
  const [active, setActive] = useState(0)

  return (
    <section id="featured" className="section tint tint-gold relative overflow-hidden" aria-labelledby="featured-heading">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Chosen this season"
            index="06"
            title={'The featured\ncollection'}
            accentWords={['featured']}
            lede="Six things worth the trip right now — priced from, and all of them wrapped free if they are going to somebody else."
            className="max-w-2xl"
          />
          <span id="featured-heading" className="sr-only">
            Featured collection
          </span>

          {/* Slider controls */}
          <Reveal delay={0.2} className="flex items-center gap-4">
            <span className="font-serif text-sm italic text-ink-faint tabular-nums">
              {String(active + 1).padStart(2, '0')}
              <span className="mx-1.5 text-gold/50">/</span>
              {String(featured.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                data-cursor="link"
                aria-label="Previous item"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-ink transition-all duration-500 ease-luxe hover:-translate-x-0.5 hover:border-gold hover:bg-white/70"
              >
                <HiArrowLongLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                data-cursor="link"
                aria-label="Next item"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-ink transition-all duration-500 ease-luxe hover:translate-x-0.5 hover:border-gold hover:bg-white/70"
              >
                <HiArrowLongRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Slider breaks the shell on the right so the next card is always
          half-visible — the cue that tells you it is draggable. */}
      <div className="mt-16 pl-gutter">
        <Swiper
          modules={[Autoplay, Keyboard, Pagination, A11y, Parallax]}
          onSwiper={(s) => {
            swiperRef.current = s
          }}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="swiper-luxe !overflow-visible"
          spaceBetween={20}
          slidesPerView={1.12}
          speed={900}
          grabCursor
          parallax
          keyboard={{ enabled: true }}
          autoplay={{ delay: 6500, disableOnInteraction: true, pauseOnMouseEnter: true }}
          pagination={{ el: '.featured-pagination', clickable: true }}
          a11y={{ prevSlideMessage: 'Previous item', nextSlideMessage: 'Next item' }}
          breakpoints={{
            640: { slidesPerView: 1.8, spaceBetween: 24 },
            1024: { slidesPerView: 2.6, spaceBetween: 28 },
            1440: { slidesPerView: 3.3, spaceBetween: 32 },
          }}
        >
          {featured.map((item, i) => (
            <SwiperSlide key={item.id}>
              <article
                data-cursor="drag"
                data-cursor-label="Drag"
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-luxe border border-beige/90 bg-porcelain shadow-soft transition-[transform,box-shadow,border-color] duration-[900ms] ease-luxe hover:-translate-y-2 hover:shadow-float',
                  TONE_RING[item.tone] || TONE_RING.gold,
                )}
              >
                <div className="relative overflow-hidden">
                  <Illustration
                    imageKey={item.image}
                    className="aspect-[4/5]"
                    imgClassName="transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.07]"
                  />

                  {/* Family tag */}
                  <span className="absolute left-4 top-4 rounded-pill bg-warm/85 px-3.5 py-1.5 text-[0.6rem] uppercase tracking-wider2 text-ink backdrop-blur-sm">
                    {item.family}
                  </span>

                  {/* Price plate slides up on hover */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/75 via-ink/45 to-transparent px-6 pb-5 pt-10 transition-transform duration-[900ms] ease-luxe group-hover:translate-y-0">
                    <p className="text-xs font-light leading-relaxed text-warm/90">{item.note}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-7">
                  <h3 className="font-display text-2xl leading-tight text-ink">{item.name}</h3>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <span className="text-[0.62rem] uppercase tracking-luxe text-ink-faint">From</span>
                    <span className="font-display text-xl text-ink">
                      <span className="gold-text">{item.priceFrom}</span>
                    </span>
                  </div>
                </div>

                <span className="sr-only">
                  {item.name}, {item.family}. {item.note} From {item.priceFrom}.
                </span>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="shell mt-12 flex items-center justify-between gap-8">
        <div className="featured-pagination flex gap-2" />
        <p className="hidden text-[0.65rem] uppercase tracking-wider2 text-ink-faint sm:block">
          Drag, or use the arrow keys
        </p>
      </div>
    </section>
  )
}
