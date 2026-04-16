import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const kitRoot = resolve(__dirname, '..')

export default defineConfig({
  root: __dirname,
  plugins: [vue()],
  resolve: {
    alias: {
      // Dev against source (no library rebuild needed)
      'god-kit/vue': resolve(kitRoot, 'src/vue/index.ts'),
      'god-kit/vue/config': resolve(kitRoot, 'src/vue/config/index.ts'),
      'god-kit/tokens.css': resolve(kitRoot, 'src/tokens/tokens.css'),
    },
  },
  server: {
    port: 5174,
    open: true,
  },
  build: {
    outDir: 'dist-playground',
    emptyOutDir: true,
  },
})
