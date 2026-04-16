<script setup lang="ts">
import { GkExpansionPanelText } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkExpansionPanelText v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkExpansionPanelText>
</template>
