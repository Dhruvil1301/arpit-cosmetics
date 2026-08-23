import { I } from './palette'

/**
 * The cast, and the room they stand in.
 * -------------------------------------
 * Everything the shop story is drawn from: two figures, the fixtures behind
 * them, and the props they hold. Flat fills only — the same discipline the
 * rest of the artwork keeps.
 *
 * All of it is drawn into an 800×450 panel with the floor at `FLOOR`, so a
 * figure placed at `x` simply stands on the ground.
 *
 * ⚠ Two things to hold on to before editing a figure.
 *
 * 1. y grows *downward*. The feet are at 0, the shoulders at −150, the head
 *    above that. A body part drawn "up" from the shoulders lands on the head.
 * 2. SVG `rotate()` is clockwise and every arm hangs *down* from its
 *    shoulder, so a positive angle swings that hand to the LEFT of the
 *    screen. A figure reaching to the right reaches with negative angles.
 */

export const W = 800
export const H = 450
export const FLOOR = 372

/* -------------------------------------------------------------------------- */
/* Room                                                                       */
/* -------------------------------------------------------------------------- */

/** Wall, floor and skirting. Every panel opens with one. */
export function Room({ wall = I.cream, floor = I.sand, children }) {
  return (
    <g>
      <rect x="0" y="0" width={W} height={H} fill={wall} />
      <rect x="0" y={FLOOR} width={W} height={H - FLOOR} fill={floor} />
      <rect x="0" y={FLOOR - 7} width={W} height="9" rx="4" fill={I.line} opacity="0.45" />
      {children}
    </g>
  )
}

/**
 * A run of wall shelving with stock on it. `kinds` cycles through bottle,
 * box and jar silhouettes so no two shelves read as a repeat.
 */
export function WallShelf({ x, y, w = 200, rows = 3, gap = 62, tone = I.ochreDeep }) {
  const cols = Math.max(2, Math.round(w / 42))
  return (
    <g>
      <rect x={x - 10} y={y - 46} width={w + 20} height={rows * gap + 46} rx="12" fill={I.shell} />
      {Array.from({ length: rows }, (_, r) => {
        const sy = y + r * gap
        return (
          <g key={r}>
            <rect x={x} y={sy} width={w} height="7" rx="3.5" fill={tone} />
            {Array.from({ length: cols }, (_, i) => {
              const px = x + 10 + i * ((w - 20) / cols)
              const c = [I.coral, I.gold, I.coralSoft, I.ochre, I.red, I.leafSoft][(i * 2 + r) % 6]
              const kind = (i + r) % 3
              if (kind === 0)
                return (
                  <g key={i}>
                    <rect x={px} y={sy - 34} width="18" height="34" rx="6" fill={c} />
                    <rect x={px + 5} y={sy - 43} width="8" height="10" rx="3" fill={I.goldDeep} />
                  </g>
                )
              if (kind === 1) return <rect key={i} x={px - 1} y={sy - 26} width="22" height="26" rx="5" fill={c} />
              return (
                <g key={i}>
                  <rect x={px} y={sy - 19} width="20" height="19" rx="9" fill={c} />
                  <rect x={px + 4} y={sy - 25} width="12" height="7" rx="3.5" fill={I.gold} />
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}

/**
 * The counter. `y` is the work surface.
 *
 * Draw it *after* whoever stands behind it — the counter is what hides their
 * legs, and a shopkeeper standing in front of their own counter is the first
 * thing anyone notices.
 */
export function Counter({ x, y = 268, w = 300, tone = I.ochreDeep }) {
  return (
    <g>
      <rect x={x} y={y + 18} width={w} height={FLOOR - y - 18} rx="8" fill={tone} />
      <rect x={x - 12} y={y} width={w + 24} height="22" rx="11" fill={I.shell} />
      {Array.from({ length: Math.max(2, Math.round(w / 74)) }, (_, i) => (
        <rect key={i} x={x + 26 + i * 74} y={y + 42} width="12" height={FLOOR - y - 66} rx="6" fill="#00000016" />
      ))}
    </g>
  )
}

/** A potted plant — the corner filler. */
export function Plant({ x, y = FLOOR, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-24 0 h48 l-7 -46 h-34Z" fill={I.ochreDeep} />
      <rect x="-27" y="-52" width="54" height="12" rx="6" fill={I.coral} />
      <circle cx="0" cy="-84" r="26" fill={I.leaf} />
      <circle cx="-20" cy="-64" r="17" fill={I.leafSoft} />
      <circle cx="21" cy="-66" r="15" fill={I.leafSoft} />
      <circle cx="4" cy="-112" r="14" fill={I.leaf} />
    </g>
  )
}

/** A hanging pendant lamp, dropped from the ceiling. */
export function Lamp({ x, drop = 96, s = 1 }) {
  return (
    <g transform={`translate(${x} 0) scale(${s})`}>
      <line x1="0" y1="0" x2="0" y2={drop} stroke={I.line} strokeWidth="3" />
      <path d={`M-30 ${drop + 26} q30 -34 60 0Z`} fill={I.coral} />
      <circle cx="0" cy={drop + 32} r="7" fill={I.gold} />
    </g>
  )
}

/** The shopfront door, seen from inside — daylight, a fanlight and a handle. */
export function Doorway({ x, w = 132 }) {
  const cx = x + w / 2
  return (
    <g>
      {/* Frame */}
      <rect x={x - 10} y="72" width={w + 20} height={FLOOR - 72} rx="14" fill={I.ochreDeep} />
      {/* Fanlight over the door */}
      <path d={`M${x + 2} 120 a ${w / 2 - 2} ${w / 2 - 2} 0 0 1 ${w - 4} 0Z`} fill={I.gold} />
      <path d={`M${x + 15} 118 a ${w / 2 - 15} ${w / 2 - 15} 0 0 1 ${w - 30} 0Z`} fill="#FFFDF9" />
      {/* Glass: daylight, warmer at the bottom where the street is. */}
      <rect x={x + 6} y="122" width={w - 12} height={FLOOR - 140} rx="6" fill="#FFFDF9" />
      <rect x={x + 6} y={FLOOR - 96} width={w - 12} height="78" rx="6" fill={I.peach} opacity="0.5" />
      {/* What you can see through it. */}
      <circle cx={x + 28} cy={FLOOR - 44} r="18" fill={I.leafSoft} opacity="0.7" />
      <circle cx={x + 44} cy={FLOOR - 28} r="12" fill={I.leaf} opacity="0.55" />
      {/* Mullion and the two handles. */}
      <rect x={cx - 3} y="122" width="6" height={FLOOR - 140} fill={I.ochreDeep} opacity="0.5" />
      <rect x={cx + 12} y="234" width="7" height="36" rx="3.5" fill={I.goldDeep} />
      <rect x={cx - 19} y="234" width="7" height="36" rx="3.5" fill={I.goldDeep} />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Figures                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * One arm, drawn as two segments with a real elbow. `upper` and `lower` are
 * degrees from straight-down. `hand` is counter-rotated so a held prop stays
 * upright however the arm is posed.
 */
function Arm({ ox, oy, upper = 6, lower = 8, len1 = 34, len2 = 30, sleeve, skin, hand }) {
  return (
    <g transform={`translate(${ox} ${oy}) rotate(${upper})`}>
      <line x1="0" y1="0" x2="0" y2={len1} stroke={sleeve} strokeWidth="15" strokeLinecap="round" />
      <g transform={`translate(0 ${len1}) rotate(${lower})`}>
        <line x1="0" y1="0" x2="0" y2={len2} stroke={skin} strokeWidth="12" strokeLinecap="round" />
        <circle cx="0" cy={len2 + 5} r="8" fill={skin} />
        {hand ? <g transform={`translate(0 ${len2 + 8}) rotate(${-upper - lower})`}>{hand}</g> : null}
      </g>
    </g>
  )
}

/** The house face: two closed lids, a smile, round blush. Nothing more. */
function Face({ smile = 1 }) {
  return (
    <g>
      {[-9, 9].map((x) => (
        <path
          key={x}
          d={`M${x - 5} -4 q 5 ${4.5 * smile} 10 0`}
          stroke={I.hair}
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <path d="M-5 8 q 5 5.5 10 0" stroke={I.red} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <circle cx="-16" cy="5" r="5.5" fill={I.coralSoft} opacity="0.6" />
      <circle cx="16" cy="5" r="5.5" fill={I.coralSoft} opacity="0.6" />
    </g>
  )
}

const KIND = {
  /* Her: long kurta over churidar, dupatta across the chest, plaited hair. */
  customer: { cloth: I.coral, clothDeep: I.red, sleeve: I.red, skin: I.skin, hair: I.hair, accent: I.gold },
  /* Him: a shirt in the one cool colour on the page, so the two never merge. */
  keeper: { cloth: I.ink, clothDeep: '#25313A', sleeve: '#25313A', skin: I.skinMid, hair: I.hair, accent: I.ochre },
}

/* Sleeves are a shade off the torso on purpose. When they matched it exactly,
   any arm folded across the chest disappeared into the body — and half of
   these poses fold an arm across the chest. */

/**
 * A standing figure.
 *
 * `x` is where the feet land, `s` scales the whole body about that point, and
 * `flip` mirrors it — arm angles mirror with it, so the same pose reads the
 * same way whichever way the figure faces.
 */
export function Figure({
  x,
  feet = FLOOR,
  s = 1,
  flip = false,
  kind = 'customer',
  armL = {},
  armR = {},
  lean = 0,
  smile = 1,
  headTilt = 0,
  handL = null,
  handR = null,
}) {
  const k = KIND[kind] || KIND.customer
  const her = kind === 'customer'
  const m = flip ? -1 : 1

  return (
    <g transform={`translate(${x} ${feet}) scale(${s * m} ${s}) rotate(${lean})`}>
      {/* Legs / lower half. Hem at -8, waist at -84. */}
      {her ? (
        <>
          <path d="M-30 -8 q30 -14 60 0 l-9 -76 h-42Z" fill={k.clothDeep} />
          {[-14, 14].map((fx) => (
            <ellipse key={fx} cx={fx} cy="-4" rx="11" ry="6" fill={I.hair} />
          ))}
        </>
      ) : (
        <>
          {[-13, 13].map((fx) => (
            <g key={fx}>
              <rect x={fx - 8} y="-74" width="16" height="68" rx="7" fill="#3C4A54" />
              <ellipse cx={fx} cy="-4" rx="12" ry="6" fill={I.hair} />
            </g>
          ))}
        </>
      )}

      {/* Torso: shoulders at -150, waist 70-odd below that. */}
      <path d={her ? 'M-24 -150 h48 l10 70 q-34 12 -68 0Z' : 'M-25 -150 h50 l7 72 h-64Z'} fill={k.cloth} />
      {her ? (
        /* Dupatta — one diagonal band from the left shoulder. */
        <path d="M-22 -148 q30 26 52 46 l-15 5 q-26 -22 -47 -39Z" fill={k.accent} opacity="0.92" />
      ) : (
        <>
          <path d="M-11 -150 l11 12 l11 -12 l-6 -6 h-10Z" fill={I.shell} />
          <rect x="-2" y="-150" width="4" height="62" fill="#00000018" />
        </>
      )}

      {/* Arms */}
      <Arm ox={-19} oy={-144} sleeve={k.sleeve} skin={k.skin} hand={handL} {...armL} />
      <Arm ox={19} oy={-144} sleeve={k.sleeve} skin={k.skin} hand={handR} {...armR} />

      {/* Neck + head */}
      <rect x="-6" y="-164" width="12" height="16" rx="5" fill={k.skin} />
      <g transform={`translate(0 -188) rotate(${headTilt})`}>
        {her ? (
          <>
            {/* Plait behind the shoulder, drawn first so the head sits over it. */}
            <path d="M14 -6 q26 26 12 66 q-12 8 -20 -4 q12 -32 -6 -56Z" fill={k.hair} />
            <circle cx="0" cy="0" r="24" fill={k.skin} />
            {/* Hair: a cap over the top third of the head, not a hood. */}
            <path d="M-24 -3 q2 -25 24 -25 t24 25 q-8 -13 -24 -13 t-24 13Z" fill={k.hair} />
            <circle cx="0" cy="-25" r="8" fill={k.hair} />
            <circle cx="-22" cy="3" r="4.5" fill={k.accent} />
          </>
        ) : (
          <>
            <circle cx="0" cy="0" r="24" fill={k.skin} />
            <path d="M-24 -4 q2 -24 24 -24 t24 24 q-9 -14 -24 -14 t-24 14Z" fill={k.hair} />
            <path d="M-24 -4 q-4 -12 3 -17 l5 7Z" fill={k.hair} />
          </>
        )}
        <Face smile={smile} />
      </g>
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Hand props                                                                 */
/* -------------------------------------------------------------------------- */

/** Every prop is drawn about (0,0) so it can be dropped into any hand. */
export const PROP = {
  lipstick: (
    <g>
      <rect x="-5" y="-4" width="10" height="20" rx="3" fill={I.shell} />
      <rect x="-4" y="-18" width="8" height="15" rx="3" fill={I.coral} />
    </g>
  ),
  perfume: (
    <g>
      <rect x="-9" y="-6" width="18" height="20" rx="5" fill={I.gold} />
      <rect x="-4" y="-13" width="8" height="8" rx="2" fill={I.goldDeep} />
      <circle cx="0" cy="-17" r="4" fill={I.coral} />
    </g>
  ),
  earring: (
    <g>
      <circle cx="0" cy="-6" r="4" fill={I.gold} />
      <path d="M-8 -2 h16 l-8 12Z" fill={I.gold} />
      {[-6, 0, 6].map((dx) => (
        <circle key={dx} cx={dx} cy="13" r="2.6" fill={I.shell} />
      ))}
    </g>
  ),
  bangles: (
    <g>
      {[0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx="0"
          cy={i * 5}
          rx="12"
          ry="4.5"
          fill="none"
          stroke={[I.coral, I.gold, I.red][i]}
          strokeWidth="3.5"
        />
      ))}
    </g>
  ),
  ribbon: (
    <g>
      <circle cx="0" cy="0" r="9" fill={I.coral} />
      <circle cx="0" cy="0" r="3" fill={I.shell} />
      <path d="M0 8 q10 12 3 22" stroke={I.coral} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  gift: (
    <g>
      <rect x="-16" y="-13" width="32" height="26" rx="4" fill={I.ochre} />
      <rect x="-3" y="-13" width="6" height="26" fill={I.coral} />
      <rect x="-16" y="-3" width="32" height="6" fill={I.coral} />
      <circle cx="0" cy="-16" r="6" fill={I.red} />
    </g>
  ),
  bag: (
    <g>
      <path d="M-14 0 h28 l4 40 h-36Z" fill={I.coral} />
      <path d="M-8 0 q8 -14 16 0" stroke={I.goldDeep} strokeWidth="3" fill="none" />
      <circle cx="0" cy="20" r="7" fill={I.shell} opacity="0.85" />
    </g>
  ),
  tray: (
    <g>
      <ellipse cx="0" cy="4" rx="26" ry="9" fill={I.shell} />
      <circle cx="-11" cy="-1" r="5" fill={I.gold} />
      <circle cx="1" cy="-3" r="4.5" fill={I.coral} />
      <circle cx="13" cy="0" r="4" fill={I.red} />
    </g>
  ),
  scissors: (
    <g>
      <path d="M-6 14 L4 -10" stroke={I.line} strokeWidth="3" strokeLinecap="round" />
      <path d="M6 14 L-4 -10" stroke={I.line} strokeWidth="3" strokeLinecap="round" />
      <circle cx="-7" cy="17" r="4.5" fill="none" stroke={I.coral} strokeWidth="3" />
      <circle cx="7" cy="17" r="4.5" fill="none" stroke={I.coral} strokeWidth="3" />
    </g>
  ),
  note: (
    <g>
      <rect x="-13" y="-9" width="26" height="18" rx="3" fill={I.shell} />
      <path d="M-8 -3 h16 M-8 2 h11" stroke={I.line} strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
}
