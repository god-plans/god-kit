<script setup lang="ts">
import { GkField } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkField v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkField>
</template>
