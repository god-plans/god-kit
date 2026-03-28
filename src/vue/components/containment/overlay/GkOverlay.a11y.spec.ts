import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkOverlay from './GkOverlay.vue'

describe('GkOverlay a11y', () => {
  it('has no axe violations when open with labelled dialog', async () => {
    const w = mount(GkOverlay, {
      props: { modelValue: true },
      attrs: { 'aria-labelledby': 'gk-overlay-a11y-title' },
      slots: {
        default: () =>
          h('div', {}, [
            h('h2', { id: 'gk-overlay-a11y-title' }, 'Dialog title'),
            h('p', {}, 'Body copy for the overlay.'),
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
