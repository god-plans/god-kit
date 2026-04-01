<script setup lang="ts">
import { provide, shallowRef, watch } from 'vue'
import { GK_THEME } from '../../../injection'
import {
  createGkThemeContextForKit,
} from '../../composables/useGkTheme'
import type { GkThemeDefinition, GkThemeName } from '../../config/gk-kit-types'

const props = withDefaults(
  defineProps<{
    /** Subtree theme; `system` follows OS preference within this branch. */
    theme?: GkThemeName
    /** Optional subtree-only theme registry extensions. */
    themes?: Record<string, Omit<GkThemeDefinition, 'name'>>
  }>(),
  {
    theme: 'light',
  }
)

const rootRef = shallowRef<HTMLElement | null>(null)
const themeCtx = createGkThemeContextForKit({
  defaultTheme: props.theme,
  themes: props.themes,
  scope: () => rootRef.value,
})
provide(GK_THEME, themeCtx)

watch(
  () => props.theme,
  (next) => themeCtx.change(next),
  { immediate: true }
)

watch(
  () => props.themes,
  (themes) => {
    if (!themes) return
    themeCtx.registerThemes(themes)
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div ref="rootRef" class="gk-theme-provider">
    <slot />
  </div>
</template>
