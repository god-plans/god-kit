<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted } from 'vue'
import { GK_TABS } from '../../../../injection'
import type { GkTabsContext } from '../../../../injection'

const props = withDefaults(
  defineProps<{
    value: string | number
    disabled?: boolean
    /** Label when default slot is empty */
    text?: string
  }>(),
  {
    disabled: false,
  }
)

const tabs = inject(GK_TABS, null) as GkTabsContext | null

const isSelected = computed(() => tabs?.modelValue.value === props.value)

const tabId = computed(() => (tabs ? tabs.tabId(props.value) : ''))
const panelId = computed(() => (tabs ? tabs.panelId(props.value) : ''))

const direction = computed(() => tabs?.direction.value ?? 'horizontal')

const sliderTransitionName = computed(() => tabs?.sliderTransition.value ?? 'shift')

onMounted(() => {
  if (tabs && !tabs.itemsMode.value) {
    tabs.registerValue(props.value)
  }
})

onUnmounted(() => {
  if (tabs && !tabs.itemsMode.value) {
    tabs.unregisterValue(props.value)
  }
})

function select() {
  if (props.disabled || !tabs || tabs.isDisabled.value) return
  tabs.setValue(props.value)
}

function onKeydown(e: KeyboardEvent) {
  if (props.disabled || !tabs) return
  const h = direction.value === 'horizontal'
  if (h) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      tabs.focusNeighbor(props.value, 1)
      return
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      tabs.focusNeighbor(props.value, -1)
      return
    }
  } else {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      tabs.focusNeighbor(props.value, 1)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      tabs.focusNeighbor(props.value, -1)
      return
    }
  }
  if (e.key === 'Home') {
    e.preventDefault()
    tabs.focusFirst()
    return
  }
  if (e.key === 'End') {
    e.preventDefault()
    tabs.focusLast()
    return
  }
}
</script>

<template>
  <button
    v-if="tabs"
    type="button"
    class="gk-tab"
    :class="[
      `gk-tab--transition-${sliderTransitionName}`,
      {
        'gk-tab--selected': isSelected,
        'gk-tab--stacked': tabs.stacked.value,
        'gk-tab--fixed': tabs.fixedTabs.value,
        'gk-tab--grow': tabs.grow.value,
        'gk-tab--inset': tabs.inset.value,
      },
    ]"
    role="tab"
    :id="tabId"
    :aria-selected="isSelected ? 'true' : 'false'"
    :aria-controls="panelId"
    :tabindex="isSelected ? 0 : -1"
    :disabled="disabled || tabs.isDisabled.value"
    @click="select"
    @keydown="onKeydown"
  >
    <span class="gk-tab__inner">
      <span class="gk-tab__content">
        <slot>{{ text }}</slot>
      </span>
      <span
        v-if="!tabs.hideSlider.value"
        class="gk-tab__slider"
        aria-hidden="true"
      />
    </span>
  </button>
</template>

<style scoped>
.gk-tab {
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: var(--gk-space-2) var(--gk-space-3);
  min-height: var(--gk-tabs-height);
  font: inherit;
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
  background: transparent;
  border: none;
  border-radius: var(--gk-radius-sm);
  cursor: pointer;
  flex: 0 0 auto;
  min-width: 0;
}

.gk-tab--grow {
  flex: 1 1 0;
}

.gk-tab--fixed {
  max-width: var(--gk-tabs-fixed-max-width);
}

.gk-tab:hover:not(:disabled) {
  color: var(--gk-color-on-surface);
  background: var(--gk-color-bg);
}

.gk-tab:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-tab:disabled {
  opacity: var(--gk-opacity-disabled);
  cursor: not-allowed;
}

.gk-tab--selected {
  color: var(--gk-tabs-color, var(--gk-color-primary));
  font-weight: 600;
}

.gk-tab__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gk-space-1);
  width: 100%;
  min-height: 100%;
}

.gk-tab--stacked .gk-tab__inner {
  flex-direction: column;
}

.gk-tab__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gk-space-1);
}

.gk-tab__slider {
  display: block;
  align-self: stretch;
  height: var(--gk-tabs-slider-size);
  margin-top: auto;
  border-radius: var(--gk-tabs-slider-radius);
  background: var(--gk-tabs-slider-color);
  transform-origin: center bottom;
  transition:
    opacity var(--gk-duration-fast) var(--gk-easing-standard),
    transform var(--gk-duration-fast) var(--gk-easing-standard);
}

.gk-tab--transition-fade .gk-tab__slider {
  opacity: 0;
}

.gk-tab--transition-fade.gk-tab--selected .gk-tab__slider {
  opacity: 1;
}

.gk-tab--transition-grow .gk-tab__slider {
  transform: scaleX(0);
}

.gk-tab--transition-grow.gk-tab--selected .gk-tab__slider {
  transform: scaleX(1);
}

.gk-tab--transition-shift .gk-tab__slider {
  transform: scaleX(var(--gk-tabs-shift-scale));
  opacity: var(--gk-tabs-shift-opacity);
}

.gk-tab--transition-shift.gk-tab--selected .gk-tab__slider {
  transform: scaleX(1);
  opacity: 1;
}

.gk-tab--inset.gk-tab--selected {
  background: var(--gk-tabs-inset-selected-bg);
}

.gk-tab--inset {
  border-radius: var(--gk-tabs-inset-radius);
  padding-inline: var(--gk-tabs-inset-padding);
}
</style>
