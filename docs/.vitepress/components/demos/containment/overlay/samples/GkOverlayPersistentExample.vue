<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkOverlay } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" variant="secondary" @click="open = true">
    Open persistent overlay
  </GkButton>
  <GkOverlay v-model="open" persistent aria-labelledby="overlay-persistent-title">
    <div class="panel">
      <h2 id="overlay-persistent-title">Persistent overlay</h2>
      <p>Scrim and Escape do not dismiss. Provide a clear close action.</p>
      <GkButton type="button" @click="open = false">Close</GkButton>
    </div>
  </GkOverlay>
</template>

<style scoped>
.panel {
  padding: var(--gk-space-5);
  border-radius: var(--gk-radius-md);
  background: var(--gk-color-surface);
  border: 1px solid var(--gk-color-border);
  box-shadow: var(--gk-elevation-4);
}

.panel h2 {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
}

.panel p {
  margin: 0 0 var(--gk-space-4);
  color: var(--gk-color-text-muted);
}
</style>
