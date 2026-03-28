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
  }>(),
  {
    persistent: false,
    to: 'body',
    scrollLock: true,
    showScrim: true,
    role: 'dialog',
    ariaModal: true,
    restoreFocus: true,
  }
)

const emit = defineEmits<{
  'click:outside': [event: MouseEvent]
}>()

const model = defineModel<boolean>({ default: false })

const attrs = useAttrs()

const contentAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})

const contentClass = computed(() => attrs.class)

const overlayStyle = computed(() => {
  if (props.zIndex === undefined) return undefined
  const z = typeof props.zIndex === 'number' ? String(props.zIndex) : props.zIndex
  return { zIndex: z } as Record<string, string>
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
    if (e.key !== 'Escape') return
    if (props.persistent) return
    e.preventDefault()
    e.stopPropagation()
    close()
  }
  window.addEventListener('keydown', onKey, true)
  onCleanup(() => window.removeEventListener('keydown', onKey, true))
})

onUnmounted(() => {
  if (model.value && props.scrollLock) {
    document.body.style.overflow = previousBodyOverflow
  }
})
</script>

<template>
  <Teleport :to="to">
    <Transition name="gk-overlay">
      <div
        v-if="model"
        class="gk-overlay"
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
  max-width: min(100%, 32rem);
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
</style>
