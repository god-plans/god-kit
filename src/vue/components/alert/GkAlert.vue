<script setup lang="ts">
import { computed, useSlots } from 'vue'
import GkButton from '../button/GkButton.vue'

export type GkAlertType = 'success' | 'info' | 'warning' | 'error'

const props = withDefaults(
  defineProps<{
    /** Visibility; set to `false` to remove from the DOM */
    modelValue?: boolean
    /** Semantic tone */
    variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    /** Alias for common tones; `error` maps to `danger` */
    type?: GkAlertType
    /** Use `assertive` for critical errors that interrupt */
    role?: 'status' | 'alert'
    title?: string
    text?: string
    /** Show dismiss control */
    closable?: boolean
    /** Accessible label for the close control */
    closeLabel?: string
    /** Accent bar: `true` defaults to logical start */
    border?: boolean | 'top' | 'end' | 'bottom' | 'start'
    /** Larger padding */
    prominent?: boolean
  }>(),
  {
    modelValue: true,
    variant: 'neutral',
    role: 'status',
    closable: false,
    closeLabel: 'Dismiss',
    prominent: false,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: [e: MouseEvent]
  'click:close': [e: MouseEvent]
}>()

const slots = useSlots()

/** `variant` wins when not default `neutral`; otherwise `type` maps to tone. */
const resolvedVariant = computed(() => {
  const v = props.variant
  const t = props.type
  if (v !== 'neutral') return v
  if (t === 'error') return 'danger'
  if (t === 'success' || t === 'info' || t === 'warning') return t
  return 'neutral'
})

const borderPlacement = computed(() => {
  if (!props.border) return null
  if (props.border === true) return 'start'
  return props.border
})

const showTitle = computed(() => !!(slots.title || props.title))
const showText = computed(() => !!(slots.text || props.text))

function onClose(e: MouseEvent) {
  emit('update:modelValue', false)
  emit('close', e)
  emit('click:close', e)
}
</script>

<template>
  <div
    v-if="modelValue"
    class="gk-alert"
    :class="[
      `gk-alert--${resolvedVariant}`,
      prominent && 'gk-alert--prominent',
      borderPlacement && `gk-alert--border gk-alert--border-${borderPlacement}`,
    ]"
    :role="role"
  >
    <span
      v-if="borderPlacement"
      class="gk-alert__border"
      :class="`gk-alert__border--${borderPlacement}`"
      aria-hidden="true"
    />

    <div v-if="slots.prepend" class="gk-alert__prepend">
      <slot name="prepend" />
    </div>

    <div class="gk-alert__main">
      <div v-if="showTitle" class="gk-alert__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="showText" class="gk-alert__text">
        <slot name="text">{{ text }}</slot>
      </div>
      <div class="gk-alert__content">
        <slot />
      </div>
    </div>

    <div v-if="slots.append" class="gk-alert__append">
      <slot name="append" />
    </div>

    <div v-if="closable" class="gk-alert__close">
      <GkButton
        type="button"
        variant="ghost"
        size="sm"
        :aria-label="closeLabel"
        @click="onClose"
      >
        ×
      </GkButton>
    </div>
  </div>
</template>

<style scoped>
.gk-alert {
  box-sizing: border-box;
  width: 100%;
  border-radius: var(--gk-radius-md);
  border: 1px solid var(--gk-color-border-strong);
  background: var(--gk-color-surface);
  padding: var(--gk-space-3) var(--gk-space-4);
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-md);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-on-surface);
  text-align: start;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--gk-space-3);
  position: relative;
  overflow: hidden;
}

.gk-alert--prominent {
  padding: var(--gk-space-4) var(--gk-space-5);
  min-height: 3.5rem;
}

.gk-alert__border {
  position: absolute;
  pointer-events: none;
  background: var(--gk-alert-accent, var(--gk-color-primary));
  border-radius: var(--gk-radius-sm);
}

.gk-alert--border-start .gk-alert__border--start {
  inset-inline-start: 0;
  inset-block: var(--gk-space-2);
  width: 4px;
}

.gk-alert--border-end .gk-alert__border--end {
  inset-inline-end: 0;
  inset-block: var(--gk-space-2);
  width: 4px;
}

.gk-alert--border-top .gk-alert__border--top {
  inset-block-start: 0;
  inset-inline: var(--gk-space-2);
  height: 4px;
}

.gk-alert--border-bottom .gk-alert__border--bottom {
  inset-block-end: 0;
  inset-inline: var(--gk-space-2);
  height: 4px;
}

.gk-alert__prepend,
.gk-alert__append {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
}

.gk-alert__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-2);
}

.gk-alert__title {
  font-weight: 600;
}

.gk-alert__text {
  margin: 0;
}

.gk-alert__close {
  flex-shrink: 0;
  margin-inline-start: auto;
}

.gk-alert--neutral {
  --gk-alert-accent: var(--gk-color-border-strong);
  border-color: var(--gk-color-border-strong);
  background: var(--gk-color-surface);
}

.gk-alert--info {
  --gk-alert-accent: var(--gk-color-info);
  border-color: color-mix(in srgb, var(--gk-color-info) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-info-surface);
}

.gk-alert--success {
  --gk-alert-accent: var(--gk-color-success);
  border-color: color-mix(in srgb, var(--gk-color-success) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-success-surface);
}

.gk-alert--warning {
  --gk-alert-accent: var(--gk-color-warning);
  border-color: color-mix(in srgb, var(--gk-color-warning) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-warning-surface);
}

.gk-alert--danger {
  --gk-alert-accent: var(--gk-color-danger);
  border-color: color-mix(in srgb, var(--gk-color-danger) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-danger-surface);
}
</style>
