<script setup lang="ts">
import { GkForm } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <GkForm v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </GkForm>
</template>
