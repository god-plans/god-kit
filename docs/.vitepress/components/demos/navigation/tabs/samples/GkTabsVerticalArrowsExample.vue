<script setup lang="ts">
import { GkTabs } from 'god-kit/vue'
import { ref } from 'vue'

const tab = ref('a')

const items = [
  { text: 'Alpha', value: 'a' },
  { text: 'Beta', value: 'b' },
  { text: 'Gamma', value: 'c' },
  { text: 'Delta', value: 'd' },
  { text: 'Epsilon', value: 'e' },
]
</script>

<template>
  <GkTabs
    v-model="tab"
    :items="items"
    direction="vertical"
    show-arrows
    inset
    spaced
  >
    <template #item="{ item }">
      Details for {{ item.text }}
    </template>
  </GkTabs>
</template>
