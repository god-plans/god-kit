<script setup lang="ts">
import { GkCheckbox } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkCheckbox v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkCheckbox>
</template>
