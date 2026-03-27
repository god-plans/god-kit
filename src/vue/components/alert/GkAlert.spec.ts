import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkAlert from './GkAlert.vue'

describe('GkAlert', () => {
  it('renders slot', () => {
    const w = mount(GkAlert, { slots: { default: 'Hello' } })
    expect(w.text()).toContain('Hello')
  })

  it('applies variant class', () => {
    const w = mount(GkAlert, { props: { variant: 'danger' }, slots: { default: 'x' } })
    expect(w.find('.gk-alert--danger').exists()).toBe(true)
  })
})
