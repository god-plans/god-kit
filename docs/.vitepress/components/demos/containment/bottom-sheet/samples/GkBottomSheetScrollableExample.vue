<script setup lang="ts">
import { ref } from 'vue'
import { GkBottomSheet, GkButton } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" variant="secondary" @click="open = true">
    Scrollable sheet
  </GkButton>
  <GkBottomSheet
    v-model="open"
    scrollable
    :max-height="360"
    aria-labelledby="sheet-scroll-title"
  >
    <h2 id="sheet-scroll-title" class="title">Scrollable sheet</h2>
    <p v-for="n in 10" :key="n" class="text">
      Option {{ n }} - long content remains inside the sheet surface.
    </p>
    <GkButton type="button" @click="open = false">Close</GkButton>
  </GkBottomSheet>
</template>

<style scoped>
.title {
  margin: 0 0 var(--gk-space-2);
  font-size: var(--gk-font-size-md);
}

.text {
  margin: 0 0 var(--gk-space-3);
  color: var(--gk-color-text-muted);
}
</style>
