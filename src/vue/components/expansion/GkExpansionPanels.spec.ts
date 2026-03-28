import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import GkExpansionPanel from './GkExpansionPanel.vue'
import GkExpansionPanels from './GkExpansionPanels.vue'
import GkExpansionPanelText from './GkExpansionPanelText.vue'
import GkExpansionPanelTitle from './GkExpansionPanelTitle.vue'

function mountAccordion(multiple = false) {
  return mount(GkExpansionPanels, {
    props: { modelValue: [], multiple },
    global: {
      components: {
        GkExpansionPanel,
        GkExpansionPanelTitle,
        GkExpansionPanelText,
      },
    },
    slots: {
      default: () => [
        h(
          GkExpansionPanel,
          { value: 'a' },
          () => [
            h(GkExpansionPanelTitle, () => 'A'),
            h(GkExpansionPanelText, () => 'ta'),
          ]
        ),
        h(
          GkExpansionPanel,
          { value: 'b' },
          () => [
            h(GkExpansionPanelTitle, () => 'B'),
            h(GkExpansionPanelText, () => 'tb'),
          ]
        ),
      ],
    },
  })
}

describe('GkExpansionPanels', () => {
  it('accordion: only one panel open', async () => {
    const w = mountAccordion(false)
    const buttons = w.findAll('button.gk-expansion-panel-title')
    expect(buttons).toHaveLength(2)
    await buttons[0].trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([['a']])
    await w.setProps({ modelValue: ['a'] })
    await buttons[1].trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([['b']])
    w.unmount()
  })

  it('multiple: can open more than one', async () => {
    const w = mount(GkExpansionPanels, {
      props: { modelValue: [], multiple: true },
      global: {
        components: {
          GkExpansionPanel,
          GkExpansionPanelTitle,
          GkExpansionPanelText,
        },
      },
      slots: {
        default: () => [
          h(
            GkExpansionPanel,
            { value: 'x' },
            () => [
              h(GkExpansionPanelTitle, () => 'X'),
              h(GkExpansionPanelText, () => 'cx'),
            ]
          ),
          h(
            GkExpansionPanel,
            { value: 'y' },
            () => [
              h(GkExpansionPanelTitle, () => 'Y'),
              h(GkExpansionPanelText, () => 'cy'),
            ]
          ),
        ],
      },
    })
    const buttons = w.findAll('button.gk-expansion-panel-title')
    await buttons[0].trigger('click')
    await w.setProps({ modelValue: ['x'] })
    await buttons[1].trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([['x', 'y']])
    w.unmount()
  })
})
