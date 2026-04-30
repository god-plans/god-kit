<script setup lang="ts">
import { GkField, GkSelect } from 'god-kit/vue'
import { ref } from 'vue'

const review = ref<string | undefined>('a')

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]
</script>

<template>
  <GkField label="Readonly review">
    <GkSelect
      v-model="review"
      :options="options"
      readonly
      aria-label="Readonly review"
    />
  </GkField>
</template>
