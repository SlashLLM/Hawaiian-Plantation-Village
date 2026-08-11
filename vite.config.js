import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // Heavy libs get their own chunks so they only load on demand
          if (id.includes('pixi.js') || id.includes('@pixi')) return 'pixi';
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('canvas-confetti')) return 'confetti';
          if (id.includes('@zxing')) return 'qr-scanner';
          return 'vendor';
        }
      }
    }
  },
  server: {
    // Allow ngrok tunnels (host changes per session)
    allowedHosts: ['.ngrok-free.app', '.ngrok.io'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    exclude: ['**/node_modules/**', '**/e2e/**', '**/dist/**'],
  },
});

