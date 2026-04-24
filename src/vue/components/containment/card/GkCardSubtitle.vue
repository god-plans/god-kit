<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: 'p' | 'div' | 'span'
    /** Subtitle text opacity; maps to a CSS custom property */
    opacity?: string | number
  }>(),
  { tag: 'p' }
)
</script>

<template>
  <component
    :is="tag"
    class="gk-card__subtitle"
    :style="opacity != null ? { '--gk-card-subtitle-opacity': String(opacity) } : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.gk-card__subtitle {
  --gk-card-subtitle-opacity: 0.8;
  margin: 0;
  font-size: var(--gk-text-body-s-size);
  font-weight: var(--gk-text-body-s-weight);
  line-height: var(--gk-text-body-s-line-height);
  color: var(--gk-color-on-surface-muted);
  opacity: var(--gk-card-subtitle-opacity);
}
</style>
