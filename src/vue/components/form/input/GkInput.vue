<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  ref,
  useAttrs,
  useId,
  useTemplateRef,
} from 'vue'
import { GK_FIELD } from '../../../../injection'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    type?: string
    autocomplete?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    /** When not inside GkField, set explicitly for a11y */
    ariaLabel?: string
    autofocus?: boolean
    /** Static text before the field */
    prefix?: string
    /** Static text after the field */
    suffix?: string
    /** Show character count; `true` = count only; number or numeric string = max (shown as `n / max`) */
    counter?: boolean | number | string
    /** Override displayed count (or use a function of the model value) */
    counterValue?: number | ((value: string) => number)
    /** When false, counter is shown only while the control is focused */
    persistentCounter?: boolean
    role?: string
  }>(),
  {
    type: 'text',
    disabled: false,
    readonly: false,
    autofocus: false,
    persistentCounter: false,
  }
)

const emit = defineEmits<{
  'update:focused': [value: boolean]
}>()

const [model, modifiers] = defineModel<string | number, 'trim' | 'number'>({ required: true })

const attrs = useAttrs()
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
const focused = ref(false)
const counterElId = useId()

const field = inject(GK_FIELD, null)

const inputId = computed(() => props.id ?? field?.inputId ?? undefined)

const maxFromCounter = computed(() => {
  if (typeof props.counter === 'number') return props.counter
  if (typeof props.counter === 'string' && props.counter !== '') {
    const n = Number(props.counter)
    return Number.isFinite(n) ? n : undefined
  }
  return undefined
})

const count = computed(() => {
  const raw = typeof model.value === 'number' ? String(model.value) : (model.value ?? '')
  if (typeof props.counterValue === 'function') return props.counterValue(raw)
  if (typeof props.counterValue === 'number') return props.counterValue
  return raw.length
})

const showCounter = computed(() => props.counter !== false && props.counter != null)

const showCounterVisible = computed(
  () => showCounter.value && (props.persistentCounter || focused.value),
)

const describedBy = computed(() => {
  const parts: string[] = []
  const err = field?.errorMessage?.value
  if (err && field?.errorId) parts.push(field.errorId)
  if (showCounterVisible.value) parts.push(counterElId)
  return parts.length ? parts.join(' ') : undefined
})

const invalid = computed(() => !!field?.errorMessage?.value)

const hasAffix = computed(() => !!(props.prefix || props.suffix))

const displayValue = computed(() => {
  const v = model.value
  if (v === null || v === undefined) return ''
  return String(v)
})

const rootClass = computed(() => attrs.class)
const passthroughAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})

const trimTypes = ['text', 'search', 'password', 'tel', 'url']

function emitValueFromInput(el: HTMLInputElement) {
  if (modifiers?.number) {
    if (el.value === '') {
      model.value = ''
      return
    }
    const n = el.valueAsNumber
    model.value = Number.isNaN(n) ? el.value : n
    return
  }

  model.value = el.value
}

function onInput(e: Event) {
  emitValueFromInput(e.target as HTMLInputElement)
}

function onFocus() {
  focused.value = true
  emit('update:focused', true)
}

function onBlur() {
  focused.value = false
  emit('update:focused', false)

  if (modifiers?.trim && trimTypes.includes(props.type ?? 'text') && inputRef.value) {
    model.value = inputRef.value.value.trim()
  }
}

onMounted(() => {
  if (props.autofocus) {
    inputRef.value?.focus()
  }
})
</script>

<template>
  <div class="gk-input" :class="rootClass">
    <div
      class="gk-input__control"
      :class="{
        'gk-input__control--affixed': hasAffix,
      }"
    >
      <span v-if="prefix" class="gk-input__affix gk-input__affix--prefix">{{ prefix }}</span>
      <input
        :id="inputId"
        ref="inputRef"
        class="gk-input__native"
        :class="{ 'gk-input__native--invalid': invalid }"
        v-bind="passthroughAttrs"
        :name="name"
        :type="type"
        :value="displayValue"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :role="role"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedBy"
        :aria-label="ariaLabel"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span v-if="suffix" class="gk-input__affix gk-input__affix--suffix">{{ suffix }}</span>
    </div>

    <div v-if="showCounterVisible" :id="counterElId" class="gk-input__counter" aria-live="polite">
      <slot name="counter" :count="count" :max="maxFromCounter">
        <span class="gk-input__counter-text">
          {{ count }}<template v-if="maxFromCounter != null"> / {{ maxFromCounter }}</template>
        </span>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.gk-input {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-1);
  width: 100%;
}

.gk-input__control {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-on-surface);
  background: var(--gk-color-surface);
  border: 1px solid var(--gk-color-border-strong);
  border-radius: var(--gk-radius-md);
  min-height: var(--gk-control-min-height-md);
  text-align: start;
  transition:
    border-color var(--gk-duration-fast) var(--gk-easing-standard),
    box-shadow var(--gk-duration-fast) var(--gk-easing-standard);
}

.gk-input__control:focus-within {
  outline: none;
  border-color: var(--gk-color-primary);
  box-shadow: 0 0 0 var(--gk-input-focus-ring-spread) var(--gk-color-focus-ring);
}

.gk-input__control:focus-within .gk-input__native:focus-visible {
  outline: none;
}

.gk-input__native {
  flex: 1;
  min-width: 0;
  margin: 0;
  padding-block: var(--gk-control-padding-y);
  padding-inline: var(--gk-control-padding-x);
  border: none;
  border-radius: inherit;
  background: transparent;
  font: inherit;
  line-height: inherit;
  color: inherit;
  text-align: inherit;
}

.gk-input__control--affixed .gk-input__native {
  padding-inline: var(--gk-space-2);
}

.gk-input__affix {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-block: var(--gk-control-padding-y);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
  user-select: none;
}

.gk-input__affix--prefix {
  padding-inline-start: var(--gk-control-padding-x);
}

.gk-input__affix--suffix {
  padding-inline-end: var(--gk-control-padding-x);
}

.gk-input__native::placeholder {
  color: var(--gk-color-on-surface-muted);
}

.gk-input__native:disabled {
  cursor: not-allowed;
  color: var(--gk-color-text-disabled);
}

.gk-input__control:has(.gk-input__native:disabled) {
  opacity: var(--gk-opacity-disabled);
  cursor: not-allowed;
  background: var(--gk-control-disabled-surface);
}

.gk-input__control:has(.gk-input__native--invalid) {
  border-color: var(--gk-color-danger);
  background: var(--gk-color-danger-surface);
}

.gk-input__counter {
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
  text-align: end;
}

.gk-input__counter-text {
  font-variant-numeric: tabular-nums;
}
</style>
