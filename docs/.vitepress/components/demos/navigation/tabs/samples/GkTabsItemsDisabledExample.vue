<script setup lang="ts">
import { GkTabs } from 'god-kit/vue'
import { ref } from 'vue'

const tab = ref('summary')
</script>

<template>
  <GkTabs
    v-model="tab"
    :items="[
      { text: 'Summary', value: 'summary' },
      { text: 'Billing', value: 'billing', disabled: true },
      { text: 'Security', value: 'security' },
    ]"
  >
    <template #item="{ item }">
      Panel: {{ item.text }}
    </template>
  </GkTabs>
</template>
