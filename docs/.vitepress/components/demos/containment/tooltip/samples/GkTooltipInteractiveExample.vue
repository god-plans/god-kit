<script setup lang="ts">
import { GkButton, GkTooltip } from 'god-kit/vue'
</script>

<template>
  <GkTooltip interactive placement="top">
    <template #activator="{ props }">
      <GkButton type="button" variant="secondary" v-bind="props">
        Interactive
      </GkButton>
    </template>

    <span>
      Interactive mode lets the pointer move into the tooltip panel.
    </span>
  </GkTooltip>
</template>
