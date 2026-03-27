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
})
