import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineArrowsPointingOut } from 'react-icons/hi2'
import { gallery } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import Illustration, { SLOTS } from '../illustrations/Illustration'
import Lightbox from '../ui/Lightbox'
import Reveal from '../ui/Reveal'
import { useParallax } from '../../hooks/useReveal'
import { cn } from '../../lib/utils'
import { EASE_LUXE } from '../ui/Reveal'

/**
 * Store gallery.
 * --------------
 * A true masonry-feel grid built on CSS grid spans rather than a JS masonry
 * library: each tile declares `normal | wide | tall` in the data and the grid
 * resolves it. No measuring, no reflow, no layout shift.
 *
 * Alternating columns parallax in opposite directions, which is what stops a
 * grid of eight drawings feeling like a sticker sheet.
 */

const SPAN = {
  normal: 'md:col-span-2 md:row-span-2',
  wide: 'md:col-span-4 md:row-span-2',
  tall: 'md:col-span-2 md:row-span-3',
}

function Tile({ item, index, onOpen }) {
  // Vector artwork does not need the oversized parallax frame that raster
  // tiles did — the drawing is fitted, not cropped, so there is no edge to
  // expose. A gentle drift is kept for depth.
  const ref = useParallax({ speed: index % 2 === 0 ? 0.02 : -0.02 })

  return (
    <motion.figure
      className={cn('group relative overflow-hidden rounded-luxe bg-ivory', SPAN[item.span] || SPAN.normal)}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.05, delay: (index % 3) * 0.07, ease: EASE_LUXE }}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        data-cursor="view"
        data-cursor-label="View"
        className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        aria-label={`Open ${item.caption} — ${item.detail}`}
      >
        <div ref={ref} className="absolute inset-0 will-transform">
          <Illustration
            imageKey={item.image}
            className="h-full w-full"
            ratio="auto"
            imgClassName="transition-transform duration-[1.8s] ease-luxe group-hover:scale-[1.06]"
          />
        </div>

        {/* Caption plate rises on hover */}
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-ink/78 via-ink/30 to-transparent px-6 pb-6 pt-14 opacity-0 transition-all duration-[900ms] ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
          <span className="block font-display text-lg text-warm">{item.caption}</span>
          <span className="mt-1 block text-xs font-light text-warm/75">{item.detail}</span>
        </figcaption>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-5 flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-warm/85 text-ink opacity-0 backdrop-blur-sm transition-all duration-700 ease-luxe group-hover:scale-100 group-hover:opacity-100"
        >
          <HiOutlineArrowsPointingOut className="h-4 w-4" />
        </span>
      </button>
    </motion.figure>
  )
}

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const open = useCallback((i) => setIndex(i), [])
  const close = useCallback(() => setIndex(null), [])

  // Enrich for the lightbox so it has real alternative text per slide —
  // taken from the drawing itself, which is the only place it is written.
  const items = gallery.map((g) => ({ ...g, alt: SLOTS[g.image]?.alt ?? g.caption }))

  return (
    <section id="gallery" className="section tint tint-blush relative" aria-labelledby="gallery-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="Inside the store"
          index="08"
          title={'Come and see it\nfor yourself'}
          accentWords={['yourself']}
          lede="The shop floor, drawn corner by corner — the colour wall, the jewellery cabinet, the wrapping station and whatever the festival table is holding this month."
          className="max-w-2xl"
        />
        <span id="gallery-heading" className="sr-only">
          Store gallery
        </span>

        <div className="mt-16 grid auto-rows-[13rem] grid-cols-1 gap-4 sm:auto-rows-[10rem] md:grid-cols-6 md:gap-5">
          {items.map((item, i) => (
            <Tile key={item.id} item={item} index={i} onOpen={open} />
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <p className="text-xs font-light text-ink-faint">
            Tap any drawing to enlarge. Use the arrow keys to move between them, Escape to close.
          </p>
        </Reveal>
      </div>

      <Lightbox items={items} index={index} onClose={close} onNavigate={setIndex} />
    </section>
  )
}
