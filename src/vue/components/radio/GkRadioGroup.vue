<script setup lang="ts">
import { computed, provide, toRef, useId } from 'vue'
import { GK_RADIO_GROUP } from '../../../injection'

const props = defineProps<{
  modelValue: string | number | undefined
  name?: string
  /** Accessible name for the group (recommended when there is no visible group label) */
  ariaLabel?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const uid = useId()
const resolvedName = computed(() => props.name ?? `gk-radio-${uid}`)
const modelValue = toRef(props, 'modelValue')

function setValue(v: string | number) {
  emit('update:modelValue', v)
}

provide(GK_RADIO_GROUP, {
  name: resolvedName,
  modelValue,
  setValue,
})
</script>

<template>
  <div class="gk-radio-group" role="radiogroup" :aria-label="ariaLabel">
    <slot />
  </div>
</template>

<style scoped>
.gk-radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-2);
  align-items: flex-start;
}
</style>
