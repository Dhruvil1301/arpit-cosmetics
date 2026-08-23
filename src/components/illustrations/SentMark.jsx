import { I } from './palette'

/**
 * The "message ready" mark.
 * ------------------------
 * A drawn tick that strokes itself on, in the same flat language as the rest
 * of the artwork.
 *
 * It replaced a Lottie animation. The animation was fine, but the player it
 * needed was 314 kB (80 kB gzipped) — the largest single dependency on the
 * site — to draw one tick after a form submit. This is a few hundred bytes and
 * needs nothing at runtime but CSS.
 */
export default function SentMark() {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Your message is ready to send" className="h-full w-full">
      <circle cx="60" cy="60" r="52" fill={I.blush} />
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke={I.coral}
        strokeWidth="4"
        strokeLinecap="round"
        className="sent-ring"
      />
      <path
        d="M38 62 L53 77 L83 45"
        fill="none"
        stroke={I.coral}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sent-tick"
      />
      {/* Three little sparks, the same motif the drawings use. */}
      {[
        [96, 30, 1],
        [26, 34, 0.75],
        [92, 92, 0.6],
      ].map(([x, y, k], i) => (
        <path
          key={i}
          d="M0 -8 Q1 -1 8 0 Q1 1 0 8 Q-1 1 -8 0 Q-1 -1 0 -8Z"
          fill={I.gold}
          transform={`translate(${x} ${y}) scale(${k})`}
        />
      ))}
    </svg>
  )
}
