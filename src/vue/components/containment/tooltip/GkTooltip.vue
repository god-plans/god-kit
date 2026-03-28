<script setup lang="ts">
import {
  computed,
  mergeProps,
  nextTick,
  onUnmounted,
  ref,
  useAttrs,
  useId,
  watch,
  watchEffect,
} from 'vue'
import { useTooltipPosition, type GkTooltipPlacement } from '../../../composables/useTooltipPosition'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Stable id for the tooltip panel; defaults to `gk-tooltip-{useId}` */
    id?: string
    /** When `true`, the panel receives pointer events and can be hovered without closing */
    interactive?: boolean
    /** Default text when the default slot is empty */
    text?: string
    /** Edge placement relative to the activator */
    placement?: GkTooltipPlacement
    /** Gap between activator and panel (px) */
    offset?: number
    openOnHover?: boolean
    openOnClick?: boolean
    /** Show on keyboard focus (recommended for accessibility) */
    openOnFocus?: boolean
    showDelay?: number
    hideDelay?: number
    /** Disables open triggers */
    disabled?: boolean
    /** Outside mousedown and Escape do not close */
    persistent?: boolean
    /** Teleport target */
    to?: string | HTMLElement
    /** Stack order; defaults to **`--gk-tooltip-z-index`** */
    zIndex?: number | string
    /** Merged with internal activator bindings (`aria-describedby`, hover/focus/click) */
    activatorProps?: Record<string, unknown>
  }>(),
  {
    interactive: false,
    placement: 'bottom',
    offset: 10,
    openOnHover: true,
    openOnClick: false,
    openOnFocus: true,
    showDelay: 0,
    hideDelay: 0,
    disabled: false,
    persistent: false,
    to: 'body',
  }
)

const emit = defineEmits<{
  afterEnter: []
  afterLeave: []
}>()

const model = defineModel<boolean>({ default: false })

const attrs = useAttrs()
const uid = useId()
const tooltipId = computed(() => props.id ?? `gk-tooltip-${uid}`)

const activatorRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const tooltipHover = ref(false)

const placementRef = computed(() => props.placement)
const offsetRef = computed(() => props.offset)

const { panelStyle, update } = useTooltipPosition(
  model,
  activatorRef,
  contentRef,
  placementRef,
  offsetRef
)

const layerStyle = computed(() => {
  const z = props.zIndex
  if (z === undefined) return { zIndex: 'var(--gk-tooltip-z-index)' }
  return { zIndex: typeof z === 'number' ? String(z) : z }
})

const contentAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})

const contentClass = computed(() => attrs.class)

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function clearShowTimer() {
  if (showTimer != null) {
    clearTimeout(showTimer)
    showTimer = null
  }
}

function clearHideTimer() {
  if (hideTimer != null) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function scheduleShow() {
  if (props.disabled) return
  clearHideTimer()
  clearShowTimer()
  const d = props.showDelay
  const open = () => {
    model.value = true
    void nextTick(() => {
      void update()
      requestAnimationFrame(() => void update())
    })
  }
  if (d <= 0) {
    open()
  } else {
    showTimer = setTimeout(open, d)
  }
}

function scheduleHide() {
  if (props.disabled) return
  clearShowTimer()
  clearHideTimer()
  if (!model.value) return
  const d = props.hideDelay
  const hide = () => {
    if (props.interactive && tooltipHover.value) return
    model.value = false
  }
  if (d <= 0) {
    hide()
  } else {
    hideTimer = setTimeout(hide, d)
  }
}

function onActivatorMouseEnter() {
  if (!props.openOnHover) return
  scheduleShow()
}

function onActivatorMouseLeave() {
  if (!props.openOnHover) return
  clearShowTimer()
  clearHideTimer()
  if (!model.value) return
  if (props.interactive) {
    hideTimer = setTimeout(() => {
      if (!tooltipHover.value) model.value = false
    }, Math.max(props.hideDelay, 100))
  } else {
    const d = props.hideDelay
    if (d <= 0) {
      model.value = false
    } else {
      hideTimer = setTimeout(() => {
        model.value = false
      }, d)
    }
  }
}

function onTooltipPanelEnter() {
  if (!props.interactive) return
  clearHideTimer()
  tooltipHover.value = true
}

function onTooltipPanelLeave() {
  if (!props.interactive) return
  tooltipHover.value = false
  hideTimer = setTimeout(() => {
    model.value = false
  }, Math.max(props.hideDelay, 100))
}

function onActivatorClick() {
  if (!props.openOnClick || props.disabled) return
  model.value = !model.value
  if (model.value) {
    void nextTick(() => {
      void update()
      requestAnimationFrame(() => void update())
    })
  }
}

function onActivatorFocusIn() {
  if (!props.openOnFocus) return
  scheduleShow()
}

function onActivatorFocusOut(e: FocusEvent) {
  if (!props.openOnFocus) return
  const next = e.relatedTarget as Node | null
  if (contentRef.value?.contains(next)) return
  clearShowTimer()
  clearHideTimer()
  if (!model.value) return
  if (props.interactive) {
    hideTimer = setTimeout(() => {
      if (!tooltipHover.value) model.value = false
    }, Math.max(props.hideDelay, 100))
  } else {
    scheduleHide()
  }
}

const activatorSlotProps = computed(() => {
  const base: Record<string, unknown> = {
    'aria-describedby': model.value ? tooltipId.value : undefined,
    onMouseenter: onActivatorMouseEnter,
    onMouseleave: onActivatorMouseLeave,
    onClick: onActivatorClick,
    onFocusin: onActivatorFocusIn,
    onFocusout: onActivatorFocusOut,
  }
  return props.activatorProps ? mergeProps(base, props.activatorProps) : base
})

watch(
  model,
  (open) => {
    if (open) {
      void nextTick(() => {
        void update()
        requestAnimationFrame(() => void update())
      })
    } else {
      tooltipHover.value = false
    }
  },
  { flush: 'sync' }
)

watchEffect((onCleanup) => {
  if (!model.value) return
  const onDoc = (e: MouseEvent) => {
    const t = e.target as Node
    if (activatorRef.value?.contains(t) || contentRef.value?.contains(t)) return
    if (props.persistent) return
    model.value = false
  }
  document.addEventListener('mousedown', onDoc, true)
  onCleanup(() => document.removeEventListener('mousedown', onDoc, true))
})

watchEffect((onCleanup) => {
  if (!model.value) return
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    if (props.persistent) return
    e.preventDefault()
    e.stopPropagation()
    model.value = false
  }
  window.addEventListener('keydown', onKey, true)
  onCleanup(() => window.removeEventListener('keydown', onKey, true))
})

onUnmounted(() => {
  clearShowTimer()
  clearHideTimer()
})

defineExpose({
  contentRef,
})
</script>

<template>
  <div class="gk-tooltip">
    <div ref="activatorRef" class="gk-tooltip__activator">
      <slot name="activator" :props="activatorSlotProps" :is-open="model" />
    </div>
    <Teleport :to="to">
      <Transition name="gk-tooltip" @after-enter="emit('afterEnter')" @after-leave="emit('afterLeave')">
        <div v-if="model" class="gk-tooltip__layer" :style="layerStyle" role="presentation">
          <div
            ref="contentRef"
            :id="tooltipId"
            class="gk-tooltip__panel"
            :class="[contentClass, { 'gk-tooltip__panel--interactive': interactive }]"
            role="tooltip"
            :style="panelStyle"
            v-bind="contentAttrs"
            @mouseenter="onTooltipPanelEnter"
            @mouseleave="onTooltipPanelLeave"
          >
            <slot>{{ text }}</slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.gk-tooltip {
  display: inline-block;
  max-width: 100%;
}

.gk-tooltip__activator {
  display: inline-block;
  max-width: 100%;
}

.gk-tooltip__layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.gk-tooltip__panel {
  pointer-events: none;
  box-sizing: border-box;
  min-width: 0;
  max-width: var(--gk-tooltip-max-width);
  padding: var(--gk-tooltip-padding-y) var(--gk-tooltip-padding-x);
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-tight);
  color: var(--gk-color-on-surface);
  background: var(--gk-color-surface-elevated);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-sm);
  box-shadow: var(--gk-tooltip-shadow);
}

.gk-tooltip__panel--interactive {
  pointer-events: auto;
}

.gk-tooltip-enter-active,
.gk-tooltip-leave-active {
  transition:
    opacity var(--gk-duration-fast) var(--gk-easing-standard),
    transform var(--gk-duration-fast) var(--gk-easing-standard);
}

.gk-tooltip-enter-from,
.gk-tooltip-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
