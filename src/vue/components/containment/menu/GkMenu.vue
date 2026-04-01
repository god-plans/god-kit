<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  useAttrs,
  useId,
  watch,
  watchEffect,
} from 'vue'
import { useMenuAnchorPosition, type GkMenuPlacement } from '../../../composables/useMenuAnchorPosition'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Anchor position relative to the activator */
    placement?: GkMenuPlacement
    /** Gap between activator and panel (px) */
    offset?: number
    /** When `true`, clicking the panel content closes the menu */
    closeOnContentClick?: boolean
    /** Full-screen scrim behind the panel */
    showScrim?: boolean
    /** When `true`, outside clicks and Escape do not close */
    persistent?: boolean
    /** Disables opening */
    disabled?: boolean
    /** Teleport target */
    to?: string | HTMLElement
    /** Stack order; defaults to **`--gk-menu-z-index`** */
    zIndex?: number | string
    /** Move focus into the panel on open and restore on close */
    restoreFocus?: boolean
    /** Reserved for nested menus (no parent chain in v1) */
    submenu?: boolean
  }>(),
  {
    placement: 'bottom-start',
    offset: 4,
    closeOnContentClick: true,
    showScrim: false,
    persistent: false,
    disabled: false,
    to: 'body',
    restoreFocus: true,
    submenu: false,
  }
)

const emit = defineEmits<{
  'click:outside': [event: MouseEvent]
  afterEnter: []
  afterLeave: []
}>()

const model = defineModel<boolean>({ default: false })

const attrs = useAttrs()
const uid = useId()
const menuContentId = `gk-menu-content-${uid}`

const activatorRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const placementRef = computed(() => props.placement)
const offsetRef = computed(() => props.offset)

const { panelStyle, update } = useMenuAnchorPosition(
  model,
  activatorRef,
  contentRef,
  placementRef,
  offsetRef
)

const layerStyle = computed(() => {
  const z = props.zIndex
  if (z === undefined) return { zIndex: 'var(--gk-menu-z-index)' }
  return { zIndex: typeof z === 'number' ? String(z) : z }
})

const contentAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})

const contentClass = computed(() => attrs.class)

let previousActiveElement: HTMLElement | null = null

function focusPanelOrFirst() {
  const root = contentRef.value
  if (!root) return
  const first = getMenuItems()[0]
  if (first) first.focus()
}

function getMenuItems() {
  const root = contentRef.value
  if (!root) return []
  const selector = [
    '[role="menuitem"]:not([aria-disabled="true"])',
    '[role="menuitemcheckbox"]:not([aria-disabled="true"])',
    '[role="menuitemradio"]:not([aria-disabled="true"])',
    'button:not([disabled])',
    '[href]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')
  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter((el) => {
    return !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  })
}

watch(
  model,
  (open) => {
    if (open) {
      if (props.restoreFocus) {
        previousActiveElement = document.activeElement as HTMLElement | null
      }
      if (props.restoreFocus) {
        void nextTick(() => {
          void update()
          requestAnimationFrame(() => {
            void update()
            focusPanelOrFirst()
          })
        })
      } else {
        void nextTick(() => {
          void update()
          requestAnimationFrame(() => void update())
        })
      }
    } else {
      if (props.restoreFocus && previousActiveElement?.focus) {
        previousActiveElement.focus()
      }
      previousActiveElement = null
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
    emit('click:outside', e)
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

function onActivatorClick() {
  if (props.disabled) return
  model.value = !model.value
}

function onActivatorKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    if (!model.value) model.value = true
    void nextTick(() => focusPanelOrFirst())
  }
}

function onScrimClick() {
  if (props.persistent) return
  model.value = false
}

function onPanelClick() {
  if (!props.closeOnContentClick) return
  model.value = false
}

function focusMenuItem(index: number) {
  const items = getMenuItems()
  if (!items.length) return
  const bounded = Math.max(0, Math.min(items.length - 1, index))
  items[bounded].focus()
}

function onPanelKeydown(event: KeyboardEvent) {
  const items = getMenuItems()
  if (!items.length) return
  const active = document.activeElement as HTMLElement | null
  const index = active ? items.indexOf(active) : -1

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (index < 0) focusMenuItem(0)
    else focusMenuItem((index + 1) % items.length)
    return
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (index < 0) focusMenuItem(items.length - 1)
    else focusMenuItem((index - 1 + items.length) % items.length)
    return
  }
  if (event.key === 'Home') {
    event.preventDefault()
    focusMenuItem(0)
    return
  }
  if (event.key === 'End') {
    event.preventDefault()
    focusMenuItem(items.length - 1)
  }
}

const activatorSlotProps = computed(() => ({
  type: 'button' as const,
  'aria-haspopup': 'menu' as const,
  'aria-expanded': model.value,
  'aria-controls': menuContentId,
  disabled: props.disabled,
  onClick: onActivatorClick,
  onKeydown: onActivatorKeydown,
}))

defineExpose({
  contentRef,
})
</script>

<template>
  <div class="gk-menu">
    <div ref="activatorRef" class="gk-menu__activator">
      <slot name="activator" :props="activatorSlotProps" :is-open="model" />
    </div>
    <Teleport :to="to">
      <Transition name="gk-menu" @after-enter="emit('afterEnter')" @after-leave="emit('afterLeave')">
        <div v-if="model" class="gk-menu__layer" :style="layerStyle" role="presentation">
          <div
            v-if="showScrim"
            class="gk-menu__scrim"
            aria-hidden="true"
            @click="onScrimClick"
          />
          <div
            ref="contentRef"
            :id="menuContentId"
            class="gk-menu__panel"
            :class="contentClass"
            role="menu"
            tabindex="-1"
            :style="panelStyle"
            v-bind="contentAttrs"
            @click="onPanelClick"
            @keydown="onPanelKeydown"
          >
            <slot />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.gk-menu {
  display: inline-block;
  max-width: 100%;
}

.gk-menu__activator {
  display: inline-block;
  max-width: 100%;
}

.gk-menu__layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.gk-menu__scrim {
  position: absolute;
  inset: 0;
  pointer-events: auto;
  background: var(--gk-menu-scrim, transparent);
}

.gk-menu__panel {
  pointer-events: auto;
  box-sizing: border-box;
  min-width: var(--gk-menu-min-width);
  max-height: var(--gk-menu-max-height);
  overflow-y: auto;
  padding: var(--gk-space-2);
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-md);
  box-shadow: var(--gk-menu-shadow);
  outline: none;
}

.gk-menu-enter-active,
.gk-menu-leave-active {
  transition: opacity var(--gk-duration-fast) var(--gk-easing-standard);
}

.gk-menu-enter-from,
.gk-menu-leave-to {
  opacity: 0;
}
</style>
