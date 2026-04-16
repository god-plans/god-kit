<script setup lang="ts">
import { GkAlert } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkAlert v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkAlert>
</template>
