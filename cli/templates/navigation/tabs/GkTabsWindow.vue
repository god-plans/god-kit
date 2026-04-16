<script setup lang="ts">
import { GkTabsWindow } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkTabsWindow v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkTabsWindow>
</template>
