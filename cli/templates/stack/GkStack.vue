<script setup lang="ts">
import { GkStack } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkStack v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkStack>
</template>
