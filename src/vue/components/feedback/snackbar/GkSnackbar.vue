<script setup lang="ts">
import {
  computed,
  nextTick,
  onUnmounted,
  ref,
  shallowRef,
  useAttrs,
  useSlots,
  watch,
  watchEffect,
} from 'vue'
import GkSpinner from '../../spinner/GkSpinner.vue'
import { useGkSnackbarCountdown } from './gk-snackbar-countdown'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    title?: string
    text?: string
    /** Auto-dismiss ms; `-1` disables */
    timeout?: number | string
    /** Countdown strip; `true` defaults to `top` */
    timer?: boolean | 'top' | 'bottom'
    timerColor?: string
    reverseTimer?: boolean
    variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    /**
     * Edge and alignment, e.g. `bottom`, `bottom start`, `top end`, `left start`.
     */
    location?: string
    rounded?: boolean
    elevation?: number
    loading?: boolean
    prependAvatar?: string
    /** Short label (e.g. emoji or icon font glyph) */
    prependIcon?: string
    vertical?: boolean
    collapsed?: { width: number | string; height: number | string }
    /** Gap between stacked snackbars (programmatic queue) */
    queueGap?: number
    queueIndex?: number
    zIndex?: number | string
    to?: string | HTMLElement
    transitionName?: string
  }>(),
  {
    timeout: 5000,
    timer: false,
    reverseTimer: false,
    variant: 'neutral',
    location: 'bottom center',
    rounded: true,
    queueGap: 8,
    queueIndex: 0,
    to: 'body',
    transitionName: 'gk-snackbar',
  }
)

const emit = defineEmits<{
  afterEnter: []
  afterLeave: []
}>()

const model = defineModel<boolean>({ default: false })

const attrs = useAttrs()
const slots = useSlots()

const contentRef = ref<HTMLElement | null>(null)
const isHovering = shallowRef(false)
const isFocused = shallowRef(false)
const startY = shallowRef(0)

const timeoutMs = computed(() => {
  const n = Number(props.timeout)
  return Number.isFinite(n) ? n : 5000
})

const countdown = useGkSnackbarCountdown(() => timeoutMs.value)

let activeTimeout = -1

function clearTimers() {
  countdown.reset()
  if (activeTimeout !== -1) {
    window.clearTimeout(activeTimeout)
    activeTimeout = -1
  }
}

function startTimeout() {
  clearTimers()
  const t = timeoutMs.value
  if (!model.value || t < 0) return

  void nextTick(() => {
    countdown.start()
  })

  activeTimeout = window.setTimeout(() => {
    model.value = false
  }, t)
}

function onPointerEnter() {
  isHovering.value = true
  clearTimers()
}

function onPointerLeave() {
  isHovering.value = false
  if (!isFocused.value) startTimeout()
}

function onFocusIn() {
  isFocused.value = true
  clearTimers()
}

function onFocusOut(e: FocusEvent) {
  const root = contentRef.value
  if (root?.contains(e.relatedTarget as Node)) return
  isFocused.value = false
  if (!isHovering.value) startTimeout()
}

function onTouchStart(e: TouchEvent) {
  startY.value = e.touches[0]?.clientY ?? 0
}

function onTouchEnd(e: TouchEvent) {
  const y = e.changedTouches[0]?.clientY ?? 0
  if (Math.abs(startY.value - y) > 50) model.value = false
}

function onTransitionAfterLeave() {
  emit('afterLeave')
  if (isHovering.value) onPointerLeave()
  isFocused.value = false
}

watch(
  () => [model.value, timeoutMs.value] as const,
  () => {
    if (model.value && timeoutMs.value >= 0) startTimeout()
    else if (!model.value) clearTimers()
  },
  { immediate: true }
)

watchEffect((onCleanup) => {
  if (!model.value) return
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    e.preventDefault()
    e.stopPropagation()
    model.value = false
  }
  window.addEventListener('keydown', onKey, true)
  onCleanup(() => window.removeEventListener('keydown', onKey, true))
})

onUnmounted(() => {
  clearTimers()
})

const edge = computed(() => {
  const p = props.location.trim().split(/\s+/).filter(Boolean)
  const s = p[0] ?? 'bottom'
  if (s === 'bottom' || s === 'top' || s === 'left' || s === 'right') return s
  return 'bottom'
})

const alignPrimary = computed(() => {
  const p = props.location.trim().split(/\s+/).filter(Boolean)
  return p[1] ?? 'center'
})

const isAnchorEdge = computed(() => edge.value === 'bottom' || edge.value === 'top')

const layerClass = computed(() => {
  const e = edge.value
  const a = alignPrimary.value
  const alignV =
    a === 'start' || a === 'end' || a === 'center' ? a : 'center'
  if (e === 'bottom' || e === 'top') {
    return [`gk-snackbar-layer--shell`, `gk-snackbar-layer--edge-${e}`]
  }
  return [
    `gk-snackbar-layer--${e}`,
    `gk-snackbar-layer--align-v-${alignV}`,
  ]
})

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
}

const anchorJustify = computed(() => {
  const a = alignPrimary.value
  return justifyMap[a === 'start' || a === 'end' || a === 'center' ? a : 'center'] ?? 'center'
})

const anchorStyle = computed(() => {
  if (edge.value === 'bottom') {
    return {
      position: 'absolute' as const,
      left: 'var(--gk-snackbar-inset)',
      right: 'var(--gk-snackbar-inset)',
      bottom:
        'calc(var(--gk-snackbar-inset) + var(--gk-snackbar-stack-offset, 0px))',
      display: 'flex',
      justifyContent: anchorJustify.value,
      pointerEvents: 'none' as const,
    }
  }
  if (edge.value === 'top') {
    return {
      position: 'absolute' as const,
      left: 'var(--gk-snackbar-inset)',
      right: 'var(--gk-snackbar-inset)',
      top: 'calc(var(--gk-snackbar-inset) + var(--gk-snackbar-stack-offset, 0px))',
      display: 'flex',
      justifyContent: anchorJustify.value,
      pointerEvents: 'none' as const,
    }
  }
  return {}
})

const flexAlignClass = computed(() => {
  const e = edge.value
  const a = alignPrimary.value
  const alignV =
    a === 'start' || a === 'end' || a === 'center' ? a : 'center'
  if (e === 'left' || e === 'right') {
    return [`gk-snackbar-layer--align-v-${alignV}`]
  }
  return []
})

const timerPlacement = computed(() => {
  if (props.timer === true || props.timer === 'top') return 'top'
  if (props.timer === 'bottom') return 'bottom'
  return 'top'
})

const showTimerBar = computed(
  () =>
    !!props.timer &&
    countdown.time.value > 0 &&
    !isHovering.value &&
    !isFocused.value
)

const timerBarStyle = computed(() => {
  const total = Math.max(1, timeoutMs.value)
  const remaining = countdown.time.value
  const pct = (remaining / total) * 100
  const w = props.reverseTimer ? 100 - pct : pct
  return {
    width: `${w}%`,
    backgroundColor: props.timerColor ?? 'var(--gk-color-info)',
  }
})

const stackVars = computed(() => {
  if (edge.value !== 'bottom' && edge.value !== 'top') return {}
  return {
    '--gk-snackbar-queue-index': String(props.queueIndex),
    '--gk-snackbar-gap': `${props.queueGap}px`,
    '--gk-snackbar-stack-offset': `calc(var(--gk-snackbar-queue-index) * (var(--gk-snackbar-stack-unit) + var(--gk-snackbar-gap)))`,
  }
})

function unit(n: number | string) {
  return typeof n === 'number' ? `${n}px` : n
}

const collapsedVars = computed(() => {
  if (!props.collapsed) return {}
  return {
    '--gk-snackbar-collapsed-width': unit(props.collapsed.width),
    '--gk-snackbar-collapsed-height': unit(props.collapsed.height),
  }
})

const layerZ = computed(() => {
  const z = props.zIndex
  const base =
    z === undefined
      ? { zIndex: 'var(--gk-snackbar-z-index)' }
      : { zIndex: typeof z === 'number' ? String(z) : z }
  return { ...base, ...stackVars.value }
})

const surfaceClass = computed(() => [
  `gk-snackbar--${props.variant}`,
  props.rounded && 'gk-snackbar--rounded',
  props.elevation !== undefined && `gk-snackbar--elevation-${Math.min(5, Math.max(0, Math.floor(props.elevation)))}`,
  props.vertical && 'gk-snackbar--vertical',
  !!props.collapsed && 'gk-snackbar--collapsed',
  attrs.class,
])

const passthrough = computed(() => {
  const { class: _c, style: _s, ...rest } = attrs as Record<string, unknown>
  return rest
})

const surfaceStyle = computed(() => [collapsedVars.value, attrs.style])

const hasPrependMedia = computed(
  () => !!(props.prependAvatar || props.prependIcon || props.loading || slots.prepend)
)

const showTitle = computed(() => !!(slots.title || props.title))
const showText = computed(() => !!(slots.text || props.text))

defineExpose({
  contentRef,
})
</script>

<template>
  <Teleport :to="to">
    <Transition
      :name="transitionName"
      @after-enter="emit('afterEnter')"
      @after-leave="onTransitionAfterLeave"
    >
      <div
        v-if="model"
        class="gk-snackbar-layer"
        :class="[layerClass, flexAlignClass]"
        :style="layerZ"
        role="presentation"
      >
        <div v-if="isAnchorEdge" class="gk-snackbar-anchor" :style="anchorStyle">
          <div
            ref="contentRef"
            class="gk-snackbar"
            :class="surfaceClass"
            :style="surfaceStyle"
            v-bind="passthrough"
            @pointerenter="onPointerEnter"
            @pointerleave="onPointerLeave"
            @focusin="onFocusIn"
            @focusout="onFocusOut"
            @touchstart.passive="onTouchStart"
            @touchend="onTouchEnd"
          >
            <div
              v-if="showTimerBar"
              class="gk-snackbar__timer"
              :class="`gk-snackbar__timer--${timerPlacement}`"
              aria-hidden="true"
            >
              <div class="gk-snackbar__timer-track">
                <div class="gk-snackbar__timer-bar" :style="timerBarStyle" />
              </div>
            </div>
            <div v-if="$slots.header" class="gk-snackbar__header">
              <slot name="header" />
            </div>
            <div v-if="hasPrependMedia" class="gk-snackbar__prepend">
              <slot name="prepend">
                <span v-if="loading" aria-hidden="true" class="gk-snackbar__spinner-wrap">
                  <GkSpinner size="sm" label="Loading" />
                </span>
                <img
                  v-else-if="prependAvatar"
                  class="gk-snackbar__avatar"
                  :src="prependAvatar"
                  alt=""
                />
                <span v-else-if="prependIcon" class="gk-snackbar__icon" aria-hidden="true">{{
                  prependIcon
                }}</span>
              </slot>
            </div>
            <div
              v-if="$slots.default || showTitle || showText"
              class="gk-snackbar__content"
              role="status"
              aria-live="polite"
            >
              <div v-if="showTitle" class="gk-snackbar__title">
                <slot name="title">{{ title }}</slot>
              </div>
              <div v-if="showText" class="gk-snackbar__text">
                <slot name="text">{{ text }}</slot>
              </div>
              <slot />
            </div>
            <div v-if="$slots.actions" class="gk-snackbar__actions">
              <slot name="actions" :is-active="model" />
            </div>
          </div>
        </div>
        <div
          v-else
          ref="contentRef"
          class="gk-snackbar"
          :class="surfaceClass"
          :style="surfaceStyle"
          v-bind="passthrough"
          @pointerenter="onPointerEnter"
          @pointerleave="onPointerLeave"
          @focusin="onFocusIn"
          @focusout="onFocusOut"
          @touchstart.passive="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div
            v-if="showTimerBar"
            class="gk-snackbar__timer"
            :class="`gk-snackbar__timer--${timerPlacement}`"
            aria-hidden="true"
          >
            <div class="gk-snackbar__timer-track">
              <div class="gk-snackbar__timer-bar" :style="timerBarStyle" />
            </div>
          </div>
          <div v-if="$slots.header" class="gk-snackbar__header">
            <slot name="header" />
          </div>
          <div v-if="hasPrependMedia" class="gk-snackbar__prepend">
            <slot name="prepend">
              <span v-if="loading" aria-hidden="true" class="gk-snackbar__spinner-wrap">
                <GkSpinner size="sm" label="Loading" />
              </span>
              <img
                v-else-if="prependAvatar"
                class="gk-snackbar__avatar"
                :src="prependAvatar"
                alt=""
              />
              <span v-else-if="prependIcon" class="gk-snackbar__icon" aria-hidden="true">{{
                prependIcon
              }}</span>
            </slot>
          </div>
          <div
            v-if="$slots.default || showTitle || showText"
            class="gk-snackbar__content"
            role="status"
            aria-live="polite"
          >
            <div v-if="showTitle" class="gk-snackbar__title">
              <slot name="title">{{ title }}</slot>
            </div>
            <div v-if="showText" class="gk-snackbar__text">
              <slot name="text">{{ text }}</slot>
            </div>
            <slot />
          </div>
          <div v-if="$slots.actions" class="gk-snackbar__actions">
            <slot name="actions" :is-active="model" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.gk-snackbar-layer {
  position: fixed;
  inset: 0;
  box-sizing: border-box;
  pointer-events: none;
  z-index: var(--gk-snackbar-z-index);
}

.gk-snackbar-layer--shell {
  display: block;
  padding: 0;
}

.gk-snackbar-anchor {
  width: 100%;
  box-sizing: border-box;
}

.gk-snackbar-layer--left,
.gk-snackbar-layer--right {
  display: flex;
  padding: var(--gk-snackbar-inset);
}

.gk-snackbar-layer--left {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.gk-snackbar-layer--right {
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.gk-snackbar-layer--left.gk-snackbar-layer--align-v-start,
.gk-snackbar-layer--right.gk-snackbar-layer--align-v-start {
  align-items: flex-start;
}

.gk-snackbar-layer--left.gk-snackbar-layer--align-v-end,
.gk-snackbar-layer--right.gk-snackbar-layer--align-v-end {
  align-items: flex-end;
}

.gk-snackbar {
  pointer-events: auto;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--gk-space-3);
  box-sizing: border-box;
  width: min(100%, var(--gk-snackbar-max-width));
  min-height: var(--gk-snackbar-min-height);
  padding: var(--gk-space-3) var(--gk-space-4);
  font-family: var(--gk-font-sans);
  font-size: var(--gk-font-size-sm);
  line-height: var(--gk-line-height-normal);
  color: var(--gk-color-on-surface);
  border: 1px solid var(--gk-snackbar-border);
  box-shadow: var(--gk-snackbar-shadow);
}

.gk-snackbar--vertical {
  flex-direction: column;
  align-items: stretch;
}

.gk-snackbar--collapsed {
  width: var(--gk-snackbar-collapsed-width, auto);
  height: var(--gk-snackbar-collapsed-height, auto);
}

.gk-snackbar--rounded {
  border-radius: var(--gk-radius-md);
}

.gk-snackbar--elevation-0 {
  box-shadow: none;
}
.gk-snackbar--elevation-1 {
  box-shadow: var(--gk-snackbar-elevation-1);
}
.gk-snackbar--elevation-2 {
  box-shadow: var(--gk-snackbar-elevation-2);
}
.gk-snackbar--elevation-3 {
  box-shadow: var(--gk-snackbar-elevation-3);
}
.gk-snackbar--elevation-4 {
  box-shadow: var(--gk-snackbar-elevation-4);
}
.gk-snackbar--elevation-5 {
  box-shadow: var(--gk-snackbar-elevation-5);
}

.gk-snackbar--neutral {
  --gk-snackbar-border: var(--gk-color-border-strong);
  background: var(--gk-color-surface);
}

.gk-snackbar--info {
  --gk-snackbar-border: color-mix(in srgb, var(--gk-color-info) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-info-surface);
}

.gk-snackbar--success {
  --gk-snackbar-border: color-mix(in srgb, var(--gk-color-success) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-success-surface);
}

.gk-snackbar--warning {
  --gk-snackbar-border: color-mix(in srgb, var(--gk-color-warning) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-warning-surface);
}

.gk-snackbar--danger {
  --gk-snackbar-border: color-mix(in srgb, var(--gk-color-danger) 35%, var(--gk-color-border-strong));
  background: var(--gk-color-danger-surface);
}

.gk-snackbar__timer {
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  overflow: hidden;
  pointer-events: none;
}

.gk-snackbar__timer--top {
  top: 0;
  border-radius: var(--gk-radius-md) var(--gk-radius-md) 0 0;
}

.gk-snackbar__timer--bottom {
  bottom: 0;
  border-radius: 0 0 var(--gk-radius-md) var(--gk-radius-md);
}

.gk-snackbar__timer-track {
  height: 100%;
  background: color-mix(in srgb, var(--gk-color-on-surface-muted) 25%, transparent);
}

.gk-snackbar__timer-bar {
  height: 100%;
  transition: width 0.05s linear;
}

.gk-snackbar__prepend {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gk-snackbar__avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.gk-snackbar__icon {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.gk-snackbar__content {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-1);
}

.gk-snackbar__title {
  font-weight: 600;
  font-size: var(--gk-font-size-md);
}

.gk-snackbar__text {
  margin: 0;
}

.gk-snackbar__actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--gk-space-1);
  margin-inline-start: auto;
}

.gk-snackbar--vertical .gk-snackbar__actions {
  margin-inline-start: 0;
  justify-content: flex-end;
}
</style>

<style>
.gk-snackbar-enter-active,
.gk-snackbar-leave-active {
  transition: opacity var(--gk-duration-normal) var(--gk-easing-standard);
}

.gk-snackbar-enter-from,
.gk-snackbar-leave-to {
  opacity: 0;
}
</style>
