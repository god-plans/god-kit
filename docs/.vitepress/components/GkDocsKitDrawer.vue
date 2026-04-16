<script setup lang="ts">
import { buildGkKitExportSnippet, buildGkTokenOverridesCss } from '../theme/gk-kit-export'
import { GK_DOCS_TOKEN_DEFAULTS } from '../theme/gk-docs-token-defaults'
import type { GkDisplayBreakpointName, GkKitOptions, GkThemeName } from 'god-kit/vue/config'
import { useGkTheme } from 'god-kit/vue/config'
import type { Ref } from 'vue'
import { computed, inject, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'

const injected = inject<{
  drawerOpen: Ref<boolean>
  toggleDrawer: () => void
  closeDrawer: () => void
} | null>('gkDocsKitDrawer', null)

const isOpen = computed(() => !!injected?.drawerOpen.value)

const theme = useGkTheme()

const includePresets = ref(true)
const mobileBreakpoint = ref<GkDisplayBreakpointName | ''>('md')
const thresholdsJson = ref('')
const localeCode = ref('en')
const localeFallback = ref('en')
const messagesJson = ref('')
const defaultsJson = ref(`{
  "GkButton": {
    "variant": "primary"
  }
}`)

/** comfortable = default kit density; false = `.gk-density-compact` on `:root` */
const densityComfortable = ref(true)

const radiusSm = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-radius-sm']!)
const radiusMd = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-radius-md']!)
const radiusLg = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-radius-lg']!)
const durationFast = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-duration-fast']!)
const durationNormal = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-duration-normal']!)
const opacityDisabled = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-opacity-disabled']!)
const opacityOverlay = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-opacity-overlay']!)
const focusOffset = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-focus-offset']!)
const focusRingWidth = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-focus-ring-width']!)
const inputFocusSpread = ref(GK_DOCS_TOKEN_DEFAULTS['--gk-input-focus-ring-spread']!)

const copyStatus = ref<'idle' | 'copied' | 'error'>('idle')

const selectedTheme = computed({
  get: () => theme.name.value as GkThemeName,
  set: (v: GkThemeName) => theme.change(v),
})

const tokenVarsForExport = computed(() => ({
  '--gk-radius-sm': radiusSm.value.trim(),
  '--gk-radius-md': radiusMd.value.trim(),
  '--gk-radius-lg': radiusLg.value.trim(),
  '--gk-duration-fast': durationFast.value.trim(),
  '--gk-duration-normal': durationNormal.value.trim(),
  '--gk-opacity-disabled': opacityDisabled.value.trim(),
  '--gk-opacity-overlay': opacityOverlay.value.trim(),
  '--gk-focus-offset': focusOffset.value.trim(),
  '--gk-focus-ring-width': focusRingWidth.value.trim(),
  '--gk-input-focus-ring-spread': inputFocusSpread.value.trim(),
}))

/** Live: apply CSS variables + density class on the document root (this site only). */
watchEffect(() => {
  if (typeof document === 'undefined') return
  if (typeof window === 'undefined') return
  const root = document.documentElement
  for (const [key, val] of Object.entries(tokenVarsForExport.value)) {
    root.style.setProperty(key, val)
  }
  root.classList.toggle('gk-density-compact', !densityComfortable.value)
})

onMounted(() => {
  if (typeof document === 'undefined') return
  const s = getComputedStyle(document.documentElement)
  const pick = (k: keyof typeof GK_DOCS_TOKEN_DEFAULTS) =>
    s.getPropertyValue(k).trim() || GK_DOCS_TOKEN_DEFAULTS[k]!
  radiusSm.value = pick('--gk-radius-sm')
  radiusMd.value = pick('--gk-radius-md')
  radiusLg.value = pick('--gk-radius-lg')
  durationFast.value = pick('--gk-duration-fast')
  durationNormal.value = pick('--gk-duration-normal')
  opacityDisabled.value = pick('--gk-opacity-disabled')
  opacityOverlay.value = pick('--gk-opacity-overlay')
  focusOffset.value = pick('--gk-focus-offset')
  focusRingWidth.value = pick('--gk-focus-ring-width')
  inputFocusSpread.value = pick('--gk-input-focus-ring-spread')
  densityComfortable.value = !document.documentElement.classList.contains('gk-density-compact')
})

function resetTokensAndDensity() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  for (const k of Object.keys(GK_DOCS_TOKEN_DEFAULTS)) {
    root.style.removeProperty(k)
  }
  densityComfortable.value = true
  root.classList.remove('gk-density-compact')
  const s = getComputedStyle(root)
  const pick = (key: keyof typeof GK_DOCS_TOKEN_DEFAULTS) =>
    s.getPropertyValue(key).trim() || GK_DOCS_TOKEN_DEFAULTS[key]!
  radiusSm.value = pick('--gk-radius-sm')
  radiusMd.value = pick('--gk-radius-md')
  radiusLg.value = pick('--gk-radius-lg')
  durationFast.value = pick('--gk-duration-fast')
  durationNormal.value = pick('--gk-duration-normal')
  opacityDisabled.value = pick('--gk-opacity-disabled')
  opacityOverlay.value = pick('--gk-opacity-overlay')
  focusOffset.value = pick('--gk-focus-offset')
  focusRingWidth.value = pick('--gk-focus-ring-width')
  inputFocusSpread.value = pick('--gk-input-focus-ring-spread')
}

const exportSnippet = computed(() => {
  const kit = buildGkKitExportSnippet(gkConfig.value)
  const css = buildGkTokenOverridesCss(tokenVarsForExport.value)
  const densityNote = densityComfortable.value
    ? ''
    : `\n/* Density: add class "gk-density-compact" on :root or a wrapper (see tokens.css). */\n`

  return [
    kit.trimEnd(),
    ``,
    `/* -------------------------------------------------------------------------- */`,
    `/* Optional: design token overrides (after god-kit/tokens.css) */`,
    `/* -------------------------------------------------------------------------- */`,
    ``,
    css,
    densityNote.trimEnd(),
  ].join('\n')
})

const gkConfig = computed<GkKitOptions>(() => {
  const o: GkKitOptions = {}
  o.theme = {
    defaultTheme: selectedTheme.value,
    includePresets: includePresets.value,
  }
  const display: GkKitOptions['display'] = {}
  if (mobileBreakpoint.value) {
    display.mobileBreakpoint = mobileBreakpoint.value as GkDisplayBreakpointName
  }
  if (thresholdsJson.value.trim()) {
    try {
      display.thresholds = JSON.parse(thresholdsJson.value) as NonNullable<
        NonNullable<GkKitOptions['display']>['thresholds']
      >
    } catch {
      /* invalid JSON omitted from export */
    }
  }
  if (display.mobileBreakpoint || (display.thresholds && Object.keys(display.thresholds).length)) {
    o.display = display
  }

  const locale: GkKitOptions['locale'] = {}
  if (localeCode.value.trim()) locale.locale = localeCode.value.trim()
  if (localeFallback.value.trim()) locale.fallback = localeFallback.value.trim()
  if (messagesJson.value.trim()) {
    try {
      locale.messages = JSON.parse(messagesJson.value) as NonNullable<GkKitOptions['locale']>['messages']
    } catch {
      /* skip */
    }
  }
  if (locale.locale || locale.fallback || locale.messages) {
    o.locale = locale
  }

  if (defaultsJson.value.trim()) {
    try {
      o.defaults = JSON.parse(defaultsJson.value) as GkKitOptions['defaults']
    } catch {
      /* skip */
    }
  }

  return o
})

function onBackdropClick() {
  injected?.closeDrawer()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && injected?.drawerOpen.value) {
    injected.closeDrawer()
  }
}

watch(
  isOpen,
  (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      document.addEventListener('keydown', onKeydown)
    } else {
      document.removeEventListener('keydown', onKeydown)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

async function copyExport() {
  try {
    await navigator.clipboard.writeText(exportSnippet.value)
    copyStatus.value = 'copied'
    setTimeout(() => {
      copyStatus.value = 'idle'
    }, 2000)
  } catch {
    copyStatus.value = 'error'
  }
}

const themeOptions: { value: GkThemeName; label: string }[] = [
  { value: 'light', label: 'light' },
  { value: 'dark', label: 'dark' },
  { value: 'system', label: 'system' },
  { value: 'ocean', label: 'ocean' },
  { value: 'highContrast', label: 'highContrast' },
]

const breakpointOptions: { value: GkDisplayBreakpointName | ''; label: string }[] = [
  { value: '', label: '(default md)' },
  { value: 'xs', label: 'xs' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
  { value: 'xl', label: 'xl' },
  { value: 'xxl', label: 'xxl' },
]
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isOpen"
      class="gk-docs-drawer-root"
      :aria-hidden="!isOpen"
    >
      <div
        class="gk-docs-drawer-backdrop"
        role="presentation"
        @click="onBackdropClick"
      />
      <aside
        class="gk-docs-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gk-docs-drawer-title"
      >
        <header class="gk-docs-drawer-header">
          <h2 id="gk-docs-drawer-title" class="gk-docs-drawer-title">Kit settings</h2>
          <button
            type="button"
            class="gk-docs-drawer-close"
            aria-label="Close"
            @click="injected?.closeDrawer()"
          >
            ×
          </button>
        </header>

        <details class="gk-docs-drawer-intro" open>
          <summary>How this panel works</summary>
          <div class="gk-docs-drawer-intro-body">
            <p>
              <strong>Live on this site:</strong> the <strong>theme</strong> name (via
              <code>useGkTheme</code>), <strong>design tokens</strong> below (radius, motion, focus, opacity), and
              <strong>density</strong> (comfortable vs compact). Changes apply to the documentation preview
              immediately.
            </p>
            <p>
              <strong>For your app:</strong> copy the export at the bottom. It includes
              <code>createGkKit</code> options plus optional <code>:root</code> CSS overrides. Paste the CSS
              <em>after</em> <code>import 'god-kit/tokens.css'</code>. Density in production is the
              <code>gk-density-compact</code> class (see
              <a href="/guide/tokens">Design tokens</a>), not part of <code>createGkKit</code>.
            </p>
            <p>
              <strong>Not live here:</strong> display breakpoints, locale, and component defaults only affect the
              generated snippet — wire them in your <code>main.ts</code> as shown.
            </p>
          </div>
        </details>

        <div class="gk-docs-drawer-toolbar">
          <button type="button" class="gk-docs-drawer-reset" @click="resetTokensAndDensity">
            Reset tokens &amp; density
          </button>
        </div>

        <div class="gk-docs-drawer-scroll">
          <details open class="gk-docs-drawer-section">
            <summary>Theme</summary>
            <p class="gk-docs-drawer-hint">
              Switches <code>data-gk-theme</code> on the document. Matches
              <code>createGkKit({ theme: { defaultTheme } })</code>.
            </p>
            <label class="gk-docs-drawer-field">
              <span>defaultTheme</span>
              <select v-model="selectedTheme" class="gk-docs-drawer-input">
                <option v-for="opt in themeOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </label>
            <label class="gk-docs-drawer-field gk-docs-drawer-check">
              <input v-model="includePresets" type="checkbox" />
              <span>includePresets (register ocean &amp; highContrast)</span>
            </label>
          </details>

          <details open class="gk-docs-drawer-section">
            <summary>Border radius &amp; shape</summary>
            <p class="gk-docs-drawer-hint">
              Maps to <code>--gk-radius-sm|md|lg</code>. Buttons, fields, and demos use these values.
            </p>
            <label class="gk-docs-drawer-field">
              <span>Small (--gk-radius-sm)</span>
              <input v-model="radiusSm" class="gk-docs-drawer-input" type="text" inputmode="decimal" />
            </label>
            <label class="gk-docs-drawer-field">
              <span>Medium (--gk-radius-md)</span>
              <input v-model="radiusMd" class="gk-docs-drawer-input" type="text" inputmode="decimal" />
            </label>
            <label class="gk-docs-drawer-field">
              <span>Large (--gk-radius-lg)</span>
              <input v-model="radiusLg" class="gk-docs-drawer-input" type="text" inputmode="decimal" />
            </label>
          </details>

          <details class="gk-docs-drawer-section">
            <summary>Density</summary>
            <p class="gk-docs-drawer-hint">
              Comfortable is the default. Compact tightens control padding (see
              <code>.gk-density-compact</code> in tokens).
            </p>
            <label class="gk-docs-drawer-field gk-docs-drawer-check">
              <input v-model="densityComfortable" type="checkbox" />
              <span>Comfortable density (uncheck for compact)</span>
            </label>
          </details>

          <details class="gk-docs-drawer-section">
            <summary>Motion</summary>
            <p class="gk-docs-drawer-hint">Transition durations used by interactive components.</p>
            <label class="gk-docs-drawer-field">
              <span>--gk-duration-fast</span>
              <input v-model="durationFast" class="gk-docs-drawer-input" type="text" />
            </label>
            <label class="gk-docs-drawer-field">
              <span>--gk-duration-normal</span>
              <input v-model="durationNormal" class="gk-docs-drawer-input" type="text" />
            </label>
          </details>

          <details class="gk-docs-drawer-section">
            <summary>Focus ring</summary>
            <p class="gk-docs-drawer-hint">Focus outline offset and ring width for buttons and inputs.</p>
            <label class="gk-docs-drawer-field">
              <span>--gk-focus-offset</span>
              <input v-model="focusOffset" class="gk-docs-drawer-input" type="text" />
            </label>
            <label class="gk-docs-drawer-field">
              <span>--gk-focus-ring-width</span>
              <input v-model="focusRingWidth" class="gk-docs-drawer-input" type="text" />
            </label>
            <label class="gk-docs-drawer-field">
              <span>--gk-input-focus-ring-spread</span>
              <input v-model="inputFocusSpread" class="gk-docs-drawer-input" type="text" />
            </label>
          </details>

          <details class="gk-docs-drawer-section">
            <summary>Opacity</summary>
            <p class="gk-docs-drawer-hint">Disabled controls and overlay scrim strength (0–1).</p>
            <label class="gk-docs-drawer-field">
              <span>--gk-opacity-disabled</span>
              <input v-model="opacityDisabled" class="gk-docs-drawer-input" type="text" />
            </label>
            <label class="gk-docs-drawer-field">
              <span>--gk-opacity-overlay</span>
              <input v-model="opacityOverlay" class="gk-docs-drawer-input" type="text" />
            </label>
          </details>

          <details class="gk-docs-drawer-section">
            <summary>Display (export only)</summary>
            <p class="gk-docs-drawer-hint">
              <code>useGkDisplay()</code> reads this once at <code>app.use(createGkKit)</code>. Adjust here to
              generate a snippet; this docs build does not hot-reload breakpoints.
            </p>
            <label class="gk-docs-drawer-field">
              <span>mobileBreakpoint</span>
              <select v-model="mobileBreakpoint" class="gk-docs-drawer-input">
                <option v-for="opt in breakpointOptions" :key="String(opt.value)" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </label>
            <label class="gk-docs-drawer-field">
              <span>thresholds (JSON, optional)</span>
              <textarea
                v-model="thresholdsJson"
                class="gk-docs-drawer-textarea"
                rows="3"
                placeholder='{ "md": 960 }'
              />
            </label>
          </details>

          <details class="gk-docs-drawer-section">
            <summary>Locale (export only)</summary>
            <p class="gk-docs-drawer-hint">Merged with built-in English strings. Invalid JSON is skipped in export.</p>
            <label class="gk-docs-drawer-field">
              <span>locale</span>
              <input v-model="localeCode" class="gk-docs-drawer-input" type="text" autocomplete="off" />
            </label>
            <label class="gk-docs-drawer-field">
              <span>fallback</span>
              <input v-model="localeFallback" class="gk-docs-drawer-input" type="text" autocomplete="off" />
            </label>
            <label class="gk-docs-drawer-field">
              <span>messages (JSON, optional)</span>
              <textarea
                v-model="messagesJson"
                class="gk-docs-drawer-textarea"
                rows="4"
                placeholder='{ "en": { "appSave": "Save" } }'
              />
            </label>
          </details>

          <details class="gk-docs-drawer-section">
            <summary>Component defaults (export only)</summary>
            <p class="gk-docs-drawer-hint">Global default props per component name (PascalCase keys).</p>
            <label class="gk-docs-drawer-field">
              <span>defaults (JSON)</span>
              <textarea v-model="defaultsJson" class="gk-docs-drawer-textarea" rows="6" />
            </label>
          </details>

          <section class="gk-docs-drawer-section gk-docs-drawer-export">
            <h3 class="gk-docs-drawer-export-title">Copy export</h3>
            <p class="gk-docs-drawer-hint">
              Includes <code>gkKitConfig</code> + <code>installGodKit</code> and optional <code>:root</code> token
              block. Add the CSS after tokens in your entry stylesheet.
            </p>
            <div class="gk-docs-drawer-export-actions">
              <button type="button" class="gk-docs-drawer-copy" @click="copyExport">Copy all</button>
              <span class="gk-docs-drawer-live" aria-live="polite">
                <template v-if="copyStatus === 'copied'">Copied.</template>
                <template v-else-if="copyStatus === 'error'">Copy failed.</template>
              </span>
            </div>
            <pre class="gk-docs-drawer-pre"><code>{{ exportSnippet }}</code></pre>
          </section>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
