import Sortable from 'sortablejs'
import type { SortableEvent } from 'sortablejs'
import { onUnmounted, watch, type Ref } from 'vue'

/** Pure reorder for same-list drag; exported for unit tests. */
export function applyEndReorder<T>(items: readonly T[], oldIndex: number, newIndex: number): T[] {
  const next = [...items]
  const [moved] = next.splice(oldIndex, 1)
  next.splice(newIndex, 0, moved)
  return next
}

export type UseSortableListOptions<T> = Omit<
  Sortable.Options,
  'onEnd' | 'onAdd' | 'onChoose' | 'onUnchoose' | 'onStart' | 'onClone'
> & {
  /**
   * When set, same-container drag reorders this array (by index).
   * Omit for clone-only sources (e.g. palette) that have no backing list.
   */
  list?: Ref<T[]>
  /**
   * When `list` is set, reorder on same-list `onEnd` (default: true).
   * Set false if you only use cross-list / clone and handle everything in callbacks.
   */
  syncSameList?: boolean
  onEnd?: (evt: SortableEvent) => void
  onAdd?: (evt: SortableEvent) => void
  onChoose?: (evt: SortableEvent) => void
  onUnchoose?: (evt: SortableEvent) => void
  onStart?: (evt: SortableEvent) => void
  onClone?: (evt: SortableEvent) => void
}

/**
 * Binds [Sortable](https://github.com/SortableJS/Sortable) to a container ref.
 * Optionally keeps a Vue `ref` array in sync when reordering within the same list.
 * Use shared `group.name` between palette (pull: 'clone') and canvas (put: true) for builder UX.
 *
 * Call only on the client (e.g. inside `onMounted` or under `<ClientOnly>`) — Sortable touches the DOM.
 */
export function useSortableList<T>(containerRef: Ref<HTMLElement | null>, options: UseSortableListOptions<T>) {
  let sortable: Sortable | null = null

  const {
    list,
    syncSameList = true,
    onEnd: userOnEnd,
    onAdd: userOnAdd,
    onChoose,
    onUnchoose,
    onStart,
    onClone,
    ...rest
  } = options

  function destroy() {
    sortable?.destroy()
    sortable = null
  }

  function mount() {
    destroy()
    const el = containerRef.value
    if (!el) return

    sortable = Sortable.create(el, {
      ...rest,
      onChoose,
      onUnchoose,
      onStart,
      onClone,
      onEnd(evt: SortableEvent) {
        userOnEnd?.(evt)
        if (!list || syncSameList === false) return
        if (evt.from !== evt.to) return
        const { oldIndex, newIndex } = evt
        if (oldIndex === undefined || newIndex === undefined) return
        if (oldIndex === newIndex) return
        list.value = applyEndReorder(list.value, oldIndex, newIndex)
      },
      onAdd(evt: SortableEvent) {
        userOnAdd?.(evt)
      },
    })
  }

  watch(containerRef, mount, { flush: 'post' })

  onUnmounted(destroy)

  return {
    destroy,
    /** Recreate Sortable (e.g. after list length changes if needed) */
    refresh: mount,
  }
}
