---
title: Composables
description: useFieldIds and useFormControl for headless field behavior and custom layouts.
outline: [2, 3]
---

# Composables

God Kit exposes small Vue composables so **ids**, **ARIA**, and **error** state can be reused outside **GkField** or mirrored in non-Vue runtimes later.

## `useFieldIds`

Returns stable, SSR-friendly ids for a single control and its error region:

- `baseId` — from Vue `useId()`
- `inputId` — `${baseId}-control`
- `errorId` — `${baseId}-error`

**GkField** uses this internally and [provides](/components/field) the same ids to **GkInput** via inject.

```ts
import { useFieldIds } from '@god-plan/god-kit/vue'

const { inputId, errorId } = useFieldIds()
```

## `useFormControl`

For **custom** layouts where you do not use **GkField**, pass an optional error ref/getter and receive computed ARIA-oriented values plus the same ids as `useFieldIds`:

```ts
import { ref } from 'vue'
import { useFormControl } from '@god-plan/god-kit/vue'

const error = ref<string | undefined>()
const { inputId, errorId, ariaInvalid, ariaDescribedBy, errorMessage } = useFormControl({ error })

// Bind inputId, ariaInvalid, aria-describedby to your native control; render error in an element with errorId.
```

When **GkField** wraps **GkInput**, prefer the default provide/inject path instead of wiring `useFormControl` by hand.

## See also

- [GkField](/components/field) — label, error region, and context for **GkInput**
- [RTL and i18n](./rtl) — direction and logical layout
- [Getting started](./getting-started) — Vitest and axe specs in `*.spec.ts` / `*.a11y.spec.ts`
