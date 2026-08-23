/**
 * Arpit Cosmetics — single source of truth for business content.
 * ---------------------------------------------------------------
 * Every string a visitor reads lives here so copy can be revised without
 * touching a component. Placeholders that the store owner must supply are
 * marked with `TODO(owner)` — search that token before going live.
 */

/* ========================================================================== */
/* Identity                                                                    */
/* ========================================================================== */

export const brand = {
  name: 'Arpit Cosmetics',
  shortName: 'Arpit',
  tagline: 'Your Complete Beauty, Fashion & Gift Destination',
  established: '2014',
  // TODO(owner): replace with the live domain before deploying.
  domain: 'https://www.arpitcosmetics.in',
}

export const contact = {
  // The shop takes calls on one number and WhatsApp on another — they are
  // deliberately different, so do not "tidy" them into one.
  phoneDisplay: '+91 83185 93162',
  phoneHref: 'tel:+918318593162',
  whatsappNumber: '919450063366', // digits only, country code first
  whatsappDisplay: '+91 94500 63366',
  whatsappMessage:
    "Hello Arpit Cosmetics! I found you online and I'd like to ask about your collection.",
  email: 'hello@arpitcosmetics.in',
  // Straight off the shop's Google Maps listing — street, pin and place id all
  // come from the same record, so the embed, the directions link and the
  // structured data can never drift apart.
  address: {
    line1: 'Bhagwati Complex, Musafirkhana Road',
    line2: 'Munshiganj, Amethi',
    region: 'Uttar Pradesh',
    postalCode: '227412',
    country: 'India',
    full: 'Arpit Cosmetics & Gift Store, Bhagwati Complex, Amethi — Musafirkhana Rd, Munshiganj, Amethi, Uttar Pradesh 227412',
  },
  geo: { lat: 26.2134189, lng: 81.8093227 },
  mapsQuery: 'Arpit Cosmetics & Gift Store, Bhagwati Complex, Amethi - Musafirkhana Rd, Munshiganj, Amethi, Uttar Pradesh 227412',
  mapsUrl:
    'https://www.google.com/maps/dir//Arpit+Cosmetics+%26+Gift+Store,+Bhagwati+Complex,+Amethi+-+Musafirkhana+Rd,+Munshiganj,+Amethi,+Uttar+Pradesh+227412/@26.2134189,81.8093227,17z',
  hours: [
    { days: 'Monday — Saturday', time: '9:30 AM — 9:00 PM' },
    { days: 'Sunday', time: '10:00 AM — 8:00 PM' },
    { days: 'Festival Season', time: 'Extended hours — till 10:00 PM' },
  ],
  socials: [
    { label: 'Instagram', handle: '@arpitcosmetics', href: 'https://instagram.com/', icon: 'instagram' },
    { label: 'Facebook', handle: 'Arpit Cosmetics', href: 'https://facebook.com/', icon: 'facebook' },
    { label: 'WhatsApp', handle: 'Chat with us', href: 'https://wa.me/919450063366', icon: 'whatsapp' },
  ],
}

export const whatsappLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`

/* ========================================================================== */
/* Navigation                                                                  */
/* ========================================================================== */

export const navLinks = [
  { label: 'The Store', href: '#about', index: '01' },
  { label: 'Collections', href: '#collections', index: '02' },
  { label: 'The Shop', href: '#boutique', index: '03' },
  { label: 'At the Counter', href: '#counter', index: '04' },
  { label: 'The Shelf', href: '#showroom', index: '05' },
  { label: 'Featured', href: '#featured', index: '06' },
  { label: 'Gallery', href: '#gallery', index: '07' },
  { label: 'Festivals', href: '#festival', index: '08' },
  { label: 'Visit Us', href: '#contact', index: '09' },
]

/* ========================================================================== */
/* Hero                                                                        */
/* ========================================================================== */

export const hero = {
  eyebrow: 'Munshiganj · Amethi · Since 2014',
  // The brand name IS the headline — a visitor should never have to hunt for
  // whose shop this is. The old line ("Beauty worth unwrapping") now sits
  // beneath it as the subline, which is where a tagline belongs.
  headline: ['Arpit', 'Cosmetics'],
  subline: 'Beauty worth unwrapping',
  lede:
    'A boutique of cosmetics, artificial jewellery, gifts and festival treasures — curated with the patience of a small store and the polish of a great one.',
  primaryCta: { label: 'Explore Collections', href: '#collections' },
  secondaryCta: { label: 'Visit the Store', href: '#contact' },
  stats: [
    { value: 30, suffix: '+', label: 'Curated categories' },
    { value: 12000, suffix: '+', label: 'Happy customers' },
    { value: 11, suffix: ' yrs', label: 'Serving Amethi' },
  ],
}

export const marqueeWords = [
  'Cosmetics',
  'Artificial Jewellery',
  'Gift Wrapping',
  'Festival Décor',
  'Skincare',
  'Bangles',
  'Wedding Collection',
  'Daily Essentials',
  'Fragrance',
  'Hair Accessories',
]

/* ========================================================================== */
/* About                                                                       */
/* ========================================================================== */

export const about = {
  eyebrow: 'The Store',
  title: 'One address for every\noccasion you dress for',
  paragraphs: [
    'Arpit Cosmetics began as a single counter in Munshiganj with a simple idea: nobody should have to travel to a city to find something beautiful. A decade later the shelves run deeper — cosmetics and skincare, artificial jewellery and bangles, gifts, festival décor, fashion accessories and the daily essentials a household actually runs on.',
    'What has not changed is how we sell. We open the box before you buy it. We tell you when a lighter shade will suit you better. We wrap the gift while you wait, ribbon and all, at no extra cost — because the wrapping is part of the present.',
  ],
  signature: 'The Agrahari Family',
  pillars: [
    {
      title: 'Chosen by hand',
      body: 'Every shade, stone and box is picked in person at the market. Nothing reaches the shelf that we would not gift ourselves.',
    },
    {
      title: 'Priced for the town',
      body: 'City-grade selection at Amethi prices. We would rather you come back next month than overpay today.',
    },
    {
      title: 'Wrapped while you wait',
      body: 'Complimentary gift wrapping in seasonal papers, satin ribbon and a handwritten tag — finished in minutes.',
    },
  ],
}

/* ========================================================================== */
/* Collections — the 30 categories, grouped into six shopping worlds           */
/* ========================================================================== */

export const collections = [
  {
    id: 'cosmetics',
    image: 'collectionCosmetics',
    index: '01',
    title: 'Cosmetics & Skincare',
    subtitle: 'Complexion, colour and care',
    body: 'Foundations matched in daylight, lipsticks in every undertone, kajal that survives a wedding, and skincare for the seasons Amethi actually has.',
    items: ['Cosmetics', 'Beauty Products', 'Skincare', 'Beauty Accessories', 'Hair Accessories'],
    accent: 'coral',
    icon: 'lipstick',
  },
  {
    id: 'jewellery',
    image: 'collectionJewellery',
    index: '02',
    title: 'Artificial Jewellery',
    subtitle: 'Everyday sparkle, bridal weight',
    body: 'Kundan, pearl, oxidised silver and rose-gold finishes — from a single pair of studs to a full bridal set with matching bangles.',
    items: ['Artificial Jewellery', 'Bangles', 'Bracelets', 'Necklaces', 'Earrings', 'Fashion Accessories'],
    accent: 'gold',
    icon: 'necklace',
  },
  {
    id: 'gifting',
    image: 'collectionGifting',
    index: '03',
    title: 'The Gifting Atelier',
    subtitle: 'Wrapped while you wait',
    body: 'Hampers built in front of you, chosen by budget and by person. Free wrapping, ribbon, tag and a bag that looks like it cost more than it did.',
    items: ['Gift Items', 'Gift Wrapping', 'Premium Gift Packs', 'Birthday Gifts', 'Anniversary Gifts'],
    accent: 'rose',
    icon: 'gift',
  },
  {
    id: 'festival',
    image: 'collectionFestival',
    index: '04',
    title: 'Festival & Ceremony',
    subtitle: 'For the days that matter most',
    body: 'Diyas, torans, fairy lights, rangoli colours, haldi thalis and mehendi cones — restocked the week before every festival, never the week after.',
    items: [
      'Decoration Items',
      'Festival Decorations',
      'Haldi Ceremony Items',
      'Mehendi Accessories',
      'Festival Collection',
    ],
    accent: 'champagne',
    icon: 'diya',
  },
  {
    id: 'innerwear',
    image: 'collectionInnerwear',
    index: '05',
    title: 'Ladies Innerwear',
    subtitle: 'A full size range, quietly sold',
    body: 'Everyday and occasion innerwear across a full size range, chosen for fit and fabric. Sized and packed discreetly, with no fuss at the counter.',
    items: ['Ladies Innerwear', 'Ladies Undergarments', 'Panties'],
    accent: 'peach',
    icon: 'ribbon',
  },
  {
    id: 'seasonal',
    image: 'collectionSeasonal',
    index: '06',
    title: 'Seasonal & Occasion',
    subtitle: 'What is new this month',
    body: 'The front table changes with the calendar — wedding season sets, monsoon skincare, summer fragrance and whatever the town is asking for.',
    items: ['Seasonal Collection', 'Wedding Collection', 'Trending Products', 'New Arrivals', 'Daily Essentials'],
    accent: 'gold',
    icon: 'sparkle',
  },
]

/** Flat index of every category, for the marquee ribbon and the sitemap. */
export const allCategories = collections.flatMap((c) => c.items)

/* ========================================================================== */
/* Featured collection slider                                                  */
/* ========================================================================== */

export const featured = [
  {
    id: 'bridal-set',
    name: 'Bridal Kundan Set',
    family: 'Artificial Jewellery',
    note: 'Necklace, jhumkas and maang tikka in antique gold finish, with a velvet box.',
    priceFrom: '₹1,499',
    image: 'featuredJewellery',
    tone: 'gold',
  },
  {
    id: 'lip-edit',
    name: 'The Everyday Lip Edit',
    family: 'Cosmetics',
    note: 'Six wearable mattes chosen for Indian undertones — from rosewood to brick.',
    priceFrom: '₹249',
    image: 'featuredLips',
    tone: 'coral',
  },
  {
    id: 'gift-hamper',
    name: 'Signature Gift Hamper',
    family: 'Gifting',
    note: 'Fragrance, skincare and a keepsake, arranged and wrapped in our house paper.',
    priceFrom: '₹899',
    image: 'featuredHamper',
    tone: 'rose',
  },
  {
    id: 'bangle-stack',
    name: 'Glass Bangle Stack',
    family: 'Bangles',
    note: 'Twenty-four pieces, colour matched to your outfit at the counter.',
    priceFrom: '₹199',
    image: 'featuredBangles',
    tone: 'peach',
  },
  {
    id: 'fragrance',
    name: 'Fragrance Cabinet',
    family: 'Beauty',
    note: 'Body mists, attars and long-wear scents — tried on paper before you choose.',
    priceFrom: '₹349',
    image: 'featuredPerfume',
    tone: 'champagne',
  },
  {
    id: 'festive-decor',
    name: 'Festive Décor Trunk',
    family: 'Decoration',
    note: 'Diyas, torans, fairy lights and rangoli — a whole doorway in one box.',
    priceFrom: '₹599',
    image: 'featuredDecor',
    tone: 'gold',
  },
]

/* ========================================================================== */
/* The shelf — every piece drawn for the showroom                              */
/* ========================================================================== */

/**
 * Eighteen things the shop keeps in stock the whole year round, each one
 * drawn. `id` picks the drawing out of the illustration set; everything else
 * is copy, so the whole shelf can be re-ordered or re-written from here.
 *
 * Deliberately excluded: sweets and fresh flowers. Neither is stocked, so
 * showing them would misrepresent the range.
 */
export const showroom = [
  { id: 'lipstick', name: 'Matte Lipstick', family: 'Cosmetics', note: 'Twenty-plus shades, swatched on your wrist before you buy.' },
  { id: 'perfume', name: 'Fragrance Flacon', family: 'Fragrance', note: 'Body mists and attars — always tried on paper first.' },
  { id: 'nailpolish', name: 'Nail Lacquer', family: 'Cosmetics', note: 'Seasonal shades, restocked every fortnight.' },
  { id: 'compact', name: 'Compact Powder', family: 'Beauty', note: 'Matched in daylight, not under a tube light.' },
  { id: 'brush', name: 'Beauty Brush', family: 'Beauty Accessories', note: 'Soft synthetic bristles, sold singly or as a set.' },
  { id: 'creamjar', name: 'Cream Jar', family: 'Skincare', note: 'Sealed stock, chosen for the season Amethi is actually in.' },
  { id: 'necklace', name: 'Kundan Necklace', family: 'Artificial Jewellery', note: 'Antique gold finish, with a velvet presentation box.' },
  { id: 'jhumka', name: 'Pearl Jhumka', family: 'Earrings', note: 'Light enough to wear all evening.' },
  { id: 'bangles', name: 'Bangle Stack', family: 'Bangles', note: 'Colour-matched to your outfit at the counter.' },
  { id: 'bracelet', name: 'Pearl Bracelet', family: 'Bracelets', note: 'Adjustable, with a small charm drop.' },
  { id: 'ring', name: 'Stone Ring', family: 'Artificial Jewellery', note: 'Cut stones in gold and oxidised silver settings.' },
  { id: 'hairclips', name: 'Hair Clip Set', family: 'Hair Accessories', note: 'Bands, clips and pins — the last thing you put on.' },
  { id: 'giftbox', name: 'Wrapped Gift', family: 'Gifting', note: 'House paper, satin ribbon and a handwritten tag.' },
  { id: 'giftbag', name: 'Boutique Bag', family: 'Gift Wrapping', note: 'Every purchase leaves in one, at no extra cost.' },
  { id: 'diya', name: 'Clay Diya', family: 'Festival', note: 'Clay and brass, stocked before every festival.' },
  { id: 'fairylights', name: 'Fairy Lights', family: 'Decoration Items', note: 'Warm strings for the doorway, tested before they leave.' },
  { id: 'haldi', name: 'Haldi Thali', family: 'Haldi Ceremony', note: 'Brass thali sets for the whole courtyard.' },
  { id: 'mehendi', name: 'Mehendi Cone', family: 'Mehendi Accessories', note: 'Fresh cones that stain deep, plus aftercare oil.' },
]

/* ========================================================================== */
/* Why choose us                                                               */
/* ========================================================================== */

export const reasons = [
  { title: 'Wide Product Range', body: 'Thirty-plus categories under one roof — beauty, jewellery, gifts and essentials.', icon: 'grid' },
  { title: 'Affordable Pricing', body: 'Honest, marked prices. The same rate whether you are a regular or a first-timer.', icon: 'tag' },
  { title: 'Latest Fashion', body: 'New arrivals every fortnight, chosen from what is actually trending this season.', icon: 'spark' },
  { title: 'Premium Quality', body: 'Sealed, genuine stock. Anything that disappoints comes straight back to us.', icon: 'shield' },
  { title: 'Festival Collections', body: 'Stocked before the festival, not after — Diwali, Karwa Chauth, Rakhi and wedding season.', icon: 'diya' },
  { title: 'Free Gift Wrapping', body: 'Paper, ribbon and a handwritten tag, finished at the counter while you wait.', icon: 'ribbon' },
  { title: 'Friendly Service', body: 'Advice before a sale. We will happily tell you that you do not need it.', icon: 'heart' },
  { title: 'One-Stop Destination', body: 'Arrive with a list, leave with everything on it — gift wrapped and ready.', icon: 'store' },
]

export const counters = [
  { value: 12000, suffix: '+', label: 'Customers served' },
  { value: 30, suffix: '+', label: 'Product categories' },
  { value: 11, suffix: '', label: 'Years in Munshiganj' },
  { value: 4.8, suffix: '/5', label: 'Average rating', decimals: 1 },
]

/* ========================================================================== */
/* Gallery                                                                     */
/* ========================================================================== */

export const gallery = [
  { id: 'g1', image: 'galleryInterior', caption: 'The front room', detail: 'Warm light, open shelves, everything within reach.', span: 'tall' },
  { id: 'g2', image: 'galleryCosmetics', caption: 'Cosmetics wall', detail: 'Shade-matched under daylight lamps.', span: 'wide' },
  { id: 'g3', image: 'galleryJewellery', caption: 'Jewellery cabinet', detail: 'Kundan, pearl and oxidised silver.', span: 'normal' },
  { id: 'g4', image: 'galleryGifts', caption: 'Gift counter', detail: 'Hampers built to your budget.', span: 'normal' },
  { id: 'g5', image: 'galleryWrapping', caption: 'Wrapping station', detail: 'Ribbon, tag and seal — complimentary.', span: 'tall' },
  { id: 'g6', image: 'galleryFestival', caption: 'Festival display', detail: 'Restocked before every occasion.', span: 'wide' },
  { id: 'g7', image: 'galleryBeauty', caption: 'Skincare shelf', detail: 'Sealed stock, seasonal picks.', span: 'normal' },
  { id: 'g8', image: 'galleryDecor', caption: 'Décor corner', detail: 'Diyas, lights and festival trims.', span: 'normal' },
]

/* ========================================================================== */
/* Testimonials                                                                */
/* ========================================================================== */

export const testimonials = [
  {
    id: 't1',
    quote:
      'I bought my entire wedding trousseau jewellery here. They kept the set aside for three weeks until I could pay, and matched every bangle to my lehenga colour themselves.',
    name: 'Priya Verma',
    role: 'Bride · Amethi',
    initials: 'PV',
    tone: 'rose',
  },
  {
    id: 't2',
    quote:
      'The only shop in Munshiganj where they let you swatch before buying. My foundation finally matches my neck — that has never happened before.',
    name: 'Anjali Singh',
    role: 'Regular customer',
    initials: 'AS',
    tone: 'coral',
  },
  {
    id: 't3',
    quote:
      'I forgot my sister\'s birthday until the evening. Walked in at eight, walked out at eight-fifteen with a wrapped hamper that looked like I had planned it for a week.',
    name: 'Rohit Mishra',
    role: 'Munshiganj',
    initials: 'RM',
    tone: 'gold',
  },
  {
    id: 't4',
    quote:
      'Their Diwali décor arrives before anyone else\'s. Diyas, torans, lights — I do my whole doorway in one trip, every single year.',
    name: 'Sunita Devi',
    role: 'Customer since 2016',
    initials: 'SD',
    tone: 'champagne',
  },
  {
    id: 't5',
    quote:
      'Prices are written on the box and they do not change for anyone. As a student that matters more than any discount.',
    name: 'Neha Yadav',
    role: 'Student · Amethi',
    initials: 'NY',
    tone: 'peach',
  },
]

/* ========================================================================== */
/* Festival collection                                                         */
/* ========================================================================== */

export const festivals = [
  {
    id: 'diwali',
    name: 'Diwali',
    season: 'Oct — Nov',
    line: 'Light for the whole doorway',
    body: 'Clay and brass diyas, LED curtains, torans, rangoli colour and wrapped gift hampers ready to hand over.',
    tone: 'gold',
    image: 'festivalDiwali',
  },
  {
    id: 'rakhi',
    name: 'Raksha Bandhan',
    season: 'August',
    line: 'For every kind of brother',
    body: 'Rakhi threads from simple to stone-set, roli-chawal thalis, wrapped gift combos and courier-safe packing for the ones far away.',
    tone: 'coral',
    image: 'festivalRakhi',
  },
  {
    id: 'karwa',
    name: 'Karwa Chauth',
    season: 'October',
    line: 'The full sixteen',
    body: 'Solah shringar sets, sindoor, chunni, mehendi cones, karwa and chhalni — assembled as one complete thali.',
    tone: 'rose',
    image: 'festivalKarwa',
  },
  {
    id: 'wedding',
    name: 'Wedding Season',
    season: 'Nov — Feb',
    line: 'Trousseau, guest gifts and all',
    body: 'Bridal jewellery sets, bulk return-gift hampers, bangle stacks by the dozen and packaging that survives the journey.',
    tone: 'champagne',
    image: 'festivalWedding',
  },
  {
    id: 'haldi',
    name: 'Haldi',
    season: 'All season',
    line: 'Marigold and turmeric',
    body: 'Haldi bowls and thalis, yellow dupattas, bangle sets and the decorated trays the courtyard needs.',
    tone: 'peach',
    image: 'festivalHaldi',
  },
  {
    id: 'mehendi',
    name: 'Mehendi',
    season: 'All season',
    line: 'Cones that stain deep',
    body: 'Mehendi cones, stencils, aftercare oil, green-and-gold décor and matching bangle sets for the whole party.',
    tone: 'gold',
    image: 'festivalMehendi',
  },
  {
    id: 'birthday',
    name: 'Birthday',
    season: 'Year round',
    line: 'Ready in fifteen minutes',
    body: 'Balloon and banner kits, candles, cards, cosmetics gift sets and hampers built to whatever budget you name.',
    tone: 'coral',
    image: 'festivalBirthday',
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    season: 'Year round',
    line: 'Quieter, more considered',
    body: 'Fragrance pairs, keepsake boxes, rose-gold jewellery and our house wrapping in ivory and satin.',
    tone: 'rose',
    image: 'festivalAnniversary',
  },
]

/* ========================================================================== */
/* Cinematic boutique film — chapter script                                    */
/* ========================================================================== */

/**
 * Drives the drawn shop story. Each chapter owns a slice of the timeline
 * (0 → 1), a camera framing, and the caption shown while it plays.
 * `at` is the normalised start time; the next chapter's `at` is its end.
 */
export const boutiqueChapters = [
  {
    id: 'arrival',
    at: 0.0,
    label: 'Arrival',
    title: 'She steps inside',
    caption: 'The door opens onto warm light, gold shelving and the smell of new packaging.',
    camera: { position: [1.9, 1.6, 6.1], target: [0.5, 1.4, 4.0], fov: 33 },
  },
  {
    id: 'cosmetics',
    at: 0.14,
    label: 'Cosmetics',
    title: 'A lipstick, tested on the wrist',
    caption: 'Shade-matched under daylight lamps — rosewood, brick, or the one she came in for.',
    camera: { position: [-4.0, 1.56, 2.15], target: [-5.55, 1.46, 1.0], fov: 30 },
  },
  {
    id: 'fragrance',
    at: 0.28,
    label: 'Fragrance',
    title: 'The perfume cabinet',
    caption: 'Glass, gold and a single spray on paper before anything is decided.',
    camera: { position: [-3.05, 1.62, -1.45], target: [-4.15, 1.46, -2.95], fov: 30 },
  },
  {
    id: 'mirror',
    at: 0.42,
    label: 'The Mirror',
    title: 'Earrings, held up to the light',
    caption: 'She turns her head. The shopkeeper has the second pair ready, without being asked.',
    camera: { position: [4.35, 1.62, 3.55], target: [5.7, 1.5, 2.55], fov: 30 },
  },
  {
    id: 'bangles',
    at: 0.56,
    label: 'Bangles',
    title: 'A stack, sized by hand',
    caption: 'Slid on one by one until the colour sits right against the wrist.',
    camera: { position: [3.95, 1.46, -1.95], target: [5.35, 1.3, -3.0], fov: 30 },
  },
  {
    id: 'gifting',
    at: 0.7,
    label: 'Gift Wrapping',
    title: 'Paper, ribbon, a handwritten tag',
    caption: 'The gift is wrapped at the counter while she waits. It has always been free.',
    camera: { position: [2.75, 1.58, 4.05], target: [0.55, 1.16, 2.15], fov: 32 },
  },
  {
    id: 'counter',
    at: 0.84,
    label: 'The Counter',
    title: 'Paid, bagged, smiled at',
    caption: 'The bag is heavier than she expected. So is the discount he did not mention.',
    camera: { position: [-0.62, 1.56, 3.62], target: [0.9, 1.26, 2.45], fov: 32 },
  },
  {
    id: 'departure',
    at: 0.93,
    label: 'Departure',
    title: 'She leaves with both hands full',
    caption: 'And a note to come back before the festival, when the front table changes again.',
    camera: { position: [1.85, 1.72, 10.7], target: [0.5, 1.3, 7.1], fov: 34 },
  },
]

/* ========================================================================== */
/* Contact form                                                                */
/* ========================================================================== */

export const enquiryTopics = [
  'General enquiry',
  'Bridal & wedding collection',
  'Gift hamper for an occasion',
  'Festival & decoration items',
  'Bulk / return gifts',
  'Product availability',
]

export const footerNote =
  'Arpit Cosmetics is an independent family-run store in Munshiganj, Amethi. Prices, availability and festival stock are best confirmed over a call or WhatsApp before you travel.'
