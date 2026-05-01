# Contributing to God Kit

Thank you for helping improve **god-kit**. This document is the entry point for code, docs, and release hygiene. Deeper guides live in the VitePress site under **Guide**.

## Prerequisites

- **Node.js** 20+ and **npm** 10+ (see `package.json` `engines`).
- Familiarity with **Vue 3** (Composition API, SFCs) and **TypeScript**.

## Getting started

```bash
git clone https://github.com/god-plans/god-kit.git
cd god-kit
npm install
```

Common commands:

| Command | Purpose |
|---------|---------|
| `npm run test` | Vitest (unit + `axe-core` a11y specs where present) |
| `npm run test:watch` | Vitest watch mode |
| `npm run build` | Library build, Tailwind artifact generation, post-build asset copy |
| `npm run generate:tailwind` | Regenerate `dist/tailwind/*` and `src/tokens/generated/tailwind-theme.css` only |
| `npm run playground` | Dev app against source aliases (`playground/`) |
| `npm run docs:dev` | VitePress docs (default port 5173) |
| `npm run docs:build` | Production docs build (runs `npm run build` first) |
| `npm run release:check` | Build + test + `npm publish --dry-run` |

## What to contribute

- **Components & composables:** follow token-first styling (`var(--gk-*)`), **Gk** prefix, typed props, and accessibility patterns used elsewhere.
- **Design tokens:** update `src/tokens/tokens.css` and keep `src/tokens/tokens.ts` (`gkTokens`) in sync; run `npm run build` or `npm run generate:tailwind` so Tailwind preset/theme artifacts and snapshots stay aligned.
- **Tests:** add or extend `*.spec.ts`; interactive primitives should have `*.a11y.spec.ts` where appropriate.
- **Docs:** component pages, guides, and demos live under `docs/`; see below.

## Pull request checklist

GitHub loads **[`.github/pull_request_template.md`](.github/pull_request_template.md)** when you open a PR in the browser — fill it in so reviewers get context quickly.

1. **Scope:** keep changes focused on one concern (feature, fix, or docs)—avoid unrelated refactors.
2. **Quality:** `npm run test` passes; for doc or theme changes, run `npm run docs:build` when VitePress content or aliases change.
3. **Changelog:** for user-facing behavior or API changes, add an entry to **`CHANGELOG.md`** under the target version (and mirror summaries in **`docs/guide/changelog.md`** when you touch shipped behavior).
4. **Exports:** new public surfaces need matching `package.json` `exports` and, if applicable, CLI manifest updates (`cli/`).

## Detailed guides (docs site)

| Topic | Location |
|-------|----------|
| Component structure, tiers, doc outline | [Component authoring](docs/guide/component-authoring.md) |
| VitePress pages, demos, `GkDocsExample`, sidebar | [Contributing docs](docs/guide/contributing-docs.md) |
| Tokens and theming | [Design tokens](docs/guide/tokens.md) |
| Tailwind integration | [Tailwind CSS](docs/guide/tailwind.md) |
| Library build layout | [Build and bundling](docs/guide/build-and-bundling.md) |
| npm publish checklist | [Release and publish](docs/guide/release-and-publish.md) |
| CLI behavior | [CLI architecture](docs/guide/cli-architecture.md) |

## Scaffolding a new primitive

```bash
npm run new-component -- <kebab-name> [form|layout]
```

Then wire exports in `src/vue/index.ts` (and subpath barrels if needed), register demos in `docs/.vitepress/theme/index.ts`, add the sidebar entry and catalog row, and update **`CHANGELOG.md`**. The [Contributing docs](docs/guide/contributing-docs.md) page lists the full checklist.

## Questions and issues

- **Bugs & features:** use **[GitHub issue templates](https://github.com/god-plans/god-kit/issues/new/choose)** (bug report, feature request, or other / discussion).
- **Security:** see **[SECURITY.md](SECURITY.md)** — do not use public issues for undisclosed vulnerabilities.

## Code of conduct

All participants are expected to follow the **[Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md)** in issues, pull requests, discussions, and other community spaces.
