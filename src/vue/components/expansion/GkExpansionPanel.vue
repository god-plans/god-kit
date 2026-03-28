<script setup lang="ts">
import { computed, inject, provide, ref, useAttrs, useId } from 'vue'
import { GK_EXPANSION_PANEL, GK_EXPANSION_PANELS } from '../../../injection'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Stable key for accordion state (required when used inside **GkExpansionPanels**) */
    value?: string | number
    /** Disables this panel’s toggle */
    disabled?: boolean
  }>(),
  {
    disabled: false,
  }
)

const attrs = useAttrs()
const uid = useId()
const panelValue = computed(() => props.value ?? uid)

const groups = inject(GK_EXPANSION_PANELS, null)
const localOpen = ref(false)

const isExpanded = computed(() => {
  if (groups) return groups.isExpanded(panelValue.value)
  return localOpen.value
})

const panelDisabled = computed(() => {
  if (groups?.isDisabled?.value) return true
  return props.disabled
})

function toggle() {
  if (panelDisabled.value) return
  if (groups) {
    groups.toggle(panelValue.value)
  } else {
    localOpen.value = !localOpen.value
  }
}

const titleId = `${uid}-title`
const contentId = `${uid}-content`

provide(GK_EXPANSION_PANEL, {
  panelValue,
  isExpanded,
  toggle,
  disabled: panelDisabled,
  titleId,
  contentId,
})

const rootClass = computed(() => attrs.class)
const passthroughAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <div
    class="gk-expansion-panel"
    :class="[
      rootClass,
      { 'gk-expansion-panel--expanded': isExpanded, 'gk-expansion-panel--disabled': panelDisabled },
    ]"
    v-bind="passthroughAttrs"
  >
    <slot />
  </div>
</template>

<style scoped>
.gk-expansion-panel {
  border-bottom: 1px solid var(--gk-color-border);
}

.gk-expansion-panel:last-child {
  border-bottom: none;
}

.gk-expansion-panel--expanded :deep(.gk-expansion-panel-title__icon) {
  transform: rotate(180deg);
}
</style>
