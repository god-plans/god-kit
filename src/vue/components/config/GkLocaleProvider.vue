<script setup lang="ts">
import { inject, provide, ref, watch } from 'vue'
import { GK_LOCALE } from '../../../injection'
import type { GkLocaleContext, GkLocaleMessages } from '../../config/gk-kit-types'

const props = defineProps<{
  /** Override locale for this subtree */
  locale?: string
  /** Set text direction on the wrapper */
  rtl?: boolean
  /** Extra or override message keys for this subtree */
  messages?: GkLocaleMessages
}>()

const parent = inject(GK_LOCALE, null)

const locale = ref(props.locale ?? parent?.locale.value ?? 'en')
const fallback = ref(parent?.fallback.value ?? 'en')

watch(
  () => props.locale,
  (v) => {
    if (v !== undefined) locale.value = v
  }
)

watch(
  () => parent?.locale.value,
  (v) => {
    if (parent && props.locale === undefined && v !== undefined) locale.value = v
  }
)

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

const t = (key: string, params?: Record<string, string | number>) => {
  const own = props.messages?.[key]
  if (own !== undefined) return interpolate(own, params)
  return parent?.t(key, params) ?? key
}

const ctx: GkLocaleContext = {
  locale,
  fallback,
  t,
}

provide(GK_LOCALE, ctx)
</script>

<template>
  <div class="gk-locale-provider" :dir="rtl ? 'rtl' : undefined">
    <slot />
  </div>
</template>
