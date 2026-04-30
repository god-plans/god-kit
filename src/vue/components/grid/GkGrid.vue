<script setup lang="ts">
/**
 * Responsive CSS grid for layout: token-based gap, 1–4 columns per breakpoint (mobile / tablet / desktop),
 * alignment, and optional cell guides. Intended for page sections and builder artboards.
 */
withDefaults(
  defineProps<{
    /** Root element. Use `section` for landmark semantics. */
    tag?: string
    columns?: 1 | 2 | 3 | 4
    /** Columns from 48rem to below 64rem. Defaults to `columns` when omitted. */
    columnsTablet?: 1 | 2 | 3 | 4
    /** Columns below 48rem. Defaults to tablet count (`columnsTablet ?? columns`) when omitted. */
    columnsMobile?: 1 | 2 | 3 | 4
    gap?: 1 | 2 | 3 | 4 | 5 | 6
    /** Dashed outline per cell (editor/debug; exclude cells marked `data-gk-grid-chrome`). */
    showGridLines?: boolean
    alignItems?: 'stretch' | 'start' | 'center' | 'end'
    justifyItems?: 'stretch' | 'start' | 'center' | 'end'
    textAlign?: 'start' | 'center' | 'end'
  }>(),
  {
    tag: 'div',
    columns: 3,
    gap: 4,
    showGridLines: false,
    alignItems: 'stretch',
    justifyItems: 'stretch',
    textAlign: 'start',
  }
)
</script>

<template>
  <component
    :is="tag"
    class="gk-grid"
    :class="{ 'gk-grid--lines': showGridLines }"
    :style="{
      '--gk-grid-cols-mobile': String(columnsMobile ?? (columnsTablet ?? columns)),
      '--gk-grid-cols-tablet': String(columnsTablet ?? columns),
      '--gk-grid-cols-desktop': String(columns),
      '--gk-grid-gap': `var(--gk-space-${gap})`,
      '--gk-grid-align': alignItems,
      '--gk-grid-justify': justifyItems,
      '--gk-grid-text': textAlign,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
.gk-grid {
  display: grid;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  grid-template-columns: repeat(var(--gk-grid-cols-mobile, 3), minmax(0, 1fr));
  align-items: var(--gk-grid-align, stretch);
  justify-items: var(--gk-grid-justify, stretch);
  text-align: var(--gk-grid-text, start);
  gap: var(--gk-grid-gap, var(--gk-space-4));
}

@media (min-width: 48rem) {
  .gk-grid {
    grid-template-columns: repeat(var(--gk-grid-cols-tablet, 3), minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .gk-grid {
    grid-template-columns: repeat(var(--gk-grid-cols-desktop, 3), minmax(0, 1fr));
  }
}

.gk-grid--lines > :not([data-gk-grid-chrome]) {
  outline: 1px dashed var(--gk-color-border, #ccc);
  outline-offset: -1px;
}
</style>
