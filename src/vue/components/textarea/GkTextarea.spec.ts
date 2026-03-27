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
})
