import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../test-utils/axe'
import GkAlert from './GkAlert.vue'

describe('GkAlert a11y', () => {
  it('has no axe violations', async () => {
    const w = mount(GkAlert, {
      slots: { default: 'Saved.' },
      attachTo: document.body,
    })
    try {
      await expectNoA11yViolations(w.element as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
