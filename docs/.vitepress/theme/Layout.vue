<script setup lang="ts">
import type { Ref } from 'vue'
import { provide, ref } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GkDocsKitDrawer from '../components/GkDocsKitDrawer.vue'

const { frontmatter } = useData()

const drawerOpen = ref(false)

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value
}

function closeDrawer() {
  drawerOpen.value = false
}

provide('gkDocsKitDrawer', {
  drawerOpen,
  toggleDrawer,
  closeDrawer,
} satisfies {
  drawerOpen: Ref<boolean>
  toggleDrawer: () => void
  closeDrawer: () => void
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <button
        type="button"
        class="gk-docs-kit-trigger"
        aria-label="Open kit settings — theme, tokens, and export"
        title="Kit settings: preview God Kit theme &amp; tokens, copy config"
        @click="toggleDrawer"
      >
        <span class="gk-docs-kit-trigger-icon" aria-hidden="true">⚙</span>
        <span class="gk-docs-kit-trigger-text">Kit settings</span>
      </button>
    </template>

    <template v-if="frontmatter.layout === 'home'" #home-hero-before>
      <div class="gk-home-hero-bg" aria-hidden="true" />
    </template>
  </DefaultTheme.Layout>
  <GkDocsKitDrawer />
</template>
