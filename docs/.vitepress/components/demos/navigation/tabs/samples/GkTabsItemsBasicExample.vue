<script setup lang="ts">
import { GkTabs } from 'god-kit/vue'
import { ref } from 'vue'

const tab = ref('one')
</script>

<template>
  <GkTabs v-model="tab" :items="['one', 'two']" grow>
    <template #item="{ item }">
      Content for {{ item.text }}
    </template>
  </GkTabs>
</template>
