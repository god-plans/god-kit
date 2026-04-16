<script setup lang="ts">
import { GkTab } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkTab v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkTab>
</template>
