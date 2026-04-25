<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkDialog } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" variant="secondary" @click="open = true">
    Scrollable dialog
  </GkButton>
  <GkDialog v-model="open" scrollable aria-labelledby="dialog-scroll-title">
    <h2 id="dialog-scroll-title" class="title">Scrollable content</h2>
    <p v-for="n in 12" :key="n" class="text">
      Paragraph {{ n }} - long content scrolls inside the dialog surface.
    </p>
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
  line-height: var(--gk-line-height-normal);
}
</style>
