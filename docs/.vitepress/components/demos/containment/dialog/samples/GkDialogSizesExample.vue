<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkDialog } from 'god-kit/vue'

const openSm = ref(false)
const openMd = ref(false)
const openLg = ref(false)
</script>

<template>
  <div class="gk-dialog-sizes">
    <GkButton type="button" variant="secondary" @click="openSm = true">Small (sm)</GkButton>
    <GkButton type="button" variant="secondary" @click="openMd = true">Medium (md)</GkButton>
    <GkButton type="button" variant="secondary" @click="openLg = true">Large (lg)</GkButton>
  </div>

  <GkDialog v-model="openSm" size="sm" aria-labelledby="gk-dialog-size-sm-title">
    <h2 id="gk-dialog-size-sm-title">Small</h2>
    <p class="muted">Uses <code>--gk-dialog-max-width-sm</code> (20rem cap).</p>
    <GkButton type="button" @click="openSm = false">Close</GkButton>
  </GkDialog>

  <GkDialog v-model="openMd" size="md" aria-labelledby="gk-dialog-size-md-title">
    <h2 id="gk-dialog-size-md-title">Medium</h2>
    <p class="muted">Uses <code>--gk-dialog-max-width</code> (28rem cap).</p>
    <GkButton type="button" @click="openMd = false">Close</GkButton>
  </GkDialog>

  <GkDialog v-model="openLg" size="lg" aria-labelledby="gk-dialog-size-lg-title">
    <h2 id="gk-dialog-size-lg-title">Large</h2>
    <p class="muted">Uses <code>--gk-dialog-max-width-lg</code> (42rem cap).</p>
    <GkButton type="button" @click="openLg = false">Close</GkButton>
  </GkDialog>
</template>

<style scoped>
.gk-dialog-sizes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
}

.muted {
  margin: 0 0 var(--gk-space-3);
  color: var(--gk-color-text-muted);
  font-size: var(--gk-font-size-sm);
}

h2 {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
}
</style>
