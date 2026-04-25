<script setup lang="ts">
import { GkButton, GkCard, GkCardActions, GkCardText } from 'god-kit/vue'
</script>

<template>
  <GkCard
    :max-width="400"
    image="https://picsum.photos/seed/gkkit-card/800/400"
    title="Landscape"
    subtitle="Picsum sample media"
  >
    <GkCardText>
      Top media uses object-fit: cover and a token min-height.
    </GkCardText>

    <template #actions>
      <GkCardActions>
        <GkButton type="button" variant="secondary" size="sm" slim>
          Later
        </GkButton>
        <GkButton type="button" size="sm" slim>
          Open
        </GkButton>
      </GkCardActions>
    </template>
  </GkCard>
</template>
