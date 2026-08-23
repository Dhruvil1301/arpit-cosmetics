import { I } from './palette'

/**
 * Illustration library.
 * ---------------------
 * Flat vector scenes, drawn to one house style:
 *
 *   · A soft organic blob of colour behind the subject, never a hard frame.
 *   · Flat fills. No gradients on the artwork — the discipline is the style.
 *   · Faces are two closed lid arcs, a small smile and round blush cheeks.
 *     Nothing more. Eyes with pupils start to look like a mascot.
 *   · Botanical sprigs and confetti dots carry the empty corners.
 *   · Every scene fills a 400×400 viewBox and is cropped by its container,
 *     so the same drawing works in a square tile and a tall card.
 *
 * Each export is a plain `<g>`: no wrapper `<svg>`, so `Illustration.jsx` can
 * set the viewBox and background once for all of them.
 */

/* -------------------------------------------------------------------------- */
/* Shared decoration                                                           */
/* -------------------------------------------------------------------------- */

/** Organic ground shape. Every scene sits on one. */
export function Blob({ fill = I.peach, d = 'M118 44C196 16 306 34 344 108s6 176-78 214-206 32-256-44S40 72 118 44Z', opacity = 1 }) {
  return <path d={d} fill={fill} opacity={opacity} />
}

/** A leafy sprig — the recurring botanical motif. */
function Sprig({ x, y, r = 0, s = 1, fill = I.leaf }) {
  const leaves = [0, 1, 2, 3, 4]
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C 6 -28 6 -58 2 -84" stroke={fill} strokeWidth="3" fill="none" strokeLinecap="round" />
      {leaves.map((i) => {
        const ly = -14 - i * 16
        return (
          <g key={i}>
            <ellipse cx="-11" cy={ly} rx="11" ry="5.5" fill={fill} transform={`rotate(-24 -11 ${ly})`} />
            <ellipse cx="13" cy={ly - 8} rx="11" ry="5.5" fill={fill} transform={`rotate(24 13 ${ly - 8})`} />
          </g>
        )
      })}
    </g>
  )
}

/** Celebration confetti — dots, dashes and curls. */
function Confetti({ seed = 1, count = 16 }) {
  const cols = [I.coral, I.ochre, I.gold, I.red, I.coralSoft]
  const items = []
  for (let i = 0; i < count; i++) {
    const n = i * 37 + seed * 91
    const x = 20 + ((n * 13) % 360)
    const y = 18 + ((n * 29) % 360)
    const c = cols[(i + seed) % cols.length]
    const kind = (i + seed) % 3
    if (kind === 0) items.push(<circle key={i} cx={x} cy={y} r={4 + ((n % 3) )} fill={c} />)
    else if (kind === 1)
      items.push(
        <rect key={i} x={x} y={y} width="14" height="5" rx="2.5" fill={c} transform={`rotate(${(n % 90) - 45} ${x} ${y})`} />,
      )
    else
      items.push(
        <path key={i} d={`M${x} ${y} q 9 -9 18 0 q 9 9 18 0`} stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round" />,
      )
  }
  return <g opacity="0.9">{items}</g>
}

/** The house face: closed lids, smile, blush. Used by every figure. */
function Face({ cx = 0, cy = 0, s = 1, smile = 1 }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      {[-15, 15].map((x) => (
        <path
          key={x}
          d={`M${x - 8} 0 q 8 ${7 * smile} 16 0`}
          stroke={I.hair}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <path d="M-7 16 q 7 8 14 0" stroke={I.red} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="-27" cy="12" r="8" fill={I.coralSoft} opacity="0.55" />
      <circle cx="27" cy="12" r="8" fill={I.coralSoft} opacity="0.55" />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Beauty                                                                      */
/* -------------------------------------------------------------------------- */

/** Lips and a lipstick bullet — the cosmetics hero. */
export function LipsLipstick() {
  return (
    <g>
      <Blob fill={I.blush} />
      <g transform="translate(206 150) scale(1.28)">
        <path
          d="M0 -20 C -22 -46 -74 -46 -96 -16 C -74 -6 -60 -2 0 -2 C 60 -2 74 -6 96 -16 C 74 -46 22 -46 0 -20 Z"
          fill={I.coral}
        />
        <path d="M-96 -16 C -70 34 -30 50 0 50 C 30 50 70 34 96 -16 C 60 -6 -60 -6 -96 -16 Z" fill={I.red} />
        <path d="M-96 -16 C -60 -6 60 -6 96 -16 C 40 4 -40 4 -96 -16 Z" fill="#8E2A1E" />
        <ellipse cx="-46" cy="-24" rx="15" ry="6" fill="#fff" opacity="0.4" transform="rotate(-12 -46 -24)" />
        <ellipse cx="40" cy="22" rx="17" ry="6" fill="#fff" opacity="0.28" transform="rotate(8 40 22)" />
      </g>

      {/* Lipstick, lower-left */}
      <g transform="translate(92 292) rotate(-12)">
        <rect x="-26" y="-16" width="52" height="96" rx="9" fill={I.shell} />
        <rect x="-26" y="-16" width="16" height="96" rx="8" fill="#EFDDCE" />
        <rect x="-22" y="-40" width="44" height="28" rx="7" fill="#F3E4D6" />
        <path d="M-19 -40 h38 v-30 a19 19 0 0 0 -38 0 Z" fill={I.coral} />
        <path d="M-19 -62 q 19 -14 38 -4 v -4 a19 19 0 0 0 -38 0 Z" fill={I.coralSoft} />
        <path d="M-8 40 a10 10 0 0 1 16 0 a10 10 0 0 1 -8 12 a10 10 0 0 1 -8 -12Z" fill={I.coral} />
      </g>

      {/* Heart accents */}
      {[
        [318, 96, 1],
        [66, 132, 0.7],
        [300, 250, 0.85],
      ].map(([x, y, k], i) => (
        <path
          key={i}
          d="M0 6 C -12 -4 -9 -18 0 -12 C 9 -18 12 -4 0 6Z"
          fill={I.red}
          transform={`translate(${x} ${y}) scale(${k * 1.5})`}
        />
      ))}
    </g>
  )
}

/** A woman applying cream — skincare. */
export function Skincare() {
  return (
    <g>
      <Blob fill={I.blush} />
      <ellipse cx="200" cy="196" rx="118" ry="126" fill={I.ochre} />
      <Sprig x={72} y={330} r={-12} s={1} />
      <Sprig x={330} y={318} r={14} s={0.95} />

      {/* Body */}
      <path d="M126 400 v-52 q0-56 74-56 t74 56 v52Z" fill={I.coral} />
      {/* Neck */}
      <rect x="184" y="248" width="32" height="34" rx="14" fill={I.skinMid} />
      {/* Head */}
      <ellipse cx="200" cy="212" rx="58" ry="64" fill={I.skin} />
      {/* Hair: bun + crown */}
      <path d="M142 208 q0-70 58-70 t58 70 q-16-34-58-34 t-58 34Z" fill={I.hair} />
      <circle cx="200" cy="126" r="30" fill={I.hair} />
      <circle cx="168" cy="142" r="17" fill={I.hair} />
      <circle cx="232" cy="142" r="17" fill={I.hair} />
      <Face cx={200} cy={210} s={1.05} />
      {/* Cream on the cheek */}
      <path d="M232 214 q16-14 22 2 t-6 26 q-14 8-20-6Z" fill={I.shell} />

      {/* Hands: one holding a tube, one at the cheek */}
      <circle cx="252" cy="252" r="19" fill={I.skin} />
      <g transform="translate(132 244) rotate(-14)">
        <circle cx="0" cy="14" r="19" fill={I.skin} />
        <path d="M-17 -58 h34 l6 56 h-46Z" fill={I.coralSoft} />
        <rect x="-14" y="-70" width="28" height="14" rx="5" fill={I.ochreDeep} />
      </g>

      {/* Floating tubes */}
      {[
        [56, 106, -20],
        [346, 128, 18],
        [340, 300, -8],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(0.62)`}>
          <path d="M-19 -46 h38 l7 66 h-52Z" fill={I.coralSoft} />
          <rect x="-15" y="-58" width="30" height="14" rx="5" fill={I.ochreDeep} />
        </g>
      ))}
    </g>
  )
}

/** A flatlay of small products. */
export function MakeupFlatlay() {
  return (
    <g>
      <Blob fill={I.sand} />
      <ellipse cx="200" cy="210" rx="140" ry="140" fill={I.shell} />
      {/* Palette */}
      <g transform="translate(120 172) rotate(-8)">
        <rect x="-62" y="-40" width="124" height="80" rx="10" fill={I.hair} />
        <rect x="-54" y="-32" width="108" height="30" rx="5" fill="#4B3830" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={-38 + i * 25} cy="18" r="11" fill={[I.coral, I.ochre, I.coralSoft, I.gold][i]} />
        ))}
      </g>
      {/* Brush */}
      <g transform="translate(268 152) rotate(28)">
        <rect x="-7" y="-6" width="14" height="96" rx="7" fill={I.ochreDeep} />
        <rect x="-9" y="-26" width="18" height="24" rx="5" fill={I.gold} />
        <path d="M-11 -26 q11 -34 22 0Z" fill={I.hair} />
      </g>
      {/* Two bullets */}
      {[
        [252, 292, I.red],
        [292, 300, I.coral],
      ].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect x="-14" y="-6" width="28" height="52" rx="7" fill={I.shell} />
          <rect x="-11" y="-34" width="22" height="30" rx="6" fill={c} />
        </g>
      ))}
      {/* Jar */}
      <g transform="translate(126 296)">
        <ellipse cx="0" cy="14" rx="38" ry="15" fill="#EFDDCE" />
        <rect x="-38" y="-14" width="76" height="30" fill="#EFDDCE" />
        <ellipse cx="0" cy="-14" rx="38" ry="15" fill={I.gold} />
      </g>
      <Sprig x={344} y={352} r={16} s={0.8} />
    </g>
  )
}

/** Perfume flacon. */
export function Perfume() {
  return (
    <g>
      <Blob fill={I.peach} />
      <circle cx="200" cy="206" r="118" fill={I.shell} opacity="0.85" />
      <g transform="translate(200 214)">
        <rect x="-58" y="-40" width="116" height="150" rx="24" fill={I.ochre} />
        <rect x="-58" y="-40" width="34" height="150" rx="20" fill={I.gold} opacity="0.55" />
        <rect x="-34" y="26" width="68" height="46" rx="8" fill={I.shell} opacity="0.85" />
        <rect x="-20" y="-64" width="40" height="26" fill={I.ochreDeep} />
        <rect x="-30" y="-92" width="60" height="32" rx="9" fill={I.hair} />
        <ellipse cx="0" cy="-92" rx="30" ry="9" fill="#4B3830" />
      </g>
      {[
        [92, 118, 0.8],
        [318, 148, 1],
        [312, 306, 0.7],
      ].map(([x, y, k], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${k})`}>
          <path d="M0 -16 L5 -5 L16 0 L5 5 L0 16 L-5 5 L-16 0 L-5 -5Z" fill={I.gold} />
        </g>
      ))}
      <Sprig x={78} y={368} r={-14} s={0.85} />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Jewellery                                                                   */
/* -------------------------------------------------------------------------- */

/** Neck and shoulders wearing a beaded necklace. */
export function Necklace() {
  return (
    <g>
      <Blob fill={I.ink} />
      {/* Shoulders + neck */}
      <path d="M60 400 q10-96 140-104 q130 8 140 104Z" fill={I.skin} />
      <path d="M162 196 h76 v70 q-38 22-76 0Z" fill={I.skinMid} />
      {/* Chin + lower face */}
      <path d="M132 92 q0 84 68 96 q68-12 68-96Z" fill={I.skin} />
      <path d="M176 118 q24-16 48 0 q-24 22-48 0Z" fill={I.red} />
      <path d="M176 118 q24 8 48 0 q-24 14-48 0Z" fill="#8E2A1E" />
      {/* Jaw line */}
      <path d="M132 96 q26 74 68 88" stroke={I.skinDeep} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />

      {/* Two strands of pearls */}
      {[
        { r: 96, y: 268, n: 15, rr: 11 },
        { r: 124, y: 268, n: 18, rr: 11 },
      ].map((row, ri) => (
        <g key={ri}>
          {Array.from({ length: row.n }).map((_, i) => {
            const t = i / (row.n - 1)
            const a = Math.PI * (0.12 + t * 0.76)
            return (
              <ellipse
                key={i}
                cx={200 - Math.cos(a) * row.r}
                cy={row.y - 74 + Math.sin(a) * row.r * 0.92}
                rx={row.rr}
                ry={row.rr * 0.78}
                fill={I.shell}
              />
            )
          })}
        </g>
      ))}
      {/* Drop */}
      <ellipse cx="200" cy="316" rx="11" ry="9" fill={I.shell} />
      <path d="M200 330 c 26 12 30 44 12 58 a24 24 0 0 1 -24 0 c -18 -14 -14 -46 12 -58Z" fill={I.shell} />
      <path d="M200 340 c 18 10 21 33 8 43 a17 17 0 0 1 -16 0 c -13 -10 -10 -33 8 -43Z" fill={I.leafSoft} />
    </g>
  )
}

/** A wrist stacked with bangles. */
export function Bangles() {
  return (
    <g>
      <Blob fill={I.peach} />
      <circle cx="200" cy="200" r="116" fill={I.shell} opacity="0.7" />
      {/* Forearm running corner to corner */}
      <g transform="translate(200 200) rotate(-32)">
        <rect x="-150" y="-40" width="230" height="80" rx="40" fill={I.skin} />
        <rect x="-150" y="8" width="230" height="32" rx="16" fill={I.skinMid} opacity="0.55" />
        {/* Hand */}
        <ellipse cx="104" cy="0" rx="42" ry="44" fill={I.skin} />
        {[-22, -6, 10, 25].map((y, i) => (
          <rect key={i} x="120" y={y - 6} width="42" height="13" rx="6.5" fill={I.skin} />
        ))}
        {/* Bangles across the wrist */}
        {[-88, -70, -52, -34, -16, 2].map((x, i) => (
          <g key={x}>
            <ellipse
              cx={x}
              cy="0"
              rx="10"
              ry="45"
              fill="none"
              stroke={[I.coral, I.gold, I.red, I.ochre, I.gold, I.coralSoft][i]}
              strokeWidth="9"
            />
          </g>
        ))}
        {/* Mehendi hint on the back of the hand */}
        <circle cx="104" cy="0" r="13" fill={I.ochreDeep} opacity="0.35" />
        <path d="M88 -18 q16 12 32 0" stroke={I.ochreDeep} strokeWidth="3.5" fill="none" opacity="0.4" strokeLinecap="round" />
      </g>
      <Sprig x={334} y={366} r={12} s={0.75} />
    </g>
  )
}

/** A pair of jhumka earrings. */
export function Earrings() {
  return (
    <g>
      <Blob fill={I.blush} />
      <circle cx="200" cy="198" r="112" fill={I.shell} opacity="0.75" />
      {[136, 264].map((x, k) => (
        <g key={x} transform={`translate(${x} 116)`}>
          {/* Hook, stud, dome, rim, fringe — stacked so the piece is continuous.
              These used to be spaced apart and read as three floating parts. */}
          <path d="M0 0 a18 18 0 1 1 0.1 0" fill="none" stroke={I.gold} strokeWidth="7" />
          <rect x="-3" y="16" width="6" height="14" fill={I.gold} />
          <circle cx="0" cy="34" r="11" fill={I.gold} />
          <circle cx="0" cy="34" r="5" fill={I.red} opacity={k ? 0.9 : 1} />
          <path d="M-36 78 A36 36 0 0 1 36 78Z" fill={I.ochre} />
          <path d="M-36 78 h72 a5 5 0 0 1 0 10 h-72 a5 5 0 0 1 0-10Z" fill={I.goldDeep} />
          {Array.from({ length: 7 }).map((_, i) => (
            <circle key={i} cx={-30 + i * 10} cy={95 + (i % 2) * 6} r="6" fill={I.shell} />
          ))}
        </g>
      ))}
      {[
        [78, 300, 0.9],
        [326, 288, 0.7],
      ].map(([x, y, s], i) => (
        <path
          key={i}
          d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4Z"
          fill={I.gold}
          transform={`translate(${x} ${y}) scale(${s})`}
        />
      ))}
    </g>
  )
}

/** A bride in jewellery — wedding. */
export function Bride() {
  return (
    <g>
      <Blob fill={I.red} />
      <ellipse cx="200" cy="214" rx="120" ry="128" fill={I.coral} opacity="0.55" />
      {/* Body + dupatta */}
      <path d="M112 400 v-46 q0-62 88-62 t88 62 v46Z" fill={I.ochre} />
      <path d="M266 400 q26-88 6-134 q40 44 40 134Z" fill={I.red} />
      {/* Neck + head */}
      <rect x="182" y="240" width="36" height="38" rx="16" fill={I.skinMid} />
      <ellipse cx="200" cy="200" rx="58" ry="64" fill={I.skin} />
      {/* Long dark hair either side */}
      <path d="M142 196 q0-72 58-72 t58 72 v106 q-22-14-22-84 q-36 20-72 0 q0 70-22 84Z" fill={I.hair} />
      <Face cx={200} cy={198} s={1.05} />
      {/* Bindi + maang tikka */}
      <circle cx="200" cy="166" r="6" fill={I.red} />
      <path d="M200 140 v-18" stroke={I.gold} strokeWidth="3" />
      <circle cx="200" cy="120" r="8" fill={I.gold} />
      {/* Jhumkas */}
      {[-56, 56].map((dx) => (
        <g key={dx} transform={`translate(${200 + dx} 216)`}>
          <circle cx="0" cy="0" r="7" fill={I.gold} />
          <path d="M-14 6 a14 14 0 0 0 28 0Z" fill={I.gold} />
        </g>
      ))}
      {/* Necklace */}
      <path d="M164 268 q36 34 72 0" stroke={I.gold} strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="200" cy="292" r="11" fill={I.gold} />
      <circle cx="200" cy="292" r="5" fill={I.red} />
      <Confetti seed={4} count={9} />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Gifting                                                                     */
/* -------------------------------------------------------------------------- */

/** A hand holding out a wrapped gift, confetti everywhere. */
export function GiftHand() {
  return (
    <g>
      <Blob fill={I.cream} />
      <Confetti seed={2} count={20} />
      <g transform="translate(196 176) rotate(-16)">
        <rect x="-84" y="-70" width="168" height="140" rx="12" fill={I.ochre} />
        {[-70, -42, -14, 14, 42, 70].map((x) => (
          <rect key={x} x={x} y="-70" width="13" height="140" fill={I.ochreDeep} opacity="0.45" />
        ))}
        <rect x="-84" y="-16" width="168" height="26" fill={I.coral} />
        <rect x="-13" y="-70" width="26" height="140" fill={I.coral} />
        <path d="M-6 -20 q-46-34-58-4 q-4 22 58 22 q62 0 58-22 q-12-30-58 4Z" fill={I.red} />
        <circle cx="0" cy="-14" r="14" fill={I.coral} />
      </g>
      {/* Hand + cuff from the lower right */}
      <path d="M400 400 q-56-8-96-44 q-26-24-6-40 q18-14 42 4 q-30-30-8-44 q20-12 44 16 q26 30 52 40Z" fill={I.skin} />
      <path d="M330 400 q34-14 70-6 v6Z" fill={I.hair} />
    </g>
  )
}

/** A stack of wrapped boxes with ribbon. */
export function GiftStack() {
  return (
    <g>
      <Blob fill={I.sand} />
      <Confetti seed={5} count={12} />
      {/* Big box */}
      <g transform="translate(186 268)">
        <rect x="-92" y="-64" width="184" height="128" rx="10" fill={I.coral} />
        <rect x="-92" y="-64" width="184" height="24" rx="8" fill={I.red} />
        <rect x="-14" y="-64" width="28" height="128" fill={I.gold} />
        <rect x="-92" y="-14" width="184" height="20" fill={I.gold} />
      </g>
      {/* Small box on top */}
      <g transform="translate(178 148) rotate(-6)">
        <rect x="-58" y="-46" width="116" height="88" rx="9" fill={I.shell} />
        <rect x="-58" y="-46" width="116" height="18" rx="7" fill="#EFDDCE" />
        <rect x="-9" y="-46" width="18" height="88" fill={I.ochre} />
        <path d="M-4 -50 q-34-26-44-3 q-3 16 44 16 q47 0 44-16 q-10-23-44 3Z" fill={I.ochre} />
        <circle cx="0" cy="-46" r="11" fill={I.ochreDeep} />
      </g>
      {/* Ribbon spool */}
      <g transform="translate(322 320)">
        <circle cx="0" cy="0" r="34" fill={I.coralSoft} />
        <circle cx="0" cy="0" r="12" fill={I.shell} />
        <path d="M30 14 q28 18 44 6" stroke={I.coralSoft} strokeWidth="9" fill="none" strokeLinecap="round" />
      </g>
    </g>
  )
}

/** Wrapping paper rolls and ribbon — a texture plate. */
export function WrapTexture() {
  return (
    <g>
      <Blob fill={I.blush} />
      {[
        [118, 210, I.coral, -8],
        [180, 196, I.ochre, 4],
        [244, 212, I.shell, -3],
        [304, 200, I.coralSoft, 7],
      ].map(([x, y, c, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect x="-26" y="-118" width="52" height="252" rx="26" fill={c} />
          <ellipse cx="0" cy="-118" rx="26" ry="11" fill="#00000018" />
          {i % 2 === 0 && (
            <>
              <circle cx="-8" cy="-60" r="6" fill="#ffffff55" />
              <circle cx="10" cy="-10" r="6" fill="#ffffff55" />
              <circle cx="-6" cy="46" r="6" fill="#ffffff55" />
            </>
          )}
        </g>
      ))}
      {/* Ribbon curl across the front */}
      <path
        d="M40 330 q60-44 120 0 t120 0 q40-28 84-6"
        stroke={I.gold}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Festival                                                                    */
/* -------------------------------------------------------------------------- */

/** A woman holding a lit diya. */
export function DiyaWoman() {
  return (
    <g>
      <Blob fill={I.sand} />
      <circle cx="200" cy="196" r="122" fill={I.ochre} opacity="0.35" />
      {/* Body */}
      <path d="M112 400 v-48 q0-62 88-62 t88 62 v48Z" fill={I.ochreDeep} />
      <path d="M270 400 q22-80 8-124 q36 40 36 124Z" fill={I.red} />
      {[
        [162, 336],
        [200, 356],
        [240, 336],
      ].map(([x, y], i) => (
        <path key={i} d="M0 -16 L14 0 L0 16 L-14 0Z" fill={I.ochre} transform={`translate(${x} ${y})`} />
      ))}
      {/* Neck + head */}
      <rect x="184" y="238" width="32" height="36" rx="14" fill={I.skinMid} />
      <ellipse cx="200" cy="198" rx="56" ry="62" fill={I.skin} />
      <path d="M144 194 q0-70 56-70 t56 70 v96 q-20-12-20-78 q-36 18-72 0 q0 66-20 78Z" fill={I.hair} />
      <Face cx={200} cy={196} s={1} />
      <circle cx="200" cy="164" r="5.5" fill={I.red} />
      {/* Hands cupping the lamp */}
      <ellipse cx="168" cy="308" rx="26" ry="19" fill={I.skin} />
      <ellipse cx="232" cy="308" rx="26" ry="19" fill={I.skin} />
      {[160, 236].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="292" rx="17" ry="5" fill="none" stroke={I.shell} strokeWidth="3" />
          <ellipse cx={x} cy="300" rx="17" ry="5" fill="none" stroke={I.shell} strokeWidth="3" />
        </g>
      ))}
      {/* Diya */}
      <path d="M168 300 q32 24 64 0 q-8 18-32 18 t-32-18Z" fill="#7A3E22" />
      <circle cx="200" cy="286" r="20" fill={I.gold} opacity="0.5" />
      <path d="M200 262 q11 12 0 24 q-11-12 0-24Z" fill={I.ochre} />
      <path d="M200 268 q6 8 0 16 q-6-8 0-16Z" fill="#FFF3C4" />
    </g>
  )
}

/** Rows of lit lamps — festival décor. */
export function Diyas() {
  return (
    <g>
      <Blob fill={I.ink} />
      {[
        [200, 150, 1.25],
        [116, 236, 1],
        [284, 236, 1],
        [160, 318, 0.85],
        [240, 318, 0.85],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <circle cx="0" cy="-16" r="40" fill={I.ochre} opacity="0.22" />
          <path d="M-42 0 q42 30 84 0 q-10 26-42 26 t-42-26Z" fill="#7A3E22" />
          <path d="M-42 0 q42 14 84 0 q-42 10-84 0Z" fill="#5C2C16" />
          <path d="M0 -34 q14 16 0 32 q-14-16 0-32Z" fill={I.gold} />
          <path d="M0 -26 q8 10 0 20 q-8-10 0-20Z" fill="#FFF3C4" />
        </g>
      ))}
      {/* Rangoli dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <circle key={i} cx={200 + Math.cos(a) * 156} cy={240 + Math.sin(a) * 132} r="6" fill={I.coral} opacity="0.8" />
      })}
    </g>
  )
}

/** A string of warm bulbs. */
export function FairyLights() {
  return (
    <g>
      <Blob fill={I.ink} />
      {[0, 1, 2].map((row) => {
        const y = 108 + row * 92
        return (
          <g key={row}>
            <path d={`M-10 ${y} q 110 ${58 + row * 8} 210 0 q 100 -${58 + row * 8} 210 0`} stroke={I.line} strokeWidth="3" fill="none" />
            {Array.from({ length: 9 }).map((_, i) => {
              const t = i / 8
              const x = -10 + t * 420
              const sag = Math.sin(t * Math.PI * 2) * (30 + row * 6)
              return (
                <g key={i} transform={`translate(${x} ${y + sag})`}>
                  <circle cx="0" cy="22" r="20" fill={I.ochre} opacity="0.2" />
                  <rect x="-4" y="0" width="8" height="8" fill={I.goldDeep} />
                  <circle cx="0" cy="18" r="11" fill={[I.gold, I.ochre, I.coral][(i + row) % 3]} />
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}

/** A haldi thali. */
export function Haldi() {
  return (
    <g>
      <Blob fill={I.ochre} />
      <ellipse cx="200" cy="226" rx="140" ry="140" fill={I.shell} opacity="0.55" />
      {/* Thali */}
      <ellipse cx="200" cy="240" rx="132" ry="106" fill="#D9C6A8" />
      <ellipse cx="200" cy="228" rx="118" ry="94" fill="#EADCC2" />
      {/* Turmeric mound */}
      <ellipse cx="200" cy="234" rx="66" ry="52" fill={I.ochre} />
      <ellipse cx="188" cy="222" rx="40" ry="30" fill="#F2BB56" />
      {/* Small bowls */}
      {[
        [104, 190, I.red],
        [296, 190, '#B33B2A'],
        [200, 128, I.coral],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="30" ry="23" fill="#D9C6A8" />
          <ellipse cx={x} cy={y - 4} rx="23" ry="17" fill={c} />
        </g>
      ))}
      {/* Leaves tucked into the rim */}
      <ellipse cx="292" cy="288" rx="34" ry="15" fill={I.leaf} transform="rotate(18 292 288)" />
      <ellipse cx="118" cy="290" rx="34" ry="15" fill={I.leafSoft} transform="rotate(-18 118 290)" />
    </g>
  )
}

/** Mehendi-decorated hands. */
export function Mehendi() {
  return (
    <g>
      <Blob fill={I.peach} />
      <circle cx="200" cy="204" r="118" fill={I.shell} opacity="0.7" />
      {[
        [140, 1],
        [262, -1],
      ].map(([x, flip], k) => (
        <g key={k} transform={`translate(${x} 214) scale(${flip} 1)`}>
          <path d="M-42 120 q-14-84 8-124 q22-38 62-30 q22 6 18 34 q-6 40-18 60 v60Z" fill={I.skin} />
          {[-30, -12, 6, 24].map((dx, i) => (
            <rect key={i} x={dx} y={-124 - i * 6} width="15" height="66" rx="7.5" fill={I.skin} />
          ))}
          {/* Henna pattern */}
          <circle cx="-2" cy="14" r="20" fill={I.ochreDeep} opacity="0.55" />
          <circle cx="-2" cy="14" r="10" fill={I.ochreDeep} opacity="0.7" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <ellipse
                key={i}
                cx={-2 + Math.cos(a) * 30}
                cy={14 + Math.sin(a) * 30}
                rx="7"
                ry="4"
                fill={I.ochreDeep}
                opacity="0.5"
                transform={`rotate(${(a * 180) / Math.PI} ${-2 + Math.cos(a) * 30} ${14 + Math.sin(a) * 30})`}
              />
            )
          })}
          <path d="M-34 62 q34 20 66 0" stroke={I.ochreDeep} strokeWidth="5" fill="none" opacity="0.5" strokeLinecap="round" />
          {/* Bangles at the wrist */}
          {[86, 98, 110].map((y, i) => (
            <rect key={y} x="-44" y={y} width="86" height="8" rx="4" fill={[I.coral, I.gold, I.red][i]} />
          ))}
        </g>
      ))}
    </g>
  )
}

/** A hanging lantern — anniversary / quiet occasions. */
export function Lantern() {
  return (
    <g>
      <Blob fill={I.ink} />
      <g transform="translate(200 190)">
        <path d="M0 -140 v34" stroke={I.gold} strokeWidth="4" />
        <path d="M-26 -106 h52 l-8 16 h-36Z" fill={I.gold} />
        <path d="M-58 -90 h116 l-14 150 h-88Z" fill={I.ochre} />
        <path d="M-44 -74 h88 l-11 122 h-66Z" fill={I.gold} opacity="0.55" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx="0" cy={-30 + i * 40} r="13" fill="#FFF3C4" opacity="0.9" />
        ))}
        <path d="M-58 60 h116 l-10 22 h-96Z" fill={I.goldDeep} />
        <path d="M0 82 v22" stroke={I.gold} strokeWidth="4" />
        <circle cx="0" cy="112" r="9" fill={I.gold} />
        <circle cx="0" cy="-10" r="86" fill={I.ochre} opacity="0.16" />
      </g>
      {[
        [92, 300],
        [312, 268],
        [304, 348],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={I.gold} opacity="0.75" />
      ))}
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Store & apparel                                                             */
/* -------------------------------------------------------------------------- */

/** The shopfront. */
export function Shopfront() {
  return (
    <g>
      <Blob fill={I.cream} />
      {/* Building */}
      <rect x="52" y="112" width="296" height="240" rx="10" fill={I.shell} />
      {/* Awning */}
      <path d="M40 112 h320 l-22-46H62Z" fill={I.coral} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${62 + i * 46} 66 l-16 46 h27 l14-46Z`} fill={I.red} opacity="0.55" />
      ))}
      {/* Sign board */}
      <rect x="112" y="126" width="176" height="34" rx="17" fill={I.ochre} />
      <rect x="132" y="139" width="136" height="6" rx="3" fill={I.shell} opacity="0.8" />
      {/* Windows with product rows */}
      {[
        [78, 182],
        [230, 182],
      ].map(([x, y], w) => (
        <g key={w}>
          <rect x={x} y={y} width="92" height="98" rx="8" fill={I.blush} />
          {[0, 1].map((r) => (
            <g key={r}>
              <rect x={x + 8} y={y + 38 + r * 34} width="76" height="5" rx="2.5" fill={I.line} />
              {[0, 1, 2, 3].map((i) => (
                <rect
                  key={i}
                  x={x + 12 + i * 19}
                  y={y + 18 + r * 34}
                  width="12"
                  height="20"
                  rx="4"
                  fill={[I.coral, I.gold, I.coralSoft, I.ochre][(i + r) % 4]}
                />
              ))}
            </g>
          ))}
        </g>
      ))}
      {/* Door */}
      <rect x="176" y="248" width="48" height="104" rx="8" fill={I.ochreDeep} />
      <circle cx="214" cy="302" r="4" fill={I.gold} />
      {/* Planters */}
      {[62, 338].map((x) => (
        <g key={x}>
          <path d={`M${x - 18} 352 h36 l-5 -34 h-26Z`} fill={I.ochreDeep} />
          <circle cx={x} cy="304" r="20" fill={I.leaf} />
          <circle cx={x - 13} cy="316" r="13" fill={I.leafSoft} />
        </g>
      ))}
      <Confetti seed={7} count={7} />
    </g>
  )
}

/** Shelving of products — the interior. */
export function ShelfWall() {
  return (
    <g>
      <Blob fill={I.sand} />
      <rect x="54" y="86" width="292" height="242" rx="12" fill={I.shell} />
      {[0, 1, 2].map((r) => {
        const y = 132 + r * 70
        return (
          <g key={r}>
            <rect x="70" y={y} width="260" height="8" rx="4" fill={I.ochreDeep} />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const x = 84 + i * 42
              const kind = (i + r) % 3
              const c = [I.coral, I.gold, I.coralSoft, I.ochre, I.red, I.leafSoft][(i * 2 + r) % 6]
              if (kind === 0)
                return (
                  <g key={i}>
                    <rect x={x} y={y - 40} width="20" height="40" rx="6" fill={c} />
                    <rect x={x + 5} y={y - 50} width="10" height="12" rx="3" fill={I.goldDeep} />
                  </g>
                )
              if (kind === 1) return <rect key={i} x={x - 2} y={y - 30} width="26" height="30" rx="5" fill={c} />
              return (
                <g key={i}>
                  <rect x={x - 1} y={y - 22} width="24" height="22" rx="10" fill={c} />
                  <rect x={x + 4} y={y - 28} width="14" height="8" rx="4" fill={I.gold} />
                </g>
              )
            })}
          </g>
        )
      })}
      <rect x="54" y="328" width="292" height="16" rx="8" fill={I.ochreDeep} />
    </g>
  )
}

/** Folded garments on a rail — innerwear, handled plainly. */
export function Garments() {
  return (
    <g>
      <Blob fill={I.blush} />
      {/* Rail */}
      <rect x="56" y="118" width="288" height="7" rx="3.5" fill={I.line} />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 92 + i * 54
        const c = [I.shell, I.peach, I.coralSoft, I.sand, I.shell][i]
        return (
          <g key={i}>
            {/* Hanger */}
            <path d={`M${x} 125 v14`} stroke={I.line} strokeWidth="3" />
            <path d={`M${x - 22} 152 L${x} 139 L${x + 22} 152`} stroke={I.line} strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Garment */}
            <path d={`M${x - 26} 152 q26 -8 52 0 l8 96 q-34 12 -68 0Z`} fill={c} />
            <path d={`M${x - 26} 152 q26 10 52 0`} stroke="#00000012" strokeWidth="4" fill="none" />
          </g>
        )
      })}
      {/* Folded stack below */}
      <g transform="translate(200 312)">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={-80 + i * 3} y={i * 24} width="160" height="20" rx="9" fill={[I.peach, I.shell, I.sand][i]} />
        ))}
      </g>
    </g>
  )
}

/** A dressing mirror with a stool. */
export function MirrorScene() {
  return (
    <g>
      <Blob fill={I.peach} />
      {/* Mirror */}
      <path d="M200 66 q78 0 78 96 t-78 128 q-78-32-78-128 t78-96Z" fill={I.gold} />
      <path d="M200 82 q64 0 64 80 t-64 110 q-64-30-64-110 t64-80Z" fill={I.shell} />
      <path d="M156 234 q10-72 56-108" stroke="#ffffff" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.85" />
      {/* Stand */}
      <rect x="192" y="290" width="16" height="46" fill={I.goldDeep} />
      <path d="M158 344 h84 a8 8 0 0 1 0 14 h-84 a8 8 0 0 1 0-14Z" fill={I.goldDeep} />
      {/* Stool */}
      <g transform="translate(316 300)">
        <ellipse cx="0" cy="0" rx="40" ry="15" fill={I.coral} />
        <rect x="-40" y="0" width="80" height="12" fill={I.coral} />
        {[-26, 0, 26].map((x) => (
          <rect key={x} x={x - 3} y="12" width="6" height="44" fill={I.goldDeep} />
        ))}
      </g>
      {/* Little tray of pieces */}
      <g transform="translate(88 316)">
        <ellipse cx="0" cy="0" rx="42" ry="16" fill={I.shell} />
        <circle cx="-16" cy="-6" r="8" fill={I.gold} />
        <circle cx="4" cy="-9" r="7" fill={I.coral} />
        <circle cx="22" cy="-5" r="6" fill={I.red} />
      </g>
    </g>
  )
}

/** A shop counter with a basket — the "everything else" plate. */
export function CounterScene() {
  return (
    <g>
      <Blob fill={I.cream} />
      <rect x="66" y="200" width="268" height="118" rx="10" fill={I.ochreDeep} />
      <rect x="52" y="182" width="296" height="24" rx="12" fill={I.shell} />
      {[104, 148, 192, 236, 280].map((x) => (
        <rect key={x} x={x} y="216" width="10" height="86" rx="5" fill="#00000018" />
      ))}
      {/* Basket of products on top */}
      <g transform="translate(146 150)">
        <path d="M-52 32 h104 l-10 -52 h-84Z" fill={I.coral} />
        <path d="M-40 -20 q40 -46 80 0" stroke={I.coral} strokeWidth="8" fill="none" />
        <circle cx="-18" cy="-6" r="14" fill={I.gold} />
        <circle cx="12" cy="-10" r="12" fill={I.shell} />
        <rect x="24" y="-18" width="18" height="24" rx="5" fill={I.red} />
      </g>
      {/* Gift on the counter */}
      <g transform="translate(272 156)">
        <rect x="-38" y="-26" width="76" height="52" rx="7" fill={I.ochre} />
        <rect x="-6" y="-26" width="12" height="52" fill={I.coral} />
        <rect x="-38" y="-6" width="76" height="10" fill={I.coral} />
        <circle cx="0" cy="-30" r="10" fill={I.red} />
      </g>
      <Confetti seed={9} count={8} />
    </g>
  )
}
