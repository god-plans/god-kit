<script setup lang="ts">
import { GkRadioGroup } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkRadioGroup v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkRadioGroup>
</template>
