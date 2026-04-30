<script setup lang="ts">
import { GkButton, GkSnackbarHost, pushGkSnackbar } from 'god-kit/vue'
</script>

<template>
  <div class="gk-doc-stack">
    <GkSnackbarHost />
    <GkButton
      type="button"
      variant="secondary"
      @click="pushGkSnackbar({ text: 'Queued from pushGkSnackbar()', variant: 'success', timeout: 5000 })"
    >
      Push programmatic snackbar
    </GkButton>
  </div>
</template>

<style scoped>
.gk-doc-stack {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-2);
  align-items: flex-start;
}
</style>
