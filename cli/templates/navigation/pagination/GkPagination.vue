<script setup lang="ts">
import { GkPagination } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkPagination v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkPagination>
</template>
