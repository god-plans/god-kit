import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkTextarea from './GkTextarea.vue'

describe('GkTextarea', () => {
  it('renders value', () => {
    const w = mount(GkTextarea, { props: { modelValue: 'hello' } })
    expect((w.find('textarea').element as HTMLTextAreaElement).value).toBe('hello')
  })

  it('emits update:modelValue on input', async () => {
    const w = mount(GkTextarea, { props: { modelValue: '' } })
    await w.find('textarea').setValue('x')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['x'])
  })

  it('puts class on wrapper and forwards data attr to textarea', () => {
    const w = mount(GkTextarea, {
      props: { modelValue: '' },
      attrs: { class: 'wrap', 'data-testid': 'ta' },
    })
    expect(w.find('.gk-textarea__wrap').classes()).toContain('wrap')
    expect(w.find('textarea').attributes('data-testid')).toBe('ta')
  })

  it('emits update:focused on focus and blur', async () => {
    const w = mount(GkTextarea, { props: { modelValue: '' } })
    await w.find('textarea').trigger('focus')
    expect(w.emitted('update:focused')?.[0]).toEqual([true])
    await w.find('textarea').trigger('blur')
    expect(w.emitted('update:focused')?.[1]).toEqual([false])
  })
})
