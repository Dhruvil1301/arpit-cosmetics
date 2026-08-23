import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import CartoonStage from './CartoonStage'
import { prefersReducedMotion } from '../../lib/device'
import { cn } from '../../lib/utils'

/**
 * The counter, animated.
 * ----------------------
 * A looping vector short: the customer walks in, the shopkeeper shows her a
 * shade, she takes it, she pays, it is gift-wrapped for free, she leaves with
 * the bag. One GSAP timeline drives the whole thing.
 *
 * WHY SVG + GSAP RATHER THAN A VIDEO FILE
 *  · It is ~20 kB of markup instead of a 15 MB MP4, and it is resolution
 *    independent — crisp on a 5K display, cheap on a phone.
 *  · Every beat is seekable, so the chapter rail can jump between them.
 *  · The copy inside the speech bubbles is real text the store can edit.
 *
 * TIMELINE STRUCTURE
 * Beats are declared once in `BEATS` with a start time, and the timeline is
 * built with absolute positions ("beat.at") rather than relative chaining, so
 * re-timing a beat never cascades into the ones after it.
 */

const LOOP = 20 // seconds

const BEATS = [
  { at: 0.0, label: 'She walks in', line: 'The door swings, the lamps are already on.' },
  { at: 2.6, label: 'He shows the shade', line: 'Rosewood or brick — held up against the daylight lamp.' },
  { at: 5.6, label: 'She takes it', line: 'Swatched on the wrist. That one, then.' },
  { at: 8.4, label: 'She pays', line: 'Marked price, no haggling, same for everyone.' },
  { at: 11.0, label: 'Wrapped, free', line: 'Paper, ribbon, a handwritten tag — at no extra cost.' },
  { at: 14.4, label: 'The handover', line: 'Both hands, and a thank you that sounds like it is meant.' },
  { at: 17.0, label: 'She leaves happy', line: 'Back before the festival, when the front table changes.' },
]

export default function CartoonFilm({ onBeat }) {
  const rootRef = useRef(null)
  const tlRef = useRef(null)
  const [beat, setBeat] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [reduced] = useState(() => prefersReducedMotion())
  const barRef = useRef(null)

  /* --------------------------------------------------------------- Build */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)

      /*
        GEOMETRY NOTES — read before re-posing anything.

        Each arm is placed shoulder-first at (±27, −172) inside its figure and
        drawn downward from its own origin: upper arm 60, forearm 58. Both
        rotating groups therefore have their joint AT their own origin, and
        `svgOrigin: '0 0'` below is exact.

        That last part matters. These rotations used to be given a percentage
        transform origin ('50% 3%' of the bounding box). A bounding box that
        contains a rotating child changes shape as the child rotates, so the
        pivot was resolved from whatever pose happened to be on screen when
        the timeline was built — and the arms swung around a point above the
        figure's head, throwing hands off the top of the frame.

        SVG rotate() is clockwise and each arm hangs *down*, so a positive
        angle swings that hand to the LEFT (−x):

            customer (x 412) reaching right toward the counter → NEGATIVE
            shopkeeper (x 700) reaching left toward her        → POSITIVE

        Hand positions are computed from the angles, not eyeballed:
            hand = shoulder + 60·dir(s) + 58·dir(s + e)   (then ×1.2, +anchor)
            dir(t) = (−sin t, cos t)      // SVG y grows downward
        The counter's top edge is y = 408, so every hand that is meant to be
        seen has to finish above that. The old reach landed at y ≈ 389 — a
        hand's width above the lip, which is why the handover looked like two
        people standing still while a bag moved on its own.
      */
      const SCALE = 1.2

      const REST = { s: 0, e: 12 } // a real arm hangs slightly bent

      // Reaching across the counter. Hands finish at y = 360, a clear 48
      // above the counter top, and 25 apart — close enough to hand something
      // over, far enough that the two hands do not overlap into one blob.
      const REACH_C = { s: -61, e: -38 } // → (575, 360)
      const REACH_S = { s: 61, e: 38 } //  → (600, 360)
      // Holding something up beside her own face to look at it.
      const RAISE_C = { s: -96, e: -125 } // → (470, 275)
      // His wave: up and out on his own side, so it never crosses his body.
      const WAVE_S = { s: -103, e: -86 } // → (790, 250)
      // Wrapping: both hands down over the box on the counter.
      const WRAP_F = { s: 18, e: 79 }
      const WRAP_B = { s: 24, e: 62 }

      const HAND_C = { x: 575, y: 360 } // customer hand at REACH_C
      const HAND_S = { x: 600, y: 360 } // shopkeeper hand at REACH_S
      const RAISED_C = { x: 470, y: 275 } // customer hand at RAISE_C
      const HOME = 412 // right at the counter's near end, drawn in front of it

      const PROPS = [
        q('#prop-lipstick'), q('#prop-note'), q('#prop-gift'),
        q('#prop-bag'), q('#prop-bow'), q('#bubble'), q('#sparkles'),
      ]

      /* ---- Resting pose -------------------------------------------- */
      gsap.set(q('#cust-anchor'), { x: -170, y: 545, scale: SCALE, transformOrigin: '50% 100%' })
      gsap.set(q('#shop-anchor'), { x: 700, y: 545, scale: SCALE, transformOrigin: '50% 100%' })
      // Every joint is its group's own origin (see the geometry note), so the
      // pivot is stated outright instead of being derived from a bounding box
      // that changes as the limb moves.
      const LIMBS = [q('#cust-armFront'), q('#cust-armBack'), q('#shop-armFront'), q('#shop-armBack')]
      const JOINTS = [q('#cust-elbowFront'), q('#cust-elbowBack'), q('#shop-elbowFront'), q('#shop-elbowBack')]
      gsap.set([...LIMBS, ...JOINTS], { svgOrigin: '0 0' })
      gsap.set(LIMBS, { rotation: REST.s })
      gsap.set(JOINTS, { rotation: REST.e })
      gsap.set(q('#prop-lipstick'), { opacity: 0, x: HAND_S.x, y: HAND_S.y, scale: 1, rotation: 0 })
      gsap.set(q('#prop-note'), { opacity: 0, x: HAND_C.x, y: HAND_C.y, scale: 1, rotation: 0 })
      gsap.set(q('#prop-gift'), { opacity: 0, x: 640, y: 380, scale: 1 })
      gsap.set(q('#prop-bow'), { opacity: 0, scale: 0 })
      gsap.set(q('#prop-bag'), { opacity: 0, x: 650, y: 372, scale: 1 })
      gsap.set(q('#bubble'), { opacity: 0, x: 700, y: 250 })
      gsap.set(q('#sparkles'), { opacity: 0, x: RAISED_C.x, y: RAISED_C.y })

      if (reduced) {
        // Hold a readable "handover" frame rather than animating.
        gsap.set(q('#cust-anchor'), { x: HOME })
        gsap.set(q('#prop-bag'), { opacity: 1, x: HAND_C.x, y: 385 })
        gsap.set(q('#cust-armFront'), { rotation: REACH_C.s })
        gsap.set(q('#cust-elbowFront'), { rotation: REACH_C.e })
        gsap.set(q('#shop-armFront'), { rotation: REACH_S.s })
        gsap.set(q('#shop-elbowFront'), { rotation: REACH_S.e })
        return
      }

      /* ---- Ambient life: blinks and a breathing idle ---------------- */
      const blink = (sel, delay) =>
        gsap.to(q(sel), {
          scaleY: 0.08,
          duration: 0.08,
          repeat: -1,
          yoyo: true,
          repeatDelay: 3.4,
          delay,
          transformOrigin: '50% 50%',
        })
      blink('#cust-eyes', 1.2)
      blink('#shop-eyes', 2.7)

      gsap.to([q('#cust-torso'), q('#shop-torso')], {
        y: -4,
        duration: 1.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      /* ---- Speech bubble helper ------------------------------------- */
      const say = (tl, at, text, x, y, hold = 2.2) => {
        tl.call(() => {
          const node = root.querySelector('#bubble-text')
          if (node) node.textContent = text
        }, null, at)
        tl.fromTo(
          q('#bubble'),
          { opacity: 0, scale: 0.7, x, y: y + 16 },
          { opacity: 1, scale: 1, x, y, duration: 0.45, ease: 'back.out(2)', transformOrigin: '50% 100%' },
          at,
        )
        tl.to(q('#bubble'), { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.in' }, at + hold)
      }

      /* ---- Walk cycle helper ---------------------------------------- */
      const walk = (tl, at, from, to, duration) => {
        const steps = Math.max(1, Math.round(duration / 0.34) - 1)
        tl.fromTo(q('#cust-anchor'), { x: from }, { x: to, duration, ease: 'none' }, at)
        tl.to(q('#cust-anchor'), { y: 536, duration: 0.34, repeat: steps, yoyo: true, ease: 'sine.inOut' }, at)
        tl.to(q('#cust-armFront'), { rotation: 26, duration: 0.34, repeat: steps, yoyo: true, ease: 'sine.inOut' }, at)
        tl.to(q('#cust-armBack'), { rotation: -26, duration: 0.34, repeat: steps, yoyo: true, ease: 'sine.inOut' }, at)
        // Forearms trail the upper arms — a straight swinging arm looks robotic.
        tl.to(q('#cust-elbowFront'), { rotation: 34, duration: 0.34, repeat: steps, yoyo: true, ease: 'sine.inOut' }, at + 0.09)
        tl.to(q('#cust-elbowBack'), { rotation: 26, duration: 0.34, repeat: steps, yoyo: true, ease: 'sine.inOut' }, at + 0.09)
        tl.set([q('#cust-armFront'), q('#cust-armBack')], { rotation: REST.s }, at + duration)
        tl.set([q('#cust-elbowFront'), q('#cust-elbowBack')], { rotation: REST.e }, at + duration)
        tl.set(q('#cust-anchor'), { y: 545 }, at + duration)
      }

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })
      tlRef.current = tl

      /* Explicit clean slate at t=0. Scrubbing backwards through zero-duration
         sets is not reliable enough to leave the loop's opening frame to
         chance — a stray gift box from the previous pass is very visible. */
      tl.set(PROPS, { opacity: 0 }, 0)
      tl.set(q('#prop-bow'), { scale: 0 }, 0)
      tl.set(q('#cust-mouth'), { attr: { d: 'M-8 -232 Q0 -224 8 -232' } }, 0)
      tl.set(q('#cust-head'), { rotation: 0 }, 0)
      tl.set([q('#shop-armFront'), q('#shop-armBack')], { rotation: REST.s }, 0)
      tl.set([q('#shop-elbowFront'), q('#shop-elbowBack')], { rotation: REST.e }, 0)
      tl.set(q('#shop-head'), { rotation: 0 }, 0)

      /* ============================ 1 — arrival =================== */
      walk(tl, 0, -170, HOME, 2.2)
      tl.to(q('#shop-armFront'), { rotation: WAVE_S.s, duration: 0.5 }, 0.9)
      tl.to(q('#shop-elbowFront'), { rotation: WAVE_S.e, duration: 0.5 }, 0.9)
      tl.to(q('#shop-armFront'), { rotation: WAVE_S.s + 14, duration: 0.28, repeat: 3, yoyo: true }, 1.4)
      tl.to(q('#shop-armFront'), { rotation: REST.s, duration: 0.5 }, 2.7)
      tl.to(q('#shop-elbowFront'), { rotation: REST.e, duration: 0.5 }, 2.7)
      say(tl, 1.0, 'Welcome in!', 900, 198, 1.5)

      /* ======================= 2 — showing the shade ============== */
      tl.to(q('#cust-head'), { rotation: 9, duration: 0.5, transformOrigin: '50% 100%' }, 2.8)
      tl.to(q('#shop-armFront'), { rotation: REACH_S.s, duration: 0.6 }, 2.9)
      tl.to(q('#shop-elbowFront'), { rotation: REACH_S.e, duration: 0.6 }, 2.9)
      tl.set(q('#prop-lipstick'), { opacity: 1, x: HAND_S.x, y: HAND_S.y }, 3.35)
      tl.fromTo(q('#prop-lipstick'), { scale: 0.4 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, 3.35)
      tl.to(q('#prop-lipstick'), { y: HAND_S.y - 34, rotation: -12, duration: 0.7 }, 3.8)
      say(tl, 3.6, 'This shade suits you.', 900, 198, 1.9)
      tl.to(q('#cust-armFront'), { rotation: REACH_C.s, duration: 0.6 }, 4.7)
      tl.to(q('#cust-elbowFront'), { rotation: REACH_C.e, duration: 0.6 }, 4.7)

      /* ============================ 3 — she takes it ============== */
      tl.to(q('#prop-lipstick'), { x: HAND_C.x, y: HAND_C.y, rotation: 6, duration: 0.85, ease: 'power2.out' }, 5.7)
      tl.to(q('#shop-armFront'), { rotation: REST.s, duration: 0.6 }, 6.2)
      tl.to(q('#shop-elbowFront'), { rotation: REST.e, duration: 0.6 }, 6.2)
      tl.to(q('#cust-armFront'), { rotation: RAISE_C.s, duration: 0.6 }, 6.6)
      tl.to(q('#cust-elbowFront'), { rotation: RAISE_C.e, duration: 0.6 }, 6.6)
      tl.to(q('#prop-lipstick'), { x: RAISED_C.x, y: RAISED_C.y, rotation: -8, duration: 0.6 }, 6.6)
      tl.to(q('#cust-head'), { rotation: -6, duration: 0.4 }, 6.9)
      tl.to(q('#cust-mouth'), { attr: { d: 'M-11 -234 Q0 -219 11 -234' }, duration: 0.35 }, 7.0)
      tl.fromTo(
        q('#sparkles'),
        { opacity: 0, scale: 0.5, x: RAISED_C.x, y: RAISED_C.y },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' },
        7.0,
      )
      tl.to(q('#sparkles'), { opacity: 0, scale: 1.3, duration: 0.6 }, 7.8)
      say(tl, 7.0, 'Perfect — I will take it.', 322, 196, 1.4)

      /* ============================ 4 — payment =================== */
      tl.to(q('#prop-lipstick'), { x: 592, y: 386, rotation: 0, duration: 0.7 }, 8.5)
      tl.to(q('#prop-lipstick'), { opacity: 0, duration: 0.3 }, 9.2)
      tl.to(q('#cust-armFront'), { rotation: REACH_C.s, duration: 0.5 }, 8.6)
      tl.to(q('#cust-elbowFront'), { rotation: REACH_C.e, duration: 0.5 }, 8.6)
      tl.set(q('#prop-note'), { opacity: 1, x: HAND_C.x, y: HAND_C.y - 6 }, 8.8)
      tl.fromTo(q('#prop-note'), { scale: 0.5, rotation: -18 }, { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2)' }, 8.8)
      tl.to(q('#shop-armFront'), { rotation: REACH_S.s, duration: 0.5 }, 9.0)
      tl.to(q('#shop-elbowFront'), { rotation: REACH_S.e, duration: 0.5 }, 9.0)
      tl.to(q('#prop-note'), { x: HAND_S.x, y: HAND_S.y, rotation: 10, duration: 0.9, ease: 'power2.inOut' }, 9.3)
      tl.to(q('#prop-note'), { opacity: 0, duration: 0.25 }, 10.2)
      tl.to(q('#cust-armFront'), { rotation: REST.s, duration: 0.5 }, 10.1)
      tl.to(q('#cust-elbowFront'), { rotation: REST.e, duration: 0.5 }, 10.1)
      say(tl, 9.0, '₹249 — the marked price.', 900, 198, 1.6)

      /* ============================ 5 — wrapping ================== */
      tl.set(q('#prop-gift'), { opacity: 1, x: 640, y: 380, scale: 0.6 }, 11.0)
      tl.to(q('#prop-gift'), { scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, 11.0)
      tl.to(q('#shop-armFront'), { rotation: WRAP_F.s, duration: 0.4 }, 11.1)
      tl.to(q('#shop-elbowFront'), { rotation: WRAP_F.e, duration: 0.4 }, 11.1)
      tl.to(q('#shop-armBack'), { rotation: WRAP_B.s, duration: 0.4 }, 11.1)
      tl.to(q('#shop-elbowBack'), { rotation: WRAP_B.e, duration: 0.4 }, 11.1)
      // A small oscillation on both hands reads as folding, taping, tying.
      tl.to(q('#shop-armFront'), { rotation: WRAP_F.s + 7, duration: 0.3, repeat: 5, yoyo: true }, 11.5)
      tl.to(q('#shop-armBack'), { rotation: WRAP_B.s - 7, duration: 0.3, repeat: 5, yoyo: true }, 11.6)
      tl.to(q('#shop-head'), { rotation: 8, duration: 0.5, transformOrigin: '50% 100%' }, 11.2)
      tl.fromTo(
        q('#prop-bow'),
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '50% 100%' },
        13.1,
      )
      tl.to([q('#shop-armFront'), q('#shop-armBack')], { rotation: REST.s, duration: 0.5 }, 13.4)
      tl.to([q('#shop-elbowFront'), q('#shop-elbowBack')], { rotation: REST.e, duration: 0.5 }, 13.4)
      tl.to(q('#shop-head'), { rotation: 0, duration: 0.5 }, 13.4)
      say(tl, 11.4, 'Wrapping is always free.', 900, 198, 2.1)

      /* ============================ 6 — handover ================== */
      tl.to(q('#prop-gift'), { opacity: 0, duration: 0.25 }, 14.4)
      tl.set(q('#prop-bag'), { opacity: 1, x: 650, y: 352 }, 14.5)
      tl.fromTo(q('#prop-bag'), { scale: 0.6 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, 14.5)
      tl.to(q('#shop-armFront'), { rotation: REACH_S.s, duration: 0.6 }, 14.5)
      tl.to(q('#shop-elbowFront'), { rotation: REACH_S.e, duration: 0.6 }, 14.5)
      tl.to(q('#cust-armFront'), { rotation: REACH_C.s, duration: 0.6 }, 14.8)
      tl.to(q('#cust-elbowFront'), { rotation: REACH_C.e, duration: 0.6 }, 14.8)
      tl.to(q('#prop-bag'), { x: HAND_C.x, y: 392, duration: 1.0, ease: 'power2.inOut' }, 15.1)
      tl.to(q('#shop-armFront'), { rotation: REST.s, duration: 0.6 }, 16.0)
      tl.to(q('#shop-elbowFront'), { rotation: REST.e, duration: 0.6 }, 16.0)
      tl.to(q('#cust-armFront'), { rotation: -12, duration: 0.6 }, 16.1)
      tl.to(q('#cust-elbowFront'), { rotation: 26, duration: 0.6 }, 16.1)
      // Her carrying hand finishes at (442, 473); the bag hangs from it.
      tl.to(q('#prop-bag'), { x: 442, y: 486, duration: 0.6 }, 16.1)
      tl.to(q('#cust-mouth'), { attr: { d: 'M-12 -234 Q0 -217 12 -234' }, duration: 0.35 }, 15.6)
      say(tl, 15.0, 'Thank you — see you at Diwali!', 900, 198, 1.9)

      /* ============================ 7 — departure ================= */
      tl.to(q('#shop-armFront'), { rotation: WAVE_S.s, duration: 0.5 }, 17.1)
      tl.to(q('#shop-elbowFront'), { rotation: WAVE_S.e, duration: 0.5 }, 17.1)
      tl.to(q('#shop-armFront'), { rotation: WAVE_S.s + 14, duration: 0.28, repeat: 3, yoyo: true }, 17.5)
      tl.to(q('#cust-head'), { rotation: -12, duration: 0.5 }, 17.2)
      // The bag rides along with her — matched tweens rather than reparenting.
      tl.to(q('#cust-anchor'), { x: 1400, duration: 2.4, ease: 'power1.in' }, 17.5)
      tl.to(q('#prop-bag'), { x: 1460, duration: 2.4, ease: 'power1.in' }, 17.5)
      tl.to(q('#cust-anchor'), { y: 536, duration: 0.32, repeat: 6, yoyo: true, ease: 'sine.inOut' }, 17.5)
      tl.to(q('#shop-armFront'), { rotation: REST.s, duration: 0.5 }, 18.9)
      tl.to(q('#shop-elbowFront'), { rotation: REST.e, duration: 0.5 }, 18.9)

      /* ---- Reset for the loop --------------------------------------- */
      tl.set(PROPS, { opacity: 0 }, LOOP - 0.4)
      tl.set(q('#cust-anchor'), { x: -170, y: 545 }, LOOP - 0.35)
      tl.set(q('#cust-armFront'), { rotation: REST.s }, LOOP - 0.35)
      tl.set(q('#cust-elbowFront'), { rotation: REST.e }, LOOP - 0.35)
      tl.to({}, { duration: 0.3 }, LOOP - 0.3) // pad the loop to exactly LOOP
    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  /* -------------------------------------------------------- Beat tracking */
  useEffect(() => {
    if (reduced) return
    let raf = 0
    let lastBeat = -1

    const tick = () => {
      const tl = tlRef.current
      if (tl) {
        const t = tl.time() % LOOP
        let idx = 0
        for (let i = 0; i < BEATS.length; i++) if (t >= BEATS[i].at) idx = i
        if (idx !== lastBeat) {
          lastBeat = idx
          setBeat(idx)
          onBeat?.(idx)
        }
        if (barRef.current) barRef.current.style.transform = `scaleX(${t / LOOP})`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, onBeat])

  /* ------------------------------------------------------------- Controls */
  const seek = useCallback((i) => {
    tlRef.current?.time(BEATS[i].at)
    setBeat(i)
  }, [])

  const toggle = useCallback(() => {
    const tl = tlRef.current
    if (!tl) return
    if (tl.paused()) {
      tl.play()
      setPlaying(true)
    } else {
      tl.pause()
      setPlaying(false)
    }
  }, [])

  /* Pause whenever the film is off screen — it is decorative, not essential. */
  useEffect(() => {
    const el = rootRef.current
    if (!el || reduced) return
    const io = new IntersectionObserver(
      ([e]) => {
        const tl = tlRef.current
        if (!tl) return
        if (e.isIntersecting) {
          if (playing) tl.play()
        } else {
          tl.pause()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [playing, reduced])

  /* ------------------------------------------------------------- Render */
  const current = BEATS[beat]

  return (
    <div className="relative overflow-hidden rounded-luxe border border-beige bg-gradient-to-br from-cream via-warm to-peach/40 shadow-float">
      {/* Stage */}
      <div ref={rootRef} className="relative aspect-[16/9] w-full overflow-hidden">
        <CartoonStage />

        {/* Controls */}
        {!reduced && (
          <button
            type="button"
            onClick={toggle}
            data-cursor="link"
            aria-label={playing ? 'Pause the animation' : 'Play the animation'}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-warm/85 text-ink shadow-soft backdrop-blur-md transition-transform duration-500 ease-luxe hover:scale-110 sm:right-6 sm:top-6"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1.2" />
                <rect x="14" y="5" width="4" height="14" rx="1.2" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Caption + chapter rail */}
      <div className="border-t border-beige/80 bg-warm/80 px-5 py-5 backdrop-blur-sm sm:px-8">
        {!reduced && (
          <div className="mb-4 h-px w-full overflow-hidden bg-ink/10">
            <div
              ref={barRef}
              className="h-full w-full origin-left bg-gradient-to-r from-coral via-gold to-gold-deep"
              style={{ transform: 'scaleX(0)' }}
              aria-hidden="true"
            />
          </div>
        )}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div aria-live="polite" className="min-h-[3.2rem]">
            <span className="eyebrow text-coral-deep">
              {String(beat + 1).padStart(2, '0')} · {current.label}
            </span>
            <p className="mt-1.5 font-serif text-lg italic leading-snug text-ink">{current.line}</p>
          </div>

          <ol className="no-scrollbar flex shrink-0 gap-1.5 overflow-x-auto" aria-label="Animation beats">
            {BEATS.map((b, i) => (
              <li key={b.label}>
                <button
                  type="button"
                  onClick={() => seek(i)}
                  disabled={reduced}
                  data-cursor="link"
                  aria-current={i === beat ? 'true' : undefined}
                  className={cn(
                    'whitespace-nowrap rounded-pill px-3.5 py-2 text-[0.62rem] uppercase tracking-wider2 transition-all duration-500 ease-luxe disabled:opacity-50',
                    i === beat
                      ? 'bg-ink text-warm shadow-soft'
                      : 'bg-white/70 text-ink-soft hover:bg-white hover:text-ink',
                  )}
                >
                  {b.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
