<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkOverlay } from 'god-kit/vue'

const basicOpen = ref(false)
const persistentOpen = ref(false)
</script>

<template>
  <div class="gk-doc-demo gk-doc-overlay-demo">
    <div class="gk-doc-overlay-demo__row">
      <GkButton type="button" @click="basicOpen = true">Open overlay</GkButton>
      <GkOverlay
        v-model="basicOpen"
        aria-labelledby="demo-overlay-title"
        aria-describedby="demo-overlay-desc"
      >
        <div class="gk-doc-overlay-demo__panel">
          <h2 id="demo-overlay-title" class="gk-doc-overlay-demo__title">GkOverlay</h2>
          <p id="demo-overlay-desc" class="gk-doc-overlay-demo__text">
            Scrim click or Escape closes. Body scroll is locked while open.
          </p>
          <GkButton type="button" variant="secondary" @click="basicOpen = false">Close</GkButton>
        </div>
      </GkOverlay>
    </div>

    <div class="gk-doc-overlay-demo__row">
      <GkButton type="button" variant="secondary" @click="persistentOpen = true">
        Open persistent overlay
      </GkButton>
      <GkOverlay
        v-model="persistentOpen"
        persistent
        aria-labelledby="demo-persist-title"
      >
        <div class="gk-doc-overlay-demo__panel">
          <h2 id="demo-persist-title" class="gk-doc-overlay-demo__title">Persistent</h2>
          <p class="gk-doc-overlay-demo__text">
            Scrim and Escape do not dismiss — use the button.
          </p>
          <GkButton type="button" @click="persistentOpen = false">Close</GkButton>
        </div>
      </GkOverlay>
    </div>
  </div>
</template>

<style scoped>
.gk-doc-overlay-demo {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
}

.gk-doc-overlay-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
  align-items: center;
}

.gk-doc-overlay-demo__panel {
  padding: var(--gk-space-5);
  border-radius: var(--gk-radius-md);
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
  border: 1px solid var(--gk-color-border);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  min-width: min(100%, 18rem);
}

.gk-doc-overlay-demo__title {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
  line-height: var(--gk-line-height-tight);
}

.gk-doc-overlay-demo__text {
  margin: 0 0 var(--gk-space-4);
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-text-muted);
}
</style>
