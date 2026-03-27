import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, it } from 'vitest'
import { expectNoA11yViolations } from '../../../test-utils/axe'
import GkInput from '../input/GkInput.vue'
import GkField from './GkField.vue'

describe('GkField + GkInput a11y', () => {
  it('has no axe violations', async () => {
    const Root = defineComponent({
      components: { GkField, GkInput },
      data: () => ({ v: '' }),
      template: `
        <GkField label="Email">
          <GkInput v-model="v" type="email" autocomplete="email" />
        </GkField>
      `,
    })
    const w = mount(Root, { attachTo: document.body })
    try {
      await expectNoA11yViolations(w.element as HTMLElement)
    } finally {
      w.unmount()
    }
  })
})
