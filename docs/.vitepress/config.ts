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
            { text: 'Architecture and tiers', link: '/guide/architecture' },
            { text: 'Component authoring', link: '/guide/component-authoring' },
            { text: 'Design tokens', link: '/guide/tokens' },
            { text: 'Composables', link: '/guide/composables' },
            { text: 'RTL and i18n', link: '/guide/rtl' },
            { text: 'Contributing docs', link: '/guide/contributing-docs' },
            { text: 'Build and bundling', link: '/guide/build-and-bundling' },
            { text: 'Consumer bundle analysis', link: '/guide/consumer-bundle-analysis' },
            { text: 'Changelog', link: '/guide/changelog' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/' },
            {
              text: 'Form',
              collapsed: false,
              items: [
                { text: 'GkForm', link: '/components/form/form' },
                { text: 'GkInput', link: '/components/form/input' },
                { text: 'GkField', link: '/components/form/field' },
                { text: 'GkTextarea', link: '/components/form/textarea' },
                { text: 'GkCheckbox', link: '/components/form/checkbox' },
                { text: 'GkRadioGroup & GkRadio', link: '/components/form/radio' },
                { text: 'GkSelect', link: '/components/form/select' },
              ],
            },
            {
              text: 'Containment',
              collapsed: false,
              items: [
                { text: 'GkOverlay', link: '/components/containment/overlay' },
                { text: 'GkDialog', link: '/components/containment/dialog' },
                { text: 'GkBottomSheet', link: '/components/containment/bottom-sheet' },
                { text: 'GkMenu', link: '/components/containment/menu' },
                { text: 'GkTooltip', link: '/components/containment/tooltip' },
                { text: 'GkNavigationDrawer', link: '/components/containment/navigation-drawer' },
              ],
            },
            {
              text: 'Navigation',
              collapsed: false,
              items: [
                { text: 'GkTabs', link: '/components/navigation/tabs' },
                { text: 'GkPagination', link: '/components/navigation/pagination' },
              ],
            },
            {
              text: 'Expansion',
              collapsed: false,
              items: [{ text: 'Expansion panels', link: '/components/expansion' }],
            },
            {
              text: 'Feedback & layout',
              collapsed: false,
              items: [
                { text: 'GkButton', link: '/components/button' },
                { text: 'GkAlert', link: '/components/alert' },
                { text: 'GkStack', link: '/components/stack' },
                { text: 'GkContainer', link: '/components/container' },
                { text: 'GkDivider', link: '/components/divider' },
                { text: 'GkSpinner', link: '/components/spinner' },
              ],
            },
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
