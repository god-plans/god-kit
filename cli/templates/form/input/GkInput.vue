<script setup lang="ts">
import { GkInput } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkInput v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkInput>
</template>
