import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { about, brand } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import Illustration from '../illustrations/Illustration'
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal'
import GoldRule from '../ui/GoldRule'
import { useParallax } from '../../hooks/useReveal'

/**
 * About.
 * ------
 * A three-plate collage on the left, the story on the right. The plates move
 * at three different rates as you scroll, which is what makes a flat column
 * of images read as a composed spread.
 */
export default function About() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Three depths. The numbers are small on purpose — parallax that you can
  // consciously see is parallax that has gone too far.
  const plateA = useTransform(scrollYProgress, [0, 1], ['6%', '-9%'])
  const plateB = useTransform(scrollYProgress, [0, 1], ['-4%', '12%'])
  const plateC = useTransform(scrollYProgress, [0, 1], ['10%', '-14%'])

  const ruleRef = useParallax({ speed: 0.03 })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section tint tint-gold relative"
      aria-labelledby="about-heading"
    >
      <div className="shell">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1fr] lg:gap-24">
          {/* ---------------------------- Collage --------------------------- */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem]">
              {/* Principal plate */}
              <motion.div
                className="absolute left-0 top-[6%] w-[72%] overflow-hidden rounded-luxe shadow-float"
                style={reduced ? undefined : { y: plateA }}
              >
                <Illustration
                  imageKey="aboutPortrait"
                  className="gold-frame"
                />
              </motion.div>

              {/* Detail plate, overlapping at the bottom right */}
              <motion.div
                className="absolute bottom-[2%] right-0 w-[52%] overflow-hidden rounded-luxe shadow-lift"
                style={reduced ? undefined : { y: plateB }}
              >
                <Illustration imageKey="aboutDetail" sizes="(min-width: 1024px) 18vw, 46vw" />
              </motion.div>

              {/* Small texture plate, top right */}
              <motion.div
                className="absolute right-[4%] top-0 hidden w-[30%] overflow-hidden rounded-2xl shadow-soft sm:block"
                style={reduced ? undefined : { y: plateC }}
              >
                <Illustration imageKey="aboutTexture" sizes="16vw" />
              </motion.div>

              {/* Established seal */}
              <motion.div
                className="absolute -bottom-6 left-[8%] flex h-28 w-28 flex-col items-center justify-center rounded-full border border-gold/40 bg-warm/90 text-center shadow-lift backdrop-blur-md"
                initial={{ scale: 0.7, opacity: 0, rotate: -12 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-serif text-[0.6rem] uppercase tracking-luxe text-gold-deep">Since</span>
                <span className="font-display text-2xl leading-none text-ink">{brand.established}</span>
                <span className="mt-1 text-[0.5rem] uppercase tracking-luxe text-ink-faint">Munshiganj</span>
              </motion.div>
            </div>
          </div>

          {/* ----------------------------- Story ---------------------------- */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={about.eyebrow}
              index="01"
              title={about.title}
              accentWords={['occasion']}
              as="h2"
              titleClassName="text-display-md"
            />
            <span id="about-heading" className="sr-only">
              About {brand.name}
            </span>

            <div className="mt-9 space-y-6">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1} y={24}>
                  <p className="max-w-prose text-body-lg font-light text-ink-soft">{p}</p>
                </Reveal>
              ))}
            </div>

            <div ref={ruleRef}>
              <GoldRule className="my-12 max-w-[18rem]" />
            </div>

            {/* Pillars */}
            <RevealGroup className="space-y-8" stagger={0.12}>
              {about.pillars.map((pillar, i) => (
                <RevealItem key={pillar.title}>
                  <div className="group flex gap-6">
                    <span className="mt-1 shrink-0 font-serif text-sm italic text-gold-deep/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-ink transition-colors duration-500 group-hover:text-gold-deep">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-ink-soft">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Signature */}
            <Reveal delay={0.25} className="mt-14">
              <p className="font-serif text-2xl italic text-ink">— {about.signature}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
