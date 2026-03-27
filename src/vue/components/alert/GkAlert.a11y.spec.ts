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

  it('has no axe violations when closable', async () => {
    const w = mount(GkAlert, {
      props: { closable: true, title: 'Note' },
      slots: { default: 'Details.' },
      attachTo: document.body,
    })
    try {
      await expectNoA11yViolations(w.element as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
