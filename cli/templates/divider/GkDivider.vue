<script setup lang="ts">
import { GkDivider } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkDivider v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkDivider>
</template>
