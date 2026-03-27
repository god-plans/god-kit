<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Semantic tone; maps to border and surface tokens */
    variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    /** Use `assertive` for critical errors that interrupt */
    role?: 'status' | 'alert'
  }>(),
  {
    variant: 'neutral',
    role: 'status',
  }
)
</script>

<template>
  <div
    class="gk-alert"
    :class="`gk-alert--${variant}`"
    :role="role"
  >
    <div class="gk-alert__content">
      <slot />
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
}

.gk-alert__content {
  margin: 0;
}

.gk-alert--neutral {
  border-color: var(--gk-color-border-strong);
  background: var(--gk-color-surface);
}

.gk-alert--info {
  border-color: color-mix(in srgb, var(--gk-color-info) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-info-surface);
}

.gk-alert--success {
  border-color: color-mix(in srgb, var(--gk-color-success) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-success-surface);
}

.gk-alert--warning {
  border-color: color-mix(in srgb, var(--gk-color-warning) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-warning-surface);
}

.gk-alert--danger {
  border-color: color-mix(in srgb, var(--gk-color-danger) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-danger-surface);
}
</style>
