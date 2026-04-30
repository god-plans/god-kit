<script setup lang="ts">
import { GkField, GkSelect } from 'god-kit/vue'
import { ref } from 'vue'

const value = ref<string | undefined>('b')

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]
</script>

<template>
  <GkField label="Single">
    <GkSelect
      v-model="value"
      :options="options"
      aria-label="Pick an option"
      placeholder="Choose…"
    />
  </GkField>
</template>
