import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'OIKOS_', // Expose env variables starting with OIKOS_
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'], // Optional: for @testing-library/jest-dom
  },
} as UserConfig)
