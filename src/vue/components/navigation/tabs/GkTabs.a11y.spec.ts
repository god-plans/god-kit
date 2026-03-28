import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkTabs from './GkTabs.vue'

describe('GkTabs a11y', () => {
  it('has no axe violations with items', async () => {
    const w = mount(GkTabs, {
      props: {
        modelValue: 'a',
        items: ['a', 'b'],
      },
      attachTo: document.body,
    })
    try {
      const el = w.find('.gk-tabs').element
      expect(el).toBeTruthy()
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })

  it('has no axe violations with window panels', async () => {
    const w = mount(GkTabs, {
      props: {
        modelValue: 1,
        items: [1, 2],
      },
      attachTo: document.body,
      slots: {
        item: ({ item }: { item: { value: number; text: string } }) =>
          h('p', {}, `Content ${item.value}`),
      },
    })
    try {
      const el = w.find('.gk-tabs').element
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
