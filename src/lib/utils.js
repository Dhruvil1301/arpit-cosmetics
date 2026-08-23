/** Small, dependency-free helpers shared across the site. */

/** Conditional className joiner — `cn('a', cond && 'b')`. */
export const cn = (...parts) => parts.filter(Boolean).join(' ')

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))

export const lerp = (a, b, t) => a + (b - a) * t

/**
 * Frame-rate independent lerp. `smoothing` is the fraction remaining after
 * one second, so the easing feels identical at 60fps and 144fps.
 */
export const damp = (a, b, smoothing, dt) => lerp(a, b, 1 - Math.pow(smoothing, dt))

/** Remap `v` from one range to another, clamped to the output range. */
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  clamp((v - inMin) / (inMax - inMin || 1)) * (outMax - outMin) + outMin

/** Smoothstep between two edges — the workhorse for scroll-driven fades. */
export function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1))
  return t * t * (3 - 2 * t)
}

/** Deterministic 0→1 pseudo-random from an integer seed. */
export function rand(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** Indian-format number with thousands separators (12,000). */
export const formatNumber = (n, decimals = 0) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

/** Splits a string into words, keeping the spaces as their own tokens. */
export const toWords = (s) => s.split(' ')

/** requestAnimationFrame-throttled callback. */
export function rafThrottle(fn) {
  let queued = false
  let lastArgs
  return (...args) => {
    lastArgs = args
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      fn(...lastArgs)
    })
  }
}
