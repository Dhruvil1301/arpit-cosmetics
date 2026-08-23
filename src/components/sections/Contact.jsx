import { useState, useRef, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineEnvelope,
  HiArrowLongRight,
} from 'react-icons/hi2'
import { FaWhatsapp } from 'react-icons/fa6'

import { contact, enquiryTopics, brand, whatsappLink } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import GoldRule from '../ui/GoldRule'
import { cn } from '../../lib/utils'
import { EASE_LUXE } from '../ui/Reveal'
import SentMark from '../illustrations/SentMark'

/* ========================================================================== */
/* Floating-label field                                                       */
/* ========================================================================== */

/**
 * The label starts inside the field and rises to a caption when the field is
 * focused or filled. `peer` classes do the lifting so there is no state for
 * the "has value" case beyond what the input already knows.
 */
function Field({ label, name, type = 'text', required, as = 'input', options, rows = 4, error, ...rest }) {
  const id = useId()
  const describedBy = error ? `${id}-error` : undefined

  const shared = cn(
    'peer w-full border-0 border-b border-beige bg-transparent px-0 pb-3 pt-7 text-base text-ink outline-none transition-colors duration-500',
    'placeholder:text-transparent focus:border-gold',
    error && 'border-coral-deep',
  )

  return (
    <div className="relative">
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder={label}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={cn(shared, 'resize-none')}
          {...rest}
        />
      ) : as === 'select' ? (
        <select
          id={id}
          name={name}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={cn(shared, 'cursor-pointer appearance-none pr-8')}
          defaultValue=""
          {...rest}
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={label}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={shared}
          {...rest}
        />
      )}

      {/* The label rests in its *raised* state and drops back down only while
          the field is genuinely empty and unfocused. Writing it this way means
          the whole effect uses stock Tailwind variants — `peer-placeholder-shown`
          for inputs, `peer-invalid` for the select (whose placeholder option has
          an empty value on a required field, so empty === invalid). */}
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute left-0 top-0 origin-left text-[0.65rem] font-medium uppercase tracking-wider2 text-gold-deep transition-all duration-500 ease-luxe',
          as === 'select'
            ? 'peer-invalid:top-7 peer-invalid:text-base peer-invalid:font-light peer-invalid:normal-case peer-invalid:tracking-normal peer-invalid:text-ink-soft'
            : 'peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:font-light peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-soft',
          'peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:font-medium peer-focus:uppercase peer-focus:tracking-wider2 peer-focus:text-gold-deep',
        )}
      >
        {label}
        {required && <span className="ml-1 text-coral-deep">*</span>}
      </label>

      {/* Focus underline sweeps in from the left. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-champagne transition-transform duration-700 ease-luxe peer-focus:scale-x-100"
      />

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-coral-deep">
          {error}
        </p>
      )}
    </div>
  )
}

/* ========================================================================== */
/* Contact                                                                    */
/* ========================================================================== */

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  // Both point at the pin from the shop's own Google listing. The embed is
  // queried by name *and* coordinates so it lands on the shop rather than on
  // the middle of the town, and the directions link uses the coordinates so it
  // cannot resolve to a different business with a similar name.
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${contact.mapsQuery} @${contact.geo.lat},${contact.geo.lng}`,
  )}&z=17&output=embed`
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${contact.geo.lat},${contact.geo.lng}`

  /**
   * There is no backend in this project, so the form validates properly and
   * then hands the enquiry to WhatsApp — which is how a store like this
   * actually receives messages. Swap `deliver()` for a fetch to your endpoint
   * (or Formspree / Netlify Forms) and nothing else has to change.
   */
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const values = Object.fromEntries(data.entries())

    const next = {}
    if (!values.name?.trim()) next.name = 'Please tell us your name.'
    if (!/^[0-9+\-\s()]{8,}$/.test(values.phone || '')) next.phone = 'Please enter a reachable phone number.'
    if (!values.topic) next.topic = 'Please choose what this is about.'
    if (!values.message?.trim() || values.message.trim().length < 8)
      next.message = 'A sentence or two is plenty.'

    setErrors(next)
    if (Object.keys(next).length) {
      // Move focus to the first problem so keyboard and screen-reader users
      // are not left hunting for it.
      const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    setStatus('sending')

    const text =
      `Hello ${brand.name}!\n\n` +
      `Name: ${values.name}\n` +
      `Phone: ${values.phone}\n` +
      `About: ${values.topic}\n\n` +
      `${values.message}`

    window.setTimeout(() => {
      setStatus('sent')
      window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    }, 700)
  }

  return (
    <section id="contact" className="section tint tint-peach relative" aria-labelledby="contact-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="Visit or write to us"
          index="11"
          title={'Munshiganj, Amethi —\nand open late in\nfestival season'}
          accentWords={['Amethi']}
          lede="Call before you travel if you are coming for something specific; we will keep it aside. Otherwise, just come in."
          className="max-w-3xl"
        />
        <span id="contact-heading" className="sr-only">
          Contact and visit
        </span>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* --------------------------- Details --------------------------- */}
          <div>
            <Reveal>
              <ul className="space-y-9">
                <li className="flex gap-5">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold-deep">
                    <HiOutlineMapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="eyebrow">The store</h3>
                    <address className="mt-2 not-italic text-body-lg font-light leading-relaxed text-ink">
                      {contact.address.line1}, {contact.address.line2}
                      <br />
                      {contact.address.region} {contact.address.postalCode}
                      <br />
                      {contact.address.country}
                    </address>
                    <a
                      href={directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="link-wipe mt-3 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-wider2 text-gold-deep"
                    >
                      Get directions <HiArrowLongRight className="h-4 w-4" />
                    </a>
                  </div>
                </li>

                <li className="flex gap-5">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold-deep">
                    <HiOutlineClock className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="eyebrow">Business hours</h3>
                    <dl className="mt-2 space-y-1.5">
                      {contact.hours.map((h) => (
                        <div key={h.days} className="flex flex-wrap gap-x-3 text-base font-light">
                          <dt className="text-ink">{h.days}</dt>
                          <dd className="text-ink-soft">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>

                <li className="flex gap-5">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold-deep">
                    <HiOutlinePhone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="eyebrow">Talk to us</h3>
                    <div className="mt-2 space-y-1.5">
                      <a
                        href={contact.phoneHref}
                        data-cursor="link"
                        className="link-wipe block text-base font-light text-ink"
                      >
                        {contact.phoneDisplay}
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        data-cursor="link"
                        className="link-wipe inline-flex items-center gap-2 text-base font-light text-ink-soft"
                      >
                        <HiOutlineEnvelope className="h-4 w-4" aria-hidden="true" />
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-4">
              <Button href={whatsappLink} target="_blank" rel="noopener noreferrer" icon={<FaWhatsapp />}>
                WhatsApp us
              </Button>
              <Button href={contact.phoneHref} variant="outline" icon={<HiOutlinePhone />}>
                Call the store
              </Button>
            </Reveal>

            <GoldRule className="my-12" />

            {/* ----------------------------- Map ---------------------------- */}
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-luxe border border-beige shadow-soft">
                <iframe
                  title={`Map showing ${brand.name} in ${contact.address.line1}, ${contact.address.line2}`}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[22rem] w-full grayscale-[0.25] transition-[filter] duration-700 hover:grayscale-0"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          {/* ----------------------------- Form ---------------------------- */}
          <Reveal delay={0.1}>
            <div className="glass gold-frame relative rounded-luxe p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE_LUXE }}
                    role="status"
                    aria-live="polite"
                  >
                    <div className="h-28 w-28">
                      <SentMark />
                    </div>
                    <h3 className="mt-6 font-display text-3xl text-ink">Message ready</h3>
                    <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-ink-soft">
                      We have opened WhatsApp with your enquiry filled in — press send there and we will
                      reply during store hours. If the window did not open, use the button below.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                      <Button href={whatsappLink} target="_blank" rel="noopener noreferrer" size="sm" icon={<FaWhatsapp />}>
                        Open WhatsApp
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setStatus('idle')}>
                        Write another
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div>
                      <h3 className="font-display text-3xl leading-tight text-ink">Send an enquiry</h3>
                      <p className="mt-3 text-sm font-light text-ink-soft">
                        Tell us what you are looking for and we will confirm availability before you make the
                        trip.
                      </p>
                    </div>

                    <Field label="Your name" name="name" autoComplete="name" required error={errors.name} />
                    <Field
                      label="Phone number"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      error={errors.phone}
                    />
                    <Field label="What is this about?" name="topic" as="select" options={enquiryTopics} required error={errors.topic} />
                    <Field
                      label="Your message"
                      name="message"
                      as="textarea"
                      rows={4}
                      required
                      error={errors.message}
                    />

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <Button type="submit" disabled={status === 'sending'} icon={<HiArrowLongRight className="h-4 w-4" />}>
                        {status === 'sending' ? 'Preparing…' : 'Send enquiry'}
                      </Button>
                      <p className="max-w-[16rem] text-[0.65rem] leading-relaxed text-ink-faint">
                        Your details go straight to the store over WhatsApp. Nothing is stored on this site.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
