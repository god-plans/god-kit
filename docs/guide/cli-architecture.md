---
title: CLI architecture
description: Architecture decision record and acceptance contract for the public god-kit CLI add command.
outline: [2, 3]
---

# CLI architecture

This document is the implementation contract for the public `god-kit` CLI.

## Scope

### In scope (MVP)

- Command surface: `npx god-kit@latest add <component>`
- Supported project types:
  - Vue + Vite
  - Nuxt
- Supported flags:
  - `--yes`
  - `--dry-run`
  - `--cwd <path>`
  - `--force`
- Manifest-driven component generation for initial component set.
- Idempotent reruns.

### Out of scope (MVP)

- `npx add gk <component>` alias entrypoint.
- Interactive component marketplace UI.
- Automatic route-level import rewrites in arbitrary user code.
- Telemetry collection by default.

## ADR: packaging and ownership

- Keep contributor scaffold in `scripts/new-component.mjs`.
- Keep public CLI in `cli/` with runtime templates/manifests.
- Publish CLI from the same npm package initially via `bin` (`god-kit` command).
- Keep templates as explicit runtime files in `cli/templates/` to avoid drift from docs-only templates.

## Project detection matrix

| Signal | Classification |
|---|---|
| `nuxt.config.ts/js/mjs` present or `nuxt` dep present | `nuxt` |
| `vite.config.ts/js/mjs` and Vue entry (`src/main.ts/js`) or `vite` + `vue` deps | `vue-vite` |
| none matched | `unknown` (fail with guidance) |

## Idempotency contract

- Generated component file:
  - identical content -> `unchanged`
  - missing file -> `created`
  - different content + `--force` -> `overwritten`
  - different content without `--force` -> `conflict` and fail
- Integration patches:
  - CSS imports/config entries are inserted only if missing.
  - no duplicate lines or duplicate config values are written on rerun.
- Dependency install:
  - only missing dependencies are installed.
  - skipped entirely on `--dry-run`.

## Acceptance checklist

1. `npx god-kit@latest add button` works in both Nuxt and Vue Vite fixtures.
2. `--dry-run` prints intended actions and writes nothing.
3. `--cwd` targets a non-current directory.
4. `--force` overwrites conflicts, no-force fails safely.
5. Rerunning the command does not duplicate generated files or CSS integration lines.
