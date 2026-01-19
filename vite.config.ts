import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'es',
        manualChunks: {
          // Separate vendor libraries
          vendor: ['react', 'react-dom'],
          // Separate UI libraries
          ui: ['framer-motion', 'lucide-react'],
          // Separate editor libraries
          editor: ['@tiptap/core', '@tiptap/react', '@tiptap/starter-kit'],
          // Separate other large dependencies
          utils: ['date-fns', 'clsx']
        }
      }
    },
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
    // Enable code splitting
    minify: 'terser'
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  },
  // Enable server-side hints
  server: {
    fs: {
      strict: true
    }
  }
})
