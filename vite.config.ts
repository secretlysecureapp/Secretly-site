import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers for smaller output
    target: 'es2020',
    // Raise chunk warning threshold slightly for icon-heavy pages
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
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
})
