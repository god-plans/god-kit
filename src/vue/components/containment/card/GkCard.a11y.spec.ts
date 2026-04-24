import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkCard from './GkCard.vue'

describe('GkCard a11y', () => {
  it('static card has no serious axe violations (excluding color-contrast in jsdom)', async () => {
    const w = mount(GkCard, {
      props: { title: 'Title', text: 'Body copy for the card example.' },
      slots: { default: 'Extra' },
      attachTo: document.body,
    })
    const root = w.element
    if (!(root instanceof HTMLElement)) throw new Error('expected element')
    await expectNoA11yViolations(root)
    w.unmount()
  })
})
