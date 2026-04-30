<script setup lang="ts">
import { GkField, GkSelect } from 'god-kit/vue'
import { ref } from 'vue'

const multi = ref<string[]>(['a'])

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]
</script>

<template>
  <GkField label="Multiple">
    <GkSelect
      v-model="multi"
      :options="options"
      multiple
      :size="4"
      aria-label="Pick many"
      placeholder="Add…"
    />
  </GkField>
</template>
