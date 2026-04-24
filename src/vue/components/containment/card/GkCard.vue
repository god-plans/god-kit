<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

// attrs minus class/style (merged on root)
function passthroughAttrs(attrs: object) {
  const { class: _c, style: _s, ...rest } = attrs as {
    class?: unknown
    style?: unknown
    [k: string]: unknown
  }
  return rest
}
import GkCardItem from './GkCardItem.vue'
import GkCardText from './GkCardText.vue'
import GkSpinner from '../../spinner/GkSpinner.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Visual treatment */
    variant?: 'elevated' | 'outlined' | 'tonal' | 'plain'
    /** Removes elevation shadow (still respects **variant** border) */
    flat?: boolean
    /** Stronger shadow on hover (not applied when **disabled** or **flat**) */
    hover?: boolean
    disabled?: boolean
    /** Shows a loading overlay; sets **`aria-busy`** */
    loading?: boolean
    /** Top media URL; use **`#image`** for custom content */
    image?: string
    /** Renders a header line when set (overridden by **`#title`**) */
    title?: string | number
    subtitle?: string | number
    text?: string | number
    /** When set, the root is an `<a>` (unless **disabled**) */
    href?: string
    rel?: string
    target?: '_blank' | '_self' | '_parent' | '_top' | string
    download?: boolean | string
    /** Decorative avatars in the header row */
    prependAvatar?: string
    appendAvatar?: string
    /** Renders a focusable, keyboard-activable surface when there is no **href** */
    clickable?: boolean
    width?: string | number
    maxWidth?: string | number
    height?: string | number
    maxHeight?: string | number
    /** Root element when the card is not a link */
    as?: 'div' | 'article' | 'section'
    density?: 'comfortable' | 'compact'
    /** Apply design-token radius; when `false`, radius is 0 */
    rounded?: boolean
  }>(),
  {
    variant: 'elevated',
    flat: false,
    hover: false,
    disabled: false,
    loading: false,
    as: 'div',
    density: 'comfortable',
    clickable: false,
    rounded: true,
  }
)

const emit = defineEmits<{
  click: [e: MouseEvent | KeyboardEvent]
}>()

const slots = useSlots()
const attrs = useAttrs()

const rootPassthrough = computed(() => passthroughAttrs(attrs as object))

function toCssSize(v: string | number | undefined): string | undefined {
  if (v === undefined) return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const isLink = computed(
  () => !props.disabled && typeof props.href === 'string' && props.href.length > 0
)

const rootTag = computed(() => (isLink.value ? 'a' : props.as))

const linkRel = computed(() => {
  if (props.rel) return props.rel
  if (props.target === '_blank') return 'noopener noreferrer'
  return undefined
})

const showAsButton = computed(
  () => !!props.clickable && !isLink.value && !props.disabled
)

const rootClass = computed(() => [
  'gk-card',
  `gk-card--${props.variant}`,
  {
    'gk-card--flat': props.flat,
    'gk-card--hover': props.hover && !props.disabled && !props.flat,
    'gk-card--disabled': props.disabled,
    'gk-card--loading': props.loading,
    'gk-card--link': isLink.value || showAsButton.value,
    'gk-card--clickable-surface': showAsButton.value,
    'gk-card--compact': props.density === 'compact',
    'gk-card--no-rounded': !props.rounded,
  },
  attrs.class,
])

const rootStyle = computed(() => {
  const a = attrs.style
  const box: Record<string, string> = {}
  const w = toCssSize(props.width)
  const mw = toCssSize(props.maxWidth)
  const h = toCssSize(props.height)
  const mh = toCssSize(props.maxHeight)
  if (w) box.width = w
  if (mw) box.maxWidth = mw
  if (h) box.height = h
  if (mh) box.maxHeight = mh
  if (!a) return { ...box, display: 'block' }
  if (Array.isArray(a)) return [...a, { ...box, display: 'block' }]
  if (typeof a === 'string') return [a, { ...box, display: 'block' }]
  return { ...(a as object), ...box, display: 'block' }
})

const hasImage = computed(() => !!props.image || !!slots.image)

const hasHeader = computed(
  () =>
    props.title != null ||
    props.subtitle != null ||
    props.prependAvatar != null ||
    props.appendAvatar != null ||
    !!slots.title ||
    !!slots.subtitle ||
    !!slots.prepend ||
    !!slots.append ||
    !!slots.item
)

const hasText = computed(
  () => props.text != null || !!slots.text
)

function onClick(e: MouseEvent) {
  if (props.disabled || props.loading) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  emit('click', e)
}

function onKeydown(e: KeyboardEvent) {
  if (!showAsButton.value) return
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (props.disabled || props.loading) return
    emit('click', e)
  }
}
</script>

<template>
  <component
    :is="rootTag"
    v-bind="rootPassthrough"
    :href="isLink ? href : undefined"
    :rel="isLink ? linkRel : undefined"
    :target="isLink ? target : undefined"
    :download="isLink ? download : undefined"
    :class="rootClass"
    :style="rootStyle"
    :tabindex="showAsButton && !isLink ? 0 : undefined"
    :role="showAsButton && !isLink ? 'button' : undefined"
    :aria-busy="loading || undefined"
    :aria-disabled="disabled || (loading && !isLink) || undefined"
    @click="onClick"
    @keydown="onKeydown"
  >
    <div v-if="hasImage" class="gk-card__media">
      <slot name="image">
        <img
          v-if="image"
          :src="image"
          alt=""
          class="gk-card__media-img"
        />
      </slot>
    </div>

    <div
      v-if="loading"
      class="gk-card__loader"
      aria-hidden="true"
    >
      <span class="gk-card__loader-inner">
        <slot name="loader">
          <GkSpinner size="md" label="Loading" />
        </slot>
      </span>
    </div>

    <div class="gk-card__inner" :class="{ 'gk-card__inner--compact': density === 'compact' }">
      <GkCardItem
        v-if="hasHeader"
        :title="title"
        :subtitle="subtitle"
        :prepend-avatar="prependAvatar"
        :append-avatar="appendAvatar"
        :density="density"
      >
        <template
          v-if="slots.prepend"
          #prepend
        >
          <slot name="prepend" />
        </template>
        <template
          v-if="slots.append"
          #append
        >
          <slot name="append" />
        </template>
        <template
          v-if="slots.title"
          #title
        >
          <slot name="title" />
        </template>
        <template
          v-if="slots.subtitle"
          #subtitle
        >
          <slot name="subtitle" />
        </template>
        <template v-if="slots.item" #default>
          <slot name="item" />
        </template>
      </GkCardItem>

      <GkCardText v-if="hasText">
        <template v-if="slots.text">
          <slot name="text" />
        </template>
        <template v-else>
          {{ text != null ? String(text) : '' }}
        </template>
      </GkCardText>

      <slot />

      <slot name="actions" />
    </div>
  </component>
</template>

<style scoped>
.gk-card {
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  overflow: hidden;
  text-decoration: none;
  color: var(--gk-color-on-surface);
  background: var(--gk-color-surface-elevated);
  border: var(--gk-card-border-width) solid var(--gk-color-border);
  box-shadow: var(--gk-card-shadow);
  border-radius: var(--gk-card-radius);
  transition:
    box-shadow var(--gk-duration-fast) var(--gk-easing-standard),
    background-color var(--gk-duration-fast) var(--gk-easing-standard),
    border-color var(--gk-duration-fast) var(--gk-easing-standard);
}

.gk-card--no-rounded {
  border-radius: 0;
}

.gk-card--elevated {
  background: var(--gk-color-surface-elevated);
}

.gk-card--outlined {
  box-shadow: none;
  background: var(--gk-color-surface-elevated);
}

.gk-card--tonal {
  background: color-mix(
    in srgb,
    var(--gk-color-primary) 9%,
    var(--gk-color-surface-elevated)
  );
  border-color: color-mix(
    in srgb,
    var(--gk-color-primary) 22%,
    var(--gk-color-border)
  );
  box-shadow: none;
}

.gk-card--plain {
  background: transparent;
  border: none;
  box-shadow: none;
}

.gk-card--flat {
  box-shadow: none;
}

.gk-card--hover {
  transition:
    box-shadow var(--gk-duration-normal) var(--gk-easing-standard),
    background-color var(--gk-duration-normal) var(--gk-easing-standard);
}

.gk-card--hover:hover:not(.gk-card--disabled) {
  box-shadow: var(--gk-card-shadow-hover);
}

.gk-card--tonal.gk-card--hover:hover:not(.gk-card--disabled) {
  background: color-mix(
    in srgb,
    var(--gk-color-primary) 14%,
    var(--gk-color-surface-elevated)
  );
}

.gk-card--link.gk-card--clickable-surface {
  cursor: pointer;
  width: 100%;
}

a.gk-card--link {
  cursor: pointer;
  width: 100%;
}

.gk-card--link:focus-visible {
  outline: var(--gk-focus-ring-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-card--disabled {
  pointer-events: none;
  user-select: none;
  opacity: 0.6;
}

.gk-card--loading {
  pointer-events: none;
}

.gk-card__inner {
  padding: var(--gk-card-padding);
  position: relative;
}

.gk-card__inner--compact {
  padding: var(--gk-card-padding-compact);
}

.gk-card :deep(.gk-card__actions) {
  margin-top: var(--gk-space-3);
}

.gk-card__inner--compact :deep(.gk-card__actions) {
  margin-top: var(--gk-space-2);
}

.gk-card__media {
  display: block;
  position: relative;
  overflow: hidden;
  min-height: var(--gk-card-media-min-height);
  border-radius: 0;
}

.gk-card__media-img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: var(--gk-card-media-min-height);
  object-fit: cover;
}

.gk-card__loader {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gk-card-loader-overlay);
  pointer-events: none;
}

.gk-card__loader-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
