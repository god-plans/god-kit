import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import GkTooltip from './GkTooltip.vue'

describe('GkTooltip', () => {
  it('opens on hover when openOnHover is true', async () => {
    const w = mount(GkTooltip, {
      props: {
        modelValue: false,
        openOnHover: true,
        openOnFocus: false,
      },
      attachTo: document.body,
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', { ...props, type: 'button', class: 'gk-test-tip-act' }, 'Tip'),
        default: () => h('span', { class: 'gk-test-tip-body' }, 'Help'),
      },
    })
    expect(document.body.querySelector('.gk-tooltip__panel')).toBeNull()
    await w.find('.gk-test-tip-act').trigger('mouseenter')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([true])
    await w.setProps({ modelValue: true })
    await w.vm.$nextTick()
    expect(document.body.querySelector('.gk-test-tip-body')).toBeTruthy()
    w.unmount()
  })

  it('toggles on click when openOnClick is true', async () => {
    const w = mount(GkTooltip, {
      props: {
        modelValue: false,
        openOnHover: false,
        openOnFocus: false,
        openOnClick: true,
      },
      attachTo: document.body,
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', { ...props, type: 'button', class: 'gk-test-tip-act' }, 'Tip'),
        default: () => 'X',
      },
    })
    await w.find('.gk-test-tip-act').trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([true])
    await w.setProps({ modelValue: true })
    await w.find('.gk-test-tip-act').trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false])
    w.unmount()
  })

  it('closes on outside mousedown when open', async () => {
    const w = mount(GkTooltip, {
      props: { modelValue: true, openOnHover: false, openOnFocus: false },
      attachTo: document.body,
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', { ...props, type: 'button', class: 'gk-test-tip-act' }, 'Tip'),
        default: () => 'Content',
      },
    })
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false])
    w.unmount()
  })
})
