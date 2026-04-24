<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="gk-card__actions" v-bind="$attrs">
    <slot />
  </div>
</template>

<style scoped>
.gk-card__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--gk-card-actions-gap);
  min-height: var(--gk-card-actions-min-height);
  box-sizing: border-box;
  margin-top: var(--gk-space-2);
  padding: 0;
}
</style>
