<script setup lang="ts">
import { GkOverlay } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkOverlay v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkOverlay>
</template>
