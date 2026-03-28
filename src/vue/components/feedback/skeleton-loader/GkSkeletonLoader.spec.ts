import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import GkSkeletonLoader from './GkSkeletonLoader.vue'

describe('GkSkeletonLoader', () => {
  it('renders skeleton when no default slot', () => {
    const w = mount(GkSkeletonLoader, {
      props: { type: 'ossein', boilerplate: true },
    })
    expect(w.find('.gk-skeleton-loader__ossein').exists()).toBe(true)
    w.unmount()
  })

  it('renders slot when not loading', () => {
    const w = mount(GkSkeletonLoader, {
      props: { loading: false },
      slots: { default: () => h('p', { class: 'gk-test-loaded' }, 'Ready') },
    })
    expect(w.find('.gk-test-loaded').exists()).toBe(true)
    expect(w.find('.gk-skeleton-loader__root').exists()).toBe(false)
    w.unmount()
  })

  it('shows skeleton when loading with slot', () => {
    const w = mount(GkSkeletonLoader, {
      props: { loading: true, type: 'card', boilerplate: true },
      slots: { default: () => h('p', {}, 'Hidden') },
    })
    expect(w.find('.gk-skeleton-loader__card').exists()).toBe(true)
    expect(w.text()).not.toContain('Hidden')
    w.unmount()
  })
})
