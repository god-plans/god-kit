import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkSnackbar from './GkSnackbar.vue'

describe('GkSnackbar a11y', () => {
  it('has no axe violations when open', async () => {
    const w = mount(GkSnackbar, {
      props: { modelValue: true, title: 'Note', text: 'Details' },
      attachTo: document.body,
    })
    try {
      const el = document.querySelector('.gk-snackbar')
      expect(el).toBeTruthy()
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
