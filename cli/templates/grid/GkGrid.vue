<script setup lang="ts">
import { GkGrid } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkGrid v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkGrid>
</template>
