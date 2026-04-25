<script setup lang="ts">
import { GkButton, GkTooltip } from 'god-kit/vue'
</script>

<template>
  <GkTooltip
    text="Click toggles this tooltip."
    :open-on-hover="false"
    :open-on-focus="false"
    open-on-click
  >
    <template #activator="{ props }">
      <GkButton type="button" variant="secondary" v-bind="props">
        Click me
      </GkButton>
    </template>
  </GkTooltip>
</template>
