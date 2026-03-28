<script setup lang="ts">
import { computed, provide } from 'vue'
import { GK_EXPANSION_PANELS } from '../../../injection'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** When `true`, more than one panel may be open */
    multiple?: boolean
    /** Disables toggling for all panels (unless a panel sets its own `disabled`) */
    disabled?: boolean
  }>(),
  {
    multiple: false,
    disabled: false,
  }
)

const model = defineModel<(string | number)[]>({ default: () => [] })

const isDisabled = computed(() => props.disabled)

function isExpanded(value: string | number) {
  return model.value.includes(value)
}

function toggle(value: string | number) {
  if (isDisabled.value) return
  if (props.multiple) {
    const next = [...model.value]
    const i = next.indexOf(value)
    if (i >= 0) next.splice(i, 1)
    else next.push(value)
    model.value = next
  } else {
    model.value = model.value.includes(value) ? [] : [value]
  }
}

provide(GK_EXPANSION_PANELS, {
  multiple: computed(() => props.multiple),
  isExpanded,
  toggle,
  isDisabled,
})
</script>

<template>
  <div class="gk-expansion-panels" role="presentation">
    <slot />
  </div>
</template>

<style scoped>
.gk-expansion-panels {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--gk-color-border);
  border-radius: var(--gk-radius-md);
  overflow: hidden;
  background: var(--gk-color-surface);
  color: var(--gk-color-on-surface);
}
</style>
