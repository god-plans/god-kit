# god-kit

`god-kit` is a **Vue 3 UI kit and design token system** for dashboards and admin apps (including Nuxt).  
It provides typed `Gk*` primitives, semantic tokens, and accessibility-oriented defaults.

- Docs: `https://god-plans.github.io/god-kit/`
- Demo: `https://god-plans.github.io/god-kit/`
- Changelog: [`CHANGELOG.md`](CHANGELOG.md)

## Why God Kit

- **Built for admin workflows:** forms, containment, navigation, feedback.
- **Migration-friendly:** optional Vuetify bridge while replacing screens gradually.
- **Production-focused:** TypeScript types, subpath exports, and `axe-core` a11y specs.
- **Token-first:** semantic CSS variables (`--gk-*`) across components.

## Install in 60 Seconds

```bash
npm i god-kit vue
```

### CLI quick add

```bash
npx god-kit@latest add button
```

Flags: `--yes`, `--dry-run`, `--cwd`, `--force`.

Import CSS in this order:

1. `god-kit/tokens.css`
2. optional `god-kit/bridge/vuetify.css` (only during Vuetify migration)
3. `god-kit/vue.css`
4. your app CSS

### Quick Vue Starter

```ts
import { createApp } from 'vue'
import App from './App.vue'
import 'god-kit/tokens.css'
import 'god-kit/vue.css'

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
import { GkButton, GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <GkField label="Email">
    <GkInput v-model="email" type="email" autocomplete="email" />
  </GkField>
  <GkButton variant="primary">Save</GkButton>
</template>
```

## Copy-Paste Starters

### 1) Vue App Starter

```bash
npm create vite@latest my-admin -- --template vue-ts
cd my-admin
npm i
npm i god-kit vue
```

Then add:

```ts
import 'god-kit/tokens.css'
import 'god-kit/vue.css'
```

### 2) Nuxt Starter

```bash
npx nuxi@latest init my-nuxt-admin
cd my-nuxt-admin
npm i
npm i god-kit vue
```

In `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ['god-kit/tokens.css', 'god-kit/vue.css'],
})
```

### 3) Theme + Snackbar Starter

```ts
import { createApp } from 'vue'
import { createGkKit } from 'god-kit/vue/config'
import { pushGkSnackbar } from 'god-kit/vue'

const app = createApp(App)
app.use(
  createGkKit({
    theme: { defaultTheme: 'system' },
    locale: { locale: 'en', fallback: 'en' },
  })
)

pushGkSnackbar({ text: 'Saved', color: 'success', timeout: 3000 })
```

## Exports

| Path | Purpose |
|------|---------|
| `god-kit` / `god-kit/vue` | Vue components, composables, and `gkTokens` |
| `god-kit/vue/form` | Form primitives and `createForm` |
| `god-kit/vue/layout` | Layout and feedback primitives |
| `god-kit/vue/navigation` | Tabs and pagination primitives |
| `god-kit/vue/config` | `createGkKit`, theme/display/locale/defaults providers |
| `god-kit/tokens.css` | Semantic CSS variables (`--gk-*`) |
| `god-kit/vue.css` | Component styles |
| `god-kit/bridge/vuetify.css` | `--v-theme-*` -> `--gk-*` mapping |

## Production Readiness

- **TypeScript:** typed component/composable exports and token map.
- **Accessibility:** `*.a11y.spec.ts` coverage using `axe-core`.
- **Tree-shaking:** static ESM exports and scoped CSS side-effect declaration.
- **Component naming:** `Gk` prefix to avoid collisions.

## Compatibility Matrix

| Target | Status |
|--------|--------|
| Vue 3.5+ | Supported |
| Nuxt 4 | Supported (CSS import + explicit component imports) |
| Node.js 20+ | Recommended |

## Migration from Vuetify

1. Import `god-kit/tokens.css` + `god-kit/bridge/vuetify.css`.
2. Replace components by vertical slice (forms -> layout -> navigation).
3. Remove bridge after full migration and keep `--gk-*` as source of truth.

More details: [`docs/guide/why-god-kit.md`](docs/guide/why-god-kit.md).

## Local Development

```bash
npm run test
npm run build
npm run docs:dev
npm run playground
```

- Docs dev server: `http://localhost:5173`
- Playground dev server: `http://localhost:5174`

## Release and Roadmap

- Changelog: [`CHANGELOG.md`](CHANGELOG.md)
- Docs changelog page: [`docs/guide/changelog.md`](docs/guide/changelog.md)
- Roadmap: [`docs/guide/roadmap.md`](docs/guide/roadmap.md)

## Contributing and Authoring

- Component authoring: [`docs/guide/component-authoring.md`](docs/guide/component-authoring.md)
- Build/bundling model: [`docs/guide/build-and-bundling.md`](docs/guide/build-and-bundling.md)
- Documentation process: [`docs/guide/contributing-docs.md`](docs/guide/contributing-docs.md)
