import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkPagination from './GkPagination.vue'

describe('GkPagination', () => {
  it('changes page on button click', async () => {
    const w = mount(GkPagination, {
      props: {
        modelValue: 1,
        length: 5,
        totalVisible: 10,
      },
      attachTo: document.body,
    })
    const buttons = w.findAll('button')
    const pageBtn = buttons.find((b) => b.text() === '3')
    expect(pageBtn).toBeTruthy()
    await pageBtn!.trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([3])
    w.unmount()
  })

  it('emits next with page value', async () => {
    const w = mount(GkPagination, {
      props: {
        modelValue: 2,
        length: 5,
        totalVisible: 10,
      },
      attachTo: document.body,
    })
    await w.find('[data-test="gk-pagination-next"] button').trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([3])
    expect(w.emitted('next')?.at(-1)).toEqual([3])
    w.unmount()
  })

  it('shows ellipsis when totalVisible is small', () => {
    const w = mount(GkPagination, {
      props: {
        modelValue: 10,
        length: 20,
        totalVisible: 5,
      },
      attachTo: document.body,
    })
    expect(w.text()).toContain('...')
    w.unmount()
  })

  it('supports Home and End keyboard shortcuts', async () => {
    const w = mount(GkPagination, {
      props: {
        modelValue: 3,
        length: 8,
      },
      attachTo: document.body,
    })
    const root = w.find('[data-test="gk-pagination-root"]')
    await root.trigger('keydown', { key: 'End' })
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([8])
    await w.setProps({ modelValue: 8 })
    await root.trigger('keydown', { key: 'Home' })
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([1])
    w.unmount()
  })
})
