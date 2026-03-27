<script setup lang="ts">
import { computed, inject } from 'vue'
import { GK_FIELD } from '../../../injection'
import type { GkSelectOption } from './select-types'

const props = withDefaults(
  defineProps<{
    modelValue: string | number | undefined
    options: GkSelectOption[]
    id?: string
    name?: string
    disabled?: boolean
    placeholder?: string
    ariaLabel?: string
  }>(),
  {
    disabled: false,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
}>()

const field = inject(GK_FIELD, null)
const inputId = computed(() => props.id ?? field?.inputId ?? undefined)
const describedBy = computed(() => {
  const err = field?.errorMessage?.value
  if (err && field?.errorId) return field.errorId
  return undefined
})
const invalid = computed(() => !!field?.errorMessage?.value)

const selectValue = computed(() => {
  if (props.modelValue === undefined || props.modelValue === null) return ''
  return String(props.modelValue)
})

function onChange(e: Event) {
  const v = (e.target as HTMLSelectElement).value
  if (v === '') {
    emit('update:modelValue', undefined)
    return
  }
  const opt = props.options.find((o) => String(o.value) === v)
  emit('update:modelValue', opt?.value)
}
</script>

<template>
  <select
    :id="inputId"
    class="gk-select"
    :class="{ 'gk-select--invalid': invalid }"
    :name="name"
    :value="selectValue"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
    :aria-describedby="describedBy"
    :aria-label="ariaLabel"
    @change="onChange"
  >
    <option v-if="placeholder" disabled value="">
      {{ placeholder }}
    </option>
    <option
      v-for="opt in options"
      :key="String(opt.value)"
      :value="String(opt.value)"
      :disabled="opt.disabled"
    >
      {{ opt.label }}
    </option>
  </select>
</template>

<style scoped>
.gk-select {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-on-surface);
  background: var(--gk-color-surface);
  border: 1px solid var(--gk-color-border-strong);
  border-radius: var(--gk-radius-md);
  padding-block: var(--gk-control-padding-y);
  padding-inline: var(--gk-control-padding-x);
  min-height: var(--gk-control-min-height-md);
  text-align: start;
  cursor: pointer;
  transition:
    border-color var(--gk-duration-fast) var(--gk-easing-standard),
    box-shadow var(--gk-duration-fast) var(--gk-easing-standard);
}

.gk-select:focus {
  outline: none;
  border-color: var(--gk-color-primary);
  box-shadow: 0 0 0 3px var(--gk-color-focus-ring);
}

.gk-select:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-select:disabled {
  opacity: var(--gk-opacity-disabled);
  cursor: not-allowed;
}

.gk-select--invalid {
  border-color: var(--gk-color-danger);
  background: var(--gk-color-danger-surface);
}
</style>
