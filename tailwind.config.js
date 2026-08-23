/** @type {import('tailwindcss').Config} */

/**
 * Arpit Cosmetics — Design System
 * -------------------------------
 * Light theme only. No dark mode. No purple anywhere in the palette.
 * The scale is deliberately restrained: a warm neutral ground (white →
 * ivory → beige), one metallic accent family (champagne → gold), and one
 * warm blush family (peach → rose → coral) used sparingly for lift.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: false, // Light theme only — intentional, do not enable.
  theme: {
    extend: {
      colors: {
        /* --- Grounds -------------------------------------------------- */
        porcelain: '#FFF9F3',
        warm: '#FDF6EF', // page ground
        cream: '#FBEFE7',
        ivory: '#F8E1DC', // blush
        beige: '#F3E3D3',
        linen: '#EBD9C8',

        /* --- Warm accents --------------------------------------------- */
        /* Token names are unchanged from the earlier palette on purpose —
           the values moved to the illustration colours, so every component
           picked up the new look without being touched. */
        champagne: {
          DEFAULT: '#FBE3D0',
          light: '#FFF3E6',
          deep: '#E8A33D',
        },
        gold: {
          DEFAULT: '#E8A33D', // ochre
          light: '#F2BB56',
          deep: '#C77E2A',
        },
        rose: {
          DEFAULT: '#F2897A',
          light: '#F8E1DC',
          deep: '#C7402F',
        },
        peach: {
          DEFAULT: '#FBE3D0',
          deep: '#F2BB56',
        },
        coral: {
          DEFAULT: '#E8624F',
          deep: '#C7402F',
        },
        leaf: {
          DEFAULT: '#2F5D50',
          soft: '#4F7A64',
        },

        /* --- Type ------------------------------------------------------ */
        ink: {
          DEFAULT: '#2B211C', // warm near-black; pure #111 reads cold on cream
          soft: '#6B5B52',
          faint: '#9C8A7E',
        },
      },

      fontFamily: {
        // Didone display + geometric sans. See the note in index.html.
        // Fraunces is a soft, slightly quirky serif — it sits with flat
        // illustration the way a Didone never could. Poppins is the friendly
        // geometric it was designed to pair with.
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },

      fontSize: {
        // Fluid display scale — clamp() keeps headlines cinematic on every viewport.
        // Capped at 8.5vw: three stacked lines of display-xl must still fit
        // above the fold on a 900px-tall laptop screen.
        'display-xl': ['clamp(2.9rem, 8vw, 8rem)', { lineHeight: '0.98', letterSpacing: '-0.028em' }],
        'display-lg': ['clamp(2.6rem, 7vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.024em' }],
        'display-md': ['clamp(2.15rem, 4.8vw, 4.2rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.75rem, 3.4vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.012em' }],
        eyebrow: ['0.7rem', { lineHeight: '1', letterSpacing: '0.24em' }],
        'body-lg': ['clamp(1.02rem, 1.15vw, 1.2rem)', { lineHeight: '1.72' }],
      },

      letterSpacing: {
        luxe: '0.32em',
        wider2: '0.18em',
      },

      spacing: {
        section: 'clamp(6rem, 12vw, 12rem)',
        gutter: 'clamp(1.25rem, 4.2vw, 5.5rem)',
      },

      maxWidth: {
        // Full-bleed: the layout spans the viewport and `gutter` supplies the
        // breathing room. Measure is still controlled where it matters —
        // `max-w-prose` on body copy — so lines never run to 200 characters.
        shell: '100%',
        prose: '40rem',
      },

      borderRadius: {
        // Generous, even radii — the rounded-corner language of the artwork.
        luxe: '2.25rem',
        pill: '999px',
      },

      boxShadow: {
        soft: '0 2px 0 rgba(43, 33, 28, 0.04), 0 10px 24px -18px rgba(43, 33, 28, 0.28)',
        lift: '0 3px 0 rgba(43, 33, 28, 0.05), 0 20px 40px -28px rgba(43, 33, 28, 0.3)',
        float: '0 4px 0 rgba(43, 33, 28, 0.06), 0 34px 60px -40px rgba(43, 33, 28, 0.34)',
        glass: '0 3px 0 rgba(43, 33, 28, 0.05)',
        gold: '0 4px 0 rgba(199, 126, 42, 0.35)',
        inset: 'inset 0 0 0 1px rgba(232, 98, 79, 0.18)',
      },

      backgroundImage: {
        'gold-line': 'linear-gradient(90deg, transparent, rgba(232,163,61,0.75), transparent)',
        'gold-sheen': 'linear-gradient(110deg, #E8624F 0%, #F2897A 40%, #E8A33D 70%, #E8624F 100%)',
        'warm-veil': 'linear-gradient(180deg, #FFF9F3 0%, #FDF6EF 40%, #FBEFE7 100%)',
        'blush-glow': 'radial-gradient(60% 60% at 50% 40%, rgba(232,98,79,0.16), transparent 70%)',
      },

      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)', // expo-out — the house easing
        silk: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        drift: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        sheen: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.06)' },
        },
        'draw-line': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },

      animation: {
        float: 'float 7s cubic-bezier(0.45,0,0.55,1) infinite',
        sheen: 'sheen 6s linear infinite',
        marquee: 'marquee 42s linear infinite',
        breathe: 'breathe 9s ease-in-out infinite',
      },

      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
