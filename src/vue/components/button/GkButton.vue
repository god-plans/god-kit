<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md'
    disabled?: boolean
    block?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    block: false,
  }
)

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()

const rootClass = computed(() => [
  'gk-btn',
  `gk-btn--${props.variant}`,
  `gk-btn--${props.size}`,
  props.block && 'gk-btn--block',
])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="rootClass"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
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

.gk-btn:disabled {
  opacity: var(--gk-opacity-disabled);
  cursor: not-allowed;
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

.gk-btn--block {
  width: 100%;
}

.gk-btn--primary {
  background: var(--gk-color-primary);
  color: var(--gk-color-text-on-primary);
}

.gk-btn--primary:hover:not(:disabled) {
  background: var(--gk-color-primary-hover);
}

.gk-btn--primary:active:not(:disabled) {
  background: var(--gk-color-primary-active);
}

.gk-btn--secondary {
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
  border-color: var(--gk-color-border-strong);
}

.gk-btn--secondary:hover:not(:disabled) {
  background: var(--gk-color-surface-elevated);
}

.gk-btn--ghost {
  background: transparent;
  color: var(--gk-color-primary);
}

.gk-btn--ghost:hover:not(:disabled) {
  background: color-mix(in srgb, var(--gk-color-primary) 12%, transparent);
}

.gk-btn--danger {
  background: var(--gk-color-danger);
  color: var(--gk-color-text-on-primary);
}

.gk-btn--danger:hover:not(:disabled) {
  filter: brightness(0.95);
}
</style>
