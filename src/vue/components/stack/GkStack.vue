<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
    direction?: 'row' | 'column'
    gap?: 1 | 2 | 3 | 4 | 5 | 6
    align?: 'start' | 'center' | 'end' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'space-between'
    wrap?: boolean
  }>(),
  {
    tag: 'div',
    direction: 'column',
    gap: 4,
    align: 'stretch',
    justify: 'start',
    wrap: false,
  }
)
</script>

<template>
  <component
    :is="tag"
    class="gk-stack"
    :class="[
      `gk-stack--dir-${direction}`,
      `gk-stack--gap-${gap}`,
      `gk-stack--align-${align}`,
      `gk-stack--justify-${justify}`,
      { 'gk-stack--wrap': wrap },
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.gk-stack {
  display: flex;
  box-sizing: border-box;
}

.gk-stack--dir-row {
  flex-direction: row;
}

.gk-stack--dir-column {
  flex-direction: column;
}

.gk-stack--gap-1 {
  gap: var(--gk-space-1);
}
.gk-stack--gap-2 {
  gap: var(--gk-space-2);
}
.gk-stack--gap-3 {
  gap: var(--gk-space-3);
}
.gk-stack--gap-4 {
  gap: var(--gk-space-4);
}
.gk-stack--gap-5 {
  gap: var(--gk-space-5);
}
.gk-stack--gap-6 {
  gap: var(--gk-space-6);
}

.gk-stack--align-start {
  align-items: flex-start;
}
.gk-stack--align-center {
  align-items: center;
}
.gk-stack--align-end {
  align-items: flex-end;
}
.gk-stack--align-stretch {
  align-items: stretch;
}

.gk-stack--justify-start {
  justify-content: flex-start;
}
.gk-stack--justify-center {
  justify-content: center;
}
.gk-stack--justify-end {
  justify-content: flex-end;
}
.gk-stack--justify-space-between {
  justify-content: space-between;
}

.gk-stack--wrap {
  flex-wrap: wrap;
}
</style>
