<script setup lang="ts">
import { GkTabsWindowItem } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkTabsWindowItem v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkTabsWindowItem>
</template>
