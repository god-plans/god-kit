# @god-plan/god-kit

Design tokens and **Vue 3** primitives (`Gk*`) for God Plan apps. Intended to grow into the primary UI layer alongside a phased **Vuetify** removal in `god-panel-nuxt`.

## Install

In this monorepo, depend on the workspace package (see root `package.json` workspaces).

```json
{
  "dependencies": {
    "@god-plan/god-kit": "file:../../god-kit"
  }
}
```

## Exports

| Path | Purpose |
|------|---------|
| `@god-plan/god-kit` / `@god-plan/god-kit/vue` | Vue components and `gkTokens` |
| `@god-plan/god-kit/tokens.css` | Semantic CSS variables (`--gk-*`) |
| `@god-plan/god-kit/vue.css` | Scoped styles for `Gk*` components |
| `@god-plan/god-kit/bridge/vuetify.css` | Maps `--v-theme-*` → `--gk-*` while Vuetify remains |

Import order in Nuxt (or any app): **tokens → optional Vuetify bridge → vue.css → app CSS**.

## Usage

```vue
<script setup lang="ts">
import { GkButton, GkField, GkInput } from '@god-plan/god-kit/vue'
import { ref } from 'vue'
const email = ref('')
</script>

<template>
  <GkField label="Email">
    <GkInput v-model="email" type="email" autocomplete="email" />
  </GkField>
  <GkButton type="button" variant="primary">Save</GkButton>
</template>
```

Typed token names (for docs or tooling):

```ts
import { gkTokens } from '@god-plan/god-kit/vue'
// gkTokens.color.primary → '--gk-color-primary'
```

## Naming

All components use the **`Gk`** prefix (`GkButton`, `GkInput`, `GkField`) to avoid collisions with Vuetify `V*` and app-local components.

## Accessibility

- **GkButton**: native `<button>`, focus-visible outline, `disabled` respected.
- **GkInput**: `aria-invalid` / `aria-describedby` when used inside **GkField** with an error message.
- **GkField**: associates `<label for>` with the control id from `useId()`, error region `role="alert"`.

## Testing

```bash
npm run test
```

## Building

```bash
npm run build
```

## Playground

Local Vite app under [`playground/`](playground/) to try components without publishing or linking into Nuxt. It resolves `@god-plan/god-kit/vue` to **`src/`** so edits hot-reload without running `npm run build`.

```bash
npm run playground
```

Opens **http://localhost:5174** (see [`playground/vite.config.ts`](playground/vite.config.ts)). Use `npm run playground:build` for a static check build output in `playground/dist-playground`.

## Documentation (VitePress)

Static docs live under [`docs/`](docs/). They use the same source aliases as the playground so examples stay in sync with `src/`.

```bash
npm run docs:dev      # http://localhost:5173
npm run docs:build    # output: docs/.vitepress/dist
npm run docs:preview  # preview production build
```

To add a component page, follow [`docs/guide/contributing-docs.md`](docs/guide/contributing-docs.md) and copy [`docs/.vitepress/templates/component-template.md`](docs/.vitepress/templates/component-template.md).

## Stitch (reference designs only)

Do **not** call the Stitch API from production UI. Use [`tools/stitch`](../tools/stitch) to generate reference screens, then port styling and structure into this package.

Set `STITCH_API_KEY` only in local env or CI secrets—never commit keys.

## Migration from Vuetify (phased)

1. Import `tokens.css` and `bridge/vuetify.css` so new `Gk*` components align with the current Vuetify theme.
2. Replace surfaces incrementally (forms, then layout, then data display).
3. When Vuetify is fully removed, drop `bridge/vuetify.css` and Vuetify-specific theme code in the app; keep tokens as the single source of truth.

## Future: React / Svelte

Keep **tokens** and **behavior** free of Vue where possible. Add framework-specific packages later that consume the same CSS variables and shared TS utilities—Vue components stay under `@god-plan/god-kit/vue`.
