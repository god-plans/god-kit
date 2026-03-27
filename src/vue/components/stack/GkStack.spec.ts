import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkStack from './GkStack.vue'

describe('GkStack', () => {
  it('renders slot', () => {
    const w = mount(GkStack, { slots: { default: 'Hi' } })
    expect(w.text()).toContain('Hi')
  })

  it('sets direction class', () => {
    const w = mount(GkStack, { props: { direction: 'row' } })
    expect(w.find('.gk-stack--dir-row').exists()).toBe(true)
  })
})
