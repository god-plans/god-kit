<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkNavigationDrawer } from 'god-kit/vue'

const open = ref(false)
const rail = ref(true)
</script>

<template>
  <GkButton type="button" variant="secondary" @click="open = true">
    Rail drawer
  </GkButton>
  <GkNavigationDrawer
    v-model="open"
    v-model:rail="rail"
    temporary
    disable-resize-watcher
    expand-on-hover
    aria-label="Rail navigation"
  >
    <p class="text">
      Rail mode can expand on hover. In app shells, reserve layout space yourself.
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
