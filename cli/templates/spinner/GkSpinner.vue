<script setup lang="ts">
import { GkSpinner } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkSpinner v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkSpinner>
</template>
