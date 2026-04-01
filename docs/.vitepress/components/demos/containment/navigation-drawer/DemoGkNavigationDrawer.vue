<script setup lang="ts">
import { ref } from 'vue'
import { GkButton, GkNavigationDrawer } from 'god-kit/vue'

const open = ref(false)
const rail = ref(false)
</script>

<template>
  <div class="gk-doc-demo gk-doc-navigation-drawer-demo">
    <GkButton type="button" @click="open = true">Open navigation drawer</GkButton>
    <label class="gk-doc-navigation-drawer-demo__toggle">
      <input v-model="rail" type="checkbox" />
      Rail
    </label>
    <GkNavigationDrawer
      v-model="open"
      temporary
      disable-resize-watcher
      :rail="rail"
      expand-on-hover
      aria-label="Demo navigation"
    >
      <p class="gk-doc-navigation-drawer-demo__text">
        Temporary drawer: scrim, Escape, and body scroll lock while open. Docked and rail modes
        use the same panel styles without teleport — offset your main column with margin or grid
        when the drawer is not temporary.
      </p>
      <GkButton type="button" variant="secondary" @click="open = false">Close</GkButton>
    </GkNavigationDrawer>
  </div>
</template>

<style scoped>
.gk-doc-navigation-drawer-demo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gk-space-2);
  align-items: center;
}

.gk-doc-navigation-drawer-demo__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--gk-space-1);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
}

.gk-doc-navigation-drawer-demo__text {
  margin: 0 0 var(--gk-space-3);
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-text-muted);
}
</style>
