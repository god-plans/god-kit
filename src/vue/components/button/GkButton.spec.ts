import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkButton from './GkButton.vue'

describe('GkButton', () => {
  it('renders slot', () => {
    const w = mount(GkButton, { slots: { default: 'Save' } })
    expect(w.text()).toContain('Save')
  })

  it('emits click when not disabled', async () => {
    const w = mount(GkButton, { slots: { default: 'Go' } })
    await w.trigger('click')
    expect(w.emitted('click')).toBeTruthy()
  })

  it('does not emit when disabled', async () => {
    const w = mount(GkButton, { props: { disabled: true }, slots: { default: 'Go' } })
    await w.trigger('click')
    expect(w.emitted('click')).toBeFalsy()
  })
})
