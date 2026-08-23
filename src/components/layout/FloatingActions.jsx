import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import { HiOutlinePhone } from 'react-icons/hi2'
import { contact, whatsappLink, brand } from '../../data/site'
import { EASE_LUXE } from '../ui/Reveal'

/**
 * Persistent contact affordances.
 * For a local store the two things a visitor most wants are "call" and
 * "WhatsApp" — so they follow the page rather than living only in the footer.
 * They appear after the hero so they never compete with the opening frame.
 */
export default function FloatingActions() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-5 z-[115] flex flex-col gap-3 sm:bottom-8 sm:right-8"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.6, ease: EASE_LUXE }}
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            aria-label={`Message ${brand.name} on WhatsApp`}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-warm shadow-float transition-transform duration-500 ease-luxe hover:scale-110"
          >
            {/* Slow ping — one ring, low opacity. A busy pulse reads as spam. */}
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/25 [animation-duration:3s]" aria-hidden="true" />
            <FaWhatsapp className="relative h-5 w-5" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-pill bg-ink px-4 py-2 text-[0.65rem] uppercase tracking-wider2 text-warm opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              WhatsApp us
            </span>
          </a>

          <a
            href={contact.phoneHref}
            data-cursor="link"
            aria-label={`Call ${brand.name} on ${contact.phoneDisplay}`}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-warm/90 text-ink shadow-lift backdrop-blur-md transition-transform duration-500 ease-luxe hover:scale-110"
          >
            <HiOutlinePhone className="h-5 w-5" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-pill bg-ink px-4 py-2 text-[0.65rem] uppercase tracking-wider2 text-warm opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {contact.phoneDisplay}
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
