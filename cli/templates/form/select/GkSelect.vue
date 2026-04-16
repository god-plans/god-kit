<script setup lang="ts">
import { GkSelect } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkSelect v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkSelect>
</template>
