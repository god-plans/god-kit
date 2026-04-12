<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  watch,
} from 'vue'
import GkButton from '../../button/GkButton.vue'
import {
  buildPaginationRange,
  getMax,
  type PaginationRangeItem,
} from './pagination-range'

defineOptions({ inheritAttrs: false })

export type GkPaginationItemSlotProps = {
  isActive: boolean
  key: string | number
  page: string
  props: Record<string, unknown>
}

export type GkPaginationControlSlotProps = {
  icon: string
  onClick: (e: Event) => void
  disabled: boolean
  'aria-label': string
  'aria-disabled': boolean
}

const props = withDefaults(
  defineProps<{
    start?: number | string
    /** Total number of pages */
    length?: number | string
    disabled?: boolean
    /** Max page number buttons; when omitted, uses ResizeObserver / window width */
    totalVisible?: number | string
    showFirstLastPage?: boolean
    ellipsis?: string
    dir?: 'ltr' | 'rtl'
    activeColor?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md'
    ariaLabel?: string
    pageAriaLabel?: string
    currentPageAriaLabel?: string
    firstAriaLabel?: string
    previousAriaLabel?: string
    nextAriaLabel?: string
    lastAriaLabel?: string
    firstIcon?: string
    prevIcon?: string
    nextIcon?: string
    lastIcon?: string
  }>(),
  {
    start: 1,
    length: 1,
    disabled: false,
    ellipsis: '...',
    dir: 'ltr',
    variant: 'ghost',
    size: 'sm',
    ariaLabel: 'Pagination',
    pageAriaLabel: 'Page',
    currentPageAriaLabel: 'Current page',
    firstAriaLabel: 'First page',
    previousAriaLabel: 'Previous page',
    nextAriaLabel: 'Next page',
    lastAriaLabel: 'Last page',
    firstIcon: '«',
    prevIcon: '‹',
    nextIcon: '›',
    lastIcon: '»',
  }
)

const attrs = useAttrs()

const model = defineModel<number>({ default: () => 1 })

const emit = defineEmits<{
  first: [value: number]
  prev: [value: number]
  next: [value: number]
  last: [value: number]
}>()

const rootEl = ref<HTMLElement | null>(null)
const maxButtons = ref(-1)

const startNum = computed(() => {
  const n = parseInt(String(props.start), 10)
  return Number.isFinite(n) ? n : 1
})

const lengthNum = computed(() => {
  const n = parseInt(String(props.length), 10)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 1
})

const lastPage = computed(() => startNum.value + lengthNum.value - 1)

watch(
  [startNum, lengthNum],
  () => {
    if (model.value < startNum.value) model.value = startNum.value
    if (model.value > lastPage.value) model.value = lastPage.value
  },
  { immediate: true }
)

const effectiveTotalVisible = computed(() => {
  if (props.totalVisible != null && props.totalVisible !== '') {
    const n = parseInt(String(props.totalVisible), 10)
    return Number.isFinite(n) ? n : 7
  }
  if (maxButtons.value >= 0) return maxButtons.value
  if (typeof window !== 'undefined') {
    return getMax(window.innerWidth, 58, props.showFirstLastPage ?? false)
  }
  return 7
})

const range = computed((): PaginationRangeItem[] =>
  buildPaginationRange({
    page: model.value,
    pageCount: lengthNum.value,
    start: startNum.value,
    totalVisible: effectiveTotalVisible.value,
    ellipsis: props.ellipsis,
  })
)

const rtl = computed(() => props.dir === 'rtl')

const firstIconDisp = computed(() =>
  rtl.value ? props.lastIcon : props.firstIcon
)
const lastIconDisp = computed(() =>
  rtl.value ? props.firstIcon : props.lastIcon
)
const prevIconDisp = computed(() =>
  rtl.value ? props.nextIcon : props.prevIcon
)
const nextIconDisp = computed(() =>
  rtl.value ? props.prevIcon : props.nextIcon
)

const prevDisabled = computed(
  () => !!props.disabled || model.value <= startNum.value
)
const nextDisabled = computed(
  () => !!props.disabled || model.value >= lastPage.value
)

function setPage(e: Event, value: number, ev?: 'first' | 'prev' | 'next' | 'last') {
  e.preventDefault()
  if (props.disabled) return
  const v = Math.min(Math.max(value, startNum.value), lastPage.value)
  model.value = v
  if (ev === 'first') emit('first', v)
  else if (ev === 'prev') emit('prev', v)
  else if (ev === 'next') emit('next', v)
  else if (ev === 'last') emit('last', v)
}

const pageItems = computed(() =>
  range.value.map((item, index) => {
    if (typeof item === 'string') {
      return {
        type: 'ellipsis' as const,
        key: `ellipsis-${index}`,
        page: item,
        isActive: false,
        props: {} as Record<string, unknown>,
      }
    }
    const isActive = item === model.value
    return {
      type: 'page' as const,
      key: item,
      page: String(item),
      isActive,
      props: {
        type: 'button' as const,
        disabled: !!props.disabled || lengthNum.value < 2,
        variant: (isActive ? 'primary' : props.variant) as
          | 'primary'
          | 'secondary'
          | 'ghost'
          | 'danger',
        size: props.size,
        slim: true,
        'aria-label': isActive
          ? `${props.currentPageAriaLabel}, ${props.pageAriaLabel} ${item}`
          : `${props.pageAriaLabel} ${item}`,
        'aria-current': isActive ? ('page' as const) : undefined,
        onClick: (e: Event) => setPage(e, item),
      },
    }
  })
)

function itemSlotProps(
  row: (typeof pageItems.value)[number]
): GkPaginationItemSlotProps {
  return {
    isActive: row.isActive,
    key: row.key,
    page: row.page,
    props: row.props,
  }
}

const controls = computed(() => ({
  first: props.showFirstLastPage
    ? {
        icon: firstIconDisp.value,
        onClick: (e: Event) => setPage(e, startNum.value, 'first'),
        disabled: prevDisabled.value,
        'aria-label': props.firstAriaLabel,
        'aria-disabled': prevDisabled.value,
      }
    : undefined,
  prev: {
    icon: prevIconDisp.value,
    onClick: (e: Event) => setPage(e, model.value - 1, 'prev'),
    disabled: prevDisabled.value,
    'aria-label': props.previousAriaLabel,
    'aria-disabled': prevDisabled.value,
  },
  next: {
    icon: nextIconDisp.value,
    onClick: (e: Event) => setPage(e, model.value + 1, 'next'),
    disabled: nextDisabled.value,
    'aria-label': props.nextAriaLabel,
    'aria-disabled': nextDisabled.value,
  },
  last: props.showFirstLastPage
    ? {
        icon: lastIconDisp.value,
        onClick: (e: Event) => setPage(e, lastPage.value, 'last'),
        disabled: nextDisabled.value,
        'aria-label': props.lastAriaLabel,
        'aria-disabled': nextDisabled.value,
      }
    : undefined,
}))

const rootStyle = computed(() =>
  props.activeColor
    ? ({ '--gk-pagination-active-color': props.activeColor } as Record<string, string>)
    : {}
)

function focusCurrentPage() {
  const root = rootEl.value
  if (!root) return
  const el = root.querySelector<HTMLElement>('[aria-current="page"]')
  el?.focus()
}

function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  const dec = rtl.value ? 'ArrowRight' : 'ArrowLeft'
  const inc = rtl.value ? 'ArrowLeft' : 'ArrowRight'
  if (e.key === 'Home') {
    if (model.value === startNum.value) return
    e.preventDefault()
    model.value = startNum.value
    void nextTick(() => focusCurrentPage())
  } else if (e.key === 'End') {
    if (model.value === lastPage.value) return
    e.preventDefault()
    model.value = lastPage.value
    void nextTick(() => focusCurrentPage())
  } else if (e.key === dec && model.value > startNum.value) {
    e.preventDefault()
    model.value -= 1
    void nextTick(() => focusCurrentPage())
  } else if (e.key === inc && model.value < lastPage.value) {
    e.preventDefault()
    model.value += 1
    void nextTick(() => focusCurrentPage())
  }
}

function measureMaxButtons() {
  const root = rootEl.value
  if (!root) return
  const list = root.querySelector('.gk-pagination__list')
  const firstLi = list?.querySelector('li') as HTMLElement | undefined
  if (!firstLi) return
  const totalWidth = root.getBoundingClientRect().width
  const cs = getComputedStyle(firstLi)
  const mr = parseFloat(cs.marginLeft) + parseFloat(cs.marginRight)
  const itemWidth = firstLi.offsetWidth + mr
  maxButtons.value = getMax(totalWidth, itemWidth, props.showFirstLastPage ?? false)
}

let ro: ResizeObserver | null = null

onMounted(() => {
  measureMaxButtons()
  if (typeof ResizeObserver === 'undefined' || !rootEl.value) return
  ro = new ResizeObserver(() => measureMaxButtons())
  ro.observe(rootEl.value)
})

onBeforeUnmount(() => {
  ro?.disconnect()
  ro = null
})

watch([range, () => props.showFirstLastPage], () => void nextTick(() => measureMaxButtons()))
</script>

<template>
  <nav
    ref="rootEl"
    class="gk-pagination"
    role="navigation"
    :aria-label="ariaLabel"
    :dir="dir"
    :style="rootStyle"
    data-test="gk-pagination-root"
    v-bind="attrs"
    @keydown="onKeydown"
  >
    <ul class="gk-pagination__list">
      <li
        v-if="showFirstLastPage && controls.first"
        class="gk-pagination__first"
        data-test="gk-pagination-first"
      >
        <slot name="first" v-bind="controls.first">
          <GkButton
            type="button"
            variant="ghost"
            :size="size"
            slim
            :disabled="controls.first.disabled"
            :aria-label="controls.first['aria-label']"
            :aria-disabled="controls.first['aria-disabled'] ? 'true' : undefined"
            @click="controls.first.onClick"
          >
            {{ controls.first.icon }}
          </GkButton>
        </slot>
      </li>

      <li class="gk-pagination__prev" data-test="gk-pagination-prev">
        <slot name="prev" v-bind="controls.prev">
          <GkButton
            type="button"
            variant="ghost"
            :size="size"
            slim
            :disabled="controls.prev.disabled"
            :aria-label="controls.prev['aria-label']"
            :aria-disabled="controls.prev['aria-disabled'] ? 'true' : undefined"
            @click="controls.prev.onClick"
          >
            {{ controls.prev.icon }}
          </GkButton>
        </slot>
      </li>

      <li
        v-for="row in pageItems"
        :key="row.key"
        class="gk-pagination__item"
        :class="{ 'gk-pagination__item--is-active': row.type === 'page' && row.isActive }"
        data-test="gk-pagination-item"
      >
        <template v-if="row.type === 'ellipsis'">
          <span class="gk-pagination__ellipsis" aria-hidden="true">{{ row.page }}</span>
        </template>
        <template v-else>
          <slot name="item" v-bind="itemSlotProps(row)">
            <GkButton v-bind="row.props">
              {{ row.page }}
            </GkButton>
          </slot>
        </template>
      </li>

      <li class="gk-pagination__next" data-test="gk-pagination-next">
        <slot name="next" v-bind="controls.next">
          <GkButton
            type="button"
            variant="ghost"
            :size="size"
            slim
            :disabled="controls.next.disabled"
            :aria-label="controls.next['aria-label']"
            :aria-disabled="controls.next['aria-disabled'] ? 'true' : undefined"
            @click="controls.next.onClick"
          >
            {{ controls.next.icon }}
          </GkButton>
        </slot>
      </li>

      <li
        v-if="showFirstLastPage && controls.last"
        class="gk-pagination__last"
        data-test="gk-pagination-last"
      >
        <slot name="last" v-bind="controls.last">
          <GkButton
            type="button"
            variant="ghost"
            :size="size"
            slim
            :disabled="controls.last.disabled"
            :aria-label="controls.last['aria-label']"
            :aria-disabled="controls.last['aria-disabled'] ? 'true' : undefined"
            @click="controls.last.onClick"
          >
            {{ controls.last.icon }}
          </GkButton>
        </slot>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.gk-pagination {
  width: 100%;
  box-sizing: border-box;
}

.gk-pagination__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gk-pagination-gap, var(--gk-space-2));
  margin: 0;
  padding: 0;
  list-style: none;
}

.gk-pagination__item {
  display: flex;
  align-items: center;
}

.gk-pagination__ellipsis {
  display: inline-flex;
  min-width: 2.5rem;
  justify-content: center;
  padding: var(--gk-space-1) var(--gk-space-2);
  font-size: var(--gk-font-size-sm);
  color: var(--gk-color-on-surface-muted);
  user-select: none;
}

/* Filled primary chip: keep readable ink (token defaults to --gk-color-text-on-primary; override via activeColor / --gk-pagination-active-color) */
.gk-pagination__item--is-active :deep(.gk-btn--primary) {
  color: var(--gk-pagination-active-color, var(--gk-color-text-on-primary));
}
</style>
