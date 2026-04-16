<script setup lang="ts">
import { GkExpansionPanelTitle } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkExpansionPanelTitle v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkExpansionPanelTitle>
</template>
