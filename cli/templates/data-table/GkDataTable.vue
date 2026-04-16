<script setup lang="ts">
import { GkDataTable } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkDataTable v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkDataTable>
</template>
