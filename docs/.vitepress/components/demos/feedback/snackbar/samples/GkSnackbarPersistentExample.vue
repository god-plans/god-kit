<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkSnackbar } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <div class="gk-doc-stack">
    <GkButton type="button" variant="secondary" @click="open = true">
      Open persistent snackbar
    </GkButton>
    <GkSnackbar
      v-model="open"
      :timeout="-1"
      variant="danger"
      title="Action required"
      text="Dismiss manually when finished."
    >
      <template #actions>
        <GkButton
          type="button"
          size="sm"
          variant="ghost"
          @click="open = false"
        >
          Dismiss
        </GkButton>
      </template>
    </GkSnackbar>
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
