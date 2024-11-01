// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Use Vitest global test functions
    environment: 'jsdom', // If you are testing a component that interacts with the DOM
    setupFiles: 'src/setupTests.ts', // Path to your setup file
  },
});
