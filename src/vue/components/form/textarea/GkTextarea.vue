<script setup lang="ts">
import { computed, inject } from 'vue'
import { GK_FIELD } from '../../../../injection'

const props = withDefaults(
  defineProps<{
    modelValue: string
    id?: string
    name?: string
    rows?: number
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    autocomplete?: string
    ariaLabel?: string
  }>(),
  {
    rows: 4,
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
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <textarea
    :id="inputId"
    class="gk-textarea"
    :class="{ 'gk-textarea--invalid': invalid }"
    :name="name"
    :rows="rows"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :autocomplete="autocomplete"
    :aria-invalid="invalid || undefined"
    :aria-describedby="describedBy"
    :aria-label="ariaLabel"
    @input="onInput"
  />
</template>

<style scoped>
.gk-textarea {
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
  min-height: 6rem;
  text-align: start;
  resize: vertical;
  transition:
    border-color var(--gk-duration-fast) var(--gk-easing-standard),
    box-shadow var(--gk-duration-fast) var(--gk-easing-standard);
}

.gk-textarea::placeholder {
  color: var(--gk-color-on-surface-muted);
}

.gk-textarea:focus {
  outline: none;
  border-color: var(--gk-color-primary);
  box-shadow: 0 0 0 3px var(--gk-color-focus-ring);
}

.gk-textarea:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-textarea:disabled {
  opacity: var(--gk-opacity-disabled);
  cursor: not-allowed;
  color: var(--gk-color-text-disabled);
  background: color-mix(in srgb, var(--gk-color-surface) 92%, var(--gk-color-on-surface));
}

.gk-textarea--invalid {
  border-color: var(--gk-color-danger);
  background: var(--gk-color-danger-surface);
}
</style>
