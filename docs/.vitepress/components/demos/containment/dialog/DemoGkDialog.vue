<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkDialog } from 'god-kit/vue'

const basicOpen = ref(false)
const fullscreenOpen = ref(false)
const scrollOpen = ref(false)
</script>

<template>
  <div class="gk-doc-demo gk-doc-dialog-demo">
    <div class="gk-doc-dialog-demo__row">
      <GkButton type="button" @click="basicOpen = true">Standard dialog</GkButton>
      <GkDialog
        v-model="basicOpen"
        aria-labelledby="demo-dlg-title"
        aria-describedby="demo-dlg-desc"
      >
        <h2 id="demo-dlg-title" class="gk-doc-dialog-demo__title">GkDialog</h2>
        <p id="demo-dlg-desc" class="gk-doc-dialog-demo__text">
          Built on GkOverlay with a styled surface. Scrim or Escape closes.
        </p>
        <GkButton type="button" variant="secondary" @click="basicOpen = false">Close</GkButton>
      </GkDialog>
    </div>

    <div class="gk-doc-dialog-demo__row">
      <GkButton type="button" variant="secondary" @click="fullscreenOpen = true">
        Fullscreen dialog
      </GkButton>
      <GkDialog v-model="fullscreenOpen" fullscreen aria-labelledby="demo-fs-title">
        <h2 id="demo-fs-title" class="gk-doc-dialog-demo__title">Fullscreen</h2>
        <p class="gk-doc-dialog-demo__text">Edge-to-edge surface; scrollable if content overflows.</p>
        <GkButton type="button" @click="fullscreenOpen = false">Close</GkButton>
      </GkDialog>
    </div>

    <div class="gk-doc-dialog-demo__row">
      <GkButton type="button" variant="secondary" @click="scrollOpen = true">
        Scrollable body
      </GkButton>
      <GkDialog v-model="scrollOpen" scrollable aria-labelledby="demo-scroll-title">
        <h2 id="demo-scroll-title" class="gk-doc-dialog-demo__title">Scrollable</h2>
        <p v-for="n in 12" :key="n" class="gk-doc-dialog-demo__text">
          Paragraph {{ n }} — long content scrolls inside the dialog surface.
        </p>
        <GkButton type="button" @click="scrollOpen = false">Close</GkButton>
      </GkDialog>
    </div>
  </div>
</template>

<style scoped>
.gk-doc-dialog-demo {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
}

.gk-doc-dialog-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
  align-items: center;
}

.gk-doc-dialog-demo__title {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
  line-height: var(--gk-line-height-tight);
}

.gk-doc-dialog-demo__text {
  margin: 0 0 var(--gk-space-3);
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-text-muted);
}
</style>
