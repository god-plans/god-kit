import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkPagination from './GkPagination.vue'

describe('GkPagination a11y', () => {
  it('has no axe violations', async () => {
    const w = mount(GkPagination, {
      props: {
        modelValue: 1,
        length: 5,
        totalVisible: 10,
      },
      attachTo: document.body,
    })
    try {
      const el = w.find('.gk-pagination').element
      expect(el).toBeTruthy()
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
