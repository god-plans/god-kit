<script setup lang="ts">
import { computed, inject, onMounted, useAttrs, useTemplateRef } from 'vue'
import { GK_FIELD } from '../../../../injection'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    rows?: number
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    autocomplete?: string
    ariaLabel?: string
    autofocus?: boolean
  }>(),
  {
    rows: 4,
    disabled: false,
    readonly: false,
    autofocus: false,
  }
)

const emit = defineEmits<{
  'update:focused': [value: boolean]
}>()

const [model, modifiers] = defineModel<string, 'trim'>({ required: true })

const attrs = useAttrs()
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef')

const field = inject(GK_FIELD, null)
const inputId = computed(() => props.id ?? field?.inputId ?? undefined)
const describedBy = computed(() => {
  const err = field?.errorMessage?.value
  if (err && field?.errorId) return field.errorId
  return undefined
})
const invalid = computed(() => !!field?.errorMessage?.value)

const rootClass = computed(() => attrs.class)
const passthroughAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})

function onBlur() {
  emit('update:focused', false)
  if (modifiers?.trim) {
    model.value = textareaRef.value?.value.trim() ?? ''
  }
}

function onFocus() {
  emit('update:focused', true)
}

onMounted(() => {
  if (props.autofocus) {
    textareaRef.value?.focus()
  }
})

defineExpose({
  textarea: textareaRef,
})
</script>

<template>
  <span class="gk-textarea__wrap" :class="rootClass">
    <textarea
      :id="inputId"
      ref="textareaRef"
      class="gk-textarea"
      :class="{ 'gk-textarea--invalid': invalid }"
      v-bind="passthroughAttrs"
      :name="name"
      :rows="rows"
      v-model="model"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :aria-invalid="invalid || undefined"
      :aria-describedby="describedBy"
      :aria-label="ariaLabel"
      @focus="onFocus"
      @blur="onBlur"
    />
  </span>
</template>

<style scoped>
.gk-textarea__wrap {
  display: block;
  width: 100%;
}

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
