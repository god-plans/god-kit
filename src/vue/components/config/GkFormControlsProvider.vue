<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { GK_FORM_CONTROLS } from '../../../injection'
import type { GkFormControlSize } from '../../config/gk-kit-types'

const props = defineProps<{
  /** Replaces the nearest `GK_FORM_CONTROLS.size` (from `createGkKit`, parent provider, or `GkForm`) */
  size?: GkFormControlSize
}>()

const parent = inject(GK_FORM_CONTROLS, null)
const size = computed(
  () => props.size ?? parent?.size.value ?? ('md' as GkFormControlSize)
)
provide(GK_FORM_CONTROLS, { size })
</script>

<template>
  <div class="gk-form-controls-provider">
    <slot />
  </div>
</template>
