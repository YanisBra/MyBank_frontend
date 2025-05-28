import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,             // ✅ active describe, test, expect...
    environment: 'jsdom',      // ✅ nécessaire pour tester des composants React
    // setupFiles: ['./tests/setup.js'], // si tu utilises jest-dom (optionnel)
  },
});