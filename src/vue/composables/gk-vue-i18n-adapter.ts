import type { Ref } from 'vue'

/**
 * Optional bridge for **`vue-i18n`**: pass an adapter so **`useGkLocale`** can delegate
 * to your app’s **`t`** and locale ref.
 */
export interface GkVueI18nAdapter {
  t: (key: string, ...args: unknown[]) => string
  locale: Ref<string>
}
