<script setup lang="ts">
import { GkContainer } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkContainer v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkContainer>
</template>
