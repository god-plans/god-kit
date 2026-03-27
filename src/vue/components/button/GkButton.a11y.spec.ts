import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../test-utils/axe'
import GkButton from './GkButton.vue'

describe('GkButton a11y', () => {
  it('has no axe violations', async () => {
    const w = mount(GkButton, {
      slots: { default: 'OK' },
      attachTo: document.body,
    })
    try {
      await expectNoA11yViolations(w.element as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
