<script setup lang="ts">
import { ref } from 'vue'
import { GkBottomSheet, GkButton } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" @click="open = true">Bottom sheet</GkButton>
  <GkBottomSheet
    v-model="open"
    aria-labelledby="sheet-basic-title"
    aria-describedby="sheet-basic-desc"
  >
    <h2 id="sheet-basic-title" class="title">GkBottomSheet</h2>
    <p id="sheet-basic-desc" class="text">
      Anchored to the bottom with a slide-up transition.
    </p>
    <GkButton type="button" variant="secondary" @click="open = false">
      Close
    </GkButton>
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
