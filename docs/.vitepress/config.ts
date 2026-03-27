import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = dirname(fileURLToPath(import.meta.url))
/** god-kit package root (parent of docs/) */
const kitRoot = resolve(__dirname, '../..')

export default defineConfig({
  title: 'God Kit',
  description: 'Design tokens and Vue 3 primitives for God Plan apps',
  srcDir: '.',
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/' },
      { text: 'Changelog', link: '/guide/changelog' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting started', link: '/guide/getting-started' },
            { text: 'Design tokens', link: '/guide/tokens' },
            { text: 'Composables', link: '/guide/composables' },
            { text: 'RTL and i18n', link: '/guide/rtl' },
            { text: 'Contributing docs', link: '/guide/contributing-docs' },
            { text: 'Changelog', link: '/guide/changelog' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'GkButton', link: '/components/button' },
            { text: 'GkInput', link: '/components/input' },
            { text: 'GkField', link: '/components/field' },
          ],
        },
      ],
    },

    socialLinks: [],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the AGPL-3.0 License.',
    },
  },

  vite: {
    resolve: {
      alias: {
        '@god-plan/god-kit/vue': resolve(kitRoot, 'src/vue/index.ts'),
        '@god-plan/god-kit/tokens.css': resolve(kitRoot, 'src/tokens/tokens.css'),
      },
    },
    server: {
      port: 5173,
    },
  },
})
