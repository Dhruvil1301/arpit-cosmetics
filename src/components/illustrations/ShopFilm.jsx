import { I } from './palette'
import { W, H, FLOOR, Room, WallShelf, Counter, Plant, Lamp, Doorway, Figure, PROP } from './figures'

/**
 * The shop story, in eight drawn panels.
 * --------------------------------------
 * One panel per beat of the visit: she comes in, a shade is tested, a scent
 * is tried, earrings go up to the mirror, bangles are sized, the gift is
 * wrapped, she pays, she leaves. The section cross-fades between them.
 *
 * Panels are wide (800×450) rather than square, because the story is about
 * two people either side of a counter and that is a horizontal idea. Each
 * export is a plain `<g>` — the section owns the `<svg>`.
 *
 * Reading a pose: `armR={{ upper: -80 }}` means *her* right arm (screen
 * right) swung out to the right. Positive angles swing a hand to the LEFT.
 * See the note at the top of `figures.jsx` before editing any of these.
 */

/* -------------------------------------------------------------------------- */
/* Small shared decoration                                                     */
/* -------------------------------------------------------------------------- */

function Sparkle({ x, y, s = 1, fill = I.gold }) {
  return (
    <path
      d="M0 -11 Q1.6 -1.6 11 0 Q1.6 1.6 0 11 Q-1.6 1.6 -11 0 Q-1.6 -1.6 0 -11Z"
      fill={fill}
      transform={`translate(${x} ${y}) scale(${s})`}
    />
  )
}

/** Rising curls — used for a sprayed scent and for warm air over the diyas. */
function Curls({ x, y, fill = I.coralSoft }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.6">
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M${i * 15 - 7} 0 q -7 -${13 + i * 4} 3 -${23 + i * 5}`}
          stroke={fill}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={`d${i}`} cx={i * 11 - 11} cy={-32 - (i % 2) * 9} r={2.6 - i * 0.4} fill={fill} />
      ))}
    </g>
  )
}

/** A shelf-standing bangle tower. */
function BangleTower({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-5" y="-96" width="10" height="96" rx="5" fill={I.ochreDeep} />
      <ellipse cx="0" cy="2" rx="34" ry="11" fill={I.ochreDeep} />
      {Array.from({ length: 7 }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy={-10 - i * 12}
          rx={26 - i * 1.6}
          ry="7"
          fill="none"
          stroke={[I.coral, I.gold, I.red, I.coralSoft, I.ochre, I.gold, I.coral][i]}
          strokeWidth="5"
        />
      ))}
    </g>
  )
}

/** The glass fragrance cabinet. */
function Cabinet({ x, y = 132, w = 210 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={FLOOR - y} rx="12" fill={I.shell} />
      <rect x={x + 10} y={y + 10} width={w - 20} height={FLOOR - y - 20} rx="8" fill="#FFFDF9" />
      {[0, 1].map((r) =>
        Array.from({ length: 4 }, (_, i) => {
          const px = x + 30 + i * ((w - 60) / 4)
          const py = y + 96 + r * 96
          return (
            <g key={`${r}-${i}`}>
              <rect x={px} y={py - 40} width="26" height="40" rx="7" fill={[I.gold, I.coral, I.ochre, I.coralSoft][i]} />
              <rect x={px + 8} y={py - 52} width="10" height="13" rx="3" fill={I.goldDeep} />
            </g>
          )
        }),
      )}
      {[0, 1].map((r) => (
        <rect key={r} x={x + 14} y={y + 96 + r * 96} width={w - 28} height="6" rx="3" fill={I.line} opacity="0.5" />
      ))}
    </g>
  )
}

/** A framed mirror on a stand. */
function Mirror({ x, y = 104 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 q66 0 66 84 t-66 118 q-66 -34 -66 -118 T0 0Z" fill={I.gold} />
      <path d="M0 14 q54 0 54 72 t-54 102 q-54 -30 -54 -102 T0 14Z" fill="#FFFDF9" />
      <path d="M-38 168 q8 -62 46 -92" stroke={I.shell} strokeWidth="13" fill="none" strokeLinecap="round" />
      <rect x="-9" y="200" width="18" height={FLOOR - y - 214} fill={I.goldDeep} />
      <path d={`M-42 ${FLOOR - y - 12} h84 a8 8 0 0 1 0 15 h-84 a8 8 0 0 1 0 -15Z`} fill={I.goldDeep} />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* 01 — Arrival                                                                */
/* -------------------------------------------------------------------------- */

export function Arrival() {
  return (
    <Room wall={I.cream}>
      <Lamp x={214} drop={78} />
      <Lamp x={604} drop={62} />
      <Doorway x={72} w={148} />
      <WallShelf x={392} y={128} w={268} rows={2} gap={70} />

      {/* She has just come through the door, still looking around. */}
      <Figure
        x={286}
        s={1.02}
        kind="customer"
        headTilt={-7}
        armL={{ upper: 16, lower: 12 }}
        armR={{ upper: -26, lower: -34 }}
        handR={PROP.note}
      />

      {/* He is behind the counter, mid-welcome. Counter last, over his legs. */}
      <Figure
        x={598}
        s={1}
        kind="keeper"
        flip
        armL={{ upper: 24, lower: 14 }}
        armR={{ upper: -148, lower: -22 }}
      />
      <Counter x={470} y={272} w={280} />

      {/* No plant on this side — the counter runs to x 750 and it read as a
          pot standing on the counter top. The greenery is outside the door. */}
      <Sparkle x={344} y={122} s={0.9} />
      <Sparkle x={252} y={176} s={0.6} fill={I.coral} />
      <Sparkle x={688} y={140} s={0.7} />
    </Room>
  )
}

/* -------------------------------------------------------------------------- */
/* 02 — Cosmetics                                                              */
/* -------------------------------------------------------------------------- */

export function Cosmetics() {
  return (
    <Room wall={I.blush} floor={I.peach}>
      <Lamp x={176} drop={54} />
      {/* The colour wall: three rows of it, floor to shoulder height. */}
      <WallShelf x={70} y={118} w={300} rows={3} gap={66} tone={I.coral} />

      {/* A swatch of shades tried on her forearm — the actual subject. */}
      <Figure
        x={434}
        s={1.04}
        kind="customer"
        headTilt={9}
        armL={{ upper: 62, lower: 44 }}
        armR={{ upper: 30, lower: 62 }}
        handR={PROP.lipstick}
      />
      <g>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={470 + i * 13}
            y={250}
            width="9"
            height="20"
            rx="4.5"
            fill={[I.coral, I.red, I.coralSoft][i]}
            transform={`rotate(-24 ${470 + i * 13} 250)`}
          />
        ))}
      </g>

      {/* He is holding the tray the shades came off. */}
      <Figure
        x={604}
        s={1}
        kind="keeper"
        flip
        armL={{ upper: 20, lower: 16 }}
        armR={{ upper: -62, lower: -38 }}
        handR={PROP.tray}
      />

      <Plant x={738} s={0.72} />
      <Sparkle x={508} y={150} s={0.8} fill={I.coral} />
      <Sparkle x={396} y={106} s={0.6} />
    </Room>
  )
}

/* -------------------------------------------------------------------------- */
/* 03 — Fragrance                                                              */
/* -------------------------------------------------------------------------- */

export function Fragrance() {
  return (
    <Room wall={I.sand} floor={I.cream}>
      <Lamp x={640} drop={70} />
      <Cabinet x={470} y={128} w={252} />

      {/* Bottle held up, eyes closed, one spray already in the air. */}
      <Figure
        x={286}
        s={1.06}
        kind="customer"
        headTilt={-8}
        armL={{ upper: 20, lower: 16 }}
        armR={{ upper: -118, lower: -108, len1: 26, len2: 22 }}
        handR={PROP.perfume}
      />
      <Curls x={314} y={186} fill={I.coral} />

      {/* He waits, hands folded in front — nothing is decided yet. */}
      <Figure
        x={408}
        s={0.98}
        kind="keeper"
        flip
        armL={{ upper: -16, lower: 62 }}
        armR={{ upper: 16, lower: -62 }}
      />

      <Plant x={92} s={0.9} />
      <Sparkle x={196} y={144} s={0.75} fill={I.coral} />
      <Sparkle x={392} y={112} s={0.55} />
    </Room>
  )
}

/* -------------------------------------------------------------------------- */
/* 04 — The mirror                                                             */
/* -------------------------------------------------------------------------- */

export function MirrorBeat() {
  return (
    <Room wall={I.peach} floor={I.sand}>
      <Lamp x={128} drop={58} />
      <Mirror x={214} />

      {/* Earring up to the ear, head turned into the glass. */}
      <Figure
        x={392}
        s={1.06}
        kind="customer"
        headTilt={-12}
        armL={{ upper: 20, lower: 14 }}
        armR={{ upper: 44, lower: 84 }}
        handR={PROP.earring}
      />

      {/* The second pair, already out of the box. */}
      <Figure
        x={566}
        s={1}
        kind="keeper"
        flip
        armL={{ upper: 22, lower: 18 }}
        armR={{ upper: -70, lower: -30 }}
        handR={PROP.tray}
      />

      <Plant x={716} s={0.78} />
      <Sparkle x={306} y={128} s={0.9} />
      <Sparkle x={470} y={168} s={0.6} fill={I.coral} />
      <Sparkle x={636} y={124} s={0.7} />
    </Room>
  )
}

/* -------------------------------------------------------------------------- */
/* 05 — Bangles                                                                */
/* -------------------------------------------------------------------------- */

export function Bangles() {
  return (
    <Room wall={I.cream} floor={I.peach}>
      <Lamp x={400} drop={48} />
      <WallShelf x={556} y={126} w={198} rows={2} gap={68} tone={I.gold} />

      {/* Her wrist is out, flat, waiting. */}
      <Figure
        x={252}
        s={1.04}
        kind="customer"
        headTilt={10}
        armL={{ upper: 18, lower: 14 }}
        armR={{ upper: -84, lower: -14 }}
      />

      {/* He slides them on one at a time, from the tower on the counter. */}
      <Figure
        x={472}
        s={1}
        kind="keeper"
        flip
        armL={{ upper: 30, lower: 22 }}
        armR={{ upper: 82, lower: 18 }}
        handR={PROP.bangles}
      />

      <Counter x={330} y={296} w={216} tone={I.line} />
      <BangleTower x={392} y={296} s={0.86} />

      <Sparkle x={330} y={172} s={0.8} fill={I.coral} />
      <Sparkle x={548} y={214} s={0.6} />
      <Plant x={94} s={0.84} />
    </Room>
  )
}

/* -------------------------------------------------------------------------- */
/* 06 — Gift wrapping                                                          */
/* -------------------------------------------------------------------------- */

export function Gifting() {
  return (
    <Room wall={I.blush} floor={I.sand}>
      <Lamp x={548} drop={52} />
      <WallShelf x={82} y={122} w={188} rows={2} gap={64} tone={I.coralSoft} />

      {/* She watches from the customer side. */}
      <Figure
        x={222}
        s={1.02}
        kind="customer"
        headTilt={8}
        armL={{ upper: -16, lower: 62 }}
        armR={{ upper: 16, lower: -62 }}
      />

      {/* He is over the box, both hands working. */}
      <Figure
        x={520}
        s={1}
        kind="keeper"
        flip
        armL={{ upper: 58, lower: 44 }}
        armR={{ upper: -54, lower: -42 }}
        handL={PROP.ribbon}
        handR={PROP.scissors}
      />

      <Counter x={340} y={264} w={368} />

      {/* The wrapping station: roll, spool, tag, and the box half-done. */}
      <g>
        <rect x={366} y={222} width="96" height="26" rx="13" fill={I.coral} />
        <ellipse cx={366} cy={235} rx="9" ry="13" fill={I.red} />
        <g transform="translate(506 224)">
          <rect x="-34" y="-24" width="68" height="48" rx="6" fill={I.ochre} />
          <rect x="-6" y="-24" width="12" height="48" fill={I.coral} />
          <rect x="-34" y="-6" width="68" height="11" fill={I.coral} />
          <circle cx="0" cy="-28" r="10" fill={I.red} />
        </g>
        <g transform="translate(636 232)">
          <circle cx="0" cy="0" r="17" fill={I.gold} />
          <circle cx="0" cy="0" r="6" fill={I.shell} />
        </g>
        <g transform="translate(676 238) rotate(12)">
          <rect x="-14" y="-9" width="28" height="19" rx="4" fill={I.shell} />
          <path d="M-8 -3 h16 M-8 3 h10" stroke={I.line} strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      <Sparkle x={452} y={144} s={0.85} />
      <Sparkle x={596} y={118} s={0.6} fill={I.coral} />
      <Sparkle x={304} y={176} s={0.7} />
    </Room>
  )
}

/* -------------------------------------------------------------------------- */
/* 07 — The counter                                                            */
/* -------------------------------------------------------------------------- */

export function AtTheCounter() {
  return (
    <Room wall={I.sand} floor={I.peach}>
      <Lamp x={252} drop={54} />
      <WallShelf x={528} y={116} w={224} rows={3} gap={62} />

      {/* Both hands meet over the counter: the bag is going across. */}
      <Figure
        x={244}
        s={1.04}
        kind="customer"
        headTilt={7}
        armL={{ upper: 24, lower: 18 }}
        armR={{ upper: -76, lower: -26 }}
      />
      <Figure
        x={470}
        s={1}
        kind="keeper"
        flip
        armL={{ upper: 26, lower: 20 }}
        armR={{ upper: 74, lower: 24 }}
        handR={PROP.bag}
      />

      <Counter x={296} y={262} w={318} />

      {/* Marked price, plainly on the counter. Nothing is negotiated here. */}
      <g transform="translate(422 236)">
        <rect x="-26" y="-16" width="52" height="32" rx="6" fill={I.shell} />
        <path d="M-15 -4 h30 M-15 5 h20" stroke={I.line} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18" cy="-9" r="5" fill={I.coral} />
      </g>
      <g transform="translate(576 234)">
        <rect x="-30" y="-20" width="60" height="40" rx="6" fill={I.ochre} />
        <rect x="-4" y="-20" width="9" height="40" fill={I.coral} />
        <circle cx="0" cy="-23" r="8" fill={I.red} />
      </g>

      <Plant x={730} s={0.7} />
      <Sparkle x={404} y={140} s={0.85} fill={I.coral} />
      <Sparkle x={498} y={104} s={0.6} />
    </Room>
  )
}

/* -------------------------------------------------------------------------- */
/* 08 — Departure                                                              */
/* -------------------------------------------------------------------------- */

export function Departure() {
  return (
    <Room wall={I.cream} floor={I.sand}>
      <Lamp x={196} drop={64} />
      <Doorway x={556} w={168} />
      <WallShelf x={92} y={126} w={202} rows={2} gap={66} />

      {/* Out through the door, a bag in each hand. */}
      <Figure
        x={470}
        s={1.08}
        kind="customer"
        headTilt={-6}
        armL={{ upper: 12, lower: 8 }}
        armR={{ upper: -12, lower: -8 }}
        handL={PROP.bag}
        handR={PROP.gift}
      />

      {/* He waves her off from behind the counter. */}
      <Figure
        x={228}
        s={0.96}
        kind="keeper"
        armL={{ upper: 146, lower: 20 }}
        armR={{ upper: -22, lower: -14 }}
      />
      <Counter x={120} y={280} w={240} />

      <Plant x={366} s={0.76} />
      {/* Daylight from the doorway. */}
      <path d={`M556 84 L724 84 L764 ${FLOOR} L516 ${FLOOR}Z`} fill="#FFFFFF" opacity="0.28" />
      <Sparkle x={396} y={130} s={0.9} />
      <Sparkle x={532} y={168} s={0.65} fill={I.coral} />
      <Sparkle x={640} y={118} s={0.75} />
    </Room>
  )
}

/* -------------------------------------------------------------------------- */

/** Chapter id → panel. The ids match `boutiqueChapters` in `data/site.js`. */
export const PANELS = {
  arrival: Arrival,
  cosmetics: Cosmetics,
  fragrance: Fragrance,
  mirror: MirrorBeat,
  bangles: Bangles,
  gifting: Gifting,
  counter: AtTheCounter,
  departure: Departure,
}

export const PANEL_BOX = { width: W, height: H }
