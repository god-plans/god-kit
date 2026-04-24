<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    tag?: 'div' | 'p' | 'section'
    /** Body text layer opacity; maps to a CSS custom property */
    opacity?: string | number
  }>(),
  { tag: 'div' }
)

const attrs = useAttrs()

const rootStyle = computed(() => {
  const a = attrs.style
  const o =
    props.opacity != null
      ? { '--gk-card-text-opacity': String(props.opacity) }
      : null
  if (!o) return a
  if (!a) return o
  if (Array.isArray(a)) return [...a, o]
  if (typeof a === 'string') return [a, o]
  return { ...(a as object), ...o }
})
</script>

<template>
  <component
    :is="tag"
    class="gk-card__text"
    v-bind="attrs"
    :style="rootStyle"
  >
    <slot />
  </component>
</template>

<style scoped>
.gk-card__text {
  --gk-card-text-opacity: 1;
  margin: 0;
  font-size: var(--gk-text-body-s-size);
  font-weight: var(--gk-text-body-s-weight);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-on-surface);
  opacity: var(--gk-card-text-opacity);
  padding: 0;
}
</style>
