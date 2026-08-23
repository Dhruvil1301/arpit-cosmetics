import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { HiOutlinePhone } from 'react-icons/hi2'
import { FaWhatsapp } from 'react-icons/fa6'
import { navLinks, brand, contact, whatsappLink } from '../../data/site'
import { useSmoothScroll, useScrollLock } from '../../hooks/useSmoothScroll'
import { cn } from '../../lib/utils'
import { EASE_LUXE } from '../ui/Reveal'
import Button from '../ui/Button'

/**
 * Header.
 * -------
 * Three states:
 *  · at the top — transparent, wide, generous
 *  · scrolled   — condensed glass bar with a hairline
 *  · scrolling down — hidden, so the header never covers the content you are
 *    reading; it returns the moment you scroll up
 *
 * The mobile menu is a full-screen overlay with a staggered link reveal and
 * a proper focus trap.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const lastY = useRef(0)
  const { scrollTo } = useSmoothScroll()
  const reduced = useReducedMotion()

  useScrollLock(open)

  /* --- Scroll state ------------------------------------------------------ */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // 8px dead zone stops trackpad jitter toggling the header.
      if (Math.abs(y - lastY.current) > 8) {
        setHidden(y > lastY.current && y > 320)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* --- Section spy ------------------------------------------------------- */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  /* --- Escape closes the menu -------------------------------------------- */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // Delay past the overlay exit so the scroll is not fighting a layout change.
    window.setTimeout(() => scrollTo(href, { offset: -70 }), open ? 260 : 0)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[120]"
        initial={false}
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: reduced ? 0 : 0.7, ease: EASE_LUXE }}
      >
        <div
          className={cn(
            'transition-[background,backdrop-filter,box-shadow,border-color,padding] duration-700 ease-luxe',
            scrolled
              ? 'border-b border-beige/70 bg-warm/80 py-3 shadow-soft backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent py-6',
          )}
        >
          <nav className="shell flex items-center justify-between gap-4 xl:gap-8" aria-label="Primary">
            {/* Wordmark */}
            <a
              href="#top"
              onClick={(e) => go(e, '#top')}
              data-cursor="link"
              className="group relative z-10 flex shrink-0 flex-col leading-none"
              aria-label={`${brand.name} — back to top`}
            >
              <span className="font-display text-[1.35rem] tracking-tight text-ink transition-colors duration-500 group-hover:text-gold-deep">
                {brand.shortName}
                <span className="gold-text"> Cosmetics</span>
              </span>
              <span className="mt-1 hidden text-[0.55rem] uppercase tracking-luxe text-ink-faint sm:block">
                Munshiganj · Amethi
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-4 xl:flex 2xl:gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    data-cursor="link"
                    aria-current={active === link.href ? 'true' : undefined}
                    className={cn(
                      'link-wipe group inline-flex items-baseline gap-1.5 whitespace-nowrap text-[0.62rem] font-medium uppercase tracking-[0.1em] transition-colors duration-500 2xl:text-[0.68rem] 2xl:tracking-[0.14em]',
                      active === link.href ? 'text-gold-deep' : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    {/* The numerals are a nicety; they are the first thing to
                        go when the bar gets tight. */}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href={contact.phoneHref}
                data-cursor="link"
                aria-label={`Call ${brand.name} on ${contact.phoneDisplay}`}
                className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 ease-luxe hover:border-coral hover:bg-white/70 sm:flex xl:hidden 2xl:flex"
              >
                <HiOutlinePhone className="h-4 w-4" />
              </a>

              <Button
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="primary"
                className="hidden shrink-0 md:inline-flex"
                icon={<FaWhatsapp className="h-4 w-4" />}
              >
                WhatsApp
              </Button>

              {/* Menu toggle */}
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                data-cursor="link"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-gold/30 transition-colors duration-500 hover:bg-white/70 xl:hidden"
              >
                <span
                  className={cn(
                    'block h-px w-4 bg-ink transition-transform duration-500 ease-luxe',
                    open && 'translate-y-[3px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'block h-px w-4 bg-ink transition-transform duration-500 ease-luxe',
                    open && '-translate-y-[3px] -rotate-45',
                  )}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ------------------------------ Overlay ------------------------------ */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[110] flex flex-col justify-center overflow-y-auto bg-warm px-gutter pb-16 pt-28"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.85, ease: EASE_LUXE }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  'radial-gradient(70% 50% at 80% 15%, rgba(228,205,167,0.5), transparent 65%), radial-gradient(60% 45% at 10% 90%, rgba(250,223,203,0.55), transparent 65%)',
              }}
            />

            <nav className="relative" aria-label="Mobile">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-b border-beige/70">
                    <motion.a
                      href={link.href}
                      onClick={(e) => go(e, link.href)}
                      className="group flex items-baseline gap-5 py-5 font-display text-[clamp(1.9rem,7vw,3.2rem)] leading-none text-ink transition-colors duration-500 hover:text-gold-deep"
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '110%', opacity: 0 }}
                      transition={{ duration: 0.8, delay: 0.12 + i * 0.06, ease: EASE_LUXE }}
                    >
                      <span className="font-sans text-[0.6rem] tracking-luxe text-gold/70">{link.index}</span>
                      <span>{link.label}</span>
                      <span className="ml-auto translate-x-[-8px] text-lg opacity-0 transition-all duration-500 ease-luxe group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                className="mt-12 flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.7, ease: EASE_LUXE }}
              >
                <Button href={whatsappLink} target="_blank" rel="noopener noreferrer" icon={<FaWhatsapp />}>
                  Message us
                </Button>
                <Button href={contact.phoneHref} variant="outline" icon={<HiOutlinePhone />}>
                  {contact.phoneDisplay}
                </Button>
              </motion.div>

              <motion.p
                className="mt-10 max-w-sm text-sm font-light leading-relaxed text-ink-soft"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                {contact.address.full}
                <br />
                <span className="text-ink-faint">{contact.hours[0].days} · {contact.hours[0].time}</span>
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
