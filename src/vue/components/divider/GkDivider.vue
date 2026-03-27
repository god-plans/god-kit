<script setup lang="ts">
withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical'
  }>(),
  {
    orientation: 'horizontal',
  }
)
</script>

<template>
  <div
    class="gk-divider"
    :class="`gk-divider--${orientation}`"
    role="separator"
    :aria-orientation="orientation"
  />
</template>

<style scoped>
.gk-divider {
  flex-shrink: 0;
  border: 0;
  margin: 0;
  background: var(--gk-color-border);
}

.gk-divider--horizontal {
  width: 100%;
  height: 1px;
}

.gk-divider--vertical {
  width: 1px;
  align-self: stretch;
  min-height: 1.5rem;
}
</style>
