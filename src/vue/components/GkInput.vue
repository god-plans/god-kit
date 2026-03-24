<script setup lang="ts">
import { computed, inject } from 'vue'
import { GK_FIELD } from '../../injection'

const props = withDefaults(
  defineProps<{
    modelValue: string
    id?: string
    name?: string
    type?: string
    autocomplete?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    /** When not inside GkField, set explicitly for a11y */
    ariaLabel?: string
  }>(),
  {
    type: 'text',
    disabled: false,
    readonly: false,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const field = inject(GK_FIELD, null)

const inputId = computed(() => props.id ?? field?.inputId ?? undefined)

const describedBy = computed(() => {
  const err = field?.errorMessage?.value
  if (err && field?.errorId) return field.errorId
  return undefined
})

const invalid = computed(() => !!field?.errorMessage?.value)

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :id="inputId"
    class="gk-input"
    :class="{ 'gk-input--invalid': invalid }"
    :name="name"
    :type="type"
    :value="modelValue"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :aria-invalid="invalid || undefined"
    :aria-describedby="describedBy"
    :aria-label="ariaLabel"
    @input="onInput"
  />
</template>

<style scoped>
.gk-input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-text);
  background: var(--gk-color-surface);
  border: 1px solid var(--gk-color-border-strong);
  border-radius: var(--gk-radius-md);
  padding: var(--gk-space-3) var(--gk-space-4);
  min-height: 2.5rem;
  transition:
    border-color var(--gk-duration-fast) var(--gk-easing-standard),
    box-shadow var(--gk-duration-fast) var(--gk-easing-standard);
}

.gk-input::placeholder {
  color: var(--gk-color-text-muted);
}

.gk-input:focus {
  outline: none;
  border-color: var(--gk-color-primary);
  box-shadow: 0 0 0 3px var(--gk-color-focus-ring);
}

.gk-input:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: color-mix(in srgb, var(--gk-color-surface) 92%, var(--gk-color-text));
}

.gk-input--invalid {
  border-color: var(--gk-color-danger);
  background: var(--gk-color-danger-surface);
}
</style>
