<script setup lang="ts">
import { GkSpinner } from 'god-kit/vue'
</script>

<template>
  <p class="gk-doc-muted">
    On solid fills, use <code>tone="on-filled"</code> (GkButton does this when loading):
  </p>
  <div class="gk-doc-row">
    <span class="gk-doc-on-fill">
      <GkSpinner size="sm" tone="on-filled" label="On primary" />
    </span>
  </div>
</template>

<style scoped>
.gk-doc-muted {
  margin: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}

.gk-doc-row {
  display: flex;
  align-items: center;
  gap: var(--gk-space-4);
}

.gk-doc-on-fill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--gk-space-3) var(--gk-space-5);
  border-radius: var(--gk-radius-md);
  background: var(--gk-color-primary);
}
</style>
