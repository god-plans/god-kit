<script setup lang="ts">
import { GkGrid } from 'god-kit/vue'
import { ref } from 'vue'

const showLines = ref(false)
</script>

<template>
  <div class="gk-doc-demo gk-doc-demo--grid">
    <label class="gk-doc-demo__toggle">
      <input v-model="showLines" type="checkbox" />
      Show grid lines
    </label>
    <GkGrid
      :columns="3"
      :columns-mobile="1"
      :gap="3"
      :show-grid-lines="showLines"
      class="demo-gk-grid"
    >
      <div class="demo-gk-grid__cell">One</div>
      <div class="demo-gk-grid__cell">Two</div>
      <div class="demo-gk-grid__cell">Three</div>
    </GkGrid>
  </div>
</template>

<style scoped>
.gk-doc-demo--grid {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-3);
}
.gk-doc-demo__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--gk-space-2);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text-muted);
  cursor: pointer;
  user-select: none;
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
