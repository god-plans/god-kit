<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkNavigationDrawer } from 'god-kit/vue'

const open = ref(false)
</script>

<template>
  <GkButton type="button" variant="secondary" @click="open = true">
    End drawer
  </GkButton>
  <GkNavigationDrawer
    v-model="open"
    temporary
    disable-resize-watcher
    location="end"
    aria-label="Secondary navigation"
  >
    <p class="text">
      Use start/end for direction-aware placement. Physical left/right are also available.
    </p>
    <GkButton type="button" @click="open = false">Close</GkButton>
  </GkNavigationDrawer>
</template>

<style scoped>
.text {
  margin: 0 0 var(--gk-space-3);
  color: var(--gk-color-text-muted);
  line-height: var(--gk-line-height-normal);
}
</style>
