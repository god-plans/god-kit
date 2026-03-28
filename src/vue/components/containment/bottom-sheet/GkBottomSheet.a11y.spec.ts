import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkBottomSheet from './GkBottomSheet.vue'

describe('GkBottomSheet a11y', () => {
  it('has no axe violations when open with labelled dialog', async () => {
    const w = mount(GkBottomSheet, {
      props: { modelValue: true },
      attrs: { 'aria-labelledby': 'gk-bs-a11y-title' },
      slots: {
        default: () =>
          h('div', {}, [
            h('h2', { id: 'gk-bs-a11y-title' }, 'Sheet title'),
            h('p', {}, 'Body copy.'),
          ]),
      },
      attachTo: document.body,
    })
    try {
      const el = document.querySelector('.gk-overlay')
      expect(el).toBeTruthy()
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
