import { reasons, counters } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import LuxeIcon from '../ui/LuxeIcon'
import Counter from '../ui/Counter'
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal'
import GoldRule from '../ui/GoldRule'

/**
 * Why choose us.
 * --------------
 * Eight reasons on a fine grid with hairline rules instead of card borders —
 * the whole block reads as one ruled page rather than eight boxes, which is
 * calmer and much more couture. The animated counters sit above as the proof.
 */
export default function WhyUs() {
  return (
    <section id="why" className="section tint tint-peach relative" aria-labelledby="why-heading">
      <div className="shell">
        {/* ---------------------------- Counters --------------------------- */}
        <RevealGroup
          className="grid grid-cols-2 gap-y-12 border-y border-beige/80 py-14 lg:grid-cols-4"
          stagger={0.1}
        >
          {counters.map((c) => (
            <RevealItem key={c.label} className="px-2 text-center lg:px-6">
              <Counter
                value={c.value}
                suffix={c.suffix}
                label={c.label}
                decimals={c.decimals || 0}
                className="items-center"
                valueClassName="text-[clamp(2.2rem,4.5vw,3.6rem)]"
              />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ----------------------------- Heading --------------------------- */}
        <div className="mt-24 grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Why people come back"
              index="07"
              title={'Eight reasons,\nand one of them\nis the wrapping'}
              accentWords={['wrapping']}
              lede="None of this is a promotion. It is simply how the shop has been run since 2014."
            />
            <span id="why-heading" className="sr-only">
              Why choose Arpit Cosmetics
            </span>
            <GoldRule className="mt-12 max-w-[14rem]" />
          </div>

          {/* ----------------------------- Reasons -------------------------- */}
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <Reveal
                as="li"
                key={reason.title}
                delay={(i % 2) * 0.08}
                y={28}
                className="group border-b border-beige/80 py-8 first:pt-0 sm:[&:nth-child(2)]:pt-0"
              >
                <div className="flex items-start gap-5">
                  <span className="mt-1 h-10 w-10 shrink-0 text-gold-deep transition-transform duration-[900ms] ease-luxe group-hover:-translate-y-1">
                    <LuxeIcon name={reason.icon} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="flex items-baseline gap-3 font-display text-lg text-ink">
                      <span className="font-serif text-[0.7rem] italic text-gold/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="transition-colors duration-500 group-hover:text-gold-deep">
                        {reason.title}
                      </span>
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-ink-soft">{reason.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
