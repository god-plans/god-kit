import type { App, Component, Plugin } from 'vue'
import { computed, defineComponent, h, mergeProps, ref } from 'vue'
import { createGkLocaleContextForKit } from '../composables/useGkLocale'
import { createGkThemeContextForKit } from '../composables/useGkTheme'
import { GK_DEFAULTS, GK_DISPLAY_CONFIG, GK_LOCALE, GK_THEME } from '../../injection'
import { gkEnMessages } from '../../locale/en'
import { resolveGkDisplayConfig } from './gk-display-resolve'
import type { GkKitAliasEntry, GkKitOptions } from './gk-kit-types'

function isAliasEntry(def: unknown): def is GkKitAliasEntry {
  return (
    typeof def === 'object' &&
    def !== null &&
    'extends' in def &&
    (def as GkKitAliasEntry).extends !== undefined
  )
}

function defineGkAliasComponent(
  name: string,
  base: Component,
  defaults?: Record<string, unknown>
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => h(base, mergeProps(defaults ?? {}, attrs), slots)
    },
  })
}

/**
 * God Kit global configuration plugin (Vuetify-style **`app.use`**).
 */
export function createGkKit(options: GkKitOptions = {}): Plugin {
  return {
    install(app: App) {
      const themeOpts = options.theme ?? {}
      const display = resolveGkDisplayConfig(options.display)

      const localeRef = ref(options.locale?.locale ?? 'en')
      const fallbackRef = ref(options.locale?.fallback ?? 'en')
      const rawMessages = options.locale?.messages ?? {}
      const messages: Record<string, Record<string, string>> = {
        ...rawMessages,
        en: { ...gkEnMessages, ...(rawMessages.en ?? {}) },
      }

      const themeCtx = createGkThemeContextForKit(
        themeOpts
      )
      app.provide(GK_THEME, themeCtx)
      app.provide(GK_DISPLAY_CONFIG, display)

      const localeCtx = createGkLocaleContextForKit({
        locale: localeRef,
        fallback: fallbackRef,
        messages,
      })
      app.provide(GK_LOCALE, localeCtx)

      const kitDefaults = computed(() => options.defaults ?? {})
      app.provide(GK_DEFAULTS, kitDefaults)

      if (options.aliases) {
        for (const [name, def] of Object.entries(options.aliases)) {
          if (isAliasEntry(def)) {
            app.component(name, defineGkAliasComponent(name, def.extends, def.defaults))
          } else {
            app.component(name, def as Component)
          }
        }
      }
    },
  }
}
