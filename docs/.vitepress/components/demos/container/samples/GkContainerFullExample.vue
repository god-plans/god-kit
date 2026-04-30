<script setup lang="ts">
import { GkContainer, GkStack } from 'god-kit/vue'
</script>

<template>
  <GkContainer max-width="full" :padded="false">
    <GkStack direction="row" :gap="4">
      <span>Edge to edge</span>
      <span>with stack</span>
    </GkStack>
  </GkContainer>
</template>
