<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkNavigationDrawer } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" @click="open = true">Open navigation drawer</GkButton>
  <GkNavigationDrawer
    v-model="open"
    temporary
    disable-resize-watcher
    aria-label="Demo navigation"
  >
    <p class="text">
      Temporary drawer: scrim, Escape, and body scroll lock while open.
    </p>
    <GkButton type="button" variant="secondary" @click="open = false">
      Close
    </GkButton>
  </GkNavigationDrawer>
</template>

<style scoped>
.text {
  margin: 0 0 var(--gk-space-3);
  color: var(--gk-color-text-muted);
  line-height: var(--gk-line-height-normal);
}
</style>
