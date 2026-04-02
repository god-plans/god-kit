<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md'
    /** Exposed to assistive tech */
    label?: string
    /**
     * `on-filled` uses high-contrast ring colors for solid primary/danger-style surfaces
     * where the default primary-colored ring would blend into the background.
     */
    tone?: 'default' | 'on-filled'
  }>(),
  {
    size: 'md',
    label: 'Loading',
    tone: 'default',
  }
)
</script>

<template>
  <span
    class="gk-spinner"
    :class="[`gk-spinner--${size}`, tone === 'on-filled' && 'gk-spinner--on-filled']"
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

.gk-spinner--on-filled .gk-spinner__ring {
  border-color: color-mix(in srgb, var(--gk-color-text-on-primary) 32%, transparent);
  border-top-color: var(--gk-color-text-on-primary);
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
