---
title: Vue and Nuxt Global Configuration
description: Configure God Kit with createGkKit for theme, display breakpoints, i18n locale, defaults, and aliases in Vue 3 and Nuxt 4 apps.
outline: [2, 3]
---

# Global configuration

God Kit exposes a Vue plugin, **`createGkKit`**, that centralizes runtime options: **theme** (named themes with system fallback), **display** breakpoints, **locale** and **`t()`**, **defaults** per component, and optional **aliases**. Import from **`god-kit/vue/config`** so your app can tree-shake the rest of the library as needed.

## Can I use a config file?

The package does **not** read a fixed path like `gk.config.json` at runtime. You **choose** where configuration lives: most apps define a small **TypeScript (or JavaScript) module** that exports a **`GkKitOptions`** object and pass it to **`createGkKit`**. That gives you type-checking, splitting messages into per-locale files, and environment-based overrides.

```ts
// src/gk.config.ts
import type { GkKitOptions } from 'god-kit/vue/config'

export const gkKitConfig: GkKitOptions = {
  theme: {
    defaultTheme: 'system',
    themes: {
      brandNight: {
        extends: 'dark',
        isDark: true,
        tokens: {
          '--gk-color-primary': '#8b5cf6',
          '--gk-color-primary-hover': '#7c3aed',
        },
      },
    },
  },
  display: { mobileBreakpoint: 'md' },
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: {
      en: { /* … */ },
      fr: { /* … */ },
    },
  },
}
```

```ts
// main.ts
import { createGkKit } from 'god-kit/vue/config'
import { gkKitConfig } from './gk.config'

app.use(createGkKit(gkKitConfig))
```

You can also **`import` JSON** (if your bundler allows) or merge objects from CMS / remote config before calling **`createGkKit`**.

## Setup

Register the plugin once in your app entry (after creating the app):

```ts
import { createApp } from 'vue'
import { createGkKit } from 'god-kit/vue/config'
import App from './App.vue'

const app = createApp(App)
app.use(
  createGkKit({
    theme: { defaultTheme: 'system' },
    display: { mobileBreakpoint: 'md' },
    locale: { locale: 'en', fallback: 'en' },
    defaults: {
      GkButton: { variant: 'primary' },
    },
  })
)
app.mount('#app')
```

Ensure **`tokens.css`** is loaded before **`vue.css`** so semantic variables apply. See [Getting started](./getting-started).

## Full options reference (`GkKitOptions`)

| Key | Type | Purpose |
|-----|------|---------|
| **`theme`** | **`GkKitThemeOptions`** | Named theme registry, default mode, and optional DOM root. |
| **`display`** | **`GkKitDisplayOptions`** | Responsive breakpoints and mobile threshold. |
| **`locale`** | **`GkKitLocaleOptions`** | Active locale, fallback, and message catalogs. |
| **`defaults`** | **`GkKitComponentDefaults`** | Global default props per component name (PascalCase). |
| **`aliases`** | **`GkKitAliases`** | Extra registered component names (plain or with default props). |

### `theme` (`GkKitThemeOptions`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| **`defaultTheme`** | **`GkThemeName`** | **`'light'`** | Initial theme. Built-ins: **`light`**, **`dark`**, **`system`**, **`ocean`**, **`highContrast`**. |
| **`scope`** | **`HTMLElement \| null \| () => HTMLElement \| null`** | **`document.documentElement`** | Element that receives **`data-gk-theme`** and **`gk-theme-dark`**. |
| **`themes`** | **`Record<string, Omit<GkThemeDefinition, 'name'>>`** | **`{}`** | Additional custom themes (hybrid model: TS token overrides + optional CSS selectors). |
| **`includePresets`** | **`boolean`** | **`true`** | Includes built-in presets (**`ocean`**, **`highContrast`**) in the runtime registry. |

Resolved theme is always a concrete name (never literal **`system`**). Use **`useGkTheme()`** for **`name`**, **`resolved`**, **`isDark`**, **`change()`**, **`toggle()`**, **`cycle()`**, plus runtime registry helpers **`registerTheme`**, **`registerThemes`**, and **`unregisterTheme`**.

### `display` (`GkKitDisplayOptions`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| **`mobileBreakpoint`** | **`GkDisplayBreakpointName \| number`** | **`'md'`** | Viewport width **strictly below** this threshold counts as **mobile** (name uses [thresholds](#default-breakpoint-pixels), or pass pixels). |
| **`thresholds`** | **`Partial<GkDisplayThresholds>`** | (see below) | Lower bounds in **px** for named breakpoints **`xs` … `xxl`**. |

#### Default breakpoint pixels

| Name | Default lower bound (px) |
|------|---------------------------|
| **`xs`** | `0` |
| **`sm`** | `600` |
| **`md`** | `960` |
| **`lg`** | `1280` |
| **`xl`** | `1920` |
| **`xxl`** | `2560` |

**`useGkDisplay()`** exposes width/height, **`name`**, **`mobile`**, and flags **`xs` … `xxl`**. **`GkNavigationDrawer`** uses **`mobile`** when neither **`permanent`** nor **`temporary`** is set.

### `locale` (`GkKitLocaleOptions`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| **`locale`** | **`string`** | **`'en'`** | Active BCP 47–style locale code for **`t()`** lookup. |
| **`fallback`** | **`string`** | **`'en'`** | Used when a key is missing in the active locale. |
| **`messages`** | **`Record<string, Record<string, string>>`** | **`{}`** (merged with built-in English) | Map **`localeCode` → { translationKey → string }**. Package English keys live in **`gkEnMessages`**; **`en`** is merged with those keys. |

Placeholders in strings use **`{name}`** syntax; pass values as the second argument to **`t()`**.

### `defaults` (`GkKitComponentDefaults`)

Flat map: **component `name`** (PascalCase) → **prop name → value**. Subtrees can add layers with **`GkDefaultsProvider`**.

### `aliases` (`GkKitAliases`)

Map **custom tag name** → **`Component`** or **`{ extends: Component, defaults?: { … } }`**. See [Aliases](#aliases).

---

## Theme (named global themes + system)

- **`theme.defaultTheme`** can be **`light`**, **`dark`**, **`system`**, built-in presets (**`ocean`**, **`highContrast`**), or custom names.
- **DOM**: active concrete theme name is written to **`data-gk-theme`**; **`gk-theme-dark`** is toggled based on resolved darkness.
- **`theme.scope`**: optional **`HTMLElement`**, getter **`() => HTMLElement | null`**, or **`null`** — defaults to **`document.documentElement`**.
- **`theme.themes`**: register custom themes with token overrides and optional `extends`.

Example runtime switching and dynamic registration:

```ts
import { useGkTheme } from 'god-kit/vue/config'

const theme = useGkTheme()

theme.registerTheme('forest', {
  extends: 'dark',
  isDark: true,
  tokens: {
    '--gk-color-primary': '#22c55e',
    '--gk-color-primary-hover': '#16a34a',
  },
})

theme.change('forest')
```

For subtree theming, wrap sections with **`GkThemeProvider`** and pass `theme` (and optional local `themes`) to scope theme application without changing the app root.

See [Design tokens](./tokens) for **`--gk-*`** variables.

## Display (responsive breakpoints)

Configure via **`createGkKit({ display: { ... } })`**:

- **`mobileBreakpoint`**: a breakpoint name (e.g. **`md`**) or a **number** (pixels) — mobile when **`width <`** that threshold.
- **`thresholds`**: partial override of **`xs` … `xxl`** lower bounds.

This is separate from **color theme**: “display” here means **viewport / layout**, not light vs dark.

## Multiple locales

1. **Register all languages** in **`locale.messages`**: each top-level key is a locale code (**`en`**, **`fr`**, **`ar`**, …); each value is a flat **`key → string`** map. English **`gkEnMessages`** is merged into **`en`** automatically.
2. **Set initial locale** with **`locale.locale`** and **`locale.fallback`** (e.g. fallback **`en`** when a key is missing in the active locale).
3. **Switch at runtime** by updating the ref from **`useGkLocale()`**:

```ts
import { useGkLocale } from 'god-kit/vue/config'

const { locale } = useGkLocale()
locale.value = 'fr'
```

4. **Subtree overrides**: **`GkLocaleProvider`** accepts **`locale`**, optional **`messages`**, and **`rtl`** (sets **`dir`** on the wrapper). Child **`t`** falls back to the parent when a key is missing.

**`vue-i18n`**: use **`GkVueI18nAdapter`** if you need full ICU / pluralization; God Kit’s built-in **`t()`** stays minimal by design.

See also [RTL and i18n](./rtl).

## Defaults

**`createGkKit({ defaults: { GkButton: { variant: 'primary' }, ... } })`** sets global defaults keyed by **component `name`** (PascalCase).

**`GkDefaultsProvider`** merges additional defaults for a subtree (parent map first, then local overrides).

**`useGkDefaults('GkButton')`** returns a computed map of defaults for that component. **`mergeGkProps(defaults, props)`** merges defaults with instance props; **`class`** and **`style`** are combined (arrays flattened) instead of overwritten.

Contextual nesting (defaults per parent component type) is not implemented yet; use flat keys only for now.

## Aliases

Pass **`aliases`** to **`createGkKit`**:

- **`Component`** — register under a new tag: **`app.component('GkPrimaryButton', GkButton)`** equivalent.
- **`{ extends: Component, defaults?: { ... } }`** — registers a thin wrapper that merges default props via **`mergeProps`**.

You can also register aliases manually with **`app.component`** and add a **`defaults`** entry for the new name so **`useGkDefaults`** picks them up.

## Tree shaking

The main export **`god-kit/vue`** uses **named exports** and **`sideEffects: ["**/*.css"]`** so unused components can be dropped. The global config entry **`god-kit/vue/config`** is a separate chunk for apps that want **`createGkKit`** and composables without pulling every primitive.

Dynamic **`<component :is="...">`** still requires explicit imports for each resolved component (same limitation as Vuetify).

See [Build and bundling](./build-and-bundling) for **`sideEffects`** and export tables.
