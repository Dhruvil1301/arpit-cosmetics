/**
 * Illustration palette.
 * ---------------------
 * A deliberately small, flat set — no gradients on the artwork itself. Flat
 * vector work lives or dies on colour discipline: five or six committed hues
 * read as a house style, twenty read as clip art.
 *
 * Keyed off the reference art the owner supplied: warm cream grounds, a
 * confident coral, ochre for warmth, one deep neutral for hair and contrast.
 */
export const I = {
  /* Grounds */
  cream: '#FBEFE7',
  blush: '#F8E1DC',
  peach: '#FBE3D0',
  sand: '#F3E3D3',
  shell: '#FFF9F3',

  /* Accents */
  coral: '#E8624F',
  coralSoft: '#F2897A',
  red: '#C7402F',
  ochre: '#E8A33D',
  ochreDeep: '#C77E2A',
  gold: '#D9A94A',
  goldDeep: '#A87C2A',

  /* Skin */
  skin: '#F0C9A8',
  skinMid: '#E3B490',
  skinDeep: '#CE9A73',

  /* Neutrals */
  hair: '#2E1F19',
  ink: '#34434F,',
  leaf: '#2F5D50',
  leafSoft: '#4F7A64',
  line: '#B98A6A',
}

// The ink value above must not carry a trailing comma inside the string.
I.ink = '#34434F'

/** Background blob shapes — reused so every scene shares a silhouette family. */
export const BLOBS = [
  'M120 40C190 20 300 30 340 100s10 170-70 210-200 40-250-30S50 60 120 40Z',
  'M100 70C160 10 300 20 350 90s0 190-90 220-210 10-250-70S40 130 100 70Z',
  'M140 30C210 30 320 60 340 140s-40 180-130 200S60 300 50 210 70 30 140 30Z',
]
