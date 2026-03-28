<script setup lang="ts">
import { ref } from 'vue'
import {
  GkButton,
  GkSnackbar,
  GkSnackbarHost,
  pushGkSnackbar,
} from '@god-plan/god-kit/vue'

const open = ref(false)
</script>

<template>
  <div class="gk-doc-demo gk-doc-snackbar-demo">
    <GkSnackbarHost />

    <div class="gk-doc-snackbar-demo__row">
      <GkButton type="button" @click="open = true">Open snackbar</GkButton>
      <GkSnackbar
        v-model="open"
        title="GkSnackbar"
        text="Declarative mode with v-model, timeout, and Escape to dismiss."
        :timeout="6000"
        timer
        variant="info"
      >
        <template #actions>
          <GkButton type="button" variant="ghost" size="sm" @click="open = false">
            Dismiss
          </GkButton>
        </template>
      </GkSnackbar>
    </div>

    <div class="gk-doc-snackbar-demo__row">
      <GkButton
        type="button"
        variant="secondary"
        @click="pushGkSnackbar({ text: 'Queued from pushGkSnackbar()', variant: 'success', timeout: 5000 })"
      >
        Push programmatic snackbar
      </GkButton>
    </div>
  </div>
</template>

<style scoped>
.gk-doc-snackbar-demo {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
}

.gk-doc-snackbar-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
  align-items: center;
}
</style>
