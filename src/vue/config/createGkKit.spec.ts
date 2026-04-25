import { defineComponent, inject, unref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  GK_DEFAULTS,
  GK_DISPLAY_CONFIG,
  GK_FORM_CONTROLS,
  GK_LOCALE,
  GK_THEME,
} from '../../injection'
import { createGkKit } from './createGkKit'

describe('createGkKit', () => {
  it('provides theme, display, locale, defaults, and form control size', () => {
    const Probe = defineComponent({
      setup() {
        return {
          theme: inject(GK_THEME),
          display: inject(GK_DISPLAY_CONFIG),
          locale: inject(GK_LOCALE),
          defaults: inject(GK_DEFAULTS),
          formControls: inject(GK_FORM_CONTROLS),
        }
      },
      template: '<div />',
    })

    const wrapper = mount(Probe, {
      global: {
        plugins: [
          createGkKit({
            form: { defaultControlSize: 'sm' },
            defaults: { GkButton: { variant: 'primary' } },
          }),
        ],
      },
    })

    const vm = wrapper.vm as unknown as {
      theme: {
        name: { value: string }
        hasTheme: (name: string) => boolean
        themes: { value: Record<string, unknown> }
      }
      display: { md: number }
      locale: { t: (k: string) => string }
      defaults: { value: Record<string, Record<string, unknown>> }
      formControls: { size: { value: string } }
    }

    expect(vm.theme).toBeDefined()
    expect(vm.theme.name.value).toBe('light')
    expect(vm.theme.hasTheme('ocean')).toBe(true)
    expect(vm.theme.themes.value.highContrast).toBeDefined()
    expect(vm.display.md).toBe(960)
    expect(vm.locale.t('gk.menu.close')).toBe('Close')
    expect(unref(vm.defaults).GkButton?.variant).toBe('primary')
    expect(unref(vm.formControls.size)).toBe('sm')
  })

  it('registers alias components', () => {
    const Stub = defineComponent({ name: 'Stub', template: '<span class="stub" />' })

    const app = mount(defineComponent({ template: '<GkAliasProbe />' }), {
      global: {
        plugins: [
          createGkKit({
            aliases: {
              GkAliasProbe: { extends: Stub, defaults: { class: 'x' } },
            },
          }),
        ],
      },
    })

    expect(app.find('.stub').exists()).toBe(true)
  })
})
