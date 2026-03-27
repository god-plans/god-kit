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

  it('maps type error to danger when variant is default neutral', () => {
    const w = mount(GkAlert, { props: { type: 'error' }, slots: { default: 'e' } })
    expect(w.find('.gk-alert--danger').exists()).toBe(true)
  })

  it('prefers variant over type when variant is not neutral', () => {
    const w = mount(GkAlert, {
      props: { variant: 'warning', type: 'error' },
      slots: { default: 'x' },
    })
    expect(w.find('.gk-alert--warning').exists()).toBe(true)
    expect(w.find('.gk-alert--danger').exists()).toBe(false)
  })

  it('renders title and text props', () => {
    const w = mount(GkAlert, {
      props: { title: 'T', text: 'Body text' },
    })
    expect(w.text()).toContain('T')
    expect(w.text()).toContain('Body text')
  })

  it('renders nothing when modelValue is false', () => {
    const w = mount(GkAlert, {
      props: { modelValue: false },
      slots: { default: 'Hidden' },
    })
    expect(w.find('.gk-alert').exists()).toBe(false)
  })

  it('emits update:modelValue, close, and click:close when close is activated', async () => {
    const w = mount(GkAlert, {
      props: { closable: true },
      slots: { default: 'Msg' },
    })
    const btn = w.find('button[type="button"]')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('aria-label')).toBe('Dismiss')

    await btn.trigger('click')

    expect(w.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(w.emitted('close')?.[0]?.[0]).toBeInstanceOf(MouseEvent)
    expect(w.emitted('click:close')?.[0]?.[0]).toBeInstanceOf(MouseEvent)
  })

  it('uses closeLabel for aria-label', () => {
    const w = mount(GkAlert, {
      props: { closable: true, closeLabel: 'Close dialog' },
      slots: { default: 'x' },
    })
    expect(w.find('button').attributes('aria-label')).toBe('Close dialog')
  })
})
