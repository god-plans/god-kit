import { onMounted, readonly, ref } from 'vue'
import type { Readonly, Ref } from 'vue'

/**
 * `false` during SSR and during hydration, `true` after the component mounts.
 *
 * Its main use is guarding `<Teleport>`. A teleport that is active while the
 * server renders moves its content to another part of the document, but the
 * client hydrates the component where it sits in the tree — Vue then reports a
 * hydration node mismatch and re-creates the subtree. Binding
 * `:disabled="!isMounted"` keeps server and first client render identical, then
 * teleports once mounting is done.
 */
export function useIsMounted(): Readonly<Ref<boolean>> {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  return readonly(isMounted)
}
