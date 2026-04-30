<script setup lang="ts">
import {
  computed,
  nextTick,
  onUnmounted,
  ref,
  useAttrs,
  watch,
  watchEffect,
} from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** When `true`, scrim click and Escape do not close the overlay */
    persistent?: boolean
    /** Teleport target (selector string or `HTMLElement`) */
    to?: string | HTMLElement
    /** Stack order; omit to use `--gk-overlay-z-index` */
    zIndex?: number | string
    /** Lock `document.body` scroll while open */
    scrollLock?: boolean
    /** Render the full-screen scrim */
    showScrim?: boolean
    /** ARIA role for the panel (use with `aria-labelledby` / `aria-describedby` on the root or via attrs) */
    role?: string
    /** When `true`, sets `aria-modal="true"` on the panel (typical for `role="dialog"`) */
    ariaModal?: boolean
    /** Move focus into the panel on open and restore the previous active element on close */
    restoreFocus?: boolean
    /** Optional class(es) on the fixed overlay root (`.gk-overlay`) */
    overlayClass?: string | Record<string, boolean> | Array<string | Record<string, boolean>>
    /**
     * Sets `--gk-overlay-content-max-width` on the overlay root (e.g. `none`, `min(100%, 28rem)`).
     * When omitted, the default is `min(100%, 32rem)` via CSS.
     */
    contentMaxWidth?: string
    /** Vue `<Transition>` name on the overlay root (default fade) */
    transitionName?: string
  }>(),
  {
    persistent: false,
    to: 'body',
    scrollLock: true,
    showScrim: true,
    role: 'dialog',
    ariaModal: true,
    restoreFocus: true,
    transitionName: 'gk-overlay',
  }
)

const emit = defineEmits<{
  'click:outside': [event: MouseEvent]
  afterEnter: []
  afterLeave: []
}>()

const model = defineModel<boolean>({ default: false })

const attrs = useAttrs()

const contentAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})

const contentClass = computed(() => attrs.class)

const overlayStyle = computed(() => {
  const z = props.zIndex
  const cw = props.contentMaxWidth
  const style: Record<string, string> = {}
  if (z !== undefined) {
    style.zIndex = typeof z === 'number' ? String(z) : z
  }
  if (cw !== undefined) {
    style['--gk-overlay-content-max-width'] = cw
  }
  return Object.keys(style).length ? style : undefined
})

const ariaModalAttr = computed(() => (props.ariaModal ? 'true' : undefined))

const contentRef = ref<HTMLElement | null>(null)
let previousActiveElement: HTMLElement | null = null
let previousBodyOverflow = ''

function close() {
  model.value = false
}

function onScrimClick(e: MouseEvent) {
  if (props.persistent) return
  emit('click:outside', e)
  close()
}

function focusPanelOrFirst() {
  const root = contentRef.value
  if (!root) return
  const selector =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  const first = root.querySelector<HTMLElement>(selector)
  if (first) first.focus()
  else root.focus()
}

function getTabbableElements(root: HTMLElement) {
  const selector =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  if (!model.value) return
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (props.persistent) return
      e.preventDefault()
      e.stopPropagation()
      close()
      return
    }
    if (e.key !== 'Tab') return
    const root = contentRef.value
    if (!root) return
    const tabbables = getTabbableElements(root)
    if (!tabbables.length) {
      e.preventDefault()
      root.focus()
      return
    }
    const first = tabbables[0]
    const last = tabbables[tabbables.length - 1]
    const active = document.activeElement
    if (!root.contains(active)) {
      e.preventDefault()
      first.focus()
      return
    }
    if (e.shiftKey && active === first) {
      e.preventDefault()
      last.focus()
      return
    }
    if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }
  window.addEventListener('keydown', onKey, true)
  onCleanup(() => window.removeEventListener('keydown', onKey, true))
})

onUnmounted(() => {
  if (model.value && props.scrollLock) {
    document.body.style.overflow = previousBodyOverflow
  }
})

defineExpose({
  contentRef,
})
</script>

<template>
  <Teleport :to="to">
    <Transition
      :name="transitionName"
      @after-enter="emit('afterEnter')"
      @after-leave="emit('afterLeave')"
    >
      <div
        v-if="model"
        class="gk-overlay"
        :class="overlayClass"
        :style="overlayStyle"
        role="presentation"
      >
        <div
          v-if="showScrim"
          class="gk-overlay__scrim"
          aria-hidden="true"
          @click="onScrimClick"
        />
        <div
          ref="contentRef"
          class="gk-overlay__content"
          :class="contentClass"
          tabindex="-1"
          :role="role"
          :aria-modal="ariaModalAttr"
          v-bind="contentAttrs"
          @click.stop
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.gk-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--gk-overlay-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gk-space-4);
  box-sizing: border-box;
  pointer-events: auto;
}

.gk-overlay__scrim {
  position: absolute;
  inset: 0;
  background: var(--gk-overlay-scrim);
}

.gk-overlay__content {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  /* Flex main-axis: fill the overlay so max-width caps real width (sm / md / lg dialogs). */
  width: 100%;
  min-width: 0;
  max-width: var(--gk-overlay-content-max-width, min(100%, 32rem));
  outline: none;
}

.gk-overlay-enter-active,
.gk-overlay-leave-active {
  transition: opacity var(--gk-duration-normal) var(--gk-easing-standard);
}

.gk-overlay-enter-from,
.gk-overlay-leave-to {
  opacity: 0;
}

/** Bottom-anchored overlay (e.g. **GkBottomSheet**) */
.gk-overlay.gk-overlay--align-bottom {
  align-items: flex-end;
  justify-content: center;
  padding: 0;
}

.gk-overlay.gk-overlay--align-bottom.gk-overlay--inset {
  padding: var(--gk-space-4);
  padding-bottom: 0;
}
</style>

<!-- Bottom sheet: scrim fades, panel slides (used by GkBottomSheet via transitionName="gk-bottom-sheet") -->
<style>
.gk-bottom-sheet-enter-active .gk-overlay__scrim,
.gk-bottom-sheet-leave-active .gk-overlay__scrim {
  transition: opacity var(--gk-duration-normal) var(--gk-easing-standard);
}

.gk-bottom-sheet-enter-from .gk-overlay__scrim,
.gk-bottom-sheet-leave-to .gk-overlay__scrim {
  opacity: 0;
}

.gk-bottom-sheet-enter-active .gk-overlay__content,
.gk-bottom-sheet-leave-active .gk-overlay__content {
  transition: transform var(--gk-duration-normal) var(--gk-easing-standard);
}

.gk-bottom-sheet-enter-from .gk-overlay__content,
.gk-bottom-sheet-leave-to .gk-overlay__content {
  transform: translateY(100%);
}
</style>
