<script setup lang="ts">
defineProps<{
  density?: 'comfortable' | 'compact'
  /** Maps to `aria-busy` on `<table>` */
  ariaBusy?: boolean
}>()
</script>

<template>
  <table
    class="gk-table"
    :class="{
      'gk-table--comfortable': density !== 'compact',
      'gk-table--compact': density === 'compact',
    }"
    :aria-busy="ariaBusy"
  >
    <slot />
  </table>
</template>

<style scoped>
.gk-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-text);
}
</style>
