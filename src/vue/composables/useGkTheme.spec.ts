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

  it('supports preset named themes and resolves system to concrete theme', () => {
    const C = {
      setup() {
        const t = useGkTheme()
        return { t }
      },
      template: '<div />',
    }

    const wrapper = mount(C, {
      global: {
        plugins: [createGkKit({ theme: { defaultTheme: 'ocean' } })],
      },
    })

    const vm = wrapper.vm as unknown as {
      t: ReturnType<typeof useGkTheme>
    }
    expect(vm.t.resolved.value).toBe('ocean')
    expect(vm.t.isDark.value).toBe(false)
    expect(document.documentElement.getAttribute('data-gk-theme')).toBe('ocean')

    vm.t.change('system')
    expect(vm.t.resolved.value).toBe('light')
  })

  it('registers custom themes at runtime and applies inline token overrides', () => {
    const C = {
      setup() {
        const t = useGkTheme()
        t.registerTheme('sunset', {
          extends: 'light',
          isDark: false,
          tokens: {
            '--gk-color-primary': '#ff5f6d',
          },
        })
        t.change('sunset')
        return { t }
      },
      template: '<div />',
    }

    mount(C, {
      global: {
        plugins: [createGkKit()],
      },
    })

    expect(document.documentElement.getAttribute('data-gk-theme')).toBe('sunset')
    expect(document.documentElement.style.getPropertyValue('--gk-color-primary').trim()).toBe('#ff5f6d')
  })
})
