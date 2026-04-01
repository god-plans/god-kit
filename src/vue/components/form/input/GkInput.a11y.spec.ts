import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkInput from './GkInput.vue'

describe('GkInput a11y', () => {
  it('has no axe violations in standalone usage', async () => {
    const w = mount(GkInput, {
      props: {
        modelValue: '',
        ariaLabel: 'Email',
        type: 'email',
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
