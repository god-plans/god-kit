import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../test-utils/axe'
import GkSelect from './GkSelect.vue'

describe('GkSelect a11y', () => {
  it('has no axe violations', async () => {
    const w = mount(GkSelect, {
      props: {
        modelValue: 'a',
        options: [
          { value: 'a', label: 'One' },
          { value: 'b', label: 'Two' },
        ],
        ariaLabel: 'Pick',
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
