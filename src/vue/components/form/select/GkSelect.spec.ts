import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkSelect from './GkSelect.vue'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]

describe('GkSelect', () => {
  it('renders selected option', () => {
    const w = mount(GkSelect, {
      props: { modelValue: 'b', options, ariaLabel: 'Choose' },
    })
    const el = w.find('select').element as HTMLSelectElement
    expect(el.value).toBe('b')
  })

  it('emits update:modelValue on change', async () => {
    const w = mount(GkSelect, {
      props: { modelValue: 'a', options, ariaLabel: 'Choose' },
    })
    await w.find('select').setValue('b')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual(['b'])
  })

  it('supports multiple selection', async () => {
    const w = mount(GkSelect, {
      props: {
        modelValue: [],
        options,
        multiple: true,
        ariaLabel: 'Multi',
      },
    })
    const el = w.find('select').element as HTMLSelectElement
    el.options[0].selected = true
    el.options[1].selected = true
    await w.find('select').trigger('change')
    expect(w.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['a', 'b'])
  })

  it('does not emit when readonly', async () => {
    const w = mount(GkSelect, {
      props: { modelValue: 'a', options, readonly: true, ariaLabel: 'x' },
    })
    await w.find('select').setValue('b')
    await flushPromises()
    expect(w.emitted('update:modelValue')).toBeUndefined()
    expect((w.find('select').element as HTMLSelectElement).value).toBe('a')
  })

  it('forwards data attr to select and class to wrapper', () => {
    const w = mount(GkSelect, {
      props: { modelValue: 'a', options, ariaLabel: 'x' },
      attrs: { class: 'my-wrap', 'data-testid': 'sel' },
    })
    expect(w.find('.gk-select__wrap').classes()).toContain('my-wrap')
    expect(w.find('select').attributes('data-testid')).toBe('sel')
  })

  it('emits update:focused on focus and blur', async () => {
    const w = mount(GkSelect, {
      props: { modelValue: 'a', options, ariaLabel: 'x' },
    })
    await w.find('select').trigger('focus')
    expect(w.emitted('update:focused')?.[0]).toEqual([true])
    await w.find('select').trigger('blur')
    expect(w.emitted('update:focused')?.[1]).toEqual([false])
  })
})
