<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkSnackbar } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <div class="gk-doc-row">
    <GkButton type="button" @click="open = true">
      Open snackbar
    </GkButton>
    <GkSnackbar
      v-model="open"
      title="GkSnackbar"
      text="Declarative mode with v-model, timeout, timer strip, and Escape to dismiss."
      :timeout="6000"
      timer="bottom"
      location="top end"
      variant="info"
    >
      <template #actions>
        <GkButton type="button" variant="ghost" size="sm" @click="open = false">
          Dismiss
        </GkButton>
      </template>
    </GkSnackbar>
  </div>
</template>

<style scoped>
.gk-doc-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
  align-items: center;
}
</style>
