import { computed, inject, toValue, type MaybeRefOrGetter } from 'vue'
import { GK_FORM_CONTROLS } from '../../injection'
import {
  GK_FORM_CONTROL_SIZES,
  type GkFormControlSize,
} from '../config/gk-kit-types'
import { useGkDefaults } from './useGkDefaults'

function isGkFormControlSize(v: unknown): v is GkFormControlSize {
  return (
    typeof v === 'string' &&
    (GK_FORM_CONTROL_SIZES as readonly string[]).includes(v)
  )
}

type FormControlComponent = 'GkInput' | 'GkSelect' | 'GkTextarea' | 'GkCheckbox' | 'GkRadio'

/**
 * Resolves `size` for form surface controls: explicit prop, then
 * `GkDefaultsProvider` / `createGkKit` `defaults[Name].size`, then `GK_FORM_CONTROLS`
 * (`createGkKit` `form.defaultControlSize`, `GkForm`, `GkFormControlsProvider`), then `md`.
 */
export function useGkFormControlSize(
  options: {
    /** PascalCase, e.g. `GkInput` */
    componentName: FormControlComponent
    /**
     * `size` prop. For `GkSelect`, when this is a number, visual size is resolved from
     * defaults / context; when a string in `xs`…`xl`, it is the visual size.
     */
    explicit: MaybeRefOrGetter<GkFormControlSize | number | undefined>
  }
) {
  const formCtx = inject(GK_FORM_CONTROLS, null)
  const fromKit = useGkDefaults(options.componentName)

  const resolved = computed((): GkFormControlSize => {
    const ex = toValue(options.explicit)
    if (isGkFormControlSize(ex)) {
      return ex
    }
    const fromDef = fromKit.value.size
    if (isGkFormControlSize(fromDef)) {
      return fromDef
    }
    if (formCtx?.size) {
      return formCtx.size.value
    }
    return 'md'
  })

  const className = computed(
    () => `gk-form-control--${resolved.value}` as const
  )

  return { resolved, className }
}

export { isGkFormControlSize }
