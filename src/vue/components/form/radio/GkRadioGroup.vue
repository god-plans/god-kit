<script setup lang="ts">
import { computed, provide, useAttrs, useId } from 'vue'
import { GK_RADIO_GROUP } from '../../../../injection'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    name?: string
    /** Accessible name for the group (recommended when there is no visible group label) */
    ariaLabel?: string
    /** Disables all radios unless a radio sets its own `disabled` */
    disabled?: boolean
    /** Prevents changing the selection (focus still allowed) */
    readonly?: boolean
  }>(),
  {
    disabled: false,
    readonly: false,
  }
)

const model = defineModel<string | number | undefined>()

const attrs = useAttrs()
const uid = useId()
const resolvedName = computed(() => props.name ?? `gk-radio-${uid}`)

const rootClass = computed(() => attrs.class)
const passthroughAttrs = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>
  return rest
})

const isDisabled = computed(() => props.disabled)
const isReadonly = computed(() => props.readonly)

function setValue(v: string | number) {
  model.value = v
}

provide(GK_RADIO_GROUP, {
  name: resolvedName,
  modelValue: model,
  setValue,
  isDisabled,
  isReadonly,
})
</script>

<template>
  <div
    class="gk-radio-group"
    role="radiogroup"
    :aria-label="ariaLabel"
    :aria-readonly="readonly ? true : undefined"
    :class="rootClass"
    v-bind="passthroughAttrs"
  >
    <slot />
  </div>
</template>

<style scoped>
.gk-radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--gk-space-2);
  align-items: flex-start;
  width: 100%;
}
</style>
