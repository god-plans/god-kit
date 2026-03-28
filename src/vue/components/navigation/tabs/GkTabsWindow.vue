<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="gk-tabs-window" role="presentation" v-bind="$attrs">
    <slot />
  </div>
</template>

<style scoped>
.gk-tabs-window {
  width: 100%;
  box-sizing: border-box;
}
</style>
