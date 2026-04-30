<script setup lang="ts">
import { GkGrid } from 'god-kit/vue'
</script>

<template>
  <GkGrid :show-grid-lines="true" :columns="2" class="demo-gk-grid">
    <span
      data-gk-grid-chrome
      style="grid-column: 1 / -1"
      class="demo-gk-grid__chrome"
    >Preview chrome only</span>
    <div class="demo-gk-grid__cell">Cell A</div>
    <div class="demo-gk-grid__cell">Cell B</div>
  </GkGrid>
</template>

<style scoped>
.demo-gk-grid__chrome {
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
}

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
