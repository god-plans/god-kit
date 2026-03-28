import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import GkNavigationDrawer from './GkNavigationDrawer.vue'

describe('GkNavigationDrawer', () => {
  it('opens and closes in temporary mode', async () => {
    const w = mount(GkNavigationDrawer, {
      props: {
        temporary: true,
        modelValue: false,
        disableResizeWatcher: true,
      },
      attachTo: document.body,
      slots: { default: () => h('p', { class: 'gk-test-drawer-body' }, 'Nav') },
    })
    expect(document.body.querySelector('.gk-navigation-drawer__scrim')).toBeNull()
    await w.setProps({ modelValue: true })
    await nextTick()
    expect(document.body.querySelector('.gk-test-drawer-body')).toBeTruthy()
    const scrim = document.body.querySelector('.gk-navigation-drawer__scrim') as HTMLElement
    expect(scrim).toBeTruthy()
    scrim.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false])
    w.unmount()
  })

  it('does not close scrim when persistent', async () => {
    const w = mount(GkNavigationDrawer, {
      props: {
        temporary: true,
        persistent: true,
        modelValue: true,
        disableResizeWatcher: true,
      },
      attachTo: document.body,
      slots: { default: () => 'x' },
    })
    await nextTick()
    const scrim = document.body.querySelector('.gk-navigation-drawer__scrim') as HTMLElement
    scrim.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(w.emitted('update:modelValue')).toBeFalsy()
    w.unmount()
  })

  it('renders docked when not temporary', async () => {
    const w = mount(GkNavigationDrawer, {
      props: {
        temporary: false,
        permanent: false,
        modelValue: true,
        disableResizeWatcher: true,
      },
      slots: { default: () => h('span', { class: 'gk-docked' }, 'D') },
    })
    expect(w.find('.gk-docked').exists()).toBe(true)
    expect(w.find('.gk-navigation-drawer__portal').exists()).toBe(false)
    w.unmount()
  })
})
