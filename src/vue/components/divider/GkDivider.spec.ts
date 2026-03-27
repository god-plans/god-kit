import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkDivider from './GkDivider.vue'

describe('GkDivider', () => {
  it('sets aria-orientation', () => {
    const w = mount(GkDivider, { props: { orientation: 'vertical' } })
    expect(w.attributes('aria-orientation')).toBe('vertical')
  })
})
