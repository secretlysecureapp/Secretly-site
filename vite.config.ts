import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* Legacy / short slugs that redirect client-side — not pre-rendered.
   They are served via the host's SPA fallback and redirect on the client.
   NOTE: vite-react-ssg passes paths WITHOUT a leading slash. */
const REDIRECT_PATHS = new Set([
  'privacy',
  'terms',
  'about-us',
  'secretly-for-android',
  'secretly-for-ios',
  'secretly-for-desktop',
  'secretly-huawei-app-gallery',
  'support-1',
  '-3',
])

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],

  // ── Static site generation (vite-react-ssg) ──
  ssgOptions: {
    entry: 'src/main.tsx',
    // Emit /route/index.html for clean URLs on any static host.
    dirStyle: 'nested',
    // Pre-render every real content route; skip redirect slugs + wildcard.
    includedRoutes(paths: string[]) {
      return paths.filter((p) => {
        const key = p.replace(/^\//, '') // normalize: paths come without a leading slash
        return !REDIRECT_PATHS.has(key) && !key.includes('*') && !key.includes(':')
      })
    },
  },

  build: {
    // Target modern browsers for smaller output
    target: 'es2020',
    // Raise chunk warning threshold slightly for icon-heavy pages
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      // manualChunks only applies to the client build — during the SSR
      // pass react/react-dom are externalized and cannot be chunked.
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              // React runtime in its own chunk — cached independently
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            },
          },
    },
  },
  // Ensure dev server handles SPA routing
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
}))
