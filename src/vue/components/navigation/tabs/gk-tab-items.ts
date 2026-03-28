export type GkTabItem = string | number | Record<string, unknown> & { text?: string; value: string | number; disabled?: boolean }

export type GkTabItemParsed = {
  text: string
  value: string | number
  disabled?: boolean
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

export function parseGkTabItems(items: readonly GkTabItem[] | undefined): GkTabItemParsed[] {
  if (!items?.length) return []
  return items.map((item) => {
    if (isRecord(item) && 'value' in item) {
      const v = item.value as string | number
      return {
        text: String(item.text ?? v),
        value: v,
        disabled: item.disabled === true,
      }
    }
    return { text: String(item), value: item as string | number }
  })
}
