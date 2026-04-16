<script setup lang="ts">
import { GkExpansionPanel } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkExpansionPanel v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkExpansionPanel>
</template>
