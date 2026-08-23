import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa6'
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineClock, HiOutlineArrowUpRight } from 'react-icons/hi2'
import { brand, contact, navLinks, collections, whatsappLink, footerNote } from '../../data/site'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import Reveal from '../ui/Reveal'
import GoldRule from '../ui/GoldRule'
import Marquee from '../ui/Marquee'

const ICONS = { instagram: FaInstagram, facebook: FaFacebookF, whatsapp: FaWhatsapp }

/**
 * Footer.
 * Opens with an oversized wordmark marquee, then a four-column index, then
 * the legal line. Everything a visitor might still be looking for at the
 * bottom of a long page: address, hours, phone, and a way back up.
 */
export default function Footer() {
  const { scrollTo } = useSmoothScroll()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-beige bg-cream/70" id="footer">
      {/* Oversized wordmark ribbon */}
      <div className="border-b border-beige/80 py-8">
        <Marquee
          items={[brand.name, 'Beauty', brand.name, 'Gifts', brand.name, 'Jewellery']}
          speed={54}
          separator="·"
          className="font-display text-[clamp(2.2rem,7vw,5.5rem)] leading-none text-ink/12"
          itemClassName="text-ink/[0.13]"
        />
      </div>

      <div className="shell py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identity */}
          <Reveal>
            <h2 className="font-display text-3xl leading-tight text-ink">
              {brand.shortName}
              <span className="gold-text"> Cosmetics</span>
            </h2>
            <p className="mt-4 max-w-xs font-serif text-lg italic leading-snug text-ink-soft">
              {brand.tagline}
            </p>
            <GoldRule className="my-7 max-w-[12rem]" />
            <p className="max-w-sm text-sm font-light leading-relaxed text-ink-soft">{footerNote}</p>

            <div className="mt-7 flex gap-3">
              {contact.socials.map((s) => {
                const Icon = ICONS[s.icon] || FaInstagram
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    aria-label={`${brand.name} on ${s.label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-ink transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-gold hover:bg-white hover:shadow-soft"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </Reveal>

          {/* Navigate */}
          <Reveal delay={0.08}>
            <h3 className="eyebrow">Navigate</h3>
            <ul className="mt-7 space-y-3.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(l.href, { offset: -70 })
                    }}
                    data-cursor="link"
                    className="link-wipe text-sm font-light text-ink-soft transition-colors duration-500 hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Collections */}
          <Reveal delay={0.16}>
            <h3 className="eyebrow">Collections</h3>
            <ul className="mt-7 space-y-3.5">
              {collections.map((c) => (
                <li key={c.id}>
                  <a
                    href="#collections"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo('#collections', { offset: -70 })
                    }}
                    data-cursor="link"
                    className="link-wipe text-sm font-light text-ink-soft transition-colors duration-500 hover:text-ink"
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Visit */}
          <Reveal delay={0.24}>
            <h3 className="eyebrow">Visit the store</h3>
            <address className="mt-7 space-y-5 not-italic">
              <div className="flex gap-3">
                <HiOutlineMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group text-sm font-light leading-relaxed text-ink-soft transition-colors hover:text-ink"
                >
                  {contact.address.line1}, {contact.address.line2}
                  <br />
                  {contact.address.region} {contact.address.postalCode}, {contact.address.country}
                  <HiOutlineArrowUpRight className="ml-1 inline h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </div>

              <div className="flex gap-3">
                <HiOutlinePhone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <a
                    href={contact.phoneHref}
                    data-cursor="link"
                    className="link-wipe text-sm font-light text-ink-soft transition-colors hover:text-ink"
                  >
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="link-wipe text-sm font-light text-ink-soft transition-colors hover:text-ink"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <HiOutlineClock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <ul className="space-y-1 text-sm font-light text-ink-soft">
                  {contact.hours.map((h) => (
                    <li key={h.days}>
                      <span className="text-ink">{h.days}</span> — {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </address>
          </Reveal>
        </div>

        <GoldRule className="mt-16" />

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 text-xs font-light text-ink-faint sm:flex-row sm:items-center">
          <p>
            © {year} {brand.name}. All rights reserved. Established {brand.established}.
          </p>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            data-cursor="link"
            className="link-wipe uppercase tracking-wider2 text-ink-soft transition-colors hover:text-ink"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
