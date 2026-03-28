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

**GkField** uses this internally and [provides](/components/form/field) the same ids to **GkInput** via inject.

**GkRadioGroup** [provides](/components/form/radio) **`GK_RADIO_GROUP`** with **`name`**, **`modelValue`**, **`setValue`**, **`isDisabled`**, and **`isReadonly`** for **GkRadio** children.

```ts
import { useFieldIds } from 'god-kit/vue'

const { inputId, errorId } = useFieldIds()
```

## `useFormControl`

For **custom** layouts where you do not use **GkField**, pass an optional error ref/getter and receive computed ARIA-oriented values plus the same ids as `useFieldIds`:

```ts
import { ref } from 'vue'
import { useFormControl } from 'god-kit/vue'

const error = ref<string | undefined>()
const { inputId, errorId, ariaInvalid, ariaDescribedBy, errorMessage } = useFormControl({ error })

// Bind inputId, ariaInvalid, aria-describedby to your native control; render error in an element with errorId.
```

When **GkField** wraps **GkInput**, prefer the default provide/inject path instead of wiring `useFormControl` by hand.

## `createForm`

Builds validation-related state for **[GkForm](/components/form/form)** or custom layouts. Pass **`disabled` / `readonly`** getters and an optional **`validate`** function; defaults resolve **`{ valid: true, errors: [] }`** when **`validate`** is omitted.

```ts
import { createForm } from 'god-kit/vue'

const form = createForm({
  disabled: () => false,
  readonly: () => false,
})
```

See **[GkForm](/components/form/form)** for **`SubmitEventPromise`** and submit handling.

## `useTooltipPosition`

Positions a **fixed** tooltip panel relative to an anchor element for **`top`**, **`bottom`**, **`start`**, and **`end`** placements, with viewport clamping and **`scroll`** / **`resize`** listeners. **GkTooltip** uses this internally.

```ts
import { ref } from 'vue'
import { useTooltipPosition } from 'god-kit/vue'

const open = ref(false)
const anchorEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)
const placement = ref<'top' | 'bottom' | 'start' | 'end'>('bottom')
const offset = ref(10)

const { panelStyle, update } = useTooltipPosition(open, anchorEl, panelEl, placement, offset)
```

## `useButtonInteractionState`

Combines **`disabled`**, **`readonly`**, and **`loading`** into a single **`blocksAction`** ref for click guards (used by **GkButton**; reuse for other pressable primitives).

```ts
import { toRef } from 'vue'
import { useButtonInteractionState } from 'god-kit/vue'

const { blocksAction } = useButtonInteractionState(
  toRef(props, 'disabled'),
  toRef(props, 'readonly'),
  toRef(props, 'loading'),
)
```


## See also

- [GkField](/components/form/field) — label, error region, and context for **GkInput**
- [RTL and i18n](./rtl) — direction and logical layout
- [Getting started](./getting-started) — Vitest and axe specs in `*.spec.ts` / `*.a11y.spec.ts`
