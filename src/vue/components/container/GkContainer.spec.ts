import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkContainer from './GkContainer.vue'

describe('GkContainer', () => {
  it('renders slot', () => {
    const w = mount(GkContainer, { slots: { default: 'Content' } })
    expect(w.text()).toContain('Content')
  })

  it('applies max width class', () => {
    const w = mount(GkContainer, { props: { maxWidth: 'lg' } })
    expect(w.find('.gk-container--lg').exists()).toBe(true)
  })
})
