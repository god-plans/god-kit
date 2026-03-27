<script setup lang="ts">
import { GkField, GkInput } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const value = ref('')
const amount = ref('')
</script>

<template>
  <div class="gk-doc-demo gk-doc-stack">
    <GkField label="Example">
      <GkInput v-model="value" placeholder="Type here" />
    </GkField>

    <GkField label="With prefix & counter">
      <GkInput v-model="amount" prefix="$" placeholder="0.00" :counter="12" persistent-counter />
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
