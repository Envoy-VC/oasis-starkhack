import react from '@vitejs/plugin-react';
import path from 'node:path';
import Unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Geist',
            src: './src/assets/fonts/geist-sans/*.woff2',
          },
        ],
      },
    }),
  ],
  define: {
    'process.env.IS_PREACT': JSON.stringify('true'),
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});
