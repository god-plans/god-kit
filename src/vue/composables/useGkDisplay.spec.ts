import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { createGkKit } from '../config/createGkKit'
import { useGkDisplay } from './useGkDisplay'

describe('useGkDisplay', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 400)
    vi.stubGlobal('innerHeight', 800)
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(400)
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(800)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('marks mobile below md by default', () => {
    const C = {
      setup() {
        const d = useGkDisplay()
        return { d }
      },
      template: '<div />',
    }

    const w = mount(C)
    const vm = w.vm as unknown as { d: { mobile: { value: boolean } } }
    expect(vm.d.mobile.value).toBe(true)
  })

  it('respects createGkKit display.mobileBreakpoint number', () => {
    const C = {
      setup() {
        const d = useGkDisplay()
        return { d }
      },
      template: '<div />',
    }

    const w = mount(C, {
      global: {
        plugins: [createGkKit({ display: { mobileBreakpoint: 200 } })],
      },
    })
    const vm = w.vm as unknown as { d: { mobile: { value: boolean } } }
    expect(vm.d.mobile.value).toBe(false)
  })
})
