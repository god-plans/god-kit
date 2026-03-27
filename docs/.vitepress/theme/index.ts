import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import DemoGkButton from '../components/demos/button/DemoGkButton.vue'
import DemoGkField from '../components/demos/field/DemoGkField.vue'
import DemoGkInput from '../components/demos/input/DemoGkInput.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('DemoGkButton', DemoGkButton)
    app.component('DemoGkInput', DemoGkInput)
    app.component('DemoGkField', DemoGkField)
  },
}
