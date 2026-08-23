import { memo } from 'react'
import { I } from './palette'

/**
 * Hero composition.
 * -----------------
 * Illustrated products drifting around an open space, drawn in the same flat
 * language as the rest of the site. Replaces the earlier 3D still-life so the
 * page has one visual voice from the first screen onward.
 *
 * Everything animates in CSS — `animation-delay` staggers the drift so the
 * group never pulses in unison, and the whole thing is a single inline SVG,
 * so it costs nothing to load and stays crisp at any size.
 *
 * Purely decorative: hidden from assistive tech, and every drift stops under
 * `prefers-reduced-motion` via the global rule in index.css.
 */

/* Each item: [x, y, scale, driftSeconds, delaySeconds] */
const LAYOUT = {
  perfume: [500, 168, 1.15, 7.5, 0],
  lipstick: [286, 250, 0.95, 6.4, 0.9],
  gift: [672, 300, 1.0, 8.2, 0.4],
  bangles: [352, 470, 0.9, 7.0, 1.6],
  jar: [640, 500, 0.82, 6.8, 1.1],
  polish: [792, 176, 0.78, 7.8, 2.0],
  diya: [244, 596, 0.85, 7.2, 0.6],
  earring: [800, 452, 0.8, 6.6, 1.9],
}

function Float({ item, children }) {
  const [x, y, s, dur, delay] = LAYOUT[item]
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g style={{ animation: `hero-drift ${dur}s ease-in-out ${delay}s infinite`, transformBox: 'fill-box', transformOrigin: 'center' }}>
        {children}
      </g>
    </g>
  )
}

function HeroArt() {
  return (
    <svg
      viewBox="0 0 1000 760"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* Soft colour fields behind the props */}
      <ellipse cx="560" cy="300" rx="300" ry="250" fill={I.peach} opacity="0.55" />
      <ellipse cx="368" cy="470" rx="220" ry="180" fill={I.blush} opacity="0.6" />
      <ellipse cx="760" cy="520" rx="180" ry="150" fill={I.sand} opacity="0.7" />

      {/* Scattered dots + sprigs */}
      {[
        [220, 160, 7, I.coral],
        [880, 268, 9, I.ochre],
        [172, 386, 6, I.gold],
        [910, 620, 8, I.coralSoft],
        [470, 90, 6, I.ochre],
        [590, 660, 7, I.coral],
      ].map(([cx, cy, r, f], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={f} opacity="0.7" />
      ))}

      {/* ------------------------------------------------------- Perfume -- */}
      <Float item="perfume">
        <rect x="-62" y="-46" width="124" height="158" rx="26" fill={I.ochre} />
        <rect x="-62" y="-46" width="38" height="158" rx="22" fill={I.gold} opacity="0.5" />
        <rect x="-36" y="26" width="72" height="48" rx="9" fill={I.shell} opacity="0.85" />
        <rect x="-21" y="-72" width="42" height="28" fill={I.ochreDeep} />
        <rect x="-32" y="-102" width="64" height="34" rx="10" fill={I.hair} />
      </Float>

      {/* ------------------------------------------------------ Lipstick -- */}
      <Float item="lipstick">
        <g transform="rotate(-14)">
          <rect x="-27" y="-14" width="54" height="100" rx="10" fill={I.shell} />
          <rect x="-27" y="-14" width="17" height="100" rx="9" fill="#EFDDCE" />
          <rect x="-23" y="-40" width="46" height="28" rx="7" fill="#F3E4D6" />
          <path d="M-20 -40 h40 v-32 a20 20 0 0 0 -40 0Z" fill={I.coral} />
          <path d="M-20 -64 q20 -15 40 -4 v-4 a20 20 0 0 0 -40 0Z" fill={I.coralSoft} />
        </g>
      </Float>

      {/* ---------------------------------------------------------- Gift -- */}
      <Float item="gift">
        <g transform="rotate(8)">
          <rect x="-66" y="-50" width="132" height="104" rx="11" fill={I.coral} />
          <rect x="-66" y="-50" width="132" height="20" rx="8" fill={I.red} />
          <rect x="-11" y="-50" width="22" height="104" fill={I.gold} />
          <rect x="-66" y="-10" width="132" height="17" fill={I.gold} />
          <path d="M-5 -54 q-36-28-47-3 q-3 17 47 17 q50 0 47-17 q-11-25-47 3Z" fill={I.gold} />
          <circle cx="0" cy="-50" r="12" fill={I.ochreDeep} />
        </g>
      </Float>

      {/* ------------------------------------------------------- Bangles -- */}
      <Float item="bangles">
        <g transform="rotate(-8)">
          {[-34, -17, 0, 17, 34].map((x, i) => (
            <ellipse
              key={x}
              cx={x}
              cy="0"
              rx="12"
              ry="48"
              fill="none"
              stroke={[I.coral, I.gold, I.red, I.ochre, I.coralSoft][i]}
              strokeWidth="10"
            />
          ))}
        </g>
      </Float>

      {/* ----------------------------------------------------- Cream jar -- */}
      <Float item="jar">
        <ellipse cx="0" cy="20" rx="46" ry="17" fill="#EFDDCE" />
        <rect x="-46" y="-14" width="92" height="34" fill="#EFDDCE" />
        <ellipse cx="0" cy="-14" rx="46" ry="17" fill={I.shell} />
        <rect x="-48" y="-40" width="96" height="30" rx="11" fill={I.gold} />
        <ellipse cx="0" cy="-40" rx="48" ry="12" fill={I.ochre} />
      </Float>

      {/* --------------------------------------------------- Nail polish -- */}
      <Float item="polish">
        <g transform="rotate(12)">
          <path d="M-32 60 q0-52 12-66 h40 q12 14 12 66 a10 10 0 0 1 -10 10 h-44 a10 10 0 0 1 -10 -10Z" fill={I.coralSoft} />
          <rect x="-14" y="-30" width="28" height="26" fill="#F3E4D6" />
          <rect x="-20" y="-72" width="40" height="44" rx="9" fill={I.hair} />
        </g>
      </Float>

      {/* ---------------------------------------------------------- Diya -- */}
      <Float item="diya">
        <circle cx="0" cy="-14" r="42" fill={I.ochre} opacity="0.2" />
        <path d="M-44 0 q44 32 88 0 q-11 27-44 27 t-44-27Z" fill="#7A3E22" />
        <path d="M-44 0 q44 15 88 0 q-44 11-88 0Z" fill="#5C2C16" />
        <path d="M0 -36 q15 17 0 34 q-15-17 0-34Z" fill={I.gold} />
        <path d="M0 -27 q8 10 0 21 q-8-11 0-21Z" fill="#FFF3C4" />
      </Float>

      {/* ------------------------------------------------------- Earring -- */}
      <Float item="earring">
        <path d="M0 -34 a17 17 0 1 1 0.1 0" fill="none" stroke={I.gold} strokeWidth="6" />
        <circle cx="0" cy="0" r="11" fill={I.gold} />
        <path d="M-32 34 A32 32 0 0 1 32 34Z" fill={I.ochre} />
        <rect x="-34" y="34" width="68" height="8" rx="4" fill={I.goldDeep} />
        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={i} cx={-26 + i * 10.5} cy={52 + (i % 2) * 6} r="6" fill={I.shell} />
        ))}
      </Float>
    </svg>
  )
}

export default memo(HeroArt)
