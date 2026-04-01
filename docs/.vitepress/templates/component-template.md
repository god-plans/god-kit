---
title: GkComponentName
description: One-line description of the component.
outline: [2, 3]
---

# GkComponentName

Brief overview of what this component does and when to use it.

## When to use

- One or two practical scenarios where this primitive is a good fit.
- Mention common misuse boundaries and related primitives when needed.

## Live demo

<!-- Optional: register DemoGkComponentName in .vitepress/theme/index.ts -->

<!--
<DemoGkComponentName />
-->

<!-- Optional: short bullets or one diagram — see docs/guide/component-authoring.md -->

<!--
## Anatomy

| Region | Description |
|--------|-------------|
| Root | ... |
-->

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `example` | `string` | `''` | ... |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | ... |

### Slots

| Slot | Description |
|------|-------------|
| `default` | ... |

## Examples

### Basic

```vue
<script setup lang="ts">
import { GkComponentName } from 'god-kit/vue'
</script>

<template>
  <GkComponentName />
</template>
```

### Advanced

```vue
<script setup lang="ts">
import { GkComponentName } from 'god-kit/vue'
</script>

<template>
  <!-- Demonstrate realistic app wiring (state, slots, async, etc.) -->
  <GkComponentName />
</template>
```

### Edge case

```vue
<script setup lang="ts">
import { GkComponentName } from 'god-kit/vue'
</script>

<template>
  <!-- Disabled/readonly/loading/error/RTL/keyboard-sensitive scenario -->
  <GkComponentName />
</template>
```

## Accessibility notes

- **Keyboard:** list keys and focus behavior for interactive controls.
- **Screen readers:** mention required labels/aria props when standalone.
- **State semantics:** note disabled/readonly/loading/error semantics if relevant.

## Related components

- [GkComponentA](../path)
- [GkComponentB](../path)

