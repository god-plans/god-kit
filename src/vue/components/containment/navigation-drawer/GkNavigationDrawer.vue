<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  useAttrs,
  watch,
  watchEffect,
} from 'vue'
import { useGkDisplay } from '../../../composables/useGkDisplay'
import type { GkNavigationDrawerLocation } from './gk-navigation-drawer-types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Background color (any valid CSS color); applied to the panel surface */
    color?: string
    /** When `true`, treat as desktop (no auto-**`temporary`** from viewport) */
    disableResizeWatcher?: boolean
    /** When `true`, expand full width on hover (requires **`rail`**) */
    expandOnHover?: boolean
    /** Detached look: margin + rounded corners (see tokens) */
    floating?: boolean
    /** Always visible; **`v-model`** does not collapse the drawer */
    permanent?: boolean
    /** Collapsed rail width; expands on hover when **`expandOnHover`** */
    rail?: boolean
    /** Rail width when **`rail`** (px or CSS length) */
    railWidth?: number | string
    /** Scrim behind the panel when **`temporary`**. `false` disables; string = CSS background */
    scrim?: boolean | string
    /** Background image URL (also passed to **`#image`** slot) */
    image?: string
    /** Overlay drawer (or use mobile breakpoint when neither **`permanent`** nor **`temporary`**) */
    temporary?: boolean
    /** Scrim click and Escape do not close ( **`temporary`** only ) */
    persistent?: boolean
    /** Reserved; touch drag is not implemented */
    touchless?: boolean
    /** Panel width when not in rail mode (px or CSS length) */
    width?: number | string
    location?: GkNavigationDrawerLocation
    /** `start` / `end` follow **`dir`**; `left` / `right` are physical */
    dir?: 'ltr' | 'rtl'
    /** Teleport target when **`temporary`** */
    to?: string | HTMLElement
    /** Stack order; defaults to **`--gk-navigation-drawer-z-index`** */
    zIndex?: number | string
    /** Lock body scroll while **`temporary`** and open */
    scrollLock?: boolean
    /** Move focus into the panel when opening; restore on close */
    restoreFocus?: boolean
    /** Root element tag (default **`<nav>`**) */
    tag?: string
  }>(),
  {
    disableResizeWatcher: false,
    expandOnHover: false,
    floating: false,
    permanent: false,
    rail: false,
    railWidth: 56,
    scrim: true,
    temporary: false,
    persistent: false,
    touchless: false,
    width: 256,
    location: 'start',
    dir: 'ltr',
    to: 'body',
    scrollLock: true,
    restoreFocus: true,
    tag: 'nav',
  }
)

const emit = defineEmits<{
  'update:rail': [value: boolean]
}>()

const model = defineModel<boolean | undefined>({ default: undefined })

const attrs = useAttrs()

const rootEl = ref<HTMLElement | null>(null)
const isHovering = shallowRef(false)

const { mobile } = useGkDisplay()

const railEmitReady = ref(false)

onMounted(() => {
  void nextTick(() => {
    railEmitReady.value = true
  })
})

const effectiveMobile = computed(() => {
  if (props.disableResizeWatcher) return false
  return mobile.value
})

const isTemporary = computed(() => {
  if (props.permanent) return false
  if (props.temporary) return true
  return effectiveMobile.value
})

/** Effective open state ( **`permanent`** is always open ) */
const isOpen = computed(() => {
  if (props.permanent) return true
  if (model.value !== undefined) return model.value
  if (isTemporary.value) return false
  return true
})

watch(isHovering, (val) => {
  if (!railEmitReady.value) return
  if (!props.expandOnHover || !props.rail) return
  emit('update:rail', !val)
})

const physicalSide = computed(() => {
  const loc = props.location
  const rtl = props.dir === 'rtl'
  if (loc === 'start') return rtl ? 'right' : 'left'
  if (loc === 'end') return rtl ? 'left' : 'right'
  if (loc === 'left' || loc === 'right') return loc
  if (loc === 'top' || loc === 'bottom') return loc
  return 'left'
})

const widthPx = computed(() => {
  const w = props.width
  const rw = props.railWidth
  if (props.rail && props.expandOnHover && isHovering.value) {
    return typeof w === 'number' ? `${w}px` : String(w)
  }
  if (props.rail) {
    return typeof rw === 'number' ? `${rw}px` : String(rw)
  }
  return typeof w === 'number' ? `${w}px` : String(w)
})

const drawerStackVars = computed(() => {
  if (props.zIndex === undefined) return undefined
  const z = typeof props.zIndex === 'number' ? String(props.zIndex) : props.zIndex
  return { '--gk-navigation-drawer-z-index': z } as Record<string, string>
})

const panelStyle = computed(() => {
  const side = physicalSide.value
  const style: Record<string, string> = {
    '--gk-navigation-drawer-current-width': widthPx.value,
  }
  if (props.color) {
    style.background = props.color
  }
  if (side === 'left' || side === 'right') {
    style.width = widthPx.value
  }
  if (side === 'top' || side === 'bottom') {
    style.height = widthPx.value
  }
  return style
})

const showScrim = computed(() => {
  if (!isTemporary.value) return false
  return props.scrim !== false
})

const scrimStyle = computed(() => {
  if (typeof props.scrim === 'string') {
    return { background: props.scrim }
  }
  return undefined
})

const rootClass = computed(() => {
  const side = physicalSide.value
  return [
    'gk-navigation-drawer',
    `gk-navigation-drawer--${side}`,
    {
      'gk-navigation-drawer--expand-on-hover': props.expandOnHover,
      'gk-navigation-drawer--floating': props.floating,
      'gk-navigation-drawer--hovering': isHovering.value,
      'gk-navigation-drawer--rail': props.rail,
      'gk-navigation-drawer--temporary': isTemporary.value,
      'gk-navigation-drawer--active': isOpen.value,
    },
  ]
})

const passthroughAttrs = computed(() => {
  const { class: _c, style: _s, ...rest } = attrs as Record<string, unknown>
  return rest
})

const rootClassMerged = computed(() => [rootClass.value, attrs.class])

const rootStyleMerged = computed(() => [
  drawerStackVars.value,
  panelStyle.value,
  attrs.style,
])

let previousActiveElement: HTMLElement | null = null
let previousBodyOverflow = ''

function focusPanelOrFirst() {
  const root = rootEl.value
  if (!root) return
  const selector =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  const first = root.querySelector<HTMLElement>(selector)
  if (first) first.focus()
  else root.focus()
}

function closeFromOverlay() {
  if (props.persistent) return
  model.value = false
}

watch(
  () => isOpen.value && isTemporary.value,
  (open) => {
    if (open) {
      if (props.restoreFocus) {
        previousActiveElement = document.activeElement as HTMLElement | null
      }
      if (props.scrollLock) {
        previousBodyOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      }
      if (props.restoreFocus) {
        void nextTick(() => focusPanelOrFirst())
      }
    } else {
      if (props.scrollLock) {
        document.body.style.overflow = previousBodyOverflow
      }
      if (props.restoreFocus && previousActiveElement?.focus) {
        previousActiveElement.focus()
      }
      previousActiveElement = null
    }
  },
  { flush: 'sync' }
)

watchEffect((onCleanup) => {
  if (!isTemporary.value || !isOpen.value) return
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
  if (isOpen.value && isTemporary.value && props.scrollLock) {
    document.body.style.overflow = previousBodyOverflow
  }
})

function onEnter() {
  if (!props.expandOnHover || !props.rail) return
  isHovering.value = true
}

function onLeave() {
  if (!props.expandOnHover || !props.rail) return
  isHovering.value = false
}

defineExpose({
  rootEl,
})
</script>

<template>
  <Teleport :to="to" :disabled="!isTemporary">
    <div v-if="isTemporary" class="gk-navigation-drawer__portal" :style="drawerStackVars">
      <Transition name="gk-navigation-drawer-scrim">
        <div
          v-if="showScrim && isOpen"
          class="gk-navigation-drawer__scrim"
          aria-hidden="true"
          :style="scrimStyle"
          @click="closeFromOverlay"
        />
      </Transition>
      <Transition :name="`gk-navigation-drawer-${physicalSide}`">
        <component
          :is="tag"
          v-if="isOpen"
          ref="rootEl"
          class="gk-navigation-drawer__surface"
          :class="rootClassMerged"
          :style="rootStyleMerged"
          :tabindex="isTemporary ? -1 : undefined"
          v-bind="passthroughAttrs"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
        >
          <div v-if="image || $slots.image" class="gk-navigation-drawer__img">
            <slot name="image" :image="image">
              <img v-if="image" class="gk-navigation-drawer__img-el" :src="image" alt="" />
            </slot>
          </div>
          <div v-if="$slots.prepend" class="gk-navigation-drawer__prepend">
            <slot name="prepend" />
          </div>
          <div class="gk-navigation-drawer__content">
            <slot />
          </div>
          <div v-if="$slots.append" class="gk-navigation-drawer__append">
            <slot name="append" />
          </div>
        </component>
      </Transition>
    </div>

    <component
      :is="tag"
      v-else
      v-show="isOpen"
      ref="rootEl"
      class="gk-navigation-drawer__surface"
      :class="rootClassMerged"
      :style="rootStyleMerged"
      v-bind="passthroughAttrs"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <div v-if="image || $slots.image" class="gk-navigation-drawer__img">
        <slot name="image" :image="image">
          <img v-if="image" class="gk-navigation-drawer__img-el" :src="image" alt="" />
        </slot>
      </div>
      <div v-if="$slots.prepend" class="gk-navigation-drawer__prepend">
        <slot name="prepend" />
      </div>
      <div class="gk-navigation-drawer__content">
        <slot />
      </div>
      <div v-if="$slots.append" class="gk-navigation-drawer__append">
        <slot name="append" />
      </div>
    </component>
  </Teleport>
</template>

<style scoped>
.gk-navigation-drawer__portal {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: var(--gk-navigation-drawer-z-index);
}

.gk-navigation-drawer__scrim {
  position: fixed;
  inset: 0;
  pointer-events: auto;
  background: var(--gk-navigation-drawer-scrim);
}

.gk-navigation-drawer__surface {
  position: fixed;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: auto;
  outline: none;
  pointer-events: auto;
  z-index: calc(var(--gk-navigation-drawer-z-index) + 1);
  background: var(--gk-navigation-drawer-bg);
  color: var(--gk-color-on-surface);
  box-shadow: var(--gk-navigation-drawer-shadow);
  transition:
    width var(--gk-duration-normal) var(--gk-easing-standard),
    height var(--gk-duration-normal) var(--gk-easing-standard),
    transform var(--gk-duration-normal) var(--gk-easing-standard);
}

.gk-navigation-drawer--floating {
  margin: var(--gk-navigation-drawer-floating-margin);
  border-radius: var(--gk-navigation-drawer-floating-radius);
  max-height: calc(100vh - 2 * var(--gk-navigation-drawer-floating-margin));
}

.gk-navigation-drawer--left {
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--gk-navigation-drawer-current-width, var(--gk-navigation-drawer-width));
}

.gk-navigation-drawer--right {
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--gk-navigation-drawer-current-width, var(--gk-navigation-drawer-width));
}

.gk-navigation-drawer--top {
  top: 0;
  right: 0;
  left: 0;
  height: var(--gk-navigation-drawer-current-width, var(--gk-navigation-drawer-width));
}

.gk-navigation-drawer--bottom {
  right: 0;
  bottom: 0;
  left: 0;
  height: var(--gk-navigation-drawer-current-width, var(--gk-navigation-drawer-width));
}

.gk-navigation-drawer__img {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.gk-navigation-drawer__img-el {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gk-navigation-drawer__prepend,
.gk-navigation-drawer__content,
.gk-navigation-drawer__append {
  position: relative;
  z-index: 1;
}

.gk-navigation-drawer__content {
  flex: 1 1 auto;
  min-height: 0;
}

.gk-navigation-drawer-left-enter-active,
.gk-navigation-drawer-left-leave-active,
.gk-navigation-drawer-right-enter-active,
.gk-navigation-drawer-right-leave-active,
.gk-navigation-drawer-top-enter-active,
.gk-navigation-drawer-top-leave-active,
.gk-navigation-drawer-bottom-enter-active,
.gk-navigation-drawer-bottom-leave-active {
  transition: transform var(--gk-duration-normal) var(--gk-easing-standard);
}

.gk-navigation-drawer-left-enter-from,
.gk-navigation-drawer-left-leave-to {
  transform: translateX(-100%);
}

.gk-navigation-drawer-right-enter-from,
.gk-navigation-drawer-right-leave-to {
  transform: translateX(100%);
}

.gk-navigation-drawer-top-enter-from,
.gk-navigation-drawer-top-leave-to {
  transform: translateY(-100%);
}

.gk-navigation-drawer-bottom-enter-from,
.gk-navigation-drawer-bottom-leave-to {
  transform: translateY(100%);
}

.gk-navigation-drawer-scrim-enter-active,
.gk-navigation-drawer-scrim-leave-active {
  transition: opacity var(--gk-duration-normal) var(--gk-easing-standard);
}

.gk-navigation-drawer-scrim-enter-from,
.gk-navigation-drawer-scrim-leave-to {
  opacity: 0;
}
</style>
