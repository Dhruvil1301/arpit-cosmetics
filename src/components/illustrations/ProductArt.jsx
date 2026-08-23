import { I } from './palette'

/**
 * The shelf, drawn piece by piece.
 * --------------------------------
 * One drawing per thing the shop keeps in stock all year. Each is a plain
 * `<g>` centred in a 240×240 box, so the showroom can drop any of them onto
 * the same plinth without knowing what it is looking at.
 *
 * Flat fills, one highlight, one shadow tone per object — the same discipline
 * as the scene library. A gradient here would look like a photograph of
 * plastic, which is the opposite of the point.
 */

const CX = 120

/** Shared: the soft disc every piece sits on. */
export function Plinth({ y = 196, rx = 74 }) {
  return (
    <g>
      <ellipse cx={CX} cy={y} rx={rx} ry={rx * 0.2} fill={I.line} opacity="0.22" />
      <ellipse cx={CX} cy={y - 3} rx={rx * 0.62} ry={rx * 0.12} fill={I.line} opacity="0.18" />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Cosmetics                                                                   */
/* -------------------------------------------------------------------------- */

export function Lipstick() {
  return (
    <g transform="translate(120 118)">
      <rect x="-27" y="-4" width="54" height="88" rx="11" fill={I.shell} />
      <rect x="-27" y="-4" width="17" height="88" rx="9" fill="#EFDDCE" />
      <rect x="-23" y="-30" width="46" height="28" rx="7" fill={I.gold} />
      <path d="M-20 -30 h40 v-38 a20 20 0 0 0 -40 0Z" fill={I.coral} />
      <path d="M-20 -58 q20 -16 40 -6 v-4 a20 20 0 0 0 -40 0Z" fill={I.coralSoft} />
      <rect x="-14" y="18" width="10" height="40" rx="5" fill="#ffffff" opacity="0.45" />
    </g>
  )
}

export function NailPolish() {
  return (
    <g transform="translate(120 122)">
      {/* Bottle, neck and cap stack with no gap between them. */}
      <path d="M-32 80 q-4 -60 8 -74 h48 q12 14 8 74Z" fill={I.coral} />
      <path d="M-24 14 h48 q8 46 5 66 h-58 q-3 -20 5 -66Z" fill={I.red} opacity="0.5" />
      <rect x="-12" y="-20" width="24" height="26" rx="3" fill={I.coral} />
      <rect x="-16" y="-30" width="32" height="12" rx="4" fill={I.hair} opacity="0.9" />
      <rect x="-16" y="-72" width="32" height="44" rx="10" fill={I.hair} />
      <ellipse cx="-15" cy="40" rx="6" ry="18" fill="#ffffff" opacity="0.32" />
    </g>
  )
}

export function Compact() {
  return (
    <g transform="translate(120 126)">
      {/* Lid, hinged along the back edge of the base and tipped open. The
          hinge is the shared corner at (-58,-6), so the two never separate. */}
      <g transform="rotate(-9 -58 -6)">
        <rect x="-58" y="-78" width="118" height="70" rx="14" fill={I.ochre} />
        <rect x="-48" y="-70" width="98" height="54" rx="9" fill="#FFFDF9" />
        <path d="M-38 -22 q24 -40 58 -40" stroke={I.shell} strokeWidth="9" fill="none" strokeLinecap="round" />
      </g>
      {/* Base: pan of powder, then the puff resting in it. */}
      <rect x="-60" y="-6" width="120" height="30" rx="13" fill={I.ochreDeep} />
      <ellipse cx="0" cy="-5" rx="50" ry="13" fill={I.peach} />
      <ellipse cx="-6" cy="-6" rx="33" ry="8" fill={I.skin} />
      <ellipse cx="34" cy="-8" rx="17" ry="8" fill={I.shell} />
      <rect x="-60" y="18" width="120" height="10" rx="5" fill={I.goldDeep} opacity="0.45" />
    </g>
  )
}

export function Brush() {
  return (
    <g transform="translate(120 120)">
      {/* Handle, then a wide ferrule, then a fanned head — a brush is much
          wider than it is tall at the tip, which is what a candle is not. */}
      <rect x="-8" y="6" width="16" height="76" rx="8" fill={I.hair} />
      <rect x="-14" y="-14" width="28" height="24" rx="5" fill={I.gold} />
      <rect x="-14" y="-8" width="28" height="4" fill={I.goldDeep} opacity="0.6" />
      <path d="M-30 -12 q6 -46 30 -46 t30 46 q-30 12 -60 0Z" fill={I.line} />
      <path d="M-19 -14 q4 -34 19 -34 t19 34 q-19 8 -38 0Z" fill={I.skinDeep} opacity="0.75" />
      <rect x="-3" y="30" width="5" height="40" rx="2.5" fill="#ffffff" opacity="0.22" />
    </g>
  )
}

export function CreamJar() {
  return (
    <g transform="translate(120 132)">
      <path d="M-56 -14 h112 q-6 66 -14 74 h-84 q-8 -8 -14 -74Z" fill={I.shell} />
      <rect x="-60" y="-40" width="120" height="30" rx="14" fill={I.gold} />
      <ellipse cx="0" cy="-40" rx="60" ry="12" fill={I.goldDeep} opacity="0.35" />
      <rect x="-34" y="6" width="68" height="26" rx="6" fill={I.peach} />
      <path d="M-24 20 h48" stroke={I.coral} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="-30" cy="30" rx="8" ry="20" fill="#ffffff" opacity="0.4" />
    </g>
  )
}

export function Perfume() {
  return (
    <g transform="translate(120 124)">
      {/* Body: square-shouldered flacon, the shape most attars come in. */}
      <path d="M-44 86 q-6 -74 8 -80 h72 q14 6 8 80Z" fill={I.gold} />
      <path d="M-34 24 h68 q3 44 0 62 h-68 q-3 -18 0 -62Z" fill={I.ochre} opacity="0.5" />
      {/* Neck, collar, stopper — stacked, no gaps. */}
      <rect x="-13" y="-26" width="26" height="22" rx="3" fill={I.goldDeep} />
      <rect x="-19" y="-38" width="38" height="14" rx="5" fill={I.goldDeep} />
      <rect x="-15" y="-62" width="30" height="26" rx="8" fill={I.coral} />
      <rect x="-15" y="-52" width="30" height="6" fill={I.red} opacity="0.5" />
      {/* Label and one highlight. */}
      <rect x="-22" y="30" width="44" height="20" rx="4" fill={I.shell} opacity="0.9" />
      <path d="M-13 40 h26" stroke={I.coral} strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="-25" cy="44" rx="6" ry="22" fill="#ffffff" opacity="0.34" />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Jewellery                                                                   */
/* -------------------------------------------------------------------------- */

export function Necklace() {
  return (
    <g transform="translate(120 108)">
      <path d="M-72 -30 q72 108 144 0" stroke={I.gold} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M-56 -12 q56 88 112 0" stroke={I.goldDeep} strokeWidth="6" fill="none" strokeLinecap="round" />
      {[-52, -30, -8, 14, 36, 58].map((x, i) => {
        const y = 6 + Math.cos((i - 2.5) * 0.5) * 26
        return <circle key={x} cx={x} cy={y} r="7" fill={I.shell} />
      })}
      <g transform="translate(0 52)">
        <path d="M0 -14 l16 16 l-16 16 l-16 -16Z" fill={I.gold} />
        <circle cx="0" cy="2" r="7" fill={I.red} />
        <path d="M0 32 l7 -10 h-14Z" fill={I.goldDeep} />
      </g>
    </g>
  )
}

export function Jhumka() {
  return (
    <g transform="translate(120 108)">
      {[-38, 38].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <circle cx="0" cy="-38" r="9" fill={I.gold} />
          <path d="M0 -30 v10" stroke={I.goldDeep} strokeWidth="3" />
          <path d="M-30 -6 q30 -38 60 0Z" fill={I.gold} />
          <path d="M-30 -6 h60 l-6 10 h-48Z" fill={I.goldDeep} />
          {[-22, -11, 0, 11, 22].map((dx, i) => (
            <g key={dx}>
              <path d={`M${dx} 4 v${10 + (i % 2) * 5}`} stroke={I.goldDeep} strokeWidth="2" />
              <circle cx={dx} cy={18 + (i % 2) * 5} r="5" fill={I.shell} />
            </g>
          ))}
        </g>
      ))}
    </g>
  )
}

export function BangleStack() {
  return (
    <g transform="translate(120 128)">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy={52 - i * 13}
          rx={58 - i * 1.5}
          ry="15"
          fill="none"
          stroke={[I.coral, I.gold, I.red, I.coralSoft, I.ochre, I.gold, I.coral, I.red][i]}
          strokeWidth="9"
        />
      ))}
      <ellipse cx="0" cy="-52" rx="46" ry="12" fill="none" stroke={I.shell} strokeWidth="7" />
    </g>
  )
}

export function Bracelet() {
  return (
    <g transform="translate(120 122)">
      <ellipse cx="0" cy="0" rx="62" ry="44" fill="none" stroke={I.gold} strokeWidth="7" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <circle key={i} cx={Math.sin(a) * 62} cy={Math.cos(a) * 44} r="8" fill={I.shell} />
      })}
      <g transform="translate(0 52)">
        <path d="M0 -10 C -12 -22 -22 -8 0 8 C 22 -8 12 -22 0 -10Z" fill={I.coral} />
      </g>
    </g>
  )
}

export function Ring() {
  return (
    <g transform="translate(120 132)">
      <ellipse cx="0" cy="20" rx="46" ry="52" fill="none" stroke={I.gold} strokeWidth="14" />
      <ellipse cx="0" cy="20" rx="46" ry="52" fill="none" stroke={I.goldDeep} strokeWidth="4" opacity="0.5" />
      <g transform="translate(0 -46)">
        <path d="M0 -26 L24 -4 L0 24 L-24 -4Z" fill={I.coral} />
        <path d="M0 -26 L24 -4 L0 2 L-24 -4Z" fill={I.coralSoft} />
        <path d="M-24 -4 L0 24 L0 2Z" fill={I.red} />
      </g>
    </g>
  )
}

export function HairClips() {
  return (
    <g transform="translate(120 124)">
      {/* A padded band and two clips — the small things that finish an outfit. */}
      {/* A padded band, drawn with visible ends so it reads as something you
          put on rather than an arch of colour. */}
      <path d="M-58 40 q58 -92 116 0" stroke={I.coral} strokeWidth="15" fill="none" strokeLinecap="round" />
      <path d="M-58 40 q58 -92 116 0" stroke={I.coralSoft} strokeWidth="5" fill="none" strokeLinecap="round" />
      {[-58, 58].map((x) => (
        <g key={x}>
          <rect x={x - 6} y="34" width="12" height="16" rx="5" fill={I.red} />
        </g>
      ))}
      <g transform="translate(-34 62) rotate(-12)">
        <rect x="-30" y="-8" width="60" height="16" rx="8" fill={I.gold} />
        <circle cx="-16" cy="0" r="6" fill={I.shell} />
        <circle cx="4" cy="0" r="6" fill={I.red} />
      </g>
      <g transform="translate(42 66) rotate(10)">
        <rect x="-26" y="-7" width="52" height="14" rx="7" fill={I.ochre} />
        <circle cx="8" cy="0" r="6" fill={I.shell} />
      </g>
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Gifting                                                                     */
/* -------------------------------------------------------------------------- */

export function GiftBox() {
  return (
    <g transform="translate(120 128)">
      <rect x="-64" y="-18" width="128" height="86" rx="8" fill={I.ochre} />
      <rect x="-70" y="-36" width="140" height="24" rx="8" fill={I.ochreDeep} />
      <rect x="-11" y="-36" width="22" height="104" fill={I.coral} />
      <rect x="-64" y="8" width="128" height="18" fill={I.coral} />
      <g transform="translate(0 -42)">
        <path d="M0 0 q-30 -30 -8 -34 q16 -3 8 34Z" fill={I.red} />
        <path d="M0 0 q30 -30 8 -34 q-16 -3 -8 34Z" fill={I.red} />
        <circle cx="0" cy="0" r="9" fill={I.coral} />
      </g>
    </g>
  )
}

export function GiftBag() {
  return (
    <g transform="translate(120 118)">
      <path d="M-46 -18 h92 l8 100 h-108Z" fill={I.coral} />
      <path d="M-46 -18 h92 l2 22 h-96Z" fill={I.red} opacity="0.4" />
      <path d="M-26 -18 q26 -42 52 0" stroke={I.goldDeep} strokeWidth="6" fill="none" />
      <circle cx="0" cy="40" r="22" fill={I.shell} opacity="0.9" />
      <path d="M-9 40 q9 11 18 0" stroke={I.coral} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M-46 -18 h92" stroke={I.goldDeep} strokeWidth="3" opacity="0.5" />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Festival & ceremony                                                         */
/* -------------------------------------------------------------------------- */

export function Diya() {
  return (
    <g transform="translate(120 132)">
      <path d="M-64 8 q64 46 128 0 q-14 34 -64 34 t-64 -34Z" fill={I.ochreDeep} />
      <path d="M-64 8 q64 26 128 0 q-64 -20 -128 0Z" fill={I.ochre} />
      <path d="M46 -2 q22 -8 20 -20 q-16 2 -20 20Z" fill={I.gold} />
      <g transform="translate(54 -30)">
        <path d="M0 -34 q16 20 0 34 q-16 -14 0 -34Z" fill={I.ochre} />
        <path d="M0 -20 q9 12 0 20 q-9 -8 0 -20Z" fill={I.shell} />
      </g>
      {[[-40, -24], [-10, -44], [16, -20]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 - i * 0.6} fill={I.gold} opacity="0.8" />
      ))}
    </g>
  )
}

export function FairyLights() {
  return (
    <g transform="translate(120 116)">
      {[0, 1].map((r) => (
        <g key={r} transform={`translate(0 ${r * 62})`}>
          <path d="M-92 -14 q46 44 92 0 q46 -44 92 0" stroke={I.line} strokeWidth="3.5" fill="none" transform="translate(-46 0)" />
          {[-72, -40, -8, 24, 56].map((x, i) => {
            const y = -6 + (i % 2 === 0 ? 16 : 2)
            const c = [I.coral, I.gold, I.red, I.ochre, I.coralSoft][(i + r) % 5]
            return (
              <g key={x}>
                <path d={`M${x} ${y} l7 0 l-3.5 8Z`} fill={I.line} />
                <circle cx={x + 3.5} cy={y + 17} r="10" fill={c} />
                <circle cx={x + 0.5} cy={y + 14} r="3.5" fill="#ffffff" opacity="0.55" />
              </g>
            )
          })}
        </g>
      ))}
    </g>
  )
}

export function HaldiThali() {
  return (
    <g transform="translate(120 130)">
      {/* Brass thali, darkened so the turmeric on it has something to sit
          against — gold on gold is invisible at any size. */}
      <ellipse cx="0" cy="40" rx="82" ry="26" fill={I.goldDeep} />
      <ellipse cx="0" cy="34" rx="82" ry="24" fill={I.ochreDeep} />
      <ellipse cx="0" cy="32" rx="64" ry="18" fill="#8F5F1E" opacity="0.4" />
      {/* Turmeric mound and two small bowls. */}
      <path d="M-46 32 q22 -38 44 0Z" fill={I.gold} />
      <path d="M-36 32 q12 -22 24 0Z" fill="#F2C560" />
      <g transform="translate(34 20)">
        <ellipse cx="0" cy="6" rx="26" ry="10" fill={I.shell} />
        <path d="M-26 6 q26 18 52 0 q-6 12 -26 12 t-26 -12Z" fill={I.shell} />
        <ellipse cx="0" cy="4" rx="19" ry="7" fill={I.red} opacity="0.75" />
      </g>
      <g transform="translate(-4 -14)">
        <ellipse cx="0" cy="0" rx="17" ry="7" fill={I.shell} />
        <ellipse cx="0" cy="-1" rx="11" ry="4" fill={I.leafSoft} />
      </g>
    </g>
  )
}

export function MehendiCone() {
  return (
    <g transform="translate(120 122)">
      <path d="M-30 -60 h60 l-24 132 q-6 8 -12 0Z" fill={I.leaf} />
      <path d="M-30 -60 h60 l-8 18 h-44Z" fill={I.leafSoft} />
      <path d="M-4 -60 l-10 132" stroke="#ffffff" strokeWidth="4" opacity="0.2" />
      {/* A drawn line coming off the tip. */}
      <path d="M6 74 q22 12 8 30 q-14 16 6 26" stroke={I.hair} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
      {[[-52, 6], [56, -18], [48, 46]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={I.leafSoft} opacity="0.7" />
      ))}
    </g>
  )
}

/* -------------------------------------------------------------------------- */

/** Catalogue id → drawing. Keys match `showroom` in `data/site.js`. */
export const PRODUCT_ART = {
  lipstick: Lipstick,
  perfume: Perfume,
  nailpolish: NailPolish,
  compact: Compact,
  brush: Brush,
  creamjar: CreamJar,
  necklace: Necklace,
  jhumka: Jhumka,
  bangles: BangleStack,
  bracelet: Bracelet,
  ring: Ring,
  hairclips: HairClips,
  giftbox: GiftBox,
  giftbag: GiftBag,
  diya: Diya,
  fairylights: FairyLights,
  haldi: HaldiThali,
  mehendi: MehendiCone,
}
