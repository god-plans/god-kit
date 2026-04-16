import type { GkKitOptions } from 'god-kit/vue/config'

/**
 * Serialize `GkKitOptions` into a copy-paste module for docs.
 * Omits `aliases` (components are not serializable here).
 */
export function buildGkKitExportSnippet(config: GkKitOptions): string {
  const safe: Record<string, unknown> = {}

  if (config.theme) {
    safe.theme = { ...config.theme }
    delete (safe.theme as { scope?: unknown }).scope
  }
  if (config.display && Object.keys(config.display).length) {
    safe.display = config.display
  }
  if (config.locale && Object.keys(config.locale).length) {
    safe.locale = config.locale
  }
  if (config.defaults && Object.keys(config.defaults).length) {
    safe.defaults = config.defaults
  }

  const json = JSON.stringify(safe, null, 2)

  return [
    `import type { App } from 'vue'`,
    `import type { GkKitOptions } from 'god-kit/vue/config'`,
    `import { createGkKit } from 'god-kit/vue/config'`,
    ``,
    `/** Order: tokens, optional bridge, then component styles */`,
    `import 'god-kit/tokens.css'`,
    `import 'god-kit/vue.css'`,
    ``,
    `export const gkKitConfig: GkKitOptions = ${json}`,
    ``,
    `export function installGodKit(app: App) {`,
    `  app.use(createGkKit(gkKitConfig))`,
    `}`,
    ``,
    `// import { installGodKit } from './gk.config'`,
    `// installGodKit(app)`,
    ``,
    `// Aliases need real components in your bundle, e.g.`,
    `// import { GkButton } from 'god-kit/vue'`,
    `// app.use(createGkKit({ ...gkKitConfig, aliases: { MyBtn: { extends: GkButton, defaults: { variant: 'ghost' } } } }))`,
    ``,
  ].join('\n')
}

/**
 * Optional global CSS overrides (paste after `god-kit/tokens.css` in your app).
 */
export function buildGkTokenOverridesCss(vars: Record<string, string>): string {
  const entries = Object.entries(vars).filter(([, v]) => v.trim() !== '')
  if (!entries.length) {
    return `/* No token overrides selected — using defaults from god-kit/tokens.css */`
  }
  const body = entries.map(([k, v]) => `  ${k}: ${v};`).join('\n')
  return [`/* After importing god-kit/tokens.css, override design tokens: */`, `:root {`, body, `}`, ``].join('\n')
}
