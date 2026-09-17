import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': `${import.meta.dirname}/src` } },
  test: {
    globals: true,
    include: ['src/**/*.spec.{ts,tsx}'],
    // The index is built by parsing every fetched document, half a megabyte of it, and Shiki loads its
    // grammars on the first highlight. The default 5s passes only on a warm run.
    testTimeout: 30_000,
  },
})
