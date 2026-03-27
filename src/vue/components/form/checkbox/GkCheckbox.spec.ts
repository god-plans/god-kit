import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkCheckbox from './GkCheckbox.vue'

describe('GkCheckbox', () => {
  it('reflects checked state', () => {
    const w = mount(GkCheckbox, { props: { modelValue: true } })
    expect((w.find('input').element as HTMLInputElement).checked).toBe(true)
  })

  it('emits update:modelValue on change', async () => {
    const w = mount(GkCheckbox, { props: { modelValue: false } })
    await w.find('input').setValue(true)
    expect(w.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('applies root class to wrapper and forwards data attr to input', () => {
    const w = mount(GkCheckbox, {
      props: { modelValue: false },
      attrs: { class: 'my-wrap', 'data-testid': 'cb' },
    })
    expect(w.find('.gk-checkbox__wrap').classes()).toContain('my-wrap')
    expect(w.find('input').attributes('data-testid')).toBe('cb')
  })

  it('sets native indeterminate from prop', async () => {
    const w = mount(GkCheckbox, {
      props: { modelValue: false, indeterminate: true },
    })
    await w.vm.$nextTick()
    expect((w.find('input').element as HTMLInputElement).indeterminate).toBe(true)
  })

  it('does not emit when readonly', async () => {
    const w = mount(GkCheckbox, {
      props: { modelValue: false, readonly: true },
    })
    await w.find('input').setValue(true)
    expect(w.emitted('update:modelValue')).toBeUndefined()
    expect((w.find('input').element as HTMLInputElement).checked).toBe(false)
  })

  it('emits update:focused on focus and blur', async () => {
    const w = mount(GkCheckbox, { props: { modelValue: false, ariaLabel: 'x' } })
    await w.find('input').trigger('focus')
    expect(w.emitted('update:focused')?.[0]).toEqual([true])
    await w.find('input').trigger('blur')
    expect(w.emitted('update:focused')?.[1]).toEqual([false])
  })

  it('passes value attribute when set', () => {
    const w = mount(GkCheckbox, {
      props: { modelValue: true, value: 'agree' },
    })
    expect(w.find('input').attributes('value')).toBe('agree')
  })
})
