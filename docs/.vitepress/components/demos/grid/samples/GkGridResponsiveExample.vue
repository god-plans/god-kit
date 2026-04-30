<script setup lang="ts">
import { GkGrid } from 'god-kit/vue'
</script>

<template>
  <GkGrid
    :columns="4"
    :columns-tablet="3"
    :columns-mobile="1"
    :gap="3"
    :show-grid-lines="true"
    class="demo-gk-grid"
  >
    <div class="demo-gk-grid__cell">One</div>
    <div class="demo-gk-grid__cell">Two</div>
    <div class="demo-gk-grid__cell">Three</div>
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
