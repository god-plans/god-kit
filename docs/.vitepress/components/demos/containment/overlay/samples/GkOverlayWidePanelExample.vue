<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkOverlay } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" variant="secondary" @click="open = true">
    Wide custom panel
  </GkButton>
  <GkOverlay
    v-model="open"
    content-max-width="min(100%, 48rem)"
    aria-labelledby="overlay-wide-title"
  >
    <section class="panel">
      <h2 id="overlay-wide-title">Custom overlay surface</h2>
      <p>
        GkOverlay gives you the layer, scrim, focus restore, and scroll lock.
        The surface markup remains yours.
      </p>
      <GkButton type="button" @click="open = false">Done</GkButton>
    </section>
  </GkOverlay>
</template>

<style scoped>
.panel {
  display: grid;
  gap: var(--gk-space-3);
  padding: var(--gk-space-5);
  border-radius: var(--gk-radius-lg);
  background: var(--gk-color-surface);
  border: 1px solid var(--gk-color-border);
  box-shadow: var(--gk-elevation-4);
}

.panel h2,
.panel p {
  margin: 0;
}

.panel p {
  color: var(--gk-color-text-muted);
  line-height: var(--gk-line-height-normal);
}
</style>
