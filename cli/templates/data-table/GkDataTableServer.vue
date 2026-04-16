<script setup lang="ts">
import { GkDataTableServer } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkDataTableServer v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkDataTableServer>
</template>
