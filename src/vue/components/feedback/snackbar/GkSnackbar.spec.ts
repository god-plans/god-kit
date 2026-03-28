import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import GkSnackbar from './GkSnackbar.vue'
import GkSnackbarHost from './GkSnackbarHost.vue'
import { clearGkSnackbars, pushGkSnackbar } from './useGkSnackbar'

describe('GkSnackbar', () => {
  it('renders default slot when open', () => {
    const w = mount(GkSnackbar, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: { default: () => h('span', { class: 'gk-snack-t' }, 'Saved') },
    })
    expect(document.body.querySelector('.gk-snack-t')?.textContent).toBe('Saved')
    w.unmount()
  })

  it('pushGkSnackbar shows message when host is mounted', async () => {
    clearGkSnackbars()
    const host = mount(GkSnackbarHost, { attachTo: document.body })
    pushGkSnackbar({ text: 'From script', timeout: -1 })
    await nextTick()
    expect(document.body.textContent).toContain('From script')
    clearGkSnackbars()
    host.unmount()
  })
})
