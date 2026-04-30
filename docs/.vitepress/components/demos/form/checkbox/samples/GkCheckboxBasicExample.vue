<script setup lang="ts">
import { GkCheckbox } from 'god-kit/vue'
import { ref } from 'vue'

const ok = ref(false)
</script>

<template>
  <label class="gk-doc-inline">
    <GkCheckbox v-model="ok" />
    <span>Accept terms</span>
  </label>
</template>

<style scoped>
.gk-doc-inline {
  display: inline-flex;
  align-items: center;
  gap: var(--gk-space-2);
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  color: var(--gk-color-on-surface);
}
</style>
