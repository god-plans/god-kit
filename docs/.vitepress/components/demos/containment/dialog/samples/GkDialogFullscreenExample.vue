<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkDialog } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" variant="secondary" @click="open = true">
    Fullscreen dialog
  </GkButton>
  <GkDialog v-model="open" fullscreen aria-labelledby="dialog-fullscreen-title">
    <h2 id="dialog-fullscreen-title" class="title">Fullscreen</h2>
    <p class="text">Use fullscreen for edge-to-edge flows on narrow screens.</p>
    <GkButton type="button" @click="open = false">Close</GkButton>
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
}
</style>
