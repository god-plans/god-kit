import { mount } from '@vue/test-utils'
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
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })
})
