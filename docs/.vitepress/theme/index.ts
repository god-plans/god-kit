import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import DemoGkButton from '../components/demos/DemoGkButton.vue'
import DemoGkField from '../components/demos/DemoGkField.vue'
import DemoGkInput from '../components/demos/DemoGkInput.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('DemoGkButton', DemoGkButton)
    app.component('DemoGkInput', DemoGkInput)
    app.component('DemoGkField', DemoGkField)
  },
}
