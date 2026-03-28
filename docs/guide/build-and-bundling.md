---
title: Build and bundling
description: sideEffects, tree-shaking, and optional subpath exports for @god-plan/god-kit.
outline: [2, 3]
---

# Build and bundling

## `sideEffects` in `package.json`

The package declares:

```json
"sideEffects": ["**/*.css"]
```

**Why:** Vite/Rollup can treat pure JS modules as side-effect free and drop them when unused. **`.vue` scoped styles compile to separate CSS chunks**; marking `**/*.css` as having side effects prevents the bundler from stripping styles for components that are only referenced for their runtime.

**When to revisit:**

- If you add a JS module that **must** run for its side effects only (rare), list it explicitly or broaden the pattern—never hide real side effects from the bundler.
- If you move to CSS-in-JS or a single global CSS entry, tighten the field so tree-shaking stays accurate.

JSON does not allow comments; keep rationale here in the docs instead of inline in `package.json`.

## Tree-shaking and exports

The main entry **`@god-plan/god-kit/vue`** uses **static named exports** so unused components can be dropped by the app bundler.

Optional **subpath exports** split barrels for semantic imports:

| Import path | Contents |
|-------------|----------|
| `@god-plan/god-kit/vue/form` | Form primitives, field injection keys, composables |
| `@god-plan/god-kit/vue/layout` | Alerts, stack, container, divider, spinner |
| `@god-plan/god-kit/vue/navigation` | Tabs (**GkTabs**, **GkTab**, **GkTabsWindow**, **GkTabsWindowItem**), **`parseGkTabItems`** |
| `@god-plan/god-kit/vue/config` | **`createGkKit`**, **`useGkTheme`**, **`useGkDisplay`**, **`useGkLocale`**, **`useGkDefaults`**, providers |

They share the same build output chunks as the main entry; use them when you want clearer import boundaries in app code.

## Global config

Runtime plugin and composables live under **`@god-plan/god-kit/vue/config`**. See **[Global configuration](./global-configuration)** for setup, theme, display, i18n, defaults, aliases, and tree-shaking notes.

## Source layout

Form-related SFCs live under **`src/vue/components/form/<name>/`** (mirrored in VitePress as **`docs/components/form/`** and **`docs/.vitepress/components/demos/form/`**). Other primitives stay at **`src/vue/components/<name>/`** until you introduce more domain folders (e.g. **`layout/`**).
