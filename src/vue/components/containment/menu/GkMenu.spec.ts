import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import GkMenu from './GkMenu.vue'

describe('GkMenu', () => {
  it('opens and closes from activator', async () => {
    const w = mount(GkMenu, {
      props: { modelValue: false },
      attachTo: document.body,
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', { ...props, class: 'gk-test-menu-btn' }, 'Menu'),
        default: () => h('div', { class: 'gk-test-menu-body' }, 'Item'),
      },
    })
    expect(document.body.querySelector('.gk-menu__panel')).toBeNull()
    await w.find('.gk-test-menu-btn').trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([true])
    await w.setProps({ modelValue: true })
    expect(document.body.querySelector('.gk-test-menu-body')).toBeTruthy()
    await w.find('.gk-test-menu-btn').trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false])
    w.unmount()
  })

  it('closes on outside mousedown', async () => {
    const w = mount(GkMenu, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', { ...props, class: 'gk-test-menu-btn' }, 'Open'),
        default: () => 'X',
      },
    })
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false])
    w.unmount()
  })

  it('supports Arrow/Home/End keyboard navigation inside menu', async () => {
    const w = mount(GkMenu, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', { ...props }, 'Open'),
        default: () => [
          h('button', { role: 'menuitem', class: 'first' }, 'First'),
          h('button', { role: 'menuitem', class: 'second' }, 'Second'),
          h('button', { role: 'menuitem', class: 'third' }, 'Third'),
        ],
      },
    })
    const panel = document.body.querySelector('.gk-menu__panel') as HTMLElement
    const first = document.body.querySelector('.first') as HTMLElement
    const second = document.body.querySelector('.second') as HTMLElement
    const third = document.body.querySelector('.third') as HTMLElement

    first.focus()
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(document.activeElement).toBe(second)

    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
    expect(document.activeElement).toBe(third)

    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
    expect(document.activeElement).toBe(first)
    w.unmount()
  })
})
