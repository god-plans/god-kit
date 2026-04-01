<script setup lang="ts">
import { GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const value = ref('')
const amount = ref('')
const review = ref('Readonly value')
const search = ref('42')
</script>

<template>
  <div class="gk-doc-demo gk-doc-stack">
    <h4 class="gk-doc-heading">Basic</h4>
    <GkField label="Example">
      <GkInput v-model="value" placeholder="Type here" />
    </GkField>

    <h4 class="gk-doc-heading">Advanced</h4>
    <GkField label="With prefix & counter">
      <GkInput v-model="amount" prefix="$" placeholder="0.00" :counter="12" persistent-counter />
    </GkField>

    <h4 class="gk-doc-heading">Edge case</h4>
    <GkField label="Readonly + suffix + trim/number">
      <GkInput v-model="review" readonly suffix="USD" />
    </GkField>
    <GkField label="Search (disabled)">
      <GkInput v-model.number.trim="search" type="search" disabled />
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
