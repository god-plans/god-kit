import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkBottomSheet from './GkBottomSheet.vue'

describe('GkBottomSheet', () => {
  it('renders slot when open', () => {
    const w = mount(GkBottomSheet, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: { default: 'Sheet content' },
    })
    expect(document.body.textContent).toContain('Sheet content')
    w.unmount()
  })

  it('closes on scrim click when not persistent', async () => {
    const w = mount(GkBottomSheet, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: { default: 'X' },
    })
    const scrim = document.body.querySelector('.gk-overlay__scrim')
    expect(scrim).toBeTruthy()
    await (scrim as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(w.emitted('update:modelValue')?.[0]).toEqual([false])
    w.unmount()
  })

  it('adds align-bottom and inset classes when inset', () => {
    const w = mount(GkBottomSheet, {
      props: { modelValue: true, inset: true },
      attachTo: document.body,
      slots: { default: 'Y' },
    })
    const root = document.body.querySelector('.gk-overlay')
    expect(root?.classList.contains('gk-overlay--align-bottom')).toBe(true)
    expect(root?.classList.contains('gk-overlay--inset')).toBe(true)
    w.unmount()
  })
})
