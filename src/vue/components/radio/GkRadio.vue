<script setup lang="ts">
import { computed, inject } from 'vue'
import { GK_RADIO_GROUP } from '../../../injection'

const props = defineProps<{
  value: string | number
  disabled?: boolean
}>()

const group = inject(GK_RADIO_GROUP, null)

const checked = computed(() => group?.modelValue.value === props.value)
const radioName = computed(() => group?.name.value)

function onChange() {
  if (!group || props.disabled) return
  group.setValue(props.value)
}
</script>

<template>
  <label class="gk-radio-label">
    <input
      class="gk-radio"
      type="radio"
      :name="radioName"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="gk-radio__text">
      <slot />
    </span>
  </label>
</template>

<style scoped>
.gk-radio-label {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--gk-space-2);
  cursor: pointer;
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  color: var(--gk-color-on-surface);
  text-align: start;
}

.gk-radio {
  width: 1.125rem;
  height: 1.125rem;
  accent-color: var(--gk-color-primary);
  margin-block-start: 0.15rem;
  flex-shrink: 0;
  cursor: pointer;
}

.gk-radio:disabled {
  opacity: var(--gk-opacity-disabled);
  cursor: not-allowed;
}

.gk-radio__text {
  line-height: var(--gk-line-height-normal);
}

.gk-radio:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}
</style>
