import { cn } from '../../lib/utils'

/**
 * Bespoke line-icon set.
 * ----------------------
 * Drawn on a shared 100×100 grid with a single stroke weight so the family
 * reads as one hand. Off-the-shelf icon packs were deliberately avoided for
 * the collection cards — react-icons is used only for UI chrome (arrows,
 * social, phone) where a familiar glyph helps.
 *
 * When `animate` is on, the paths draw themselves in on hover via
 * stroke-dashoffset; `pathLength="1"` normalises every path so one dash value
 * works for all of them.
 */
const PATHS = {
  lipstick: ['M40 92h20V44H40z', 'M43 44V23a7 7 0 0 1 14 0v21', 'M50 23V9'],
  perfume: ['M35 92h30V47a12 12 0 0 0-6-10V29H41v8a12 12 0 0 0-6 10z', 'M44 29v-8h12v8', 'M50 13v8', 'M65 25h8v11'],
  necklace: ['M22 25c0 26 12 40 28 40s28-14 28-40', 'M50 65v9', 'M50 74a7 7 0 1 0 .1 0z'],
  gift: ['M18 45h64v45H18z', 'M15 31h70v14H15z', 'M50 31v59', 'M50 31c-9-15-24-11-21 0', 'M50 31c9-15 24-11 21 0'],
  diya: ['M18 62c7 13 19 19 32 19s25-6 32-19z', 'M50 62V49', 'M50 49c0-8 8-11 8-19 0 10 8 13 8 19'],
  bangles: ['M50 17a33 33 0 1 0 .1 0z', 'M50 30a20 20 0 1 0 .1 0z', 'M74 27l10-10', 'M26 73L16 83'],
  brush: ['M42 92h16l5-38H37z', 'M37 54h26V31H37z', 'M43 31V13a7 7 0 0 1 14 0v18'],
  flower: ['M50 43a7 7 0 1 0 .1 0z', 'M50 36c0-13 17-13 17 0s-17 13-17 0z', 'M50 57c0 13-17 13-17 0s17-13 17 0z', 'M57 50c13 0 13 17 0 17s-13-17 0-17z', 'M43 50c-13 0-13-17 0-17s13 17 0 17z', 'M50 67v22'],
  sparkle: ['M50 11l7 27 27 7-27 7-7 27-7-27-27-7 27-7z', 'M22 20l3 8 8 3-8 3-3 8-3-8-8-3 8-3z'],
  store: ['M17 41h66v48H17z', 'M17 41l8-21h50l8 21', 'M38 89V63h24v26', 'M27 51h9', 'M64 51h9'],
  mirror: ['M50 9c-17 0-29 15-29 33s12 33 29 33 29-15 29-33S67 9 50 9z', 'M50 21c-9 0-15 9-15 21', 'M45 83h10v9H45z', 'M39 92h22'],
  ribbon: ['M50 31c-10-16-30-12-30 2s20 14 30 6c10 8 30 8 30-6s-20-18-30-2z', 'M50 39v46', 'M33 92l17-23 17 23'],
  grid: ['M18 18h28v28H18z', 'M54 18h28v28H54z', 'M18 54h28v28H18z', 'M54 54h28v28H54z'],
  tag: ['M52 14H18v34l38 38 34-34z', 'M32 32a5 5 0 1 0 .1 0z'],
  spark: ['M50 12l6 24 24 6-24 6-6 24-6-24-24-6 24-6z'],
  shield: ['M50 11l32 12v24c0 21-14 34-32 42-18-8-32-21-32-42V23z', 'M37 50l9 9 18-19'],
  heart: ['M50 84C28 68 15 56 15 41a17 17 0 0 1 35-8 17 17 0 0 1 35 8c0 15-13 27-35 43z'],
  clock: ['M50 12a38 38 0 1 0 .1 0z', 'M50 28v23l15 10'],
  pin: ['M50 92s28-26 28-47a28 28 0 1 0-56 0c0 21 28 47 28 47z', 'M50 34a11 11 0 1 0 .1 0z'],
  compact: ['M50 20a30 30 0 1 0 .1 0z', 'M50 33a17 17 0 1 0 .1 0z', 'M20 50h60'],
  blender: ['M50 90c-13 0-22-9-22-21 0-17 12-33 22-47 10 14 22 30 22 47 0 12-9 21-22 21z'],
  polish: ['M40 90h20V50H40z', 'M43 50V36h14v14', 'M46 36V22h8v14', 'M50 22V10', 'M64 14l10 6'],
}

export default function LuxeIcon({
  name,
  className,
  strokeWidth = 2,
  animate = true,
  title,
}) {
  const paths = PATHS[name] || PATHS.sparkle

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className={cn('h-full w-full', animate && 'luxe-icon', className)}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
    >
      {title && <title>{title}</title>}
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength="1"
          style={
            animate
              ? {
                  strokeDasharray: 1,
                  strokeDashoffset: 'var(--icon-draw, 0)',
                  transition: `stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  )
}

export const iconNames = Object.keys(PATHS)
