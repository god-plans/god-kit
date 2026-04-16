<script setup lang="ts">
import { GkDataTableVirtual } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkDataTableVirtual v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkDataTableVirtual>
</template>
