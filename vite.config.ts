import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
      '/actuator': { target: 'http://localhost:8080', changeOrigin: true }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['react-icons', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          state: ['zustand', '@tanstack/react-query'],
          markdown: ['react-markdown', 'remark-gfm', 'rehype-highlight']
        }
      }
    }
  }
});
