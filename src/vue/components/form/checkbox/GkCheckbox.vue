<script setup lang="ts">
import { computed, inject, nextTick, onMounted, useAttrs, useTemplateRef, watch } from 'vue'
import { GK_FIELD } from '../../../../injection'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    disabled?: boolean
    /** Required when not inside GkField */
    ariaLabel?: string
    /** Sets the native indeterminate state (separate from checked) */
    indeterminate?: boolean
    /** Prevents toggling; implemented with change reversion and `aria-readonly` (not native `readonly`) */
    readonly?: boolean
    /** Native `value` for forms */
    value?: string
  }>(),
  {
    disabled: false,
    readonly: false,
    indeterminate: false,
  }
)

const emit = defineEmits<{
  'update:focused': [value: boolean]
}>()

const model = defineModel<boolean>({ required: true })

const attrs = useAttrs()
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

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

function syncIndeterminate() {
  const el = inputRef.value
  if (!el) return
  el.indeterminate = props.indeterminate
}

watch(
  () => props.indeterminate,
  () => {
    nextTick(syncIndeterminate)
  }
)

watch(
  () => inputRef.value,
  () => {
    nextTick(syncIndeterminate)
  }
)

onMounted(() => {
  nextTick(syncIndeterminate)
})

function onChange(e: Event) {
  const el = e.target as HTMLInputElement
  if (props.disabled) return
  if (props.readonly) {
    el.checked = model.value
    return
  }
  model.value = el.checked
}

function onKeydown(e: KeyboardEvent) {
  if (props.readonly && (e.key === ' ' || e.code === 'Space')) {
    e.preventDefault()
  }
}

function onFocus() {
  emit('update:focused', true)
}

function onBlur() {
  emit('update:focused', false)
}

defineExpose({
  /** Underlying native checkbox */
  input: inputRef,
})
</script>

<template>
  <span
    class="gk-checkbox__wrap"
    :class="[rootClass, { 'gk-checkbox__wrap--readonly': readonly }]"
  >
    <input
      ref="inputRef"
      :id="inputId"
      class="gk-checkbox"
      type="checkbox"
      v-bind="passthroughAttrs"
      :name="name"
      :value="value"
      :checked="model"
      :disabled="disabled"
      :aria-readonly="readonly || undefined"
      :aria-invalid="invalid || undefined"
      :aria-describedby="describedBy"
      :aria-label="ariaLabel"
      @change="onChange"
      @keydown="onKeydown"
      @focus="onFocus"
      @blur="onBlur"
    />
  </span>
</template>

<style scoped>
.gk-checkbox__wrap {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.gk-checkbox {
  width: 1.125rem;
  height: 1.125rem;
  margin: 0;
  accent-color: var(--gk-color-primary);
  cursor: pointer;
  flex-shrink: 0;
}

.gk-checkbox__wrap--readonly .gk-checkbox {
  cursor: default;
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
