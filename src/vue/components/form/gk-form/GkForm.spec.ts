import { mount, flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import GkForm from './GkForm.vue'

describe('GkForm', () => {
  it('exposes slot props from createForm', () => {
    const Child = defineComponent({
      setup(_, { slots }) {
        return () => slots.default?.()
      },
    })
    const w = mount(GkForm, {
      slots: {
        default: (props: Record<string, unknown>) =>
          h(Child, () => [
            h('span', { class: 'has-validate' }, typeof props.validate === 'function' ? 'ok' : ''),
          ]),
      },
    })
    expect(w.find('.has-validate').text()).toBe('ok')
  })

  it('passes unwrapped boolean isValidating to the slot (not a ref object)', () => {
    const w = mount(GkForm, {
      slots: {
        default: (props: { isValidating: unknown }) =>
          h('span', { class: 'is-validating-flag' }, String(props.isValidating === false)),
      },
    })
    expect(w.find('.is-validating-flag').text()).toBe('true')
  })

  it('calls custom validate prop on submit', async () => {
    const validate = vi.fn(async () => ({ valid: true, errors: [] }))
    const onSubmit = vi.fn()
    const w = mount({
      components: { GkForm },
      setup() {
        return { validate, onSubmit }
      },
      template: `
        <GkForm :validate="validate" @submit="onSubmit">
          <template #default>
            <button type="submit">Send</button>
          </template>
        </GkForm>
      `,
    })
    await w.find('form').trigger('submit')
    await flushPromises()
    expect(validate).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('emits submit with a thenable event and completes validation', async () => {
    const onSubmit = vi.fn()
    const w = mount({
      components: { GkForm },
      setup() {
        return { onSubmit }
      },
      template: `
        <GkForm @submit="onSubmit">
          <template #default>
            <button type="submit">Send</button>
          </template>
        </GkForm>
      `,
    })
    await w.find('form').trigger('submit')
    expect(onSubmit).toHaveBeenCalledTimes(1)
    const evt = onSubmit.mock.calls[0][0] as { then: typeof Promise.prototype.then }
    expect(typeof evt.then).toBe('function')
    await flushPromises()
    await expect(evt.then((r: { valid: boolean }) => r.valid)).resolves.toBe(true)
  })

  it('handles reset button without error', async () => {
    const w = mount(GkForm, {
      slots: {
        default: () => h('button', { type: 'reset' }, 'Reset'),
      },
    })
    await w.find('button').trigger('click')
    await flushPromises()
    expect(w.find('form').exists()).toBe(true)
  })
})
