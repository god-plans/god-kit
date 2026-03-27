---
title: GkField
description: Field wrapper with label, default slot for the control, and error message.
outline: [2, 3]
---

# GkField

Wraps a single form control: **label** (optional), **default slot** for **GkInput** (or future controls), and an **error** string with `role="alert"`.

## When to use

Use for every labeled control in a form so ids, `aria-describedby`, and error text stay consistent.

## Live demo

<DemoGkField />

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Visible label text |
| `error` | `string` | — | Error message; sets invalid state on child input |
| `labelSrOnly` | `boolean` | `false` | Visually hide label but keep for screen readers |

### Slots

| Slot | Description |
|------|-------------|
| `default` | The input or control (e.g. GkInput) |

### Provide / inject

GkField uses **`useFieldIds()`** internally, then **provides** context for child **GkInput** (`inputId`, `errorId`, `errorMessage`). See [Composables](/guide/composables) for headless usage without **GkField**. You rarely need to use the injection key directly; import **`GK_FIELD`** from `@god-plan/god-kit/vue` only for advanced cases.

## Examples

### With validation

```vue
<script setup lang="ts">
import { GkButton, GkField, GkInput } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const email = ref('')
const error = ref('')

function submit() {
  error.value = email.value.includes('@') ? '' : 'Invalid email.'
}
</script>

<template>
  <form @submit.prevent="submit">
    <GkField label="Email" :error="error">
      <GkInput v-model="email" type="email" autocomplete="email" />
    </GkField>
    <GkButton type="submit" variant="primary">Submit</GkButton>
  </form>
</template>
```
