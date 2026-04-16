<script setup lang="ts">
import { GkTabs } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkTabs v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkTabs>
</template>
