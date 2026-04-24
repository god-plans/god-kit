<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span'
  }>(),
  { tag: 'h3' }
)
</script>

<template>
  <component :is="tag" class="gk-card__title">
    <slot />
  </component>
</template>

<style scoped>
.gk-card__title {
  margin: 0;
  font-family: var(--gk-font-heading);
  font-size: var(--gk-text-heading-m-size);
  font-weight: var(--gk-text-heading-m-weight);
  line-height: var(--gk-text-heading-m-line-height);
  color: var(--gk-color-on-surface);
}
</style>
