<script setup lang="ts">
import { ref } from 'vue'
import { GkBottomSheet, GkButton } from 'god-kit/vue'

const basicOpen = ref(false)
const insetOpen = ref(false)
</script>

<template>
  <div class="gk-doc-demo gk-doc-bottom-sheet-demo">
    <div class="gk-doc-bottom-sheet-demo__row">
      <GkButton type="button" @click="basicOpen = true">Bottom sheet</GkButton>
      <GkBottomSheet
        v-model="basicOpen"
        aria-labelledby="demo-bs-title"
        aria-describedby="demo-bs-desc"
      >
        <h2 id="demo-bs-title" class="gk-doc-bottom-sheet-demo__title">GkBottomSheet</h2>
        <p id="demo-bs-desc" class="gk-doc-bottom-sheet-demo__text">
          Anchored to the bottom with a slide-up transition. Scrim or Escape closes.
        </p>
        <GkButton type="button" variant="secondary" @click="basicOpen = false">Close</GkButton>
      </GkBottomSheet>
    </div>

    <div class="gk-doc-bottom-sheet-demo__row">
      <GkButton type="button" variant="secondary" @click="insetOpen = true">Inset sheet</GkButton>
      <GkBottomSheet v-model="insetOpen" inset aria-labelledby="demo-bs-inset-title">
        <h2 id="demo-bs-inset-title" class="gk-doc-bottom-sheet-demo__title">Inset</h2>
        <p class="gk-doc-bottom-sheet-demo__text">Horizontal padding from the viewport edges.</p>
        <GkButton type="button" @click="insetOpen = false">Close</GkButton>
      </GkBottomSheet>
    </div>
  </div>
</template>

<style scoped>
.gk-doc-bottom-sheet-demo {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-4);
}

.gk-doc-bottom-sheet-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
  align-items: center;
}

.gk-doc-bottom-sheet-demo__title {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
  line-height: var(--gk-line-height-tight);
}

.gk-doc-bottom-sheet-demo__text {
  margin: 0 0 var(--gk-space-4);
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-text-muted);
}
</style>
