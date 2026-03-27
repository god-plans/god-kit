import { computed, type Ref } from 'vue'

/**
 * Shared state for action controls that block clicks when disabled, readonly, or loading.
 * Use in buttons, icon buttons, or link-styled controls.
 */
export function useButtonInteractionState(
  disabled: Ref<boolean>,
  readonly: Ref<boolean>,
  loading: Ref<boolean>
) {
  const blocksAction = computed(() => disabled.value || readonly.value || loading.value)

  return { blocksAction }
}
