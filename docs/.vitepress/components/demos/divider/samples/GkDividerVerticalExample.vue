<script setup lang="ts">
import { GkDivider } from 'god-kit/vue'
</script>

<template>
  <div class="gk-doc-inline">
    <span>Left</span>
    <GkDivider orientation="vertical" />
    <span>Right</span>
  </div>
</template>

<style scoped>
.gk-doc-inline {
  display: flex;
  align-items: center;
  gap: var(--gk-space-2);
  min-height: 2rem;
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  color: var(--gk-color-on-surface);
}
</style>
