<script setup lang="ts">
import {
  GkExpansionPanel,
  GkExpansionPanels,
  GkExpansionPanelText,
  GkExpansionPanelTitle,
} from 'god-kit/vue'
</script>

<template>
  <div class="gk-doc-expansion-sample">
    <GkExpansionPanels :model-value="['advanced']" disabled>
      <GkExpansionPanel value="advanced">
        <GkExpansionPanelTitle>Review</GkExpansionPanelTitle>
        <GkExpansionPanelText>
          Read-only review state — toggling is disabled on the group.
        </GkExpansionPanelText>
      </GkExpansionPanel>
    </GkExpansionPanels>
  </div>
</template>

<style scoped>
.gk-doc-expansion-sample {
  max-width: 32rem;
}
</style>
