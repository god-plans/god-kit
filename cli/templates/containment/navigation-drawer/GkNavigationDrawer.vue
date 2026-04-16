<script setup lang="ts">
import { GkNavigationDrawer } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkNavigationDrawer v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkNavigationDrawer>
</template>
