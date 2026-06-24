import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

const devRedirectPlugin = {
  name: 'dev-redirect',
  configureServer(server: any) {
    server.middlewares.use((req: any, _res: any, next: any) => {
      // Redirect requests for the root or index.html to index.source.html in dev mode
      if (req.url === '/' || req.url === '/index.html' || req.url === '/wiki/' || req.url === '/wiki/index.html') {
        req.url = '/index.source.html';
      }
      next();
    });
  }
};

export default defineConfig({
  plugins: [tailwindcss(), devRedirectPlugin],
  base: '/wiki/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.source.html'),
        sw: resolve(__dirname, 'src/sw.ts')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'sw') {
            return 'sw.js';
          }
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
});
