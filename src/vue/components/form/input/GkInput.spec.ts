import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkInput from './GkInput.vue'

describe('GkInput', () => {
  it('emits update:modelValue on input', async () => {
    const w = mount(GkInput, { props: { modelValue: '' } })
    await w.find('input').setValue('hi')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual(['hi'])
  })

  it('renders prefix and suffix', () => {
    const w = mount(GkInput, {
      props: { modelValue: '', prefix: '$', suffix: 'USD' },
    })
    expect(w.text()).toContain('$')
    expect(w.text()).toContain('USD')
  })

  it('shows counter when focused if not persistent', async () => {
    const w = mount(GkInput, {
      props: { modelValue: 'abc', counter: true },
    })
    expect(w.find('.gk-input__counter').exists()).toBe(false)
    await w.find('input').trigger('focus')
    expect(w.find('.gk-input__counter').exists()).toBe(true)
    expect(w.find('.gk-input__counter').text()).toContain('3')
  })

  it('shows counter always when persistentCounter', () => {
    const w = mount(GkInput, {
      props: { modelValue: 'x', counter: 10, persistentCounter: true },
    })
    expect(w.find('.gk-input__counter').exists()).toBe(true)
    expect(w.find('.gk-input__counter').text()).toMatch(/1\s*\/\s*10/)
  })

  it('emits update:focused on focus and blur', async () => {
    const w = mount(GkInput, { props: { modelValue: '' } })
    await w.find('input').trigger('focus')
    expect(w.emitted('update:focused')?.[0]).toEqual([true])
    await w.find('input').trigger('blur')
    expect(w.emitted('update:focused')?.[1]).toEqual([false])
  })
})
