<script setup lang="ts">
import { GkField, GkSelect } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const value = ref<string | undefined>('b')
const multi = ref<string[]>(['a'])

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]
</script>

<template>
  <div class="gk-doc-demo gk-doc-stack">
    <GkField label="Single">
      <GkSelect
        v-model="value"
        :options="options"
        aria-label="Pick an option"
        placeholder="Choose…"
      />
    </GkField>

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
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
  max-width: 24rem;
}
</style>
