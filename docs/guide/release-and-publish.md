---
title: Release and publish
description: Release checklist for publishing god-kit to npm and keeping the latest tag aligned with repository changes.
outline: [2, 3]
---

# Release and publish

Use this checklist to keep npm `latest` aligned with repository state.

## 1) Preflight checks

```bash
npm ci
npm run release:check
```

`release:check` builds the package, runs tests, and validates the npm tarball with `npm publish --dry-run`.

## 2) Confirm metadata

- `package.json` version is updated.
- `CHANGELOG.md` has a dated section for that version.
- `homepage`, `repository`, and `keywords` are accurate.
- `LICENSE` exists and matches the package `license` field.

## 3) Publish

```bash
npm publish --access public
```

After publishing, verify:

```bash
npm view god-kit version dist-tags --json
```

## 4) Post-publish checks

- npm `latest` points to the expected version.
- README install steps work in a fresh Vue app.
- Docs links (home, getting started, changelog) point to the new release context.
