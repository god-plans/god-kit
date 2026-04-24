<script setup lang="ts">
import { GkCard } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkCard v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkCard>
</template>
