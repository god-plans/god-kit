<script setup lang="ts">
import { GkMenu } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkMenu v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkMenu>
</template>
