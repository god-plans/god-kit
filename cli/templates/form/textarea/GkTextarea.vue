<script setup lang="ts">
import { GkTextarea } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkTextarea v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkTextarea>
</template>
