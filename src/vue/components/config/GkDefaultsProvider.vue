<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { GK_DEFAULTS } from '../../../injection'
import type { GkKitComponentDefaults } from '../../config/gk-kit-types'

const props = defineProps<{
  defaults?: GkKitComponentDefaults
}>()

const parent = inject(GK_DEFAULTS, computed(() => ({} as GkKitComponentDefaults)))
const merged = computed(() => ({
  ...parent.value,
  ...(props.defaults ?? {}),
}))
provide(GK_DEFAULTS, merged)
</script>

<template>
  <div class="gk-defaults-provider">
    <slot />
  </div>
</template>
