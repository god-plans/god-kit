import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkMenu from './GkMenu.vue'

describe('GkMenu a11y', () => {
  it('has no axe violations when open', async () => {
    const w = mount(GkMenu, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', props, 'Actions'),
        default: () =>
          h('div', {}, [
            h('button', { type: 'button', role: 'menuitem' }, 'One'),
            h('button', { type: 'button', role: 'menuitem' }, 'Two'),
          ]),
      },
    })
    try {
      const el = document.querySelector('.gk-menu__layer')
      expect(el).toBeTruthy()
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
