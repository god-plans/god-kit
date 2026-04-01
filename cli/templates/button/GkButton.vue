<script setup lang="ts">
import { GkButton } from 'god-kit/vue'

withDefaults(
  defineProps<{
    label?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    label: 'Button',
    variant: 'primary',
    loading: false,
    disabled: false,
  }
)
</script>

<template>
  <GkButton :variant="variant" :loading="loading" :disabled="disabled">
    <slot>{{ label }}</slot>
  </GkButton>
</template>
