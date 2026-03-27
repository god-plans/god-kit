import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../test-utils/axe'
import GkRadio from './GkRadio.vue'
import GkRadioGroup from './GkRadioGroup.vue'

describe('GkRadioGroup a11y', () => {
  it('has no axe violations', async () => {
    const w = mount(GkRadioGroup, {
      props: { modelValue: 'a', ariaLabel: 'Theme' },
      slots: {
        default: () => [
          h(GkRadio, { value: 'a' }, { default: () => 'Light' }),
          h(GkRadio, { value: 'b' }, { default: () => 'Dark' }),
        ],
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
