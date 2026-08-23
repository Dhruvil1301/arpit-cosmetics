import { useSyncExternalStore } from 'react'

/**
 * Subscribes to a media query without the mount-flash of a useEffect+state
 * pair. `useSyncExternalStore` reads the correct value on the very first render.
 */
export function useMediaQuery(query) {
  const subscribe = (onChange) => {
    if (typeof window === 'undefined') return () => {}
    const mql = window.matchMedia(query)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }
  const getSnapshot = () =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useHasPointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
