# Arpit Cosmetics

**Your Complete Beauty, Fashion & Gift Destination**
Munshiganj, Amethi, Uttar Pradesh, India

A single-page brand site for a family-run cosmetics and gift store. Every
picture on it is drawn — inline SVG, no photography, no video, no 3D engine and
no image CDN — so the whole page arrives in a couple of hundred kilobytes on
the phones the store's customers actually use.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build on :4173
```

---

## Table of contents

1. [What is on the page](#what-is-on-the-page)
2. [Stack](#stack)
3. [Project structure](#project-structure)
4. [Things you will want to change first](#things-you-will-want-to-change-first)
5. [The artwork](#the-artwork)
6. [The design system](#the-design-system)
7. [The two films](#the-two-films)
8. [Motion](#motion)
9. [Performance](#performance)
10. [Accessibility](#accessibility)
11. [SEO](#seo)
12. [Deployment](#deployment)
13. [Known limitations](#known-limitations)

---

## What is on the page

| # | Section | What it does |
|---|---------|--------------|
| — | **Hero** | Full-height opening with drifting drawn products, masked headline reveal and animated counters |
| 01 | **The Store** | Drawn collage and the shop's story |
| 02 | **Collections** | Six shopping worlds covering all 29 categories, plus the complete flat index |
| 03 | **Inside the Shop** | The visit in eight drawn panels — cross-fading on a loop, every scene seekable |
| 04 | **At the Counter** | An animated 20-second loop: browse → choose → pay → wrap → leave |
| 05 | **The Shelf** | Eighteen pieces drawn one at a time, stepped through on a plinth |
| 06 | **Featured** | Draggable slider of the current selection |
| 07 | **Why Choose Us** | Animated counters and eight reasons |
| 08 | **Gallery** | Masonry grid with parallax tiles and a keyboard-navigable lightbox |
| 09 | **Festivals** | Horizontal scroll-pinned reel across the festival calendar |
| 10 | **Testimonials** | One quote at a time, set large |
| 11 | **Visit Us** | Address, hours, map, and an enquiry form that hands off to WhatsApp |

---

## Stack

| Purpose | Package |
|---------|---------|
| UI | React 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS 3.4 |
| Artwork | Inline SVG, hand-drawn in `src/components/illustrations/` |
| Motion | Framer Motion 12 · GSAP 3 (+ ScrollTrigger) |
| Scrolling | Lenis |
| Slider | Swiper 11 |
| Icons | React Icons + a bespoke line set |

Seven runtime dependencies, and nothing that renders a pixel except the browser.

---

## Project structure

```
src/
├── main.jsx                    entry
├── App.jsx                     layout shell, lazy section boundaries
│
├── data/
│   └── site.js                 ALL copy, contact details, nav, categories
│
├── lib/
│   ├── utils.js                cn, clamp, lerp, damp, smoothstep …
│   └── device.js               pointer type and reduced-motion probes
│
├── hooks/
│   ├── useSmoothScroll.jsx     Lenis + ScrollTrigger provider, scroll lock
│   ├── useMagnetic.js          magnetic hover
│   ├── usePointer.js           global smoothed pointer (ref, not state)
│   ├── useReveal.js            GSAP parallax / masked headings
│   ├── useCounter.js           count-up on first view
│   └── useMediaQuery.js        useSyncExternalStore-based matchMedia
│
├── components/
│   ├── illustrations/
│   │   ├── palette.js          the artwork's colours — six hues, on purpose
│   │   ├── scenes.jsx          the drawing library (one export per subject)
│   │   ├── Illustration.jsx    slot map: which drawing appears where
│   │   ├── figures.jsx         the cast, the fixtures and the hand props
│   │   ├── ShopFilm.jsx        the eight panels of the shop story
│   │   ├── ProductArt.jsx      the eighteen pieces on the shelf
│   │   ├── HeroArt.jsx         the hero composition
│   │   └── SentMark.jsx        the form's "message ready" tick
│   ├── ui/                     Button, Reveal, Cursor, Lightbox …
│   ├── layout/                 Navbar, Footer, Preloader, Ambience …
│   ├── cartoon/                the counter film (stage + GSAP timeline)
│   └── sections/               one file per page section
│
└── styles/index.css            tokens, base, components, utilities
```

**Two rules worth knowing.** Anything a visitor *reads* lives in
`src/data/site.js` — you should never open a component to change copy. Anything
a visitor *sees* lives in `src/components/illustrations/` — there are no image
files to manage.

---

## Things you will want to change first

Search the project for `TODO(owner)`:

| What | Where | Currently |
|------|-------|-----------|
| Domain | `src/data/site.js` → `brand.domain`, plus `index.html`, `public/robots.txt`, `public/sitemap.xml` | `https://www.arpitcosmetics.in` — replace before launch |

The store's real numbers are already in place: calls go to **+91 83185 93162**
and WhatsApp to **+91 94500 63366**. They are deliberately two different
numbers — `contact.phoneHref` and `contact.whatsappNumber` in `site.js`.

Also worth reviewing before launch:

- **Hours** — `contact.hours`
- **Testimonials** — `testimonials` in `site.js` are written as realistic
  examples. Replace them with real quotes, with permission, before going live.
- **Social links** — `contact.socials` point at the bare platform domains.
- **Stats** — `hero.stats` and `counters` (12,000 customers, 4.8 rating) are
  illustrative. Use your real figures or remove them.

---

## The artwork

Every picture on the page is inline SVG, hand-drawn in
`src/components/illustrations/`. Nothing is fetched, so there is no image
budget, no CDN, no licence to track, no broken-tile state and no layout shift —
and the whole page has one visual voice instead of one per photo shoot.

**The house style**, held in `scenes.jsx`:

- A soft organic blob of colour behind the subject, never a hard frame.
- Flat fills. No gradients on the artwork — the discipline *is* the style.
- Faces are two closed lid arcs, a small smile and round blush cheeks. Nothing
  more; eyes with pupils start to look like a mascot.
- Botanical sprigs and confetti dots carry the empty corners.
- Every scene fills a 400×400 box and is fitted, never cropped, so the same
  drawing works in a square tile and a wide banner.

**To change what appears where**, edit the `SLOTS` map in `Illustration.jsx`.
The sections refer to slot keys, so swapping a drawing is a one-line change and
nothing else moves. Each slot also carries its own `alt` text — real
alternative text, and the only place it is written.

**The palette** is six hues plus skin and hair tones (`palette.js`). Flat
vector work lives or dies on colour discipline: six committed colours read as a
house style, twenty read as clip art. If you add a drawing, use what is there.

**If you would rather ship photographs** of the real shelves, that is a
reasonable thing to want — but it is a redesign, not a swap. The type, colour,
section rhythm and both films were all built to sit with drawings.

## The design system

Defined in `tailwind.config.js` and `src/styles/index.css`.

**Light theme only.** `darkMode: false` is deliberate. There is no purple
anywhere in the palette.

| Role | Tokens |
|------|--------|
| Ground | `porcelain` `warm` `cream` `ivory` `beige` `linen` |
| Metal | `champagne` `gold` `rose` (each with `light` / `deep`) |
| Blush | `peach` `coral` (each with `deep`) |
| Type | `ink` `#111111` · `ink-soft` `#555555` · `ink-faint` |

**Type** — Playfair Display (display), Cormorant Garamond (serif accents),
Manrope (UI and body). Fluid `display-*` sizes are capped so three stacked
lines still clear a 900px-tall laptop screen.

**Motion** — one easing curve everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`,
exposed as `--ease-luxe` in CSS, `ease-luxe` in Tailwind, `EASE_LUXE` in
Framer Motion and `expo.out` in GSAP.

**Section rhythm** — sections alternate neutral and tinted using
`.tint .tint-gold | .tint-blush | .tint-peach`, so a very long scroll never
reads as one continuous beige.

---

## The two films

Both are drawn, and both are a few kilobytes of markup rather than a video
file: resolution independent, seekable beat by beat, and the speech-bubble copy
is real editable text.

### 03 · Inside the shop — eight panels

`src/components/illustrations/ShopFilm.jsx` holds one panel per beat of a
visit: she comes in, a shade is tested on her wrist, a scent is tried, earrings
go up to the mirror, bangles are sized by hand, the gift is wrapped, she pays,
she leaves. `sections/Boutique.jsx` cross-fades between them on a 48-second
loop and lets you jump to any scene.

Panels are wide (800×450) because the story is two people either side of a
counter, which is a horizontal idea. The cast, the fixtures and the hand props
come from `figures.jsx`.

### 04 · At the counter — the animated short

`src/components/cartoon/` is the closer-up film: `CartoonStage.jsx` is the
artwork, `CartoonFilm.jsx` is the GSAP timeline. Beats are declared once in
`BEATS` and the timeline is built with absolute positions, so re-timing one
beat never cascades into the others.

### Three things that will bite you when posing a figure

These are not hypothetical — each one shipped at some point and each one made
the characters look broken.

1. **y grows downward.** Feet at 0, shoulders at −172, head above that. A torso
   path drawn "up" from the shoulders lands on the head — it looked like both
   characters were wearing stiff square hoods.
2. **A rotation is clockwise, and every arm hangs down**, so a *positive* angle
   swings that hand to the **left**. The customer stands left of the counter and
   reaches right (negative); the shopkeeper stands right and reaches left
   (positive). Both films restate this at the top of the file.
3. **Never give a limb a percentage transform origin.** `'50% 3%'` of a
   bounding box sounds like "the joint at the top of the segment", but a box
   containing a rotating child changes shape as that child moves, so the pivot
   is whatever pose happened to be on screen when the timeline was built. The
   arms swung around a point above the figure's head and threw hands off the
   top of the frame. Every joint now sits at its own group's origin and the
   pivot is stated as `svgOrigin: '0 0'`.

And two rules about colour, which cost more debugging time than any of the
geometry:

- **A sleeve must not match the torso.** When it did, the upper arm vanished
  into the body and the pale forearm beyond it read as a loose bone floating
  off the chest.
- **A figure must not match the wall.** The shopkeeper was a cream kurta on a
  cream wall and simply had no arms. He wears the one cool colour in the
  palette; she wears the coral.

One more, about React rather than drawing: **do not define a limb component
inside the character component.** It becomes a new component type on every
render, so React discards the limb nodes and builds new ones, and GSAP — still
holding the old detached nodes — animates nothing. The arms stayed still while
every prop floated across the counter on its own.

Hand positions are computed from the angles, never eyeballed:

```
hand = shoulder + 60·dir(s) + 58·dir(s + e)      dir(t) = (−sin t, cos t)
```

The counter's top edge is `y = 408`, so any hand meant to be seen has to finish
above it. An earlier reach landed at `y ≈ 389` — one hand's width above the lip
— which is why the handover read as two people standing still.

## Motion

- **Lenis** drives scrolling, stepped from GSAP's ticker so both libraries
  share one RAF loop. Two independent loops is the usual cause of jitter on a
  site like this.
- **The cursor** is hand-rolled on a single RAF with one `transform` write per
  element per frame. State changes are CSS custom properties, so they never
  cost a main-thread tween. (An earlier GSAP-tween version was measurably
  less smooth.)
- **Reduced motion** is honoured throughout: Lenis is not instantiated, the
  cursor never mounts, the shop panels stop advancing and hold whichever scene
  you choose, the counter film holds a single readable frame, and the shelf
  stops breathing.

---

## Performance

Nothing on the page is fetched to be looked at. There are no photographs, no
video, no 3D engine, no animation player and no webfont beyond the two families
in `index.html` — so the only payload is code.

```
vendor-react    60 kB gz     vendor-gsap   44 kB gz
vendor-motion   43 kB gz     vendor-swiper 31 kB gz
entry           18 kB gz     everything else, per section, 1–8 kB gz
```

Every section below the fold is its own chunk behind a `React.lazy()` boundary,
and the drawing libraries are inside those chunks — the shop panels and the
shelf cost nothing until you scroll to them.

Four things keep it that way:

1. **Vite's preload helper is pinned to `vendor-react`** in `vite.config.js`.
   Left to Rollup it lands in whichever vendor chunk claims it first, which can
   drag that whole chunk onto the critical path.
2. **`chunkSizeWarningLimit` is 400 kB.** Nothing here should come close; if a
   chunk trips it, something large has been pulled onto a path that used to be
   lazy.
3. **Drawings are components, not assets.** Adding one costs a few hundred
   bytes in the chunk that uses it. Adding a *dependency* to draw one costs
   whatever that dependency weighs — the form's tick used to be a Lottie
   animation, and the player was 80 kB gzipped to draw one tick.
4. **Aspect-ratio boxes on every drawing**, so CLS stays near zero.

Also: quantised state in both films (React re-renders once per beat, not once
per frame), one shared RAF for Lenis and GSAP, and terser with `drop_console`.

## Accessibility

- Semantic landmarks, one `<h1>`, ordered headings, skip-to-content link.
- Every decorative layer — cursor, ambience, canvases, grain — is
  `aria-hidden` and pointer-transparent.
- Real alt text on every photograph, held in the image registry.
- Animated counters announce their final value once via `sr-only`, not on
  every tick.
- Lightbox: focus trap, Escape to close, arrow keys to navigate, scroll lock.
- Form: labels tied to inputs, `aria-invalid` and `aria-describedby` on errors,
  and focus moves to the first invalid field on a failed submit.
- Full keyboard operation with a visible `:focus-visible` ring.
- `prefers-reduced-motion` is honoured everywhere.

Text contrast targets WCAG AA. The gold accent gradient is deliberately capped
at `#C9A75E` at its lightest — a brighter ramp looked better in isolation but
dropped below 3:1 against the cream ground and words vanished mid-stroke.

---

## SEO

- Title, description, canonical, keywords, robots.
- Open Graph + Twitter cards pointing at `public/og-image.png` (1200×630 PNG —
  social crawlers do not reliably rasterise SVG).
- JSON-LD `@graph` with `Store` + `HealthAndBeautyBusiness`: address, geo,
  opening hours, payment methods, area served, offer catalogue.
- `public/robots.txt` and `public/sitemap.xml`.
- `public/site.webmanifest` with maskable icons.
- Semantic HTML and a no-JS fallback in `index.html`.

Update the domain in all four places listed in
[Things you will want to change first](#things-you-will-want-to-change-first).

---

## Deployment

Both platforms are configured with SPA rewrites, immutable caching for
fingerprinted assets, `must-revalidate` on the HTML entry, and a
Content-Security-Policy that allows exactly what the site uses (Unsplash,
Google Fonts, the Maps embed) and nothing else.

**Cloudflare** — the default target, deployed as an assets-only Worker.
`wrangler.toml` points at `dist` and sets single-page-app fallback;
`public/_headers` and `public/_redirects` carry the caching rules and security
headers.

```bash
npx wrangler deploy
```

Or connect the GitHub repository in the Cloudflare dashboard: build command
`npm run build`, deploy command `npx wrangler deploy`. Every push to `main`
redeploys.

There is no server code — nothing here runs on a request. If you later add a
form endpoint, that is the moment to give the Worker a `main` entry point.

**Vercel** — `vercel.json` is picked up automatically.

```bash
npm i -g vercel && vercel --prod
```

**Netlify** — `netlify.toml` is picked up automatically.

```bash
npm i -g netlify-cli && netlify deploy --prod
```

Lighthouse-in-CI is included in `netlify.toml` but commented out: the plugin
*fails the build* when a threshold is missed, which is a poor first deploy
experience. Uncomment when you are ready to enforce it.

**Any static host** — `npm run build` and serve `dist/`, with a rewrite from
all unmatched paths to `/index.html`.

---

## Known limitations

Worth stating plainly:

- **The enquiry form has no backend.** It validates properly and then hands the
  message to WhatsApp, which is how a store like this actually receives
  enquiries. Point `onSubmit` in `src/components/sections/Contact.jsx` at your
  own endpoint (or Formspree / Cloudflare Pages Functions) if you want it
  stored.
- **Testimonials and statistics are illustrative.** Replace them with real ones
  before launch.
- **The shop is drawn, not photographed.** That is the design, and it is a
  choice with a cost: a drawing of the counter cannot show a customer the
  actual shelf. If the store wants to show real stock, the right place is a
  photo set *added* to the gallery rather than a swap of the whole visual
  language.
- **The cast is stylised.** Two figures, one pose vocabulary, faces built from
  four strokes. They are meant to read as "a friendly shop", not as portraits
  of the family.

© Arpit Cosmetics. Built for a shop in Munshiganj.
