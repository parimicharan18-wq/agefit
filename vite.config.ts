import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base: './' guarantees relative asset resolution on GitHub Pages (e.g. /agefit/) AND in Electron file:// protocol
export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react()
  ],
  // @ts-expect-error vitest config types
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts']
  }
})
