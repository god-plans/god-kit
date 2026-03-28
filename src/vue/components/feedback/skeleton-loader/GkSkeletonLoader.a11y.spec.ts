import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkSkeletonLoader from './GkSkeletonLoader.vue'

describe('GkSkeletonLoader a11y', () => {
  it('has no axe violations in boilerplate mode', async () => {
    const w = mount(GkSkeletonLoader, {
      props: { type: 'article', boilerplate: true },
      attachTo: document.body,
    })
    try {
      const el = document.querySelector('.gk-skeleton-loader__root')
      expect(el).toBeTruthy()
      await expectNoA11yViolations(el as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
