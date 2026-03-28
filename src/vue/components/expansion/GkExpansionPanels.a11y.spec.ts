import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../test-utils/axe'
import GkExpansionPanel from './GkExpansionPanel.vue'
import GkExpansionPanels from './GkExpansionPanels.vue'
import GkExpansionPanelText from './GkExpansionPanelText.vue'
import GkExpansionPanelTitle from './GkExpansionPanelTitle.vue'

describe('GkExpansionPanels a11y', () => {
  it('has no axe violations with one panel open', async () => {
    const w = mount(GkExpansionPanels, {
      props: { modelValue: ['a'] },
      global: {
        components: {
          GkExpansionPanel,
          GkExpansionPanelTitle,
          GkExpansionPanelText,
        },
      },
      slots: {
        default: () =>
          h(
            GkExpansionPanel,
            { value: 'a' },
            () => [
              h(GkExpansionPanelTitle, () => 'Section'),
              h(GkExpansionPanelText, () => 'Body content for the panel.'),
            ]
          ),
      },
      attachTo: document.body,
    })
    try {
      await expectNoA11yViolations(w.element as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
