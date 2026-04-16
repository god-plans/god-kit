<script setup lang="ts">
import { GkExpansionPanels } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkExpansionPanels v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkExpansionPanels>
</template>
