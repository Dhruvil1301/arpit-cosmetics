import { useEffect, useRef } from 'react'

/**
 * Global normalised pointer (-1 → 1 on both axes), smoothed.
 * Written into a ref rather than state so the 3D scenes can read it every
 * frame without triggering a single React render.
 */
const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false }
let listeners = 0
let rafId = null

function loop() {
  // Critically-damped follow; 0.08 is slow enough to feel like inertia.
  pointer.x += (pointer.tx - pointer.x) * 0.08
  pointer.y += (pointer.ty - pointer.y) * 0.08
  rafId = requestAnimationFrame(loop)
}

function onMove(e) {
  pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
  pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1)
  pointer.active = true
}

export function usePointerRef() {
  const ref = useRef(pointer)

  useEffect(() => {
    listeners += 1
    if (listeners === 1) {
      window.addEventListener('pointermove', onMove, { passive: true })
      rafId = requestAnimationFrame(loop)
    }
    return () => {
      listeners -= 1
      if (listeners === 0) {
        window.removeEventListener('pointermove', onMove)
        if (rafId) cancelAnimationFrame(rafId)
        rafId = null
      }
    }
  }, [])

  return ref
}

/** Direct read for non-React consumers (Three.js frame loops). */
export const getPointer = () => pointer
