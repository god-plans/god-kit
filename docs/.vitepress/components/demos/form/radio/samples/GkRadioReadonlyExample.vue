<script setup lang="ts">
import { GkRadio, GkRadioGroup } from 'god-kit/vue'
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')
</script>

<template>
  <GkRadioGroup
    v-model="theme"
    readonly
    aria-label="Theme readonly review"
  >
    <GkRadio value="light">
      Light
    </GkRadio>
    <GkRadio value="dark">
      Dark
    </GkRadio>
  </GkRadioGroup>
</template>
