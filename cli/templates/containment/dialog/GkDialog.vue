<script setup lang="ts">
import { GkDialog } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkDialog v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkDialog>
</template>
