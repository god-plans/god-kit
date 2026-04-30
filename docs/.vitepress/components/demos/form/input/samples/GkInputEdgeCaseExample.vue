<script setup lang="ts">
import { GkField, GkInput } from 'god-kit/vue'
import { ref } from 'vue'

const review = ref('Readonly value')
const search = ref('42')
</script>

<template>
  <div class="gk-doc-stack">
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
</style>
