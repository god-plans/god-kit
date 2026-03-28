<script setup lang="ts">
import { computed, onMounted, onUnmounted, shallowRef, watch } from 'vue'
import type { GkThemeName } from '../../config/gk-kit-types'

const props = withDefaults(
  defineProps<{
    /** Subtree theme; **`system`** follows OS preference within this branch */
    theme?: GkThemeName
  }>(),
  {
    theme: 'light',
  }
)

function getSystemDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const systemDark = shallowRef(getSystemDark())

let media: MediaQueryList | null = null
const onSystemChange = () => {
  systemDark.value = getSystemDark()
}

onMounted(() => {
  if (typeof window === 'undefined' || !window.matchMedia) return
  media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', onSystemChange)
})

onUnmounted(() => {
  media?.removeEventListener('change', onSystemChange)
})

const resolved = computed(() => {
  if (props.theme === 'system') return systemDark.value ? 'dark' : 'light'
  return props.theme === 'dark' ? 'dark' : 'light'
})

const rootRef = shallowRef<HTMLElement | null>(null)

watch(
  [resolved, rootRef],
  () => {
    const el = rootRef.value
    if (!el) return
    el.setAttribute('data-gk-theme', resolved.value)
    if (resolved.value === 'dark') {
      el.classList.add('gk-theme-dark')
    } else {
      el.classList.remove('gk-theme-dark')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div ref="rootRef" class="gk-theme-provider">
    <slot />
  </div>
</template>
