<script setup lang="ts">
import { GkSnackbar } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkSnackbar v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkSnackbar>
</template>
