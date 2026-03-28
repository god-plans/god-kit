import { computed, inject, ref } from 'vue'
import type { Ref } from 'vue'
import { GK_LOCALE } from '../../injection'
import type { GkLocaleContext, GkLocaleMessages } from '../config/gk-kit-types'
import { gkEnMessages } from '../../locale/en'

function interpolate(
  template: string,
  params?: Record<string, string | number>
): string {
  if (!params) return template
  let out = template
  for (const [k, v] of Object.entries(params)) {
    out = out.split(`{${k}}`).join(String(v))
  }
  return out
}

function pickMessages(
  messages: Record<string, GkLocaleMessages>,
  locale: string,
  fallback: string
): GkLocaleMessages {
  return messages[locale] ?? messages[fallback] ?? messages['en'] ?? gkEnMessages
}

/**
 * Minimal **`t(key)`** for God Kit strings. Prefer registering **`createGkKit`**;
 * without it, uses English reference messages only.
 */
export function useGkLocale(): GkLocaleContext {
  const injected = inject(GK_LOCALE, null)
  if (injected) return injected

  const locale = ref('en')
  const fallback = ref('en')
  const messages: Record<string, GkLocaleMessages> = { en: { ...gkEnMessages } }

  const t = (key: string, params?: Record<string, string | number>) => {
    const map = pickMessages(messages, locale.value, fallback.value)
    const raw = map[key] ?? key
    return interpolate(raw, params)
  }

  return {
    locale,
    fallback,
    t,
  }
}

/** @internal */
export function createGkLocaleContextForKit(options: {
  locale: Ref<string>
  fallback: Ref<string>
  messages: Record<string, GkLocaleMessages>
}): GkLocaleContext {
  const t = (key: string, params?: Record<string, string | number>) => {
    const map = pickMessages(options.messages, options.locale.value, options.fallback.value)
    const raw = map[key] ?? key
    return interpolate(raw, params)
  }

  return {
    locale: options.locale,
    fallback: options.fallback,
    t,
  }
}
