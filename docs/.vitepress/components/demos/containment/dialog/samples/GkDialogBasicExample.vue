<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkDialog } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" @click="open = true">Standard dialog</GkButton>
  <GkDialog
    v-model="open"
    aria-labelledby="dialog-basic-title"
    aria-describedby="dialog-basic-desc"
  >
    <h2 id="dialog-basic-title" class="title">GkDialog</h2>
    <p id="dialog-basic-desc" class="text">
      Built on GkOverlay with a styled surface. Scrim or Escape closes.
    </p>
    <GkButton type="button" variant="secondary" @click="open = false">
      Close
    </GkButton>
  </GkDialog>
</template>

<style scoped>
.title {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
}

.text {
  margin: 0 0 var(--gk-space-3);
  color: var(--gk-color-text-muted);
  line-height: var(--gk-line-height-normal);
}
</style>
