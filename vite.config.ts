import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
// to support tiny-secp256k1 . we req. wasm package
import wasm from 'vite-plugin-wasm';
// Node buffer modules
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [react(),
     wasm(),
     NodeGlobalsPolyfillPlugin({
      buffer: true,
    }),
    NodeModulesPolyfillPlugin(),
  ],
  resolve: {
    alias: {
      // shadcn imports @
      '@': path.resolve(__dirname, './src'),
      buffer: 'buffer',
    },
  },
  build: {
    target: 'esnext',
  },

});
