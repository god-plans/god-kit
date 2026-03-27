<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md'
    /** Exposed to assistive tech */
    label?: string
  }>(),
  {
    size: 'md',
    label: 'Loading',
  }
)
</script>

<template>
  <span
    class="gk-spinner"
    :class="`gk-spinner--${size}`"
    role="status"
    aria-live="polite"
    :aria-label="label"
  >
    <span class="gk-spinner__ring" aria-hidden="true" />
  </span>
</template>

<style scoped>
.gk-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}

.gk-spinner__ring {
  display: block;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--gk-color-primary) 25%, transparent);
  border-top-color: var(--gk-color-primary);
  animation: gk-spin var(--gk-duration-normal) linear infinite;
}

.gk-spinner--sm .gk-spinner__ring {
  width: 1rem;
  height: 1rem;
}

.gk-spinner--md .gk-spinner__ring {
  width: 1.5rem;
  height: 1.5rem;
}

@keyframes gk-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
