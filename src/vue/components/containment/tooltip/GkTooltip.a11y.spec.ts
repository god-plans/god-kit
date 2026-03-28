import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkTooltip from './GkTooltip.vue'

describe('GkTooltip a11y', () => {
  it('has no axe violations when open', async () => {
    const w = mount(GkTooltip, {
      props: {
        modelValue: true,
        openOnHover: false,
        openOnFocus: false,
      },
      attachTo: document.body,
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', { ...props, type: 'button' }, 'Label'),
        default: () => 'Tooltip text',
      },
    })
    try {
      const el = document.querySelector('.gk-tooltip__layer')
      expect(el).toBeTruthy()
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
