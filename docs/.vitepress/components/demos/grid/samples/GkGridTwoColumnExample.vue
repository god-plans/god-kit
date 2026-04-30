<script setup lang="ts">
import { GkGrid } from 'god-kit/vue'
</script>

<template>
  <GkGrid :columns="2" :gap="3" class="demo-gk-grid">
    <div class="demo-gk-grid__cell">Left</div>
    <div class="demo-gk-grid__cell">Right</div>
  </GkGrid>
</template>

<style scoped>
.demo-gk-grid__cell {
  min-height: 3rem;
  padding: var(--gk-space-2);
  border-radius: var(--gk-radius-sm);
  background: var(--gk-color-surface-elevated);
  border: 1px solid var(--gk-color-border);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text);
}
</style>
