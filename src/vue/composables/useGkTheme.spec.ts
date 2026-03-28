import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { createGkKit } from '../config/createGkKit'
import { useGkTheme } from './useGkTheme'

describe('useGkTheme', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((q: string) => ({
        matches: q.includes('dark') ? false : false,
        media: q,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    document.documentElement.removeAttribute('data-gk-theme')
    document.documentElement.classList.remove('gk-theme-dark')
  })

  it('sets data-gk-theme on document when using createGkKit', async () => {
    const C = {
      setup() {
        const t = useGkTheme()
        return { t }
      },
      template: '<div />',
    }

    mount(C, {
      global: { plugins: [createGkKit({ theme: { defaultTheme: 'dark' } })] },
    })

    expect(document.documentElement.getAttribute('data-gk-theme')).toBe('dark')
    expect(document.documentElement.classList.contains('gk-theme-dark')).toBe(true)
  })
})
