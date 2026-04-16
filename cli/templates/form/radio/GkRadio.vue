<script setup lang="ts">
import { GkRadio } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkRadio v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkRadio>
</template>
