import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

/**
 * Arpit Cosmetics — Vite configuration
 * -----------------------------------
 * The page is drawings, type and motion — no WebGL, no video, no image CDN.
 * Manual chunking keeps the above-the-fold bundle to the entry plus React,
 * and every section below the fold arrives as its own chunk behind a
 * React.lazy() boundary.
 */
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
  },

  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true, passes: 2 },
      format: { comments: false },
    },
    // Nothing here should approach this. If a chunk trips it, something large
    // has been pulled onto a path that used to be lazy.
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vite's dynamic-import preload helper is shared between the entry
          // chunk and every lazily-loaded chunk. Left to Rollup it lands in
          // whichever vendor chunk claims it first, which can drag that whole
          // chunk onto the critical path. Pin it beside React, which the entry
          // needs anyway.
          if (id.includes('preload-helper')) return 'vendor-react'
          if (!id.includes('node_modules')) return
          if (id.includes('gsap')) return 'vendor-gsap'
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'vendor-motion'
          if (id.includes('swiper')) return 'vendor-swiper'
          if (id.includes('react-icons')) return 'vendor-icons'
          if (id.includes('lenis')) return 'vendor-lenis'
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'vendor-react'
          return 'vendor'
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  server: { port: 5173, open: false },
  preview: { port: 4173 },
})
