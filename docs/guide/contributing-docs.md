---
title: Contributing docs
description: How to add a new component page and sidebar entry in this VitePress site.
outline: [2, 3]
---

# Contributing docs

For the full workflow, **folder conventions**, and a **copy-paste agent prompt** for new primitives, see **[Component authoring](./component-authoring)**.

## Add a component page

1. Create **`docs/components/<slug>.md`**, or for form controls **`docs/components/form/<slug>.md`** (e.g. `form/checkbox.md` for **GkCheckbox**).
2. Copy structure from **`.vitepress/templates/component-template.md`** in the docs folder.
3. Add a **sidebar** item in **[`.vitepress/config.ts`](../.vitepress/config.ts)** under `themeConfig.sidebar['/components/']` → **Form** or **Feedback & layout** as appropriate.
4. Add a row to **`docs/components/index.md`** in the right section.
5. (Optional) Add **`DemoGk*.vue`** under **`.vitepress/components/demos/<component>/`** — form demos under **`demos/form/<component>/`** (e.g. `demos/form/checkbox/DemoGkCheckbox.vue`), register in **`.vitepress/theme/index.ts`**, and embed `<DemoGk… />` in the page.

## Conventions

- Use frontmatter: `title`, `description`, `outline: [2, 3]`.
- Sections: **Overview**, **Live demo** (optional), **API** (props / events / slots), **Examples** (code fences).

## Changelog

When you ship user-facing changes, add an entry under **`[Unreleased]`** in **`CHANGELOG.md`** at the package root (next to `package.json`), then move items into a dated version when you release. Keep **`docs/guide/changelog.md`** in sync (same sections) so the VitePress site matches the repo file.

## Scaffolding

Run **`node scripts/new-component.mjs <kebab-name> [form|layout]`** from the **`god-kit`** package root. The optional second argument places the primitive under **`src/vue/components/form/`** or **`src/vue/components/layout/`** and writes docs/demos under matching paths. Without it, files go under **`src/vue/components/<name>/`** (e.g. **GkButton**). You still wire **`src/vue/index.ts`**, **`docs/.vitepress/theme/index.ts`**, the sidebar in **`config.ts`**, **`docs/components/index.md`**, and **`CHANGELOG.md`**.

## Future automation

You can generate the Components sidebar from the filesystem with a small build script; until then, keep the sidebar list in sync by hand when adding pages.
