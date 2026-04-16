<script setup lang="ts">
import { GkTooltip } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkTooltip v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkTooltip>
</template>
