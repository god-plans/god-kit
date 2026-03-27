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

  it('does not emit when loading', async () => {
    const w = mount(GkButton, { props: { loading: true }, slots: { default: 'Go' } })
    await w.trigger('click')
    expect(w.emitted('click')).toBeFalsy()
  })

  it('does not emit when readonly', async () => {
    const w = mount(GkButton, { props: { readonly: true }, slots: { default: 'Go' } })
    await w.trigger('click')
    expect(w.emitted('click')).toBeFalsy()
  })

  it('renders anchor when href is set', () => {
    const w = mount(GkButton, {
      props: { href: 'https://example.com', variant: 'ghost' },
      slots: { default: 'Link' },
    })
    expect(w.find('a').attributes('href')).toBe('https://example.com')
    expect(w.text()).toContain('Link')
  })
})
