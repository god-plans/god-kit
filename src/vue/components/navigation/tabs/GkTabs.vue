<script setup lang="ts">
import {
  computed,
  nextTick,
  provide,
  ref,
  useAttrs,
  useId,
  useSlots,
  watch,
} from 'vue'
import type { Slots } from 'vue'
import { GK_TABS } from '../../../../injection'
import type { GkTabsContext } from '../../../../injection'
import GkTab from './GkTab.vue'
import GkTabsWindow from './GkTabsWindow.vue'
import GkTabsWindowItem from './GkTabsWindowItem.vue'
import { parseGkTabItems, type GkTabItemParsed } from './gk-tab-items'

defineOptions({ inheritAttrs: false })

function toCssUnit(v: number | string | undefined): string | undefined {
  if (v === undefined || v === '') return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const props = withDefaults(
  defineProps<{
    alignTabs?: 'start' | 'title' | 'center' | 'end'
    color?: string
    fixedTabs?: boolean
    items?: readonly (string | number | Record<string, unknown> & { text?: string; value: string | number; disabled?: boolean })[]
    stacked?: boolean
    bgColor?: string
    grow?: boolean
    height?: number | string
    hideSlider?: boolean
    inset?: boolean
    insetPadding?: number | string
    insetRadius?: number | string
    sliderColor?: string
    sliderTransition?: 'fade' | 'grow' | 'shift'
    direction?: 'horizontal' | 'vertical'
    showArrows?: boolean
    disabled?: boolean
    spaced?: boolean
  }>(),
  {
    alignTabs: 'start',
    fixedTabs: false,
    stacked: false,
    grow: false,
    hideSlider: false,
    inset: false,
    sliderTransition: 'shift',
    direction: 'horizontal',
    showArrows: false,
    disabled: false,
    spaced: false,
  }
)

const attrs = useAttrs()
const tabSlots = useSlots() as Slots
const groupId = useId()
const scrollRef = ref<HTMLElement | null>(null)
const slotOrder = ref<(string | number)[]>([])

const model = defineModel<string | number | undefined>({ default: undefined })

const parsedItems = computed((): GkTabItemParsed[] => parseGkTabItems(props.items))
const itemsMode = computed(() => parsedItems.value.length > 0)

const orderedValues = computed(() => {
  if (parsedItems.value.length) return parsedItems.value.map((p) => p.value)
  return slotOrder.value
})

function isValueDisabled(value: string | number) {
  if (!itemsMode.value) return false
  const item = parsedItems.value.find((p) => p.value === value)
  return Boolean(item?.disabled)
}

const isDisabled = computed(() => props.disabled)

function tabId(v: string | number) {
  return `${groupId}-tab-${String(v)}`
}

function panelId(v: string | number) {
  return `${groupId}-panel-${String(v)}`
}

function setValue(v: string | number) {
  if (props.disabled) return
  model.value = v
}

function registerValue(v: string | number) {
  if (slotOrder.value.includes(v)) return
  slotOrder.value = [...slotOrder.value, v]
}

function unregisterValue(v: string | number) {
  slotOrder.value = slotOrder.value.filter((x) => x !== v)
}

function focusNeighbor(value: string | number, delta: -1 | 1) {
  const vs = orderedValues.value
  const i = vs.indexOf(value)
  if (i < 0) return
  let ni = i + delta
  while (ni >= 0 && ni < vs.length && isValueDisabled(vs[ni])) {
    ni += delta
  }
  if (ni < 0 || ni >= vs.length) return
  const next = vs[ni]
  setValue(next)
  void nextTick(() => document.getElementById(tabId(next))?.focus())
}

function focusFirst() {
  const vs = orderedValues.value
  if (!vs.length) return
  const next = vs.find((value) => !isValueDisabled(value))
  if (next === undefined) return
  setValue(next)
  void nextTick(() => document.getElementById(tabId(next))?.focus())
}

function focusLast() {
  const vs = orderedValues.value
  if (!vs.length) return
  const next = [...vs].reverse().find((value) => !isValueDisabled(value))
  if (next === undefined) return
  setValue(next)
  void nextTick(() => document.getElementById(tabId(next))?.focus())
}

const direction = computed(() => props.direction)
const stacked = computed(() => props.stacked)
const fixedTabs = computed(() => props.fixedTabs)
const grow = computed(() => props.grow)
const hideSlider = computed(() => props.hideSlider)
const sliderColor = computed(() => props.sliderColor)
const sliderTransition = computed(() => props.sliderTransition)
const inset = computed(() => props.inset)
const alignTabs = computed(() => props.alignTabs)

const tabsContext: GkTabsContext = {
  modelValue: model,
  setValue,
  isDisabled,
  groupId,
  tabId,
  panelId,
  direction,
  stacked,
  fixedTabs,
  grow,
  hideSlider,
  sliderColor,
  sliderTransition,
  inset,
  alignTabs,
  orderedValues,
  isValueDisabled,
  registerValue,
  unregisterValue,
  focusNeighbor,
  focusFirst,
  focusLast,
  itemsMode,
}

provide(GK_TABS, tabsContext)

watch(
  orderedValues,
  (vs) => {
    if (vs.length === 0) return
    const m = model.value
    const firstEnabled = vs.find((value) => !isValueDisabled(value))
    if (firstEnabled === undefined) return
    if (m === undefined || m === null || !vs.includes(m) || isValueDisabled(m)) {
      model.value = firstEnabled
    }
  },
  { immediate: true }
)

const rootStyle = computed(() => {
  const h = toCssUnit(props.height)
  const pad = props.inset ? toCssUnit(props.insetPadding) : undefined
  const rad = props.inset ? toCssUnit(props.insetRadius) : undefined
  return {
    ...(h ? { '--gk-tabs-height': h } : {}),
    ...(pad ? { '--gk-tabs-inset-padding': pad } : {}),
    ...(rad ? { '--gk-tabs-inset-radius': rad } : {}),
    ...(props.sliderColor ? { '--gk-tabs-slider-color': props.sliderColor } : {}),
    ...(props.color ? { '--gk-tabs-color': props.color } : {}),
    ...(props.bgColor ? { '--gk-tabs-bg-color': props.bgColor } : {}),
  }
})

const showPanels = computed((): boolean => {
  return parsedItems.value.length > 0 || !!tabSlots.window
})

const showArrows = computed(() => props.showArrows && props.direction === 'horizontal')

function scrollPrev() {
  scrollRef.value?.scrollBy({ left: -160, behavior: 'smooth' })
}

function scrollNext() {
  scrollRef.value?.scrollBy({ left: 160, behavior: 'smooth' })
}
</script>

<template>
  <div
    class="gk-tabs"
    :class="[
      `gk-tabs--direction-${direction}`,
      `gk-tabs--align-${alignTabs}`,
      {
        'gk-tabs--stacked': stacked,
        'gk-tabs--grow': grow,
        'gk-tabs--fixed': fixedTabs,
        'gk-tabs--spaced': spaced,
      },
    ]"
    :style="rootStyle"
    v-bind="attrs"
  >
    <div
      class="gk-tabs__bar"
      :class="{ 'gk-tabs__bar--arrows': showArrows }"
    >
      <div v-if="showArrows" class="gk-tabs__arrow gk-tabs__arrow--prev">
        <slot name="prev">
          <button
            type="button"
            class="gk-tabs__arrow-btn"
            aria-label="Scroll tabs backward"
            @click="scrollPrev"
          >
            ‹
          </button>
        </slot>
      </div>
      <div
        ref="scrollRef"
        class="gk-tabs__scroll"
        :class="{ 'gk-tabs__scroll--inset': inset }"
        role="tablist"
        :aria-orientation="direction === 'vertical' ? 'vertical' : 'horizontal'"
      >
        <template v-if="itemsMode">
          <GkTab
            v-for="item in parsedItems"
            :key="item.value"
            :value="item.value"
            :disabled="item.disabled"
            :text="item.text"
          >
            <slot name="tab" :item="item">
              <slot :name="`tab.${item.value}`" :item="item">
                {{ item.text }}
              </slot>
            </slot>
          </GkTab>
        </template>
        <slot v-else />
      </div>
      <div v-if="showArrows" class="gk-tabs__arrow gk-tabs__arrow--next">
        <slot name="next">
          <button
            type="button"
            class="gk-tabs__arrow-btn"
            aria-label="Scroll tabs forward"
            @click="scrollNext"
          >
            ›
          </button>
        </slot>
      </div>
    </div>

    <GkTabsWindow v-if="showPanels" class="gk-tabs__window-wrap">
      <template v-if="itemsMode">
        <GkTabsWindowItem
          v-for="item in parsedItems"
          :key="`panel-${item.value}`"
          :value="item.value"
        >
          <slot name="item" :item="item">
            <slot :name="`item.${item.value}`" :item="item" />
          </slot>
        </GkTabsWindowItem>
      </template>
      <slot name="window" />
    </GkTabsWindow>
  </div>
</template>

<style scoped>
.gk-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  background: var(--gk-tabs-bg-color, transparent);
}

.gk-tabs--direction-vertical {
  flex-direction: row;
  align-items: stretch;
}

.gk-tabs__bar {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-width: 0;
  border-bottom: 1px solid var(--gk-color-border);
}

.gk-tabs--direction-vertical .gk-tabs__bar {
  flex-direction: column;
  border-bottom: none;
  border-inline-end: 1px solid var(--gk-color-border);
  min-height: 0;
}

.gk-tabs__bar--arrows .gk-tabs__scroll {
  flex: 1 1 auto;
}

.gk-tabs__scroll {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  gap: 0;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  background: var(--gk-tabs-bg-color, transparent);
}

.gk-tabs--direction-vertical .gk-tabs__scroll {
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}

.gk-tabs--align-start .gk-tabs__scroll {
  justify-content: flex-start;
}

.gk-tabs--align-title .gk-tabs__scroll,
.gk-tabs--align-center .gk-tabs__scroll {
  justify-content: center;
}

.gk-tabs--align-end .gk-tabs__scroll {
  justify-content: flex-end;
}

.gk-tabs--grow .gk-tabs__scroll {
  width: 100%;
}

.gk-tabs__scroll--inset {
  padding-inline: var(--gk-tabs-inset-padding);
  border-radius: var(--gk-tabs-inset-radius);
}

.gk-tabs--spaced .gk-tabs__scroll {
  gap: var(--gk-space-2);
}

.gk-tabs__arrow {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.gk-tabs__arrow-btn {
  margin: 0;
  padding: var(--gk-space-1) var(--gk-space-2);
  font: inherit;
  font-size: var(--gk-font-size-md);
  line-height: var(--gk-line-height-tight);
  color: var(--gk-color-on-surface-muted);
  background: var(--gk-color-surface);
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-sm);
  cursor: pointer;
}

.gk-tabs__arrow-btn:focus-visible {
  outline: var(--gk-focus-width) solid var(--gk-color-focus-ring);
  outline-offset: var(--gk-focus-offset);
}

.gk-tabs__window-wrap {
  flex: 1 1 auto;
  min-width: 0;
}
</style>
