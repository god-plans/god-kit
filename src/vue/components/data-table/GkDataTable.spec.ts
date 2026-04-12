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
})
