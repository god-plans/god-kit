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

  it('size sm sets overlay content max width cap', () => {
    const w = mount(GkDialog, {
      props: { modelValue: true, size: 'sm' },
      attachTo: document.body,
      slots: { default: 'X' },
    })
    const overlay = document.body.querySelector('.gk-overlay') as HTMLElement
    expect(overlay?.style.getPropertyValue('--gk-overlay-content-max-width')).toBe(
      'min(100%, var(--gk-dialog-max-width-sm))'
    )
    w.unmount()
  })

  it('fullscreen overlay content spans overlay width (regression: invalid flex justify-content stretch)', () => {
    const w = mount(GkDialog, {
      props: { modelValue: true, fullscreen: true },
      attachTo: document.body,
      slots: { default: '<p class="gk-dlg-test">Short</p>' },
    })
    const overlay = document.body.querySelector('.gk-dialog__overlay-root--fullscreen') as HTMLElement
    const content = document.body.querySelector(
      '.gk-dialog__overlay-root--fullscreen .gk-overlay__content'
    ) as HTMLElement
    expect(overlay).toBeTruthy()
    expect(content).toBeTruthy()
    // Fixed full-viewport overlay; content must use full width (not content-sized strip).
    expect(content.offsetWidth).toBe(overlay.clientWidth)
    w.unmount()
  })
})
