<script setup lang="ts">
import { GkTable } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkTable v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkTable>
</template>
