import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import DemoGkAlert from '../components/demos/alert/DemoGkAlert.vue'
import DemoGkButton from '../components/demos/button/DemoGkButton.vue'
import DemoGkBottomSheet from '../components/demos/containment/bottom-sheet/DemoGkBottomSheet.vue'
import DemoGkDialog from '../components/demos/containment/dialog/DemoGkDialog.vue'
import DemoGkOverlay from '../components/demos/containment/overlay/DemoGkOverlay.vue'
import DemoGkCheckbox from '../components/demos/form/checkbox/DemoGkCheckbox.vue'
import DemoGkContainer from '../components/demos/container/DemoGkContainer.vue'
import DemoGkDivider from '../components/demos/divider/DemoGkDivider.vue'
import DemoGkForm from '../components/demos/form/form/DemoGkForm.vue'
import DemoGkField from '../components/demos/form/field/DemoGkField.vue'
import DemoGkInput from '../components/demos/form/input/DemoGkInput.vue'
import DemoGkRadio from '../components/demos/form/radio/DemoGkRadio.vue'
import DemoGkSelect from '../components/demos/form/select/DemoGkSelect.vue'
import DemoGkSpinner from '../components/demos/spinner/DemoGkSpinner.vue'
import DemoGkStack from '../components/demos/stack/DemoGkStack.vue'
import DemoGkTextarea from '../components/demos/form/textarea/DemoGkTextarea.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('DemoGkButton', DemoGkButton)
    app.component('DemoGkInput', DemoGkInput)
    app.component('DemoGkForm', DemoGkForm)
    app.component('DemoGkField', DemoGkField)
    app.component('DemoGkTextarea', DemoGkTextarea)
    app.component('DemoGkCheckbox', DemoGkCheckbox)
    app.component('DemoGkRadio', DemoGkRadio)
    app.component('DemoGkSelect', DemoGkSelect)
    app.component('DemoGkBottomSheet', DemoGkBottomSheet)
    app.component('DemoGkDialog', DemoGkDialog)
    app.component('DemoGkOverlay', DemoGkOverlay)
    app.component('DemoGkAlert', DemoGkAlert)
    app.component('DemoGkStack', DemoGkStack)
    app.component('DemoGkContainer', DemoGkContainer)
    app.component('DemoGkDivider', DemoGkDivider)
    app.component('DemoGkSpinner', DemoGkSpinner)
  },
}
