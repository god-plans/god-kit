<script setup lang="ts">
import { GkBottomSheet } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkBottomSheet v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkBottomSheet>
</template>
