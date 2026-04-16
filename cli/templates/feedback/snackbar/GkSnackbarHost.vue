<script setup lang="ts">
import { GkSnackbarHost } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkSnackbarHost v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkSnackbarHost>
</template>
