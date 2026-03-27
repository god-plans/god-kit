<script setup lang="ts">
import { computed, inject, nextTick, useAttrs, useTemplateRef } from 'vue'
import { GK_FIELD } from '../../../../injection'
import type { GkSelectOption } from './select-types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    options: GkSelectOption[]
    id?: string
    name?: string
    disabled?: boolean
    placeholder?: string
    ariaLabel?: string
    /** Native `multiple`; model is `(string | number)[]` */
    multiple?: boolean
    /** Reverts selection on change; uses `aria-readonly` (native `readonly` is inconsistent on `<select>`) */
    readonly?: boolean
    required?: boolean
    /** HTML `size` (visible rows, often with `multiple`) */
    size?: number
    autocomplete?: string
  }>(),
  {
    disabled: false,
    readonly: false,
    multiple: false,
  }
)

const emit = defineEmits<{
  'update:focused': [value: boolean]
}>()

const model = defineModel<string | number | (string | number)[] | undefined>()

const attrs = useAttrs()
const selectRef = useTemplateRef<HTMLSelectElement>('selectRef')

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

const selectValueSingle = computed(() => {
  if (props.multiple) return undefined
  const m = model.value
  if (m === undefined || m === null) return ''
  if (Array.isArray(m)) return ''
  return String(m)
})

function modelAsArray(): (string | number)[] {
  const m = model.value
  if (props.multiple) {
    if (Array.isArray(m)) return m
    return []
  }
  return []
}

function isSelected(opt: GkSelectOption): boolean {
  if (props.multiple) {
    const arr = modelAsArray()
    return arr.some((x) => String(x) === String(opt.value))
  }
  const m = model.value
  if (m === undefined || m === null || Array.isArray(m)) return false
  return String(m) === String(opt.value)
}

function syncDomFromModel() {
  const el = selectRef.value
  if (!el) return
  if (props.multiple) {
    const arr = modelAsArray()
    for (let i = 0; i < el.options.length; i++) {
      const o = el.options[i]
      if (o.value === '') {
        o.selected = false
        continue
      }
      const found = props.options.find((op) => String(op.value) === o.value)
      if (!found) continue
      o.selected = arr.some((x) => String(x) === String(found.value))
    }
  } else {
    const m = model.value
    el.value = m === undefined || m === null || Array.isArray(m) ? '' : String(m)
  }
}

function onChange() {
  const el = selectRef.value
  if (!el) return
  if (props.readonly) {
    nextTick(syncDomFromModel)
    return
  }
  if (props.multiple) {
    const selected = Array.from(el.selectedOptions)
      .filter((o) => o.value !== '')
      .map((o) => {
        const found = props.options.find((op) => String(op.value) === o.value)
        return found?.value
      })
      .filter((v): v is string | number => v !== undefined)
    model.value = selected
    return
  }
  const v = el.value
  if (v === '') {
    model.value = undefined
    return
  }
  const opt = props.options.find((o) => String(o.value) === v)
  model.value = opt?.value
}

function onFocus() {
  emit('update:focused', true)
}

function onBlur() {
  emit('update:focused', false)
}

defineExpose({
  /** Native `<select>` element */
  select: selectRef,
})
</script>

<template>
  <span class="gk-select__wrap" :class="rootClass">
    <select
      :id="inputId"
      ref="selectRef"
      class="gk-select"
      :class="{ 'gk-select--invalid': invalid }"
      v-bind="passthroughAttrs"
      :name="name"
      :multiple="multiple"
      :value="multiple ? undefined : selectValueSingle"
      :disabled="disabled"
      :required="required"
      :size="size"
      :aria-readonly="readonly || undefined"
      :aria-invalid="invalid || undefined"
      :aria-describedby="describedBy"
      :aria-label="ariaLabel"
      :autocomplete="autocomplete"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    >
      <option v-if="placeholder" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="opt in options"
        :key="String(opt.value)"
        :value="String(opt.value)"
        :disabled="opt.disabled"
        :selected="multiple ? isSelected(opt) : undefined"
      >
        {{ opt.label }}
      </option>
    </select>
  </span>
</template>

<style scoped>
.gk-select__wrap {
  display: block;
  width: 100%;
}

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
