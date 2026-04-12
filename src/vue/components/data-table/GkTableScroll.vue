<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    /** When set, fixes max height and scrolls body */
    maxHeight?: string | number
    /** Omit outer border (e.g. nested tables) */
    borderless?: boolean
  }>(),
  { borderless: false }
)
</script>

<template>
  <div
    class="gk-table-scroll"
    :class="{
      'gk-table-scroll--max': props.maxHeight != null,
      'gk-table-scroll--borderless': props.borderless,
    }"
    :style="
      props.maxHeight != null
        ? {
            maxHeight:
              typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
          }
        : undefined
    "
  >
    <slot />
  </div>
</template>

<style scoped>
.gk-table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--gk-table-border);
  border-radius: var(--gk-table-radius);
  background: var(--gk-color-surface);
}

.gk-table-scroll--borderless {
  border: none;
  border-radius: 0;
}

.gk-table-scroll--max {
  overflow-y: auto;
}
</style>
