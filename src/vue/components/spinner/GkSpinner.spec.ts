import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkSpinner from './GkSpinner.vue'

describe('GkSpinner', () => {
  it('exposes status role', () => {
    const w = mount(GkSpinner)
    expect(w.attributes('role')).toBe('status')
  })

  it('uses label', () => {
    const w = mount(GkSpinner, { props: { label: 'Saving' } })
    expect(w.attributes('aria-label')).toBe('Saving')
  })
})
