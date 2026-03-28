import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkNavigationDrawer from './GkNavigationDrawer.vue'

describe('GkNavigationDrawer a11y', () => {
  it('has no axe violations when temporary is open', async () => {
    const w = mount(GkNavigationDrawer, {
      props: {
        temporary: true,
        modelValue: true,
        disableResizeWatcher: true,
      },
      attachTo: document.body,
      slots: {
        default: () =>
          h('div', {}, [
            h('button', { type: 'button' }, 'First'),
            h('a', { href: '#' }, 'Link'),
          ]),
      },
    })
    try {
      const el = document.querySelector('.gk-navigation-drawer__surface')
      expect(el).toBeTruthy()
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
