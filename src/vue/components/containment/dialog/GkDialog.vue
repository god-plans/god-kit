<script setup lang="ts">
import { computed } from 'vue'
import GkOverlay from '../overlay/GkOverlay.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** When `true`, fills the viewport (edge-to-edge surface) */
    fullscreen?: boolean
    /**
     * Preset max width for the dialog shell (via **GkOverlay** content cap).
     * Default / `md` uses **`--gk-dialog-max-width`** (`28rem`).
     */
    size?: 'sm' | 'md' | 'lg'
    /** When `true`, the surface scrolls when content exceeds max height */
    scrollable?: boolean
    /** Passed to **GkOverlay** */
    persistent?: boolean
    to?: string | HTMLElement
    /** Defaults to **`--gk-dialog-z-index`** (see tokens) */
    zIndex?: number | string
    showScrim?: boolean
    restoreFocus?: boolean
    width?: string | number
    maxWidth?: string | number
    height?: string | number
    maxHeight?: string | number
  }>(),
  {
    fullscreen: false,
    scrollable: false,
    persistent: false,
    to: 'body',
    showScrim: true,
    restoreFocus: true,
  }
)

const emit = defineEmits<{
  'click:outside': [event: MouseEvent]
  afterEnter: []
  afterLeave: []
}>()

const model = defineModel<boolean>({ default: false })

function toCssSize(v: string | number | undefined): string | undefined {
  if (v === undefined) return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const resolvedZIndex = computed(() => props.zIndex ?? 'var(--gk-dialog-z-index)')

const contentMaxWidth = computed(() => {
  if (props.fullscreen) return 'none'
  const cap =
    props.size === 'sm'
      ? 'var(--gk-dialog-max-width-sm)'
      : props.size === 'lg'
        ? 'var(--gk-dialog-max-width-lg)'
        : 'var(--gk-dialog-max-width)'
  return `min(100%, ${cap})`
})

const surfaceStyle = computed(() => {
  if (props.fullscreen) {
    return {
      width: '100%',
      maxWidth: 'none',
      maxHeight: 'none',
    } as Record<string, string>
  }
  const s: Record<string, string> = {}
  const w = toCssSize(props.width)
  const mw = toCssSize(props.maxWidth)
  const h = toCssSize(props.height)
  const mh = toCssSize(props.maxHeight)
  if (w) s.width = w
  if (mw) s.maxWidth = mw
  if (h) s.height = h
  if (mh) s.maxHeight = mh
  return s
})

const overlayClass = computed(() => [
  'gk-dialog__overlay-root',
  ...(props.fullscreen ? (['gk-dialog__overlay-root--fullscreen'] as const) : []),
])
</script>

<template>
  <GkOverlay
    v-model="model"
    role="dialog"
    :aria-modal="true"
    :persistent="persistent"
    :to="to"
    :z-index="resolvedZIndex"
    :scroll-lock="true"
    :show-scrim="showScrim"
    :restore-focus="restoreFocus"
    :content-max-width="contentMaxWidth"
    :overlay-class="overlayClass"
    v-bind="$attrs"
    @click:outside="emit('click:outside', $event)"
    @after-enter="emit('afterEnter')"
    @after-leave="emit('afterLeave')"
  >
    <div
      class="gk-dialog__surface"
      :class="{
        'gk-dialog__surface--fullscreen': fullscreen,
        'gk-dialog__surface--scrollable': scrollable,
      }"
      :style="surfaceStyle"
    >
      <slot />
    </div>
  </GkOverlay>
</template>

<style scoped>
.gk-dialog__surface {
  width: 100%;
  box-sizing: border-box;
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-lg);
  box-shadow: var(--gk-dialog-shadow);
  padding: var(--gk-space-5);
}

.gk-dialog__surface--fullscreen {
  border-radius: 0;
  border: none;
  box-shadow: none;
  flex: 1 1 auto;
  min-height: 0;
}

.gk-dialog__surface--scrollable:not(.gk-dialog__surface--fullscreen) {
  max-height: min(var(--gk-dialog-scroll-max-viewport), var(--gk-dialog-scroll-max-height));
  overflow-y: auto;
}

.gk-dialog__surface--scrollable.gk-dialog__surface--fullscreen {
  overflow: auto;
}
</style>

<style>
/* Unscoped: **GkOverlay** is teleported to `body`. Host pages (including VitePress)
 * must still get reliable fullscreen layout — scoped `:deep()` can fail for teleported nodes. */
.gk-overlay.gk-dialog__overlay-root--fullscreen {
  padding: 0 !important;
  align-items: stretch;
  justify-content: flex-start;
  min-height: 100vh;
  min-height: 100dvh;
}

.gk-overlay.gk-dialog__overlay-root--fullscreen .gk-overlay__content {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: none;
  min-height: 0;
  flex: 1 1 auto;
}
</style>
