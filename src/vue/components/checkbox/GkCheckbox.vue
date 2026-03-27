<script setup lang="ts">
import { computed, inject } from 'vue'
import { GK_FIELD } from '../../../injection'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    id?: string
    name?: string
    disabled?: boolean
    /** Required when not inside GkField */
    ariaLabel?: string
  }>(),
  {
    disabled: false,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const field = inject(GK_FIELD, null)
const inputId = computed(() => props.id ?? field?.inputId ?? undefined)
const describedBy = computed(() => {
  const err = field?.errorMessage?.value
  if (err && field?.errorId) return field.errorId
  return undefined
})
const invalid = computed(() => !!field?.errorMessage?.value)

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<template>
  <input
    :id="inputId"
    class="gk-checkbox"
    type="checkbox"
    :name="name"
    :checked="modelValue"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
    :aria-describedby="describedBy"
    :aria-label="ariaLabel"
    @change="onChange"
  />
</template>

<style scoped>
.gk-checkbox {
  width: 1.125rem;
  height: 1.125rem;
  accent-color: var(--gk-color-primary);
  cursor: pointer;
  flex-shrink: 0;
}

.gk-checkbox:disabled {
  opacity: var(--gk-opacity-disabled);
  cursor: not-allowed;
}

.gk-checkbox:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}
</style>
