import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../test-utils/axe'
import GkContainer from './GkContainer.vue'

describe('GkContainer a11y', () => {
  it('has no axe violations', async () => {
    const w = mount(GkContainer, {
      slots: { default: 'Main' },
      attachTo: document.body,
    })
    try {
      await expectNoA11yViolations(w.element as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
