<script setup lang="ts">
import { GkButton, GkTooltip } from 'god-kit/vue'
</script>

<template>
  <GkTooltip placement="end" text="Placed on the end side">
    <template #activator="{ props }">
      <GkButton type="button" variant="secondary" v-bind="props">
        End tooltip
      </GkButton>
    </template>
  </GkTooltip>
</template>
