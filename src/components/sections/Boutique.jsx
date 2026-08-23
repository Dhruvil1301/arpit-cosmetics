import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiPlay, HiPause } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'
import Reveal, { EASE_LUXE } from '../ui/Reveal'
import LuxeIcon from '../ui/LuxeIcon'
import { boutiqueChapters } from '../../data/site'
import { PANELS, PANEL_BOX } from '../illustrations/ShopFilm'
import { cn } from '../../lib/utils'
import { useReducedMotion as usePrefersReduced } from '../../hooks/useMediaQuery'

/**
 * A visit to the shop, drawn.
 * ---------------------------
 * Eight panels on a loop: she comes in, a shade is tested on her wrist, a
 * scent is tried, earrings go up to the mirror, bangles are sized by hand,
 * the gift is wrapped, she pays, she leaves with the bag.
 *
 * Drawn rather than filmed, for the same reason the rest of the page is: a
 * drawing of a shop assistant helping someone says "come in" in a way a
 * photograph of a stranger never manages, and it weighs a few kilobytes.
 *
 * State design. The clock is a ref, not state — it ticks every frame and a
 * state write per frame would re-render the whole section sixty times a
 * second. React only hears about it when the beat actually changes:
 *   · `progressRef` — the clock. Written by the rAF loop, read by everything.
 *   · `chapterIndex` — real state, one write per beat. Drives panel, caption
 *     and rail.
 *   · the progress bar — written straight to `style.transform`, never React.
 */

/** Seconds per full loop. Roughly six per panel: read the caption, move on. */
const LOOP_DURATION = 48

/** Resolves loop progress (0 → 1) into a chapter index. */
function chapterAt(progress, chapters) {
  const p = Math.min(Math.max(progress, 0), 0.9999)
  let index = 0
  for (let i = 0; i < chapters.length; i++) if (p >= chapters[i].at) index = i
  return index
}

const CHAPTER_ICONS = {
  arrival: 'store',
  cosmetics: 'lipstick',
  fragrance: 'perfume',
  mirror: 'mirror',
  bangles: 'bangles',
  gifting: 'ribbon',
  counter: 'gift',
  departure: 'sparkle',
}

export default function Boutique() {
  const progressRef = useRef(0)
  const barRef = useRef(null)
  const [chapterIndex, setChapterIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const prefersReduced = usePrefersReduced()

  const chapters = boutiqueChapters
  const chapter = chapters[chapterIndex]
  const Panel = useMemo(() => PANELS[chapter.id] || PANELS.arrival, [chapter.id])

  /* --- One rAF drives the clock, the rail and the bar --------------------- */
  useEffect(() => {
    // Reduced motion: hold whichever panel the visitor chose. No autoplay,
    // no bar animation, nothing moving on its own.
    if (prefersReduced) return undefined

    let raf = 0
    let last = 0
    let lastIndex = -1

    const tick = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.25) : 0
      last = now

      if (playing) {
        progressRef.current = (progressRef.current + dt / LOOP_DURATION) % 1
      }

      const index = chapterAt(progressRef.current, chapters)
      if (index !== lastIndex) {
        lastIndex = index
        setChapterIndex(index)
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${progressRef.current})`

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, prefersReduced, chapters])

  const seek = useCallback(
    (i) => {
      progressRef.current = chapters[i].at + 0.0005
      setChapterIndex(i)
      if (barRef.current) barRef.current.style.transform = `scaleX(${progressRef.current})`
    },
    [chapters],
  )

  const togglePlay = useCallback(() => setPlaying((v) => !v), [])

  return (
    <section id="boutique" className="section relative" aria-labelledby="boutique-heading">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Inside the shop"
            index="03"
            title={'An afternoon,\nin eight scenes'}
            accentWords={['scenes']}
            lede="A visit drawn out from start to finish — the door, the colour wall, the fragrance cabinet, the mirror, the bangle stand, the wrapping counter, and the way back out with the bag."
            className="max-w-3xl"
          />
          <span id="boutique-heading" className="sr-only">
            Inside the shop — a visit in eight scenes
          </span>

          <Reveal delay={0.2} className="shrink-0">
            <div className="flex items-center gap-3 text-ink-soft">
              <span className="h-5 w-5 text-gold" aria-hidden="true">
                <LuxeIcon name="store" strokeWidth={1.8} />
              </span>
              <span className="text-[0.68rem] uppercase tracking-wider2">
                {chapters.length} scenes · plays on a loop
              </span>
            </div>
          </Reveal>
        </div>

        {/* ============================ The panels ========================== */}
        <Reveal delay={0.15} y={44} className="mt-16">
          <div className="relative overflow-hidden rounded-luxe border border-beige bg-cream shadow-float">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/8]">
              {/* One drawing at a time, cross-fading. Only two are ever
                  mounted, so the DOM stays small however long the loop runs. */}
              <AnimatePresence initial={false}>
                <motion.svg
                  key={chapter.id}
                  viewBox={`0 0 ${PANEL_BOX.width} ${PANEL_BOX.height}`}
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                  role="img"
                  aria-label={`${chapter.title}. ${chapter.caption}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.8, ease: EASE_LUXE }}
                >
                  <Panel />
                </motion.svg>
              </AnimatePresence>

              {/* Play / pause. Hidden under reduced motion, where nothing
                  advances on its own and the control would be a lie. */}
              {!prefersReduced && (
                <div className="absolute right-5 top-5 z-10 sm:right-8 sm:top-8">
                  <button
                    type="button"
                    onClick={togglePlay}
                    data-cursor="link"
                    aria-label={playing ? 'Pause the scenes' : 'Play the scenes'}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-warm/90 text-ink shadow-soft transition-transform duration-500 ease-luxe hover:scale-110"
                  >
                    {playing ? <HiPause className="h-4 w-4" /> : <HiPlay className="ml-0.5 h-4 w-4" />}
                  </button>
                </div>
              )}

              {/* ------------------- Chapter rail -------------------- */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-warm/90 via-warm/45 to-transparent px-5 pb-5 pt-10 sm:px-8 sm:pb-7">
                <div className="h-px w-full overflow-hidden bg-ink/10">
                  <div
                    ref={barRef}
                    className="h-full w-full origin-left bg-gradient-to-r from-champagne via-gold to-gold-deep"
                    style={{ transform: 'scaleX(0)' }}
                    aria-hidden="true"
                  />
                </div>

                <ol className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto" aria-label="Scenes">
                  {chapters.map((c, i) => (
                    <li key={c.id} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => seek(i)}
                        data-cursor="link"
                        aria-current={i === chapterIndex ? 'true' : undefined}
                        className={cn(
                          'group rounded-pill px-3.5 py-2 text-[0.62rem] uppercase tracking-wider2 transition-all duration-500 ease-luxe sm:px-4',
                          i === chapterIndex
                            ? 'bg-ink text-warm shadow-soft'
                            : 'bg-white/70 text-ink-soft hover:bg-white hover:text-ink',
                        )}
                      >
                        <span className="mr-1.5 font-serif italic opacity-60">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {c.label}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

              {/* Caption. Below the drawing on a phone, over it from `sm` up
                  where there is room for both. */}
              <div className="caption-plate pointer-events-none z-10 bg-warm/85 p-5 sm:absolute sm:left-8 sm:top-8 sm:max-w-md sm:rounded-2xl sm:bg-warm/72">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: prefersReduced ? 0 : 0.6, ease: EASE_LUXE }}
                  >
                    <span className="eyebrow text-gold-deep">
                      {String(chapterIndex + 1).padStart(2, '0')} · {chapter.label}
                    </span>
                    <h3 className="mt-3 font-display text-[clamp(1.35rem,2.4vw,2.15rem)] leading-tight text-ink">
                      {chapter.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-ink-soft">
                      {chapter.caption}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
          </div>
        </Reveal>

        {/* The same eight beats as a storyboard — readable at a glance, and
            the whole story for anyone who would rather not sit through it. */}
        <Reveal delay={0.12} className="mt-10">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => seek(i)}
                  data-cursor="link"
                  aria-current={i === chapterIndex ? 'true' : undefined}
                  className={cn(
                    'h-full w-full rounded-2xl border p-5 text-left transition-all duration-500 ease-luxe',
                    i === chapterIndex
                      ? 'border-gold/55 bg-white shadow-soft'
                      : 'border-beige bg-white/60 hover:border-gold/40 hover:bg-white',
                  )}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-serif text-xs italic text-gold-deep/80">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-7 w-7 text-gold-deep">
                      <LuxeIcon name={CHAPTER_ICONS[c.id] || 'sparkle'} strokeWidth={1.8} />
                    </span>
                  </span>
                  <span className="mt-4 block font-display text-base leading-snug text-ink">{c.title}</span>
                  <span className="mt-2 block text-xs font-light leading-relaxed text-ink-soft">{c.caption}</span>
                </button>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <p className="max-w-3xl text-xs font-light leading-relaxed text-ink-faint">
            A quiet tour of the shop floor, playing on a loop. Tap any scene to jump to it.
            {prefersReduced && ' Your device is set to reduce motion, so the scenes hold until you choose one.'}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
