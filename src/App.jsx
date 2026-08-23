import { useState, useCallback, lazy, Suspense } from 'react'

import { SmoothScrollProvider } from './hooks/useSmoothScroll'
import Ambience from './components/layout/Ambience'
import Cursor from './components/ui/Cursor'
import Preloader from './components/layout/Preloader'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/layout/ScrollProgress'
import FloatingActions from './components/layout/FloatingActions'
import Footer from './components/layout/Footer'

import Hero from './components/sections/Hero'

/**
 * Below-the-fold sections are split out of the entry chunk. Each resolves
 * well before it scrolls into view, and the placeholder reserves height so
 * nothing jumps when it arrives.
 */
const About = lazy(() => import('./components/sections/About'))
const Collections = lazy(() => import('./components/sections/Collections'))
const Boutique = lazy(() => import('./components/sections/Boutique'))
const TheCounter = lazy(() => import('./components/sections/TheCounter'))
const Showroom = lazy(() => import('./components/sections/Showroom'))
const Featured = lazy(() => import('./components/sections/Featured'))
const WhyUs = lazy(() => import('./components/sections/WhyUs'))
const Gallery = lazy(() => import('./components/sections/Gallery'))
const Festival = lazy(() => import('./components/sections/Festival'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))
const Contact = lazy(() => import('./components/sections/Contact'))

/** Height-reserving placeholder — prevents scroll jump as chunks resolve. */
const SectionFallback = ({ minHeight = '60vh' }) => (
  <div style={{ minHeight }} aria-hidden="true" />
)

export default function App() {
  const [ready, setReady] = useState(false)
  const handleReady = useCallback(() => setReady(true), [])

  return (
    <SmoothScrollProvider>
      {/* Decorative layers, all pointer-transparent */}
      <Ambience />
      <Cursor />
      <ScrollProgress />

      <Preloader onDone={handleReady} />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[300] focus:rounded-pill focus:bg-ink focus:px-6 focus:py-3 focus:text-sm focus:text-warm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />

        <Suspense fallback={<SectionFallback minHeight="80vh" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="100vh" />}>
          <Collections />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="100vh" />}>
          <Boutique />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="90vh" />}>
          <TheCounter />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="100vh" />}>
          <Showroom />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="90vh" />}>
          <Featured />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="80vh" />}>
          <WhyUs />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="100vh" />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="90vh" />}>
          <Festival />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="70vh" />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="90vh" />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />

      {/* Announce first paint completion to assistive tech. */}
      <span className="sr-only" role="status" aria-live="polite">
        {ready ? 'Page loaded.' : ''}
      </span>
    </SmoothScrollProvider>
  )
}
