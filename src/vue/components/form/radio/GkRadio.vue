<script setup lang="ts">
import { computed, inject, nextTick, useAttrs, useTemplateRef } from 'vue'
import { GK_RADIO_GROUP } from '../../../../injection'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    value: string | number
    disabled?: boolean
  }>(),
  {
    disabled: false,
  }
)

const emit = defineEmits<{
  'update:focused': [value: boolean]
}>()

const attrs = useAttrs()
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

const group = inject(GK_RADIO_GROUP, null)

const rootClass = computed(() => attrs.class)
const passthroughAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})

const checked = computed(() => group?.modelValue.value === props.value)
const radioName = computed(() => group?.name.value)

const isDisabled = computed(() => props.disabled || (group?.isDisabled.value ?? false))
const isReadonly = computed(() => group?.isReadonly.value ?? false)

function onChange() {
  if (!group || isDisabled.value || isReadonly.value) return
  group.setValue(props.value)
}

function syncCheckedFromModel() {
  const el = inputRef.value
  if (!el) return
  el.checked = checked.value
}

function onChangeGuard() {
  if (isReadonly.value) {
    nextTick(syncCheckedFromModel)
    return
  }
  onChange()
}

function onKeydown(e: KeyboardEvent) {
  if (isReadonly.value && (e.key === ' ' || e.code === 'Space')) {
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
  input: inputRef,
})
</script>

<template>
  <label class="gk-radio-label" :class="rootClass">
    <input
      ref="inputRef"
      class="gk-radio"
      type="radio"
      v-bind="passthroughAttrs"
      :name="radioName"
      :value="value"
      :checked="checked"
      :disabled="isDisabled"
      :aria-readonly="isReadonly || undefined"
      @change="onChangeGuard"
      @keydown="onKeydown"
      @focus="onFocus"
      @blur="onBlur"
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

.gk-radio-label:has(.gk-radio:disabled) {
  cursor: not-allowed;
}

.gk-radio-label:has(.gk-radio[aria-readonly='true']) {
  cursor: default;
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
