import { forwardRef } from 'react'

/**
 * The cartoon shop — artwork only.
 * --------------------------------
 * A single hand-built SVG stage. Everything that moves carries an id so the
 * timeline in `CartoonFilm.jsx` can drive it; nothing in here animates itself.
 *
 * DRAWING CONVENTIONS
 *  · viewBox is 1200 × 640. The floor line is y = 520.
 *  · Each character is a `<g>` whose origin is its own feet, so the timeline
 *    can translate the whole figure and rotate limbs independently.
 *  · Limb rotation origins are set in CSS (`transform-box: fill-box`) rather
 *    than by nudging path coordinates — much easier to re-pose.
 *  · Depth order: wall → shelves → shopkeeper → counter → customer → props.
 *    The counter drawing therefore hides the shopkeeper's legs, which is what
 *    lets him stand "behind" it without any masking.
 */

/* -------------------------------------------------------------------------- */
/* Palette — deliberately more saturated than the page around it.             */
/* -------------------------------------------------------------------------- */

const C = {
  wallTop: '#FFF6EA',
  wallBottom: '#FBE3C8',
  floor: '#E9CFA8',
  floorDark: '#DFBF92',
  wood: '#C98F4E',
  woodDark: '#A9743B',
  counterTop: '#F6E7CB',
  gold: '#D8A94A',
  goldDeep: '#A87C2A',
  coral: '#F2734F',
  coralDeep: '#D2543A',
  saffron: '#F2A93B',
  rose: '#E88E76',
  roseDeep: '#C96B55',
  cream: '#FFF8EC',
  leaf: '#8FA86B',
  ink: '#3A2A20',
  skinA: '#EBC29A',
  skinB: '#DFAE7E',
  hair: '#2C1E17',
  blush: '#F0A288',
  terracotta: '#C9733F',
  /* The shopkeeper's shirt. The one cool colour on the page — a warm shirt
     on a warm wall is how he ended up with no visible arms. */
  shirt: '#34434F',
  shirtDeep: '#25313A',
  /* Sleeve. Deliberately much lighter than the shirt — one shade off is not
     enough, the arm has to read against the body as well as the wall. */
  shirtSleeve: '#5A7385',
}

/* -------------------------------------------------------------------------- */
/* Small parts                                                                 */
/* -------------------------------------------------------------------------- */

/** A bottle / jar / box on a shelf. Deterministic, no randomness at runtime. */
function ShelfItem({ x, y, kind, fill }) {
  if (kind === 0)
    return (
      <g>
        <rect x={x} y={y - 30} width="17" height="30" rx="4" fill={fill} />
        <rect x={x + 5} y={y - 38} width="7" height="9" rx="2" fill={C.goldDeep} />
        <rect x={x + 2} y={y - 25} width="11" height="7" rx="2" fill="#fff" opacity="0.55" />
      </g>
    )
  if (kind === 1)
    return (
      <g>
        <rect x={x} y={y - 22} width="24" height="22" rx="3" fill={fill} />
        <rect x={x} y={y - 14} width="24" height="3" fill={C.gold} />
      </g>
    )
  return (
    <g>
      <rect x={x} y={y - 16} width="21" height="16" rx="7" fill={fill} />
      <rect x={x + 4} y={y - 21} width="13" height="6" rx="3" fill={C.gold} />
    </g>
  )
}

function ShelfBay({ x, y, w = 300, rows = 3 }) {
  const fills = [C.coral, C.saffron, C.rose, C.cream, C.gold, C.leaf, C.coralDeep]
  return (
    <g>
      <rect x={x} y={y} width={w} height={rows * 74 + 12} rx="10" fill="#F3E2C6" />
      <rect x={x + 6} y={y + 6} width={w - 12} height={rows * 74} rx="6" fill="#EAD4B0" />
      {Array.from({ length: rows }).map((_, r) => {
        const shelfY = y + 12 + (r + 1) * 74 - 12
        return (
          <g key={r}>
            <rect x={x + 6} y={shelfY} width={w - 12} height="8" rx="4" fill={C.wood} />
            <rect x={x + 6} y={shelfY} width={w - 12} height="3" rx="1.5" fill={C.gold} opacity="0.8" />
            {Array.from({ length: 6 }).map((__, i) => (
              <ShelfItem
                key={i}
                x={x + 22 + i * ((w - 54) / 6)}
                y={shelfY}
                kind={(r * 7 + i * 3) % 3}
                fill={fills[(r * 5 + i * 2) % fills.length]}
              />
            ))}
          </g>
        )
      })}
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Characters                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * One arm: sleeve to the elbow, skin from there, a cuff where they meet.
 *
 * ⚠ This lives at module scope on purpose. Defined inside `Character` it was
 * a new component type on every render, so React threw the arm nodes away and
 * built new ones each time the film changed beat — and GSAP, still holding the
 * old detached nodes, animated nothing. The arms never moved and every prop
 * appeared to float on its own. Keep it out here.
 */
function Arm({ id, side, skin, sleeve, bangles = false }) {
  const back = side === 'Back'
  return (
    <g id={`${id}-arm${back ? 'Back' : 'Front'}`} className="limb">
      {/* Upper arm: shoulder (0,0) → elbow (0,60) */}
      <rect x="-10" y="0" width="20" height="62" rx="10" fill={sleeve} />
      {/* Static offset to the elbow, so the rotating group's own origin *is*
          the joint. Nothing has to work out where the pivot should be. */}
      <g transform="translate(0 60)">
        <g id={`${id}-elbow${back ? 'Back' : 'Front'}`} className="joint">
          {/* The sleeve hem, so cloth visibly meets skin at the elbow */}
          <rect x="-11" y="-6" width="22" height="10" rx="5" fill={sleeve} />
          <rect x="-9" y="0" width="18" height="58" rx="9" fill={skin} />
          {bangles && !back && (
            <g>
              <rect x="-10" y="34" width="20" height="3.5" rx="1.75" fill={C.gold} />
              <rect x="-10" y="40" width="20" height="3.5" rx="1.75" fill={C.coralDeep} />
              <rect x="-10" y="46" width="20" height="3.5" rx="1.75" fill={C.gold} />
            </g>
          )}
          <circle id={back ? `${id}-handBack` : `${id}-hand`} cx="0" cy="58" r="12" fill={skin} />
        </g>
      </g>
    </g>
  )
}

/**
 * A character.
 * ------------
 * Flat, in the same language as the rest of the drawings on the page — the
 * earlier version carried gradient shading on every limb, and against flat
 * artwork it read as polished wood rather than as a person.
 *
 * Two rules learned the hard way, both of which made the arms look broken:
 *
 * 1. A SLEEVE MUST NOT MATCH THE TORSO. When it did, the upper arm vanished
 *    into the body and the pale forearm beyond it read as a loose bone
 *    floating off the chest. `sleeve` is always a shade off `outfit`.
 * 2. A FIGURE MUST NOT MATCH THE WALL. The shopkeeper was a cream kurta on a
 *    cream wall, so he had no arms at all. He wears the one cool colour in
 *    the palette; she wears the coral. Neither can disappear.
 *
 * The geometry is fixed, because the timeline computes hand positions from
 * it (see the note in `CartoonFilm.jsx`). Each arm is placed shoulder-first at
 * (±27, −172) and drawn downward from its own origin:
 *   upper arm 60 long · forearm 58 long · hand at the end of the forearm
 *
 * @param id      prefix for every animatable node ("cust" | "shop")
 * @param skin    flat skin fill
 * @param outfit  garment fill
 * @param sleeve  sleeve fill — must differ from `outfit`, see above
 * @param trim    garment trim fill
 * @param saree   draped skirt + pallu instead of a shirt + trousers
 */
function Character({ id, skin, outfit, sleeve, trim, saree = false, hairBun = false }) {
  const SKIN = skin
  const CLOTH = outfit
  const SLEEVE = sleeve

  return (
    <g id={`${id}-root`}>
      {/* Contact shadow */}
      <ellipse id={`${id}-shadow`} cx="4" cy="6" rx="52" ry="11" fill="#8A6136" opacity="0.22" />

      {/* Back arm — far shoulder, drawn before the torso and knocked back. */}
      <g transform="translate(-27 -172)" opacity="0.82">
        <Arm id={id} side="Back" skin={SKIN} sleeve={SLEEVE} bangles={saree} />
      </g>

      {/* Lower body */}
      {saree ? (
        <g id={`${id}-skirt`}>
          <path d="M-30 -108 L30 -108 L46 -4 Q0 8 -46 -4 Z" fill={trim === C.gold ? C.coralDeep : trim} />
          <path d="M-46 -4 Q0 8 46 -4 L44 -16 Q0 -5 -44 -16 Z" fill={C.gold} />
        </g>
      ) : (
        <g>
          <rect x="-24" y="-112" width="21" height="110" rx="10" fill="#3C4A54" />
          <rect x="4" y="-112" width="21" height="110" rx="10" fill="#3C4A54" />
          <ellipse cx="-13" cy="-3" rx="16" ry="8" fill={C.hair} />
          <ellipse cx="15" cy="-3" rx="16" ry="8" fill={C.hair} />
        </g>
      )}

      {/* Torso */}
      <g id={`${id}-torso`}>
        <path
          d={
            saree
              ? 'M-31 -197 Q0 -206 31 -197 L34 -112 Q0 -104 -34 -112 Z'
              : 'M-33 -197 Q0 -206 33 -197 L35 -104 Q0 -96 -35 -104 Z'
          }
          fill={CLOTH}
        />
        {saree ? (
          /* Pallu over the shoulder — one flat band, no shading. */
          <path d="M-27 -196 Q-42 -160 -38 -104 L-20 -108 Q-24 -156 -12 -192 Z" fill={C.gold} />
        ) : (
          <>
            {/* Collar and placket. A shirt needs both or it reads as a slab. */}
            <path d="M-13 -197 L0 -182 L13 -197 L6 -203 H-6 Z" fill={C.cream} />
            <rect x="-2.5" y="-186" width="5" height="82" rx="2.5" fill="#00000022" />
            {[-168, -148, -128].map((y) => (
              <circle key={y} cx="0" cy={y} r="2.6" fill={trim} />
            ))}
          </>
        )}

        {/* Head */}
        <g id={`${id}-head`}>
          <rect x="-8" y="-214" width="16" height="20" rx="7" fill={SKIN} />
          <ellipse cx="0" cy="-244" rx="31" ry="34" fill={SKIN} />
          <circle cx="-29" cy="-242" r="7" fill={SKIN} />
          <circle cx="29" cy="-242" r="7" fill={SKIN} />

          {/* Hair. Hers: a cap, a low bun and a plait — the three-bun cluster
              the earlier version had read as a helmet. */}
          {hairBun ? (
            <>
              <path d="M26 -250 Q44 -224 38 -170 Q26 -162 18 -172 Q30 -206 16 -240 Z" fill={C.hair} />
              <path d="M-32 -248 Q-30 -282 0 -282 Q30 -282 32 -248 Q20 -264 0 -264 Q-20 -264 -32 -248 Z" fill={C.hair} />
              <circle cx="30" cy="-258" r="13" fill={C.hair} />
              <circle cx="0" cy="-272" r="4" fill={C.gold} />
              <g id={`${id}-earrings`}>
                <circle cx="-31" cy="-234" r="4" fill={C.gold} />
                <path d="M-37 -232 a6 6 0 0 0 12 0 z" fill={C.gold} />
                <circle cx="31" cy="-234" r="4" fill={C.gold} />
                <path d="M25 -232 a6 6 0 0 0 12 0 z" fill={C.gold} />
              </g>
            </>
          ) : (
            <>
              <path d="M-32 -250 Q-30 -286 0 -286 Q30 -286 32 -250 Q20 -270 0 -270 Q-20 -270 -32 -250 Z" fill={C.hair} />
              <path d="M-32 -250 Q-38 -266 -28 -274 L-22 -262 Z" fill={C.hair} />
            </>
          )}

          {/* Face */}
          <g id={`${id}-eyes`}>
            <ellipse cx="-11" cy="-246" rx="4.1" ry="5.2" fill={C.ink} />
            <ellipse cx="11" cy="-246" rx="4.1" ry="5.2" fill={C.ink} />
            <circle cx="-9.7" cy="-248" r="1.5" fill="#fff" />
            <circle cx="12.3" cy="-248" r="1.5" fill="#fff" />
          </g>
          <path d="M-16 -258 Q-11 -262 -6 -258" stroke={C.hair} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M6 -258 Q11 -262 16 -258" stroke={C.hair} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle cx="-19" cy="-236" r="7.5" fill={C.blush} opacity="0.6" />
          <circle cx="19" cy="-236" r="7.5" fill={C.blush} opacity="0.6" />
          <path id={`${id}-mouth`} d="M-8 -232 Q0 -224 8 -232" stroke={C.ink} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          {saree && <circle cx="0" cy="-268" r="3" fill={C.coralDeep} />}
        </g>
      </g>

      {/* Front arm — the near shoulder, and the one that does the work. */}
      <g transform="translate(27 -172)">
        <Arm id={id} side="Front" skin={SKIN} sleeve={SLEEVE} bangles={saree} />
      </g>
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Stage                                                                       */
/* -------------------------------------------------------------------------- */

const CartoonStage = forwardRef(function CartoonStage(_, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 675"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An animated illustration of a customer buying a gift-wrapped product at Arpit Cosmetics"
    >
      <defs>
        {/* --- Character shading ------------------------------------------
            One key light, upper-left. Every ramp below points the same way,
            which is most of what separates "shaded" from "coloured in". */}
        <linearGradient id="skinA" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#F3D0AC" />
          <stop offset="0.55" stopColor={C.skinA} />
          <stop offset="1" stopColor="#CE9F73" />
        </linearGradient>
        <linearGradient id="skinB" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#EBC298" />
          <stop offset="0.55" stopColor={C.skinB} />
          <stop offset="1" stopColor="#BE8E5F" />
        </linearGradient>
        <linearGradient id="saree" x1="0.1" y1="0" x2="0.95" y2="1">
          <stop offset="0" stopColor="#FA8E6B" />
          <stop offset="0.45" stopColor={C.coral} />
          <stop offset="1" stopColor="#C9512F" />
        </linearGradient>
        <linearGradient id="kurta" x1="0.1" y1="0" x2="0.95" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor={C.cream} />
          <stop offset="1" stopColor="#DCC9A9" />
        </linearGradient>
        <linearGradient id="vest" x1="0.1" y1="0" x2="0.95" y2="1">
          <stop offset="0" stopColor="#DE8A52" />
          <stop offset="0.5" stopColor="#C9733F" />
          <stop offset="1" stopColor="#9A5228" />
        </linearGradient>
        <linearGradient id="hairG" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#4A3428" />
          <stop offset="0.4" stopColor={C.hair} />
          <stop offset="1" stopColor="#170F0B" />
        </linearGradient>
        <linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2D48A" />
          <stop offset="0.45" stopColor={C.gold} />
          <stop offset="1" stopColor={C.goldDeep} />
        </linearGradient>
        <radialGradient id="cheek" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.blush} stopOpacity="0.65" />
          <stop offset="1" stopColor={C.blush} stopOpacity="0" />
        </radialGradient>
        {/* Occlusion under a limb or a collar — a soft dark wedge. */}
        <linearGradient id="occl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000000" stopOpacity="0.22" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
        <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        {/* Background depth: the shelves sit behind the action, so they get a
            touch of defocus. Cheap stand-in for a shallow depth of field. */}
        <filter id="bgBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>

        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.wallTop} />
          <stop offset="1" stopColor={C.wallBottom} />
        </linearGradient>
        <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.floorDark} />
          <stop offset="1" stopColor={C.floor} />
        </linearGradient>
        <linearGradient id="counterG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.wood} />
          <stop offset="1" stopColor={C.woodDark} />
        </linearGradient>
        <radialGradient id="lampGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFD489" stopOpacity="0.8" />
          <stop offset="1" stopColor="#FFD489" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vig" cx="0.5" cy="0.44" r="0.74">
          <stop offset="0.52" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#8A5C22" stopOpacity="0.32" />
        </radialGradient>
      </defs>

      {/* ---------------------------------------------------------- Room --- */}
      <rect width="1200" height="675" fill="url(#wall)" />
      <rect y="545" width="1200" height="130" fill="url(#floorG)" />
      <rect y="545" width="1200" height="5" fill={C.woodDark} opacity="0.35" />

      {/* Floor tiles — the lower third was dead space without them. */}
      <g opacity="0.5">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <path
            key={i}
            d={`M${-160 + i * 170} 675 L${-40 + i * 170} 545 L${20 + i * 170} 545 L${-60 + i * 170} 675 Z`}
            fill={C.floorDark}
            opacity="0.35"
          />
        ))}
        <rect y="600" width="1200" height="2" fill={C.floorDark} opacity="0.4" />
      </g>

      {/* Runner rug leading to the counter */}
      <g>
        <path d="M300 675 L430 556 L790 556 L960 675 Z" fill="#E7C79C" />
        <path d="M340 675 L452 566 L768 566 L910 675 Z" fill="#EFD6B0" />
        <path d="M372 675 L470 578 L750 578 L872 675 Z" fill="none" stroke={C.gold} strokeWidth="3" opacity="0.7" />
      </g>

      {/* Shelves — softened, so the counter action reads as the focal plane */}
      <g filter="url(#bgBlur)" opacity="0.92">
        <ShelfBay x={34} y={178} w={300} rows={3} />
        <ShelfBay x={866} y={178} w={300} rows={3} />
      </g>

      {/* Pendant lamps */}
      {[220, 600, 980].map((x) => (
        <g key={x}>
          <rect x={x - 1.5} y="0" width="3" height="42" fill={C.goldDeep} />
          <path d={`M${x - 32} 78 L${x + 32} 78 L${x + 18} 42 L${x - 18} 42 Z`} fill={C.gold} />
          <circle cx={x} cy="84" r="9" fill="#FFE6A8" />
          <circle cx={x} cy="88" r="70" fill="url(#lampGlow)" />
        </g>
      ))}

      {/* Toran across the top */}
      <g opacity="0.95">
        <path d="M0 26 Q300 74 600 42 Q900 12 1200 44" stroke={C.leaf} strokeWidth="4" fill="none" />
        {Array.from({ length: 15 }).map((_, i) => {
          const t = i / 14
          const x = t * 1200
          const y = 26 + Math.sin(t * Math.PI * 2.1) * 24 + t * 10
          return (
            <g key={i}>
              <circle cx={x} cy={y + 12} r="11" fill={i % 3 === 1 ? C.coral : C.saffron} />
              <circle cx={x} cy={y + 12} r="5" fill={i % 3 === 1 ? C.coralDeep : C.gold} opacity="0.75" />
            </g>
          )
        })}
      </g>

      {/* Wall sign — sits in the gap between the two shelf bays */}
      <g>
        <rect x="460" y="112" width="280" height="66" rx="33" fill={C.cream} stroke={C.gold} strokeWidth="3" />
        <text x="600" y="146" textAnchor="middle" fontFamily="Georgia, serif" fontSize="27" fill={C.goldDeep}>
          Arpit Cosmetics
        </text>
        <text
          x="600"
          y="165"
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="10"
          letterSpacing="3.6"
          fill={C.coralDeep}
        >
          BEAUTY · GIFTS · JEWELLERY
        </text>
      </g>

      {/* Price board on the right wall */}
      <g>
        <rect x="884" y="428" width="264" height="96" rx="10" fill={C.cream} stroke={C.gold} strokeWidth="2.5" />
        <text x="1016" y="462" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fill={C.coralDeep}>
          Gift wrapping
        </text>
        <text x="1016" y="494" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fill={C.goldDeep}>
          always free
        </text>
        <rect x="960" y="504" width="112" height="2" fill={C.gold} />
      </g>

      {/* ------------------------------------------------ Shopkeeper -------- */}
      <g id="shop-anchor" transform="translate(700 545)">
        <Character id="shop" skin={C.skinB} outfit={C.shirt} sleeve={C.shirtSleeve} trim={C.gold} />
      </g>

      {/* ----------------------------------------------------- Counter ------ */}
      <g id="counter">
        <rect x="418" y="428" width="470" height="120" rx="10" fill="url(#counterG)" />
        <rect x="404" y="408" width="498" height="24" rx="12" fill={C.counterTop} />
        <rect x="404" y="426" width="498" height="5" fill={C.gold} opacity="0.85" />
        {[452, 532, 612, 692, 772, 852].map((x) => (
          <rect key={x} x={x} y="444" width="9" height="90" rx="4.5" fill={C.woodDark} opacity="0.38" />
        ))}
        {/* Ribbon spools */}
        <g>
          <circle cx="446" cy="390" r="18" fill={C.rose} />
          <circle cx="446" cy="390" r="6.5" fill={C.cream} />
          <circle cx="482" cy="394" r="14" fill={C.saffron} />
          <circle cx="482" cy="394" r="5" fill={C.cream} />
        </g>
        {/* Till */}
        <g>
          <rect x="806" y="360" width="80" height="48" rx="7" fill="#F3E4CA" />
          <rect x="815" y="369" width="62" height="26" rx="4" fill={C.ink} opacity="0.82" />
          <rect x="821" y="375" width="50" height="13" rx="2" fill="#FFE39F" />
        </g>
        {/* Vase of marigolds */}
        <g>
          <path d="M760 408 L766 372 L790 372 L796 408 Z" fill="#EFE0C4" />
          <circle cx="772" cy="360" r="13" fill={C.saffron} />
          <circle cx="789" cy="366" r="10" fill={C.coral} />
        </g>
        {/* Tester tray at the near end */}
        <g>
          <rect x="424" y="398" width="86" height="12" rx="6" fill={C.gold} opacity="0.85" />
          {[436, 456, 476, 496].map((x, i) => (
            <g key={x}>
              <rect x={x} y="376" width="12" height="24" rx="3" fill={[C.coral, C.coralDeep, C.rose, C.saffron][i]} />
              <rect x={x + 3} y="370" width="6" height="8" rx="2" fill={C.goldDeep} />
            </g>
          ))}
        </g>
      </g>

      {/* ------------------------------------------------- Customer --------- */}
      <g id="cust-anchor" transform="translate(340 545)">
        <Character id="cust" skin={C.skinA} outfit={C.coral} sleeve={C.coralDeep} trim={C.gold} saree hairBun />
      </g>

      {/* --------------------------------------------------- Free props ----- */}
      <g id="prop-lipstick" opacity="0" transform="translate(620 385)">
        <rect x="-9" y="-16" width="18" height="34" rx="4.5" fill={C.gold} />
        <rect x="-9" y="-2" width="18" height="6" rx="3" fill={C.goldDeep} />
        <rect x="-7" y="-34" width="14" height="20" rx="4.5" fill={C.coralDeep} />
        <path d="M-7 -32 L7 -39 L7 -30 Z" fill={C.coral} />
      </g>

      <g id="prop-note" opacity="0" transform="translate(520 385)">
        <rect x="-29" y="-15" width="58" height="30" rx="4" fill="#CFE0BA" stroke="#8FA86B" strokeWidth="2" />
        <circle cx="0" cy="0" r="8.5" fill="#F0E3C2" stroke="#8FA86B" strokeWidth="1.6" />
        <text x="0" y="5" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="12" fill="#5E7440">₹</text>
      </g>

      <g id="prop-gift" opacity="0" transform="translate(640 380)">
        <rect x="-34" y="-28" width="68" height="52" rx="6" fill={C.rose} />
        <rect x="-38" y="-38" width="76" height="16" rx="7" fill={C.roseDeep} />
        <rect x="-6" y="-38" width="12" height="62" fill={C.gold} />
        <rect x="-38" y="-6" width="76" height="10" fill={C.gold} />
        <g id="prop-bow" opacity="0">
          <ellipse cx="-15" cy="-48" rx="16" ry="10" fill={C.gold} transform="rotate(-22 -15 -48)" />
          <ellipse cx="15" cy="-48" rx="16" ry="10" fill={C.gold} transform="rotate(22 15 -48)" />
          <circle cx="0" cy="-46" r="8" fill={C.goldDeep} />
        </g>
      </g>

      <g id="prop-bag" opacity="0" transform="translate(640 380)">
        <rect x="-31" y="-34" width="62" height="76" rx="6" fill={C.cream} stroke={C.gold} strokeWidth="2.5" />
        <path d="M-16 -34 Q-16 -57 0 -57 Q16 -57 16 -34" stroke={C.goldDeep} strokeWidth="4" fill="none" />
        <rect x="-31" y="-7" width="62" height="10" fill={C.gold} />
        <text x="0" y="26" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fill={C.goldDeep}>AC</text>
      </g>

      {/* Speech bubble */}
      <g id="bubble" opacity="0">
        <rect x="-118" y="-44" width="236" height="62" rx="30" fill="#fff" stroke={C.gold} strokeWidth="2.5" />
        <path d="M-18 16 L-4 36 L10 16 Z" fill="#fff" stroke={C.gold} strokeWidth="2.5" />
        <path d="M-18 16 L10 16 Z" stroke="#fff" strokeWidth="4" />
        <text
          id="bubble-text"
          x="0"
          y="-6"
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="19"
          fontWeight="600"
          fill={C.ink}
        />
      </g>

      {/* Sparkles for the "she loves it" beat */}
      <g id="sparkles" opacity="0">
        {[
          [-44, -50, 11],
          [38, -66, 14],
          [64, -20, 8],
          [-64, -8, 9],
          [4, -86, 12],
        ].map(([x, y, r], i) => (
          <path
            key={i}
            d={`M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28} Z`}
            fill={C.gold}
          />
        ))}
      </g>

      {/* Foreground dressing — drawn last, so it reads as nearest the viewer. */}
      <g>
        {/* Planter, left */}
        <ellipse cx="118" cy="646" rx="62" ry="12" fill={C.floorDark} opacity="0.3" />
        <path d="M74 560 L162 560 L150 644 L86 644 Z" fill="#D9A863" />
        <rect x="68" y="548" width="100" height="18" rx="9" fill="#C08C48" />
        <g>
          <ellipse cx="118" cy="512" rx="34" ry="40" fill="#8FA86B" />
          <ellipse cx="88" cy="534" rx="24" ry="28" fill="#7E9A5C" />
          <ellipse cx="150" cy="532" rx="24" ry="28" fill="#9CB579" />
          <circle cx="106" cy="498" r="9" fill={C.saffron} />
          <circle cx="140" cy="520" r="7" fill={C.coral} />
        </g>

        {/* Shopping basket, right */}
        <ellipse cx="1090" cy="654" rx="58" ry="11" fill={C.floorDark} opacity="0.3" />
        <path d="M1036 578 L1144 578 L1132 648 L1048 648 Z" fill="#E0B274" />
        <rect x="1030" y="568" width="120" height="16" rx="8" fill="#C89A56" />
        {[1056, 1078, 1100, 1122].map((x) => (
          <rect key={x} x={x} y="586" width="7" height="56" rx="3.5" fill="#C89A56" opacity="0.55" />
        ))}
        <path d="M1060 568 Q1090 526 1120 568" stroke="#C89A56" strokeWidth="7" fill="none" />
        <circle cx="1064" cy="574" r="14" fill={C.coral} />
        <circle cx="1094" cy="570" r="12" fill={C.saffron} />
        <rect x="1108" y="558" width="20" height="26" rx="4" fill={C.rose} />
      </g>

      <rect width="1200" height="675" fill="url(#vig)" pointerEvents="none" />
    </svg>
  )
})

export default CartoonStage
