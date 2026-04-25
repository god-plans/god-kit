<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkOverlay } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" @click="open = true">Open overlay</GkButton>
  <GkOverlay
    v-model="open"
    aria-labelledby="overlay-basic-title"
    aria-describedby="overlay-basic-desc"
  >
    <div class="panel">
      <h2 id="overlay-basic-title">GkOverlay</h2>
      <p id="overlay-basic-desc">
        Scrim click or Escape closes. Body scroll is locked while open.
      </p>
      <GkButton type="button" variant="secondary" @click="open = false">
        Close
      </GkButton>
    </div>
  </GkOverlay>
</template>

<style scoped>
.panel {
  padding: var(--gk-space-5);
  border-radius: var(--gk-radius-md);
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
  border: 1px solid var(--gk-color-border);
  box-shadow: var(--gk-elevation-4);
  min-width: min(100%, 18rem);
}

.panel h2 {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
  line-height: var(--gk-line-height-tight);
}

.panel p {
  margin: 0 0 var(--gk-space-4);
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-text-muted);
}
</style>
