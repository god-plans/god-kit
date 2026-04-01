<script setup lang="ts">
import { GkField, GkSelect } from 'god-kit/vue'
import { ref } from 'vue'

const value = ref<string | undefined>('b')
const multi = ref<string[]>(['a'])
const review = ref<string | undefined>('a')

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]
</script>

<template>
  <div class="gk-doc-demo gk-doc-stack">
    <h4 class="gk-doc-heading">Basic</h4>
    <GkField label="Single">
      <GkSelect
        v-model="value"
        :options="options"
        aria-label="Pick an option"
        placeholder="Choose…"
      />
    </GkField>

    <h4 class="gk-doc-heading">Advanced</h4>
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

    <h4 class="gk-doc-heading">Edge case</h4>
    <GkField label="Readonly review">
      <GkSelect
        v-model="review"
        :options="options"
        readonly
        aria-label="Readonly review"
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

.gk-doc-heading {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}
</style>
