<script setup lang="ts">
import GkDocsExample from '../../../GkDocsExample.vue'
import GkCardBasicExample from './samples/GkCardBasicExample.vue'
import basicSource from './samples/GkCardBasicExample.vue?raw'
import GkCardClickableExample from './samples/GkCardClickableExample.vue'
import clickableSource from './samples/GkCardClickableExample.vue?raw'
import GkCardConvenienceExample from './samples/GkCardConvenienceExample.vue'
import convenienceSource from './samples/GkCardConvenienceExample.vue?raw'
import GkCardLinkExample from './samples/GkCardLinkExample.vue'
import linkSource from './samples/GkCardLinkExample.vue?raw'
import GkCardMediaActionsExample from './samples/GkCardMediaActionsExample.vue'
import mediaActionsSource from './samples/GkCardMediaActionsExample.vue?raw'
import GkCardSlotsExample from './samples/GkCardSlotsExample.vue'
import slotsSource from './samples/GkCardSlotsExample.vue?raw'
import GkCardStatesExample from './samples/GkCardStatesExample.vue'
import statesSource from './samples/GkCardStatesExample.vue?raw'
</script>

<template>
  <div class="gk-doc-card-demo">
    <GkDocsExample
      title="Basic elevated card"
      description="Use the default slot for simple content."
      :source="basicSource"
      best-practice="Start with the default elevated variant for dashboard cards, then change variant only when the surface hierarchy requires it."
    >
      <GkCardBasicExample />
    </GkDocsExample>

    <GkDocsExample
      title="Convenience title, subtitle, and text"
      description="Use props for the common header/body layout."
      :source="convenienceSource"
      best-practice="Use title/subtitle/text props for simple cards; switch to slots when the header needs custom markup."
    >
      <GkCardConvenienceExample />
    </GkDocsExample>

    <GkDocsExample
      title="Media and actions"
      description="Add top media and a footer action row."
      :source="mediaActionsSource"
      best-practice="Wrap action buttons in GkCardActions so spacing and alignment stay consistent across cards."
    >
      <GkCardMediaActionsExample />
    </GkDocsExample>

    <GkDocsExample
      title="Header slots"
      description="Use slots for custom prepend, title, subtitle, and append regions."
      :source="slotsSource"
      best-practice="Use #prepend and #append for visual metadata such as icons, avatars, status dots, or lightweight badges."
    >
      <GkCardSlotsExample />
    </GkDocsExample>

    <GkDocsExample
      title="Link card"
      description="Use href for navigation so the root is a real anchor."
      :source="linkSource"
      best-practice="Do not place buttons or other nested interactive controls inside a linked card."
    >
      <GkCardLinkExample />
    </GkDocsExample>

    <GkDocsExample
      title="Clickable surface"
      description="Use clickable when the whole card is a single non-navigation action."
      :source="clickableSource"
      best-practice="Prefer href for navigation; use clickable for in-page actions and keep nested controls out of the card."
    >
      <GkCardClickableExample />
    </GkDocsExample>

    <GkDocsExample
      title="Loading, disabled, and variants"
      description="Combine state props with visual variants."
      :source="statesSource"
      best-practice="Keep loading toggles outside the card when the card itself is busy; disabled cards are not interactive."
    >
      <GkCardStatesExample />
    </GkDocsExample>
  </div>
</template>

<style scoped>
.gk-doc-card-demo {
  display: grid;
  gap: var(--gk-space-5);
}
</style>
