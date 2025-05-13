import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cspConfig, securityHeaders } from './src/lib/security.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/infinite-scroll/',
  server: {
    headers: {
      ...securityHeaders,
      'Content-Security-Policy': Object.entries(cspConfig.directives)
        .map(([key, value]) => `${key} ${value.join(' ')}`)
        .join('; ')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable source maps in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
}); 