import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test-utils/axe'
import GkDataTable from './GkDataTable.vue'

describe('GkDataTable a11y', () => {
  it('has no axe violations for basic table', async () => {
    const w = mount(GkDataTable, {
      props: {
        headers: [
          { key: 'name', title: 'Name', sortable: true },
          { key: 'age', title: 'Age' },
        ],
        items: [
          { name: 'Ada', age: 36 },
          { name: 'Grace', age: 85 },
        ],
        caption: 'Demo table',
      },
      attachTo: document.body,
    })
    try {
      const el = w.find('.gk-data-table').element
      expect(el).toBeTruthy()
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
