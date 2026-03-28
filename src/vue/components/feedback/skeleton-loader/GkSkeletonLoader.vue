<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import GkSkeletonBone from './GkSkeletonBone.vue'
import type { GkSkeletonLoaderType } from './gk-skeleton-root-types'
import { genGkSkeletonStructure, wrapGkSkeletonTypes } from './gk-skeleton-tree'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Decorative blocks only — no `role="alert"` / live region */
    boilerplate?: boolean
    /** Wave / track color (CSS color); also sets `--gk-skeleton-loader-wave` when set */
    color?: string
    /** When `true`, show skeleton even if the default slot has content */
    loading?: boolean
    /** `aria-label` on the loading region (when not **`boilerplate`**) */
    loadingText?: string
    /**
     * Preset layout key(s). String, comma-separated string, or array (joined with commas).
     * Unknown keys still render a bone with that class name.
     */
    type?:
      | GkSkeletonLoaderType
      | (string & {})
      | ReadonlyArray<GkSkeletonLoaderType | (string & {})>
    /** Root width */
    width?: number | string
    /** Root height */
    height?: number | string
    maxWidth?: number | string
    maxHeight?: number | string
    /** 0–5; adds elevation shadow */
    elevation?: number
  }>(),
  {
    boilerplate: false,
    loading: false,
    loadingText: 'Loading',
    type: 'ossein',
  }
)

const slots = useSlots()
const attrs = useAttrs()

const showSkeleton = computed(() => !slots.default || props.loading)

const rootNodes = computed(() =>
  genGkSkeletonStructure(wrapGkSkeletonTypes(props.type))
)

const rootStyle = computed(() => {
  const s: Record<string, string> = {}
  const w = props.width
  const h = props.height
  const mw = props.maxWidth
  const mh = props.maxHeight
  if (w !== undefined) s.width = typeof w === 'number' ? `${w}px` : w
  if (h !== undefined) s.height = typeof h === 'number' ? `${h}px` : h
  if (mw !== undefined) s.maxWidth = typeof mw === 'number' ? `${mw}px` : mw
  if (mh !== undefined) s.maxHeight = typeof mh === 'number' ? `${mh}px` : mh
  if (props.color) {
    s['--gk-skeleton-loader-wave'] = props.color
  }
  return Object.keys(s).length ? s : undefined
})

const loadingAttrs = computed(() => {
  if (props.boilerplate || !showSkeleton.value) return {}
  return {
    role: 'alert' as const,
    'aria-live': 'polite' as const,
    'aria-label': props.loadingText,
  }
})

const rootClass = computed(() => [
  'gk-skeleton-loader',
  {
    'gk-skeleton-loader--boilerplate': props.boilerplate,
  },
  props.elevation !== undefined && props.elevation >= 0
    ? `gk-skeleton-loader--elevation-${Math.min(5, Math.max(0, Math.floor(props.elevation)))}`
    : '',
  attrs.class,
])

const passthrough = computed(() => {
  const { class: _c, style: _s, ...rest } = attrs as Record<string, unknown>
  return rest
})

const rootStyleMerged = computed(() => [rootStyle.value, attrs.style])
</script>

<template>
  <div
    v-if="showSkeleton"
    class="gk-skeleton-loader__root"
    :class="rootClass"
    :style="rootStyleMerged"
    v-bind="{ ...passthrough, ...loadingAttrs }"
  >
    <GkSkeletonBone v-for="(n, i) in rootNodes" :key="i" :node="n" />
  </div>
  <slot v-else />
</template>

<style scoped>
.gk-skeleton-loader__root {
  display: flex;
  flex-direction: column;
  gap: var(--gk-skeleton-loader-gap);
  width: 100%;
  box-sizing: border-box;
}

.gk-skeleton-loader--elevation-0 {
  box-shadow: none;
}
.gk-skeleton-loader--elevation-1 {
  box-shadow: var(--gk-elevation-1, 0 1px 3px rgba(0, 0, 0, 0.08));
}
.gk-skeleton-loader--elevation-2 {
  box-shadow: var(--gk-elevation-2, 0 2px 8px rgba(0, 0, 0, 0.1));
}
.gk-skeleton-loader--elevation-3 {
  box-shadow: var(--gk-elevation-3, 0 4px 12px rgba(0, 0, 0, 0.12));
}
.gk-skeleton-loader--elevation-4 {
  box-shadow: var(--gk-elevation-4, 0 8px 20px rgba(0, 0, 0, 0.14));
}
.gk-skeleton-loader--elevation-5 {
  box-shadow: var(--gk-elevation-5, 0 12px 28px rgba(0, 0, 0, 0.16));
}

:deep(.gk-skeleton-loader__bone) {
  position: relative;
  overflow: hidden;
  border-radius: var(--gk-skeleton-loader-radius);
  background: var(--gk-skeleton-loader-track);
}

:deep(.gk-skeleton-loader__bone)::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    var(--gk-skeleton-loader-wave),
    transparent
  );
  animation: gk-skeleton-shimmer var(--gk-skeleton-loader-shimmer-duration) ease-in-out infinite;
}

.gk-skeleton-loader--boilerplate :deep(.gk-skeleton-loader__bone)::after {
  animation: none;
  opacity: 0;
}

:deep(.gk-skeleton-loader__ossein) {
  min-height: var(--gk-skeleton-loader-ossein-height);
}

:deep(.gk-skeleton-loader__text) {
  height: var(--gk-skeleton-loader-text-height);
  width: 100%;
  max-width: 100%;
}

:deep(.gk-skeleton-loader__heading) {
  height: var(--gk-skeleton-loader-heading-height);
  width: 88%;
}

:deep(.gk-skeleton-loader__subtitle) {
  height: var(--gk-skeleton-loader-subtitle-height);
  width: 64%;
}

:deep(.gk-skeleton-loader__paragraph) {
  display: flex;
  flex-direction: column;
  gap: var(--gk-skeleton-loader-gap);
  width: 100%;
}

:deep(.gk-skeleton-loader__sentences) {
  display: flex;
  flex-direction: column;
  gap: var(--gk-skeleton-loader-gap);
  width: 100%;
}

:deep(.gk-skeleton-loader__image) {
  aspect-ratio: 16 / 9;
  width: 100%;
  border-radius: var(--gk-radius-md);
}

:deep(.gk-skeleton-loader__avatar) {
  width: var(--gk-skeleton-loader-avatar-size);
  height: var(--gk-skeleton-loader-avatar-size);
  border-radius: 50%;
  flex-shrink: 0;
}

:deep(.gk-skeleton-loader__button) {
  height: var(--gk-skeleton-loader-button-height);
  width: var(--gk-skeleton-loader-button-width);
  border-radius: var(--gk-radius-md);
}

:deep(.gk-skeleton-loader__chip) {
  height: var(--gk-skeleton-loader-chip-height);
  width: var(--gk-skeleton-loader-chip-width);
  border-radius: 999px;
}

:deep(.gk-skeleton-loader__divider) {
  height: var(--gk-skeleton-loader-divider-height);
  width: 100%;
  border-radius: 0;
}

:deep(.gk-skeleton-loader__card) {
  display: flex;
  flex-direction: column;
  gap: var(--gk-skeleton-loader-gap);
  width: 100%;
}

:deep(.gk-skeleton-loader__article) {
  display: flex;
  flex-direction: column;
  gap: var(--gk-skeleton-loader-gap-lg);
  width: 100%;
}

:deep(.gk-skeleton-loader__actions) {
  display: flex;
  flex-direction: row;
  gap: var(--gk-skeleton-loader-gap);
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

:deep(.gk-skeleton-loader__list-item),
:deep(.gk-skeleton-loader__list-item-avatar),
:deep(.gk-skeleton-loader__list-item-two-line),
:deep(.gk-skeleton-loader__list-item-avatar-two-line),
:deep(.gk-skeleton-loader__list-item-three-line),
:deep(.gk-skeleton-loader__list-item-avatar-three-line) {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--gk-skeleton-loader-gap);
  width: 100%;
}

:deep(.gk-skeleton-loader__list-item-two-line),
:deep(.gk-skeleton-loader__list-item-avatar-two-line) {
  align-items: stretch;
}

:deep(.gk-skeleton-loader__list-item-two-line) :deep(.gk-skeleton-loader__sentences),
:deep(.gk-skeleton-loader__list-item-avatar-two-line) :deep(.gk-skeleton-loader__sentences) {
  flex: 1;
}

:deep(.gk-skeleton-loader__list-item-three-line),
:deep(.gk-skeleton-loader__list-item-avatar-three-line) {
  align-items: flex-start;
}

:deep(.gk-skeleton-loader__table) {
  display: flex;
  flex-direction: column;
  gap: var(--gk-skeleton-loader-gap);
  width: 100%;
}

:deep(.gk-skeleton-loader__table-heading) {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--gk-skeleton-loader-gap);
}

:deep(.gk-skeleton-loader__table-thead) {
  display: flex;
  flex-direction: row;
  gap: var(--gk-skeleton-loader-gap-sm);
  width: 100%;
}

:deep(.gk-skeleton-loader__table-thead) > :deep(.gk-skeleton-loader__heading) {
  flex: 1;
  min-width: 0;
}

:deep(.gk-skeleton-loader__table-tbody) {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}

:deep(.gk-skeleton-loader__table-row-divider) {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}

:deep(.gk-skeleton-loader__table-row) {
  display: flex;
  flex-direction: row;
  gap: var(--gk-skeleton-loader-gap-sm);
  width: 100%;
}

:deep(.gk-skeleton-loader__table-row) > :deep(.gk-skeleton-loader__text) {
  flex: 1;
  min-width: 0;
}

:deep(.gk-skeleton-loader__table-tfoot) {
  display: flex;
  flex-direction: row;
  gap: var(--gk-skeleton-loader-gap);
  align-items: center;
}

:deep(.gk-skeleton-loader__date-picker) {
  display: flex;
  flex-direction: column;
  gap: var(--gk-skeleton-loader-gap);
  width: 100%;
}

:deep(.gk-skeleton-loader__date-picker-options) {
  display: flex;
  flex-direction: row;
  gap: var(--gk-skeleton-loader-gap);
  align-items: center;
}

:deep(.gk-skeleton-loader__date-picker-days) {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--gk-skeleton-loader-gap-sm);
  width: 100%;
}

:deep(.gk-skeleton-loader__date-picker-days) :deep(.gk-skeleton-loader__avatar) {
  width: 100%;
  aspect-ratio: 1;
  height: auto;
}

@keyframes gk-skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
