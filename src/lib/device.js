/**
 * Capability detection.
 * ---------------------
 * The 3D scenes scale themselves from one number: `perfTier`. Rather than
 * sniffing user agents we sample the things that actually decide whether a
 * device can hold 60fps — core count, memory, pointer type and viewport.
 */

export const isBrowser = typeof window !== 'undefined'

export function prefersReducedMotion() {
  if (!isBrowser) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** True for devices whose primary pointer is coarse (touch). */
export function isTouchPrimary() {
  if (!isBrowser) return false
  return window.matchMedia('(pointer: coarse)').matches
}

/** True when a real mouse is present — gates the bespoke cursor. */
export function hasFinePointer() {
  if (!isBrowser) return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

let _webglCache
/** Cheap one-time WebGL2 probe; the 3D scenes are skipped entirely if false. */
export function supportsWebGL() {
  if (_webglCache !== undefined) return _webglCache
  if (!isBrowser) return (_webglCache = false)
  try {
    const canvas = document.createElement('canvas')
    _webglCache = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    _webglCache = false
  }
  return _webglCache
}

/**
 * 0 = no 3D (reduced motion / no WebGL)
 * 1 = light   — fewer particles, no postprocessing, dpr 1
 * 2 = medium  — bloom only, dpr up to 1.5
 * 3 = full    — bloom + depth of field, dpr up to 2
 */
export function perfTier() {
  if (!isBrowser) return 0
  if (!supportsWebGL()) return 0
  if (prefersReducedMotion()) return 0

  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4
  const small = window.innerWidth < 768
  const coarse = isTouchPrimary()

  if (cores <= 4 || memory <= 4 || (small && coarse)) return 1
  if (cores <= 8 || memory <= 8) return 2
  return 3
}

/** Device pixel ratio ceiling for a given tier — the single biggest perf lever. */
export function dprFor(tier) {
  if (tier >= 3) return [1, 2]
  if (tier === 2) return [1, 1.5]
  return [1, 1]
}
