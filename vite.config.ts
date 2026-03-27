import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      entryRoot: 'src',
      include: [
        'src/vue/**/*',
        'src/vue/composables/**/*.ts',
        'src/tokens/**/*.ts',
        'src/injection.ts',
      ],
      outDir: 'dist',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        vue: resolve(__dirname, 'src/vue/index.ts'),
        'vue-form': resolve(__dirname, 'src/vue/form.ts'),
        'vue-layout': resolve(__dirname, 'src/vue/layout.ts'),
      },
      name: 'GodKitVue',
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        assetFileNames: 'assets/[name][extname]',
      },
    },
    sourcemap: true,
  },
})
