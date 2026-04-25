import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkDataTable from './GkDataTable.vue'

describe('GkDataTable', () => {
  it('renders headers and cells', () => {
    const w = mount(GkDataTable, {
      props: {
        headers: [
          { key: 'name', title: 'Name' },
          { key: 'age', title: 'Age' },
        ],
        items: [
          { name: 'Ada', age: 36 },
          { name: 'Grace', age: 85 },
        ],
      },
    })
    expect(w.text()).toContain('Name')
    expect(w.text()).toContain('Ada')
    expect(w.text()).toContain('Grace')
    w.unmount()
  })

  it('keeps server-mode footer pagination compact by default', () => {
    const w = mount(GkDataTable, {
      props: {
        mode: 'server',
        page: 15,
        itemsPerPage: 10,
        headers: [{ key: 'name', title: 'Name' }],
        items: [{ name: 'Ada' }],
        itemsLength: 1000,
      },
      attachTo: document.body,
    })

    expect(w.text()).toContain('...')
    expect(
      w.findAll('[data-test="gk-pagination-item"]').filter((item) => item.find('button').exists())
    ).toHaveLength(7)
    expect(w.text()).toContain('100')
    w.unmount()
  })

  it('passes pagination options to the default footer', () => {
    const w = mount(GkDataTable, {
      props: {
        mode: 'server',
        page: 15,
        itemsPerPage: 10,
        headers: [{ key: 'name', title: 'Name' }],
        items: [{ name: 'Ada' }],
        itemsLength: 300,
        paginationTotalVisible: 5,
        paginationEllipsis: '…',
        paginationShowFirstLastPage: true,
      },
      attachTo: document.body,
    })

    expect(w.text()).toContain('…')
    expect(
      w.findAll('[data-test="gk-pagination-item"]').filter((item) => item.find('button').exists())
    ).toHaveLength(5)
    expect(w.find('[data-test="gk-pagination-first"]').exists()).toBe(true)
    expect(w.find('[data-test="gk-pagination-last"]').exists()).toBe(true)
    w.unmount()
  })
})
