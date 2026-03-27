---
title: RTL and i18n
description: Right-to-left layouts, dir attribute, and how God Kit components behave.
outline: [2, 3]
---

# RTL and i18n

God Kit is built for apps that switch **LTR** and **RTL** (e.g. Persian with `@nuxtjs/i18n`).

## Set direction on the document or app root

Use the HTML **`dir`** attribute on `html` or a top-level wrapper:

```html
<html dir="rtl" lang="fa">
```

In Nuxt, your i18n or layout usually sets `dir` from the active locale.

## Component styling

Primitives use **logical** CSS where it matters for mirroring:

- **`padding-inline`**, **`margin-inline`**, **`text-align: start`** instead of physical left/right-only rules.
- Focus rings and symmetric shadows do not need extra RTL overrides.

Labels and errors use **start** alignment so they follow the reading direction.

## Testing checklist

1. Mount or render the tree under **`dir="rtl"`** (see tests in `src/vue/components/form/field/GkField.spec.ts`).
2. Confirm **`label[for]`** still matches **`input[id]`** (accessibility, not visual).
3. Run **`npm run test`** — includes **axe** checks on mounted components.

## Density with RTL

The **`.gk-density-compact`** class (see [Design tokens](./tokens)) only changes spacing variables; it composes with RTL without extra steps.
