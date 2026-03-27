import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import GkInput from '../input/GkInput.vue'
import GkField from './GkField.vue'

describe('GkField + GkInput', () => {
  it('associates label with input id', () => {
    const w = mount(GkField, {
      props: { label: 'Email' },
      slots: {
        default: () =>
          h(GkInput, {
            modelValue: '',
            'onUpdate:modelValue': () => {},
          }),
      },
    })
    const label = w.find('label')
    const input = w.find('input')
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })

  it('sets aria-invalid and error region when error present', () => {
    const Root = defineComponent({
      components: { GkField, GkInput },
      data: () => ({ v: '', err: 'Required' }),
      template: `
        <GkField label="Email" :error="err">
          <GkInput v-model="v" />
        </GkField>
      `,
    })
    const w = mount(Root)
    const input = w.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    const errId = input.attributes('aria-describedby')
    expect(errId).toBeTruthy()
    const alert = w.find(`[id="${errId}"]`)
    expect(alert.attributes('role')).toBe('alert')
    expect(alert.text()).toContain('Required')
  })

  it('associates label with input id when mounted in RTL', () => {
    const Root = defineComponent({
      components: { GkField, GkInput },
      data: () => ({ v: '' }),
      template: `
        <div dir="rtl" lang="fa">
          <GkField label="ایمیل">
            <GkInput v-model="v" />
          </GkField>
        </div>
      `,
    })
    const w = mount(Root)
    const label = w.find('label')
    const input = w.find('input')
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })
})
