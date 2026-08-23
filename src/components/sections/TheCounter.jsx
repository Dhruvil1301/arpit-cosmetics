import { lazy, Suspense } from 'react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { whatsappLink } from '../../data/site'
import Button from '../ui/Button'

// Split out so it only loads once the visitor scrolls this far.
const CartoonFilm = lazy(() => import('../cartoon/CartoonFilm'))

/**
 * "At the counter" — the illustrated short.
 * -----------------------------------------
 * The 3D boutique film shows the *place*; this shows the *transaction*, which
 * is the part people actually want reassurance about: someone helps you, you
 * are shown options, the price is the price, and the wrapping is free.
 *
 * Illustrated on purpose — a warm, high-colour drawing communicates
 * "friendly local shop" in a way a photograph of a stranger cannot, and it
 * stays smooth on any phone.
 */
export default function TheCounter() {
  return (
    <section id="counter" className="section relative" aria-labelledby="counter-heading">
      {/* Warm colour field — this section is deliberately the most saturated
          moment on the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[6%] -z-10 h-[88%]"
        style={{
          background:
            'radial-gradient(58% 52% at 18% 24%, rgba(242,115,79,0.16), transparent 66%), radial-gradient(52% 50% at 86% 74%, rgba(242,169,59,0.2), transparent 66%)',
        }}
      />

      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="At the counter"
            index="04"
            title={'How a visit\nactually goes'}
            accentWords={['actually']}
            lede="A visit from start to finish: she walks in, he shows her a shade, she takes it, she pays the marked price, it gets wrapped for free, and she leaves with the bag."
            className="max-w-2xl"
          />
          <span id="counter-heading" className="sr-only">
            At the counter — an illustrated short
          </span>

          <Reveal delay={0.2} className="shrink-0">
            <Button href={whatsappLink} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
              Ask us anything
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.12} y={44} amount={0.08} className="mt-14">
          <Suspense
            fallback={
              <div className="aspect-[16/9] w-full animate-pulse rounded-luxe border border-beige bg-gradient-to-br from-cream to-peach/40" />
            }
          >
            <CartoonFilm />
          </Suspense>
        </Reveal>
      </div>
    </section>
  )
}
