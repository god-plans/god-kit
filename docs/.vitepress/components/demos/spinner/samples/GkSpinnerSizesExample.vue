<script setup lang="ts">
import { GkSpinner } from 'god-kit/vue'
</script>

<template>
  <div class="gk-doc-row">
    <GkSpinner size="sm" label="Loading small" />
    <GkSpinner size="md" label="Loading" />
  </div>
</template>

<style scoped>
.gk-doc-row {
  display: flex;
  align-items: center;
  gap: var(--gk-space-4);
}
</style>
