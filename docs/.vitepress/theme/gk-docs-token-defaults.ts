/**
 * Defaults aligned with `god-kit` `tokens.css` — used for docs preview + reset.
 */
export const GK_DOCS_TOKEN_DEFAULTS: Record<string, string> = {
  '--gk-radius-sm': '4px',
  '--gk-radius-md': '8px',
  '--gk-radius-lg': '12px',
  '--gk-duration-fast': '120ms',
  '--gk-duration-normal': '200ms',
  '--gk-opacity-disabled': '0.55',
  '--gk-opacity-overlay': '0.45',
  '--gk-focus-offset': '2px',
  '--gk-focus-width': '2px',
  '--gk-focus-ring-width': '2px',
  '--gk-input-focus-ring-spread': '3px',
}

export const GK_DOCS_TOKEN_KEYS = Object.keys(GK_DOCS_TOKEN_DEFAULTS) as (keyof typeof GK_DOCS_TOKEN_DEFAULTS)[]
