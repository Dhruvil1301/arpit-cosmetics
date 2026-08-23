import { useMemo } from 'react'
import { I } from '../illustrations/palette'
import { useReducedMotion } from '../../hooks/useMediaQuery'

/**
 * The background.
 * ---------------
 * Drawn, like everything else: a handful of large soft shapes in the house
 * colours, a scatter of dots, and grain over the top. It ships in the entry
 * bundle, paints on the first frame, and costs nothing to run — there is no
 * canvas, no second render loop and nothing to wait for.
 *
 * It replaced a GPU-drawn field. That version looked good in isolation but it
 * was a different medium from the rest of the page (soft, lit, volumetric
 * against flat drawn colour) and it dragged a rendering engine onto a page
 * whose first screen is a headline.
 *
 * Deliberately quiet: 5–8% opacity. It should never compete with the artwork
 * inside the sections, only stop the ground reading as flat paper.
 */

/* Three big shapes, placed by hand. Percentages so they scale with the
   viewport instead of pinning to one screen size. */
const SHAPES = [
  { d: 'M120 40C210 8 330 30 366 116s-4 194-96 228-224 26-268-58S30 72 120 40Z', x: '-14%', y: '-8%', size: '62vmax', fill: I.peach, o: 0.5 },
  { d: 'M100 70C170 4 316 22 356 96s6 196-92 228-214 6-252-78S30 136 100 70Z', x: '58%', y: '18%', size: '54vmax', fill: I.blush, o: 0.46 },
  { d: 'M140 30C214 30 328 62 348 144s-44 186-136 206S54 306 44 214 66 30 140 30Z', x: '18%', y: '62%', size: '58vmax', fill: I.sand, o: 0.42 },
]

export default function Ambience() {
  const reduced = useReducedMotion()

  /* A fixed scatter — no randomness, so it is identical on every render and
     between server and client. */
  const dots = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: `${(i * 37) % 97}%`,
        top: `${(i * 53) % 94}%`,
        size: 4 + (i % 3) * 3,
        fill: [I.coral, I.gold, I.coralSoft, I.ochre][i % 4],
      })),
    [],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-warm">
      {SHAPES.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 400 400"
          className={reduced ? 'absolute' : 'absolute animate-breathe'}
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            opacity: s.o,
            animationDelay: `${i * 3}s`,
            filter: 'blur(38px)',
          }}
        >
          <path d={s.d} fill={s.fill} />
        </svg>
      ))}

      {/* Confetti dots — the same motif the drawings use in their corners. */}
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size, background: d.fill, opacity: 0.14 }}
        />
      ))}

      {/* Grain last — it is what stops very wide, very low-contrast washes
          banding on 8-bit displays. */}
      <div className="grain absolute inset-0" />
    </div>
  )
}
