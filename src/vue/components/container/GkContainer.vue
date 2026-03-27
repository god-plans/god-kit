<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
    maxWidth?: 'sm' | 'md' | 'lg' | 'full'
    /** Extra horizontal padding using space tokens */
    padded?: boolean
  }>(),
  {
    tag: 'div',
    maxWidth: 'md',
    padded: true,
  }
)
</script>

<template>
  <component
    :is="tag"
    class="gk-container"
    :class="[`gk-container--${maxWidth}`, { 'gk-container--padded': padded }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.gk-container {
  box-sizing: border-box;
  width: 100%;
  margin-inline: auto;
}

.gk-container--padded {
  padding-inline: var(--gk-space-4);
}

.gk-container--sm {
  max-width: 36rem;
}

.gk-container--md {
  max-width: 48rem;
}

.gk-container--lg {
  max-width: 64rem;
}

.gk-container--full {
  max-width: none;
}
</style>
