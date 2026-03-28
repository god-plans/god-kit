<script setup lang="ts">
import { computed } from 'vue'
import GkOverlay from '../overlay/GkOverlay.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Horizontal inset (padding) around the sheet on larger viewports */
    inset?: boolean
    /** When `true`, the sheet body scrolls when content exceeds max height */
    scrollable?: boolean
    /** Passed to **GkOverlay** */
    persistent?: boolean
    to?: string | HTMLElement
    /** Defaults to **`--gk-bottom-sheet-z-index`** */
    zIndex?: number | string
    showScrim?: boolean
    restoreFocus?: boolean
    maxHeight?: string | number
  }>(),
  {
    inset: false,
    scrollable: true,
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

const resolvedZIndex = computed(() => props.zIndex ?? 'var(--gk-bottom-sheet-z-index)')

const surfaceStyle = computed(() => {
  const s: Record<string, string> = {}
  const mh = toCssSize(props.maxHeight)
  if (mh) s.maxHeight = mh
  return s
})

const overlayClass = computed(() => [
  'gk-bottom-sheet__overlay',
  'gk-overlay--align-bottom',
  ...(props.inset ? (['gk-overlay--inset'] as const) : []),
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
    transition-name="gk-bottom-sheet"
    content-max-width="100%"
    :overlay-class="overlayClass"
    v-bind="$attrs"
    @click:outside="emit('click:outside', $event)"
    @after-enter="emit('afterEnter')"
    @after-leave="emit('afterLeave')"
  >
    <div
      class="gk-bottom-sheet__surface"
      :class="{ 'gk-bottom-sheet__surface--scrollable': scrollable }"
      :style="surfaceStyle"
    >
      <slot />
    </div>
  </GkOverlay>
</template>

<style scoped>
.gk-bottom-sheet__surface {
  width: 100%;
  box-sizing: border-box;
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
  border: 1px solid var(--gk-color-border);
  border-bottom: none;
  border-radius: var(--gk-radius-lg) var(--gk-radius-lg) 0 0;
  box-shadow: var(--gk-bottom-sheet-shadow, 0 -10px 40px rgba(0, 0, 0, 0.12));
  padding: var(--gk-space-5);
  max-height: var(--gk-bottom-sheet-max-height);
}

.gk-bottom-sheet__surface--scrollable {
  overflow-y: auto;
}
</style>
