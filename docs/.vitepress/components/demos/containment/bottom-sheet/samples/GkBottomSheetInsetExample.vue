<script setup lang="ts">
import { ref } from 'vue'
import { GkBottomSheet, GkButton } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" variant="secondary" @click="open = true">
    Inset sheet
  </GkButton>
  <GkBottomSheet v-model="open" inset aria-labelledby="sheet-inset-title">
    <h2 id="sheet-inset-title" class="title">Inset</h2>
    <p class="text">Inset sheets keep horizontal padding from viewport edges.</p>
    <GkButton type="button" @click="open = false">Close</GkButton>
  </GkBottomSheet>
</template>

<style scoped>
.title {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
}

.text {
  margin: 0 0 var(--gk-space-4);
  color: var(--gk-color-text-muted);
}
</style>
