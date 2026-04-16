<script setup lang="ts">
import { GkTableScroll } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkTableScroll v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkTableScroll>
</template>
