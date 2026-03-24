<script setup lang="ts">
import { GkField, GkInput } from '@god-plan/god-kit/vue'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <div class="gk-doc-demo">
    <GkField label="Example">
      <GkInput v-model="value" placeholder="Type here" />
    </GkField>
  </div>
</template>
