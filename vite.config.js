import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/todo/',
  server: {
    allowedHosts: ['.ngrok-free.app'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    restoreMocks: true,
  },
})
