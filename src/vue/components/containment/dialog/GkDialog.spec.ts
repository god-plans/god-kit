import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkDialog from './GkDialog.vue'

describe('GkDialog', () => {
  it('renders slot when open', () => {
    const w = mount(GkDialog, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: { default: 'Hello dialog' },
    })
    expect(document.body.textContent).toContain('Hello dialog')
    w.unmount()
  })

  it('closes on scrim click when not persistent', async () => {
    const w = mount(GkDialog, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: { default: 'Panel' },
    })
    const scrim = document.body.querySelector('.gk-overlay__scrim')
    expect(scrim).toBeTruthy()
    await (scrim as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(w.emitted('update:modelValue')?.[0]).toEqual([false])
    w.unmount()
  })

  it('applies fullscreen class to surface', () => {
    const w = mount(GkDialog, {
      props: { modelValue: true, fullscreen: true },
      attachTo: document.body,
      slots: { default: 'X' },
    })
    expect(document.body.querySelector('.gk-dialog__surface--fullscreen')).toBeTruthy()
    w.unmount()
  })

})
