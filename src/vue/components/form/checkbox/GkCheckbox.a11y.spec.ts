import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkCheckbox from './GkCheckbox.vue'

describe('GkCheckbox a11y', () => {
  it('has no axe violations', async () => {
    const w = mount(GkCheckbox, {
      props: { modelValue: false, ariaLabel: 'Accept terms' },
      attachTo: document.body,
    })
    try {
      await expectNoA11yViolations(w.element as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
