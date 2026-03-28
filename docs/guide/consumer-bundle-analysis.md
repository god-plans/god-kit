---
title: Consumer bundle analysis
description: How to inspect how much god-kit contributes in god-panel-nuxt.
outline: [2, 3]
---

# Consumer bundle analysis

Use **`@god-plan/god-panel-nuxt`** (or any Nuxt app that depends on the kit) to measure real-world chunk size, not only the library build.

## Nuxt analyze

From the **`god-panel-nuxt/god-panel-nuxt`** app directory:

```bash
cd god-panel-nuxt/god-panel-nuxt
npx nuxi analyze
```

This produces a visual report of the production client bundle. Search or filter for the chunk that contains **`god-kit`** (often alongside `node_modules` paths or vendor chunks) to see how much of the kit and its dependencies are pulled in.

**Tip:** Run the command after a clean `nuxt build` if you want numbers that match CI; keep Node and Nuxt versions aligned with production.

## Rollup visualizer (optional)

If you add **`rollup-plugin-visualizer`** to the Nuxt `vite` config (or use a Nuxt module that wraps it), you can generate a **static HTML treemap** of the Rollup output. That helps compare before/after when adding new `Gk*` imports or changing import paths (e.g. `god-kit/vue/form` vs the main barrel).

## What to watch

- Growth of the vendor chunk that includes **`god-kit`** when new primitives are added.
- Accidental imports of **large** app-only dependencies from shared code; keep kit code lean and token-driven.
