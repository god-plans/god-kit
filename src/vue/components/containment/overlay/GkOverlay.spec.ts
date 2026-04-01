import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import GkOverlay from './GkOverlay.vue'

describe('GkOverlay', () => {
  it('renders slot when open', () => {
    const w = mount(GkOverlay, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: { default: 'Hello' },
    })
    expect(document.body.textContent).toContain('Hello')
    w.unmount()
  })

  it('does not render overlay when closed', () => {
    const w = mount(GkOverlay, {
      props: { modelValue: false },
      attachTo: document.body,
      slots: { default: 'Hello' },
    })
    expect(w.find('.gk-overlay').exists()).toBe(false)
    w.unmount()
  })

  it('closes on scrim click when not persistent', async () => {
    const w = mount(GkOverlay, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: { default: 'Panel' },
    })
    const scrim = document.body.querySelector('.gk-overlay__scrim')
    expect(scrim).toBeTruthy()
    await (scrim as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(w.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(w.emitted('click:outside')?.[0]?.[0]).toBeInstanceOf(MouseEvent)
    w.unmount()
  })

  it('does not close on scrim click when persistent', async () => {
    const w = mount(GkOverlay, {
      props: { modelValue: true, persistent: true },
      attachTo: document.body,
      slots: { default: 'Panel' },
    })
    const scrim = document.body.querySelector('.gk-overlay__scrim')
    expect(scrim).toBeTruthy()
    await (scrim as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(w.emitted('update:modelValue')).toBeUndefined()
    w.unmount()
  })

  it('closes on Escape when not persistent', async () => {
    const w = mount(GkOverlay, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: { default: 'Panel' },
    })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(w.emitted('update:modelValue')?.[0]).toEqual([false])
    w.unmount()
  })

  it('does not close on Escape when persistent', async () => {
    const w = mount(GkOverlay, {
      props: { modelValue: true, persistent: true },
      attachTo: document.body,
      slots: { default: 'Panel' },
    })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(w.emitted('update:modelValue')).toBeUndefined()
    w.unmount()
  })

  it('traps focus inside the panel while open', async () => {
    const w = mount(GkOverlay, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: {
        default: `
          <div>
            <button class="first">First</button>
            <button class="last">Last</button>
          </div>
        `,
      },
    })
    await nextTick()
    const first = document.body.querySelector('.first') as HTMLElement
    const last = document.body.querySelector('.last') as HTMLElement
    first.focus()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }))
    await nextTick()
    expect(document.activeElement).toBe(last)
    w.unmount()
  })
})
