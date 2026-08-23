import { memo } from 'react'
import { I } from './palette'
import * as S from './scenes'
import { cn } from '../../lib/utils'

/**
 * Illustration slots.
 * -------------------
 * The site is illustrated rather than photographed. This map is the single
 * place that decides which drawing appears where — the sections still refer
 * to the same slot keys they always did, so swapping a scene is a one-line
 * change here and nothing else moves.
 *
 * `bg` is painted behind the drawing and matched to the scene's own blob, so
 * a wide crop of a square drawing never shows an edge.
 */
const SLOTS = {
  /* --- About ------------------------------------------------------------- */
  aboutPortrait: { scene: 'Shopfront', bg: I.blush, alt: 'Illustration of the Arpit Cosmetics shopfront with a striped awning and window displays' },
  aboutDetail: { scene: 'MakeupFlatlay', bg: I.cream, alt: 'Illustration of a palette, brush, lipsticks and a cream jar laid out together' },
  aboutTexture: { scene: 'WrapTexture', bg: I.peach, alt: 'Illustration of wrapping paper rolls and a ribbon' },

  /* --- Featured ---------------------------------------------------------- */
  featuredJewellery: { scene: 'Necklace', bg: I.blush, alt: 'Illustration of a two-strand pearl necklace with a drop pendant' },
  featuredLips: { scene: 'LipsLipstick', bg: I.blush, alt: 'Illustration of lips beside an open lipstick' },
  featuredHamper: { scene: 'GiftHand', bg: I.cream, alt: 'Illustration of a hand holding out a wrapped gift among confetti' },
  featuredBangles: { scene: 'Bangles', bg: I.peach, alt: 'Illustration of a wrist stacked with coloured bangles' },
  featuredPerfume: { scene: 'Perfume', bg: I.peach, alt: 'Illustration of a glass fragrance flacon' },
  featuredDecor: { scene: 'Diyas', bg: I.ink, alt: 'Illustration of lit clay diyas arranged for a festival' },

  /* --- Collections ------------------------------------------------------- */
  collectionCosmetics: { scene: 'Skincare', bg: I.blush, alt: 'Illustration of a woman applying cream to her cheek' },
  collectionJewellery: { scene: 'Earrings', bg: I.blush, alt: 'Illustration of a pair of pearl-fringed jhumka earrings' },
  collectionGifting: { scene: 'GiftStack', bg: I.sand, alt: 'Illustration of stacked wrapped gift boxes and a ribbon spool' },
  collectionFestival: { scene: 'DiyaWoman', bg: I.sand, alt: 'Illustration of a woman in traditional dress holding a lit diya' },
  collectionInnerwear: { scene: 'Garments', bg: I.blush, alt: 'Illustration of garments on a rail above a folded stack' },
  collectionSeasonal: { scene: 'ShelfWall', bg: I.sand, alt: 'Illustration of shop shelving filled with new stock' },

  /* --- Gallery ----------------------------------------------------------- */
  galleryInterior: { scene: 'CounterScene', bg: I.cream, alt: 'Illustration of the shop counter with a basket of products and a wrapped gift' },
  galleryCosmetics: { scene: 'MakeupFlatlay', bg: I.cream, alt: 'Illustration of cosmetics arranged on a pale surface' },
  galleryJewellery: { scene: 'Earrings', bg: I.blush, alt: 'Illustration of jhumka earrings' },
  galleryGifts: { scene: 'GiftHand', bg: I.cream, alt: 'Illustration of a gift being handed over' },
  galleryWrapping: { scene: 'GiftStack', bg: I.sand, alt: 'Illustration of the wrapping station with paper, boxes and ribbon' },
  galleryFestival: { scene: 'Diyas', bg: I.ink, alt: 'Illustration of a festival display of lit lamps' },
  galleryBeauty: { scene: 'ShelfWall', bg: I.sand, alt: 'Illustration of the skincare shelf' },
  galleryDecor: { scene: 'FairyLights', bg: I.ink, alt: 'Illustration of strings of warm fairy lights' },

  /* --- Festivals --------------------------------------------------------- */
  festivalDiwali: { scene: 'Diyas', bg: I.ink, alt: 'Illustration of lit diyas for Diwali' },
  festivalRakhi: { scene: 'GiftHand', bg: I.cream, alt: 'Illustration of a wrapped Rakhi gift being handed over' },
  festivalKarwa: { scene: 'DiyaWoman', bg: I.sand, alt: 'Illustration of a woman holding a lit diya for Karwa Chauth' },
  festivalWedding: { scene: 'Bride', bg: I.red, alt: 'Illustration of a bride wearing traditional jewellery' },
  festivalHaldi: { scene: 'Haldi', bg: I.ochre, alt: 'Illustration of a haldi thali with turmeric and small bowls' },
  festivalMehendi: { scene: 'Mehendi', bg: I.peach, alt: 'Illustration of hands decorated with mehendi and bangles' },
  festivalBirthday: { scene: 'GiftStack', bg: I.sand, alt: 'Illustration of birthday gift boxes and ribbon' },
  festivalAnniversary: { scene: 'Lantern', bg: I.ink, alt: 'Illustration of a glowing hanging lantern' },

  /* --- Mirror, used by the boutique story -------------------------------- */
  mirrorStation: { scene: 'MirrorScene', bg: I.peach, alt: 'Illustration of a dressing mirror with a stool and a tray of jewellery' },
}

/**
 * Renders one illustration.
 *
 * All scenes are drawn in a 400×400 box and fitted with `meet`, so the whole
 * drawing survives every container shape — square tile, tall card, wide
 * banner. The letterbox is filled with the slot's own background colour, so
 * what you see is a centred illustration on a coloured panel.
 */
function Illustration({ imageKey, alt, className, ratio, priority, sizes, imgClassName }) {
  const slot = SLOTS[imageKey] || SLOTS.aboutPortrait
  const Scene = S[slot.scene] || S.Shopfront
  const label = alt ?? slot.alt

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ backgroundColor: slot.bg, ...(ratio && ratio !== 'auto' ? { aspectRatio: ratio } : null) }}
    >
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
        className={cn('absolute inset-0 h-full w-full', imgClassName)}
        role="img"
        aria-label={label}
      >
        {/* Painted edge-to-edge behind the letterbox so the fit is invisible. */}
        <rect x="-400" y="-400" width="1200" height="1200" fill={slot.bg} />
        <Scene />
      </svg>
    </div>
  )
}

export default memo(Illustration)
export { SLOTS }
