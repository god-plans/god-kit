<script setup lang="ts">
import { GkSkeletonLoader } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkSkeletonLoader v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkSkeletonLoader>
</template>
