<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useButtonInteractionState } from '../../composables/useButtonInteraction'
import GkSpinner from '../spinner/GkSpinner.vue'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md'
    disabled?: boolean
    block?: boolean
    loading?: boolean
    readonly?: boolean
    slim?: boolean
    stacked?: boolean
    href?: string
    rel?: string
    target?: '_blank' | '_self' | '_parent' | '_top' | string
    download?: boolean | string
    loadingLabel?: string
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    block: false,
    loading: false,
    readonly: false,
    slim: false,
    stacked: false,
  }
)

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()


const { blocksAction } = useButtonInteractionState(
  toRef(props, 'disabled'),
  toRef(props, 'readonly'),
  toRef(props, 'loading')
)

const isLink = computed(() => !!props.href)

const rootTag = computed(() => (isLink.value ? 'a' : 'button'))

const rootClass = computed(() => [
  'gk-btn',
  `gk-btn--${props.variant}`,
  `gk-btn--${props.size}`,
  props.block && 'gk-btn--block',
  props.slim && 'gk-btn--slim',
  props.stacked && 'gk-btn--stacked',
  props.loading && 'gk-btn--loading',
  props.readonly && 'gk-btn--readonly',
  props.disabled && 'gk-btn--is-disabled',
])

const linkRel = computed(() => {
  if (props.rel) return props.rel
  if (props.target === '_blank') return 'noopener noreferrer'
  return undefined
})

const tabIndex = computed(() => {
  if (props.disabled) return undefined
  if (props.readonly || props.loading) return -1
  return undefined
})

function onClick(e: MouseEvent) {
  if (blocksAction.value) {
    e.preventDefault()
    return
  }
  emit('click', e)
}
</script>

<template>
  <component
    :is="rootTag"
    :class="rootClass"
    :type="isLink ? undefined : type"
    :href="isLink ? href : undefined"
    :rel="isLink ? linkRel : undefined"
    :target="isLink ? target : undefined"
    :download="isLink ? download : undefined"
    :disabled="isLink ? undefined : disabled"
    :aria-busy="loading || undefined"
    :aria-disabled="isLink ? (blocksAction ? true : undefined) : readonly ? true : undefined"
    :tabindex="isLink ? (blocksAction ? -1 : undefined) : tabIndex"
    @click="onClick"
  >
    <span class="gk-btn__inner" :class="{ 'gk-btn__inner--ghost': loading }">
      <span v-if="$slots.prepend" class="gk-btn__prepend">
        <slot name="prepend" />
      </span>
      <span class="gk-btn__content">
        <slot />
      </span>
      <span v-if="$slots.append" class="gk-btn__append">
        <slot name="append" />
      </span>
    </span>
    <span v-if="loading" class="gk-btn__loader" aria-hidden="true">
      <slot name="loader">
        <GkSpinner size="sm" :label="loadingLabel ?? 'Loading'" />
      </slot>
    </span>
  </component>
</template>

<style scoped>
.gk-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gk-space-2);
  font-family: var(--gk-font-sans);
  font-weight: 600;
  line-height: var(--gk-line-height-tight);
  border-radius: var(--gk-radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
  position: relative;
  transition:
    background-color var(--gk-duration-fast) var(--gk-easing-standard),
    border-color var(--gk-duration-fast) var(--gk-easing-standard),
    color var(--gk-duration-fast) var(--gk-easing-standard),
    box-shadow var(--gk-duration-fast) var(--gk-easing-standard);
}

.gk-btn:focus-visible {
  outline: var(--gk-focus-ring-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-btn:disabled,
.gk-btn--is-disabled {
  opacity: var(--gk-opacity-disabled);
  cursor: not-allowed;
}

a.gk-btn[aria-disabled='true'] {
  opacity: var(--gk-opacity-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

.gk-btn--readonly:not(:disabled):not([aria-disabled='true']) {
  cursor: default;
}

.gk-btn--sm {
  font-size: var(--gk-font-size-sm);
  padding-block: var(--gk-space-2);
  padding-inline: var(--gk-space-3);
  min-height: var(--gk-control-min-height-sm);
}

.gk-btn--md {
  font-size: var(--gk-font-size-md);
  padding-block: var(--gk-control-padding-y);
  padding-inline: var(--gk-control-padding-x);
  min-height: var(--gk-control-min-height-md);
}

.gk-btn--slim.gk-btn--sm {
  padding-block: var(--gk-space-1);
  padding-inline: var(--gk-space-2);
  min-height: calc(var(--gk-control-min-height-sm) - 0.25rem);
}

.gk-btn--slim.gk-btn--md {
  padding-block: var(--gk-space-2);
  padding-inline: var(--gk-space-3);
  min-height: calc(var(--gk-control-min-height-md) - 0.25rem);
}

.gk-btn--block {
  width: 100%;
}

.gk-btn--stacked {
  flex-direction: column;
  gap: var(--gk-space-1);
}

.gk-btn__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: inherit;
  width: 100%;
}

.gk-btn--stacked .gk-btn__inner {
  flex-direction: column;
}

.gk-btn__inner--ghost {
  opacity: 0;
  pointer-events: none;
}

.gk-btn__prepend,
.gk-btn__append {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
}

.gk-btn__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.gk-btn--loading .gk-btn__loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.gk-btn--primary {
  background: var(--gk-color-primary);
  color: var(--gk-color-text-on-primary);
}

.gk-btn--primary:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--gk-color-primary-hover);
}

.gk-btn--primary:active:not(:disabled):not([aria-disabled='true']) {
  background: var(--gk-color-primary-active);
}

.gk-btn--secondary {
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
  border-color: var(--gk-color-border-strong);
}

.gk-btn--secondary:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--gk-color-surface-elevated);
}

.gk-btn--ghost {
  background: transparent;
  color: var(--gk-color-primary);
}

.gk-btn--ghost:hover:not(:disabled):not([aria-disabled='true']) {
  background: color-mix(in srgb, var(--gk-color-primary) 12%, transparent);
}

.gk-btn--danger {
  background: var(--gk-color-danger);
  color: var(--gk-color-text-on-primary);
}

.gk-btn--danger:hover:not(:disabled):not([aria-disabled='true']) {
  filter: brightness(0.95);
}
</style>
