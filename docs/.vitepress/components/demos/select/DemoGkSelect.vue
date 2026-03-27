<script setup lang="ts">
import { GkSelect } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const value = ref<string | undefined>('b')

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]
</script>

<template>
  <div class="gk-doc-demo">
    <GkSelect
      v-model="value"
      :options="options"
      aria-label="Pick an option"
      placeholder="Choose…"
    />
  </div>
</template>
