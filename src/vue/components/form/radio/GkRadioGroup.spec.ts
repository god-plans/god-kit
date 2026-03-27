import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkRadio from './GkRadio.vue'
import GkRadioGroup from './GkRadioGroup.vue'

describe('GkRadioGroup', () => {
  it('updates model when a radio is selected', async () => {
    const w = mount(GkRadioGroup, {
      props: { modelValue: 'a', ariaLabel: 'Pick one' },
      slots: {
        default: () => [
          h(GkRadio, { value: 'a' }, { default: () => 'A' }),
          h(GkRadio, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    const inputs = w.findAll('input[type="radio"]')
    expect(inputs).toHaveLength(2)
    await inputs[1]!.trigger('change')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })
})
