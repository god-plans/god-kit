---
title: Global configuration
description: createGkKit — theme, display, locale, defaults, and aliases (Vuetify-inspired).
outline: [2, 3]
---

# Global configuration

God Kit exposes a Vue plugin, **`createGkKit`**, that centralizes runtime options: **theme** (light / dark / system), **display** breakpoints, **locale** and **`t()`**, **defaults** per component, and optional **aliases**. Import from **`@god-plan/god-kit/vue/config`** so your app can tree-shake the rest of the library as needed.

## Setup

Register the plugin once in your app entry (after creating the app):

```ts
import { createApp } from 'vue'
import { createGkKit } from '@god-plan/god-kit/vue/config'
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

## Theme

- **`theme.defaultTheme`**: `'light' | 'dark' | 'system'` — `system` follows **`prefers-color-scheme`** and updates when the OS preference changes.
- **DOM**: the resolved theme (`light` or `dark`, never `system`) is written to **`data-gk-theme`** on the theme root, and **`gk-theme-dark`** is toggled on that element for compatibility. Dark palette variables apply under **`[data-gk-theme="dark"]`** (and existing **`.dark` / `html.dark`** selectors in **`tokens.css`**).
- **`theme.scope`**: optional **`HTMLElement`**, getter **`() => HTMLElement | null`**, or **`null`** — defaults to **`document.documentElement`**.

Use **`useGkTheme()`** for **`name`**, **`resolved`**, **`isDark`**, **`change()`**, **`toggle()`**, and **`cycle()`**.

Subtree-only styling: wrap content in **`GkThemeProvider`** with **`theme="light"`**, **`dark`**, or **`system`**. It sets **`data-gk-theme`** on a wrapper so children inherit CSS variables without changing the global document theme API.

See [Design tokens](./tokens) for the underlying **`--gk-*`** variables.

## Display

**`useGkDisplay()`** exposes viewport width/height, breakpoint flags (**`xs`** … **`xxl`**), the current **`name`**, and **`mobile`** (true when width is below the configured mobile threshold). Defaults follow common Vuetify-style pixel bounds (`sm` 600, `md` 960, …). **`GkNavigationDrawer`** uses **`useGkDisplay().mobile`** for overlay behavior when neither **`permanent`** nor **`temporary`** is set.

Configure via **`createGkKit({ display: { ... } })`**:

- **`mobileBreakpoint`**: a breakpoint name (e.g. **`md`**) or a **number** (pixels) — mobile when **`width <`** that threshold.
- **`thresholds`**: partial override of **`xs` … `xxl`** lower bounds.

## Internationalization

- **`locale.locale`** / **`locale.fallback`** — BCP 47-style codes for lookup.
- **`locale.messages`** — map **`locale` → flat `key → string`**. English reference keys live in the package as **`gkEnMessages`**; copy and extend for other languages.
- **`useGkLocale()`** returns **`{ locale, fallback, t }`**. Placeholders use **`{name}`** in strings.

**`GkLocaleProvider`** can override **`locale`**, optional **`messages`**, and **`rtl`** (sets **`dir`** on the wrapper). Child lookups fall back to the parent **`t`** when a key is missing.

**`vue-i18n`**: implement **`GkVueI18nAdapter`** (`t` + **`locale` ref`) and delegate from your app if you need full ICU / pluralization; God Kit stays minimal by design.

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

The main export **`@god-plan/god-kit/vue`** uses **named exports** and **`sideEffects: ["**/*.css"]`** so unused components can be dropped. The global config entry **`@god-plan/god-kit/vue/config`** is a separate chunk for apps that want **`createGkKit`** and composables without pulling every primitive.

Dynamic **`<component :is="...">`** still requires explicit imports for each resolved component (same limitation as Vuetify).

See [Build and bundling](./build-and-bundling) for **`sideEffects`** and export tables.
