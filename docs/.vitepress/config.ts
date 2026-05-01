import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = dirname(fileURLToPath(import.meta.url))
/** god-kit package root (parent of docs/) */
const kitRoot = resolve(__dirname, '../..')

export default defineConfig({
  title: 'God Kit',
  titleTemplate: ':title — God Kit',
  description: 'Vue 3 and Nuxt 4 admin UI kit — design tokens, typed components, and dark-mode-ready theming for dashboards.',
  srcDir: '.',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://godkit.godplans.org',
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'God Kit',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/' },
      { text: 'Why God Kit', link: '/guide/why-god-kit' },
      { text: 'Roadmap', link: '/guide/roadmap' },
      { text: 'Changelog', link: '/guide/changelog' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting started', link: '/guide/getting-started' },
            { text: 'Why God Kit', link: '/guide/why-god-kit' },
            { text: 'Global configuration', link: '/guide/global-configuration' },
            { text: 'Architecture and tiers', link: '/guide/architecture' },
            { text: 'Component authoring', link: '/guide/component-authoring' },
            { text: 'Design tokens', link: '/guide/tokens' },
            { text: 'Tailwind CSS', link: '/guide/tailwind' },
            { text: 'Composables', link: '/guide/composables' },
            { text: 'Release and publish', link: '/guide/release-and-publish' },
            { text: 'Roadmap', link: '/guide/roadmap' },
            { text: 'Distribution playbook', link: '/guide/distribution-playbook' },
            { text: 'Growth metrics', link: '/guide/growth-metrics' },
            { text: 'RTL and i18n', link: '/guide/rtl' },
            { text: 'Migrating VDataTable', link: '/guide/migration-vuetify-data-table' },
            { text: 'Contributing docs', link: '/guide/contributing-docs' },
            { text: 'Build and bundling', link: '/guide/build-and-bundling' },
            { text: 'Consumer bundle analysis', link: '/guide/consumer-bundle-analysis' },
            { text: 'CLI architecture', link: '/guide/cli-architecture' },
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
                { text: 'GkCard', link: '/components/containment/gk-card' },
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
              text: 'Data',
              collapsed: false,
              items: [{ text: 'GkDataTable', link: '/components/data/gk-data-table' }],
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
                { text: 'GkGrid', link: '/components/grid' },
                { text: 'GkContainer', link: '/components/container' },
                { text: 'GkDivider', link: '/components/divider' },
                { text: 'GkSpinner', link: '/components/spinner' },
                { text: 'GkSkeletonLoader', link: '/components/feedback/skeleton-loader' },
                { text: 'GkSnackbar', link: '/components/feedback/snackbar' },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/god-plans/god-kit' }],
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/god-plans/god-kit/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    lastUpdated: {
      text: 'Last updated',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: '© God Plans. Built with Vue 3 and VitePress.',
    },
  },

  vite: {
    resolve: {
      alias: {
        // More specific paths before `god-kit/vue` (otherwise `god-kit/vue/config` resolves wrong).
        'god-kit/vue/config': resolve(kitRoot, 'src/vue/config/index.ts'),
        'god-kit/vue': resolve(kitRoot, 'src/vue/index.ts'),
        'god-kit/tokens.css': resolve(kitRoot, 'src/tokens/tokens.css'),
        'god-kit/vue.css': resolve(kitRoot, 'dist/assets/style.css'),
        'god-kit/vue/data': resolve(kitRoot, 'src/vue/data.ts'),
      },
    },
    server: {
      port: 5173,
    },
  },
})
