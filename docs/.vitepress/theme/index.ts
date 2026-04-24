import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createGkKit } from 'god-kit/vue/config'

import 'god-kit/tokens.css'
import 'god-kit/vue.css'
import './style.css'

import DemoGkAlert from '../components/demos/alert/DemoGkAlert.vue'
import DemoGkButton from '../components/demos/button/DemoGkButton.vue'
import DemoGkMenu from '../components/demos/containment/menu/DemoGkMenu.vue'
import DemoGkTabs from '../components/demos/navigation/tabs/DemoGkTabs.vue'
import DemoGkPagination from '../components/demos/navigation/pagination/DemoGkPagination.vue'
import DemoGkNavigationDrawer from '../components/demos/containment/navigation-drawer/DemoGkNavigationDrawer.vue'
import DemoGkTooltip from '../components/demos/containment/tooltip/DemoGkTooltip.vue'
import DemoGkBottomSheet from '../components/demos/containment/bottom-sheet/DemoGkBottomSheet.vue'
import DemoGkDialog from '../components/demos/containment/dialog/DemoGkDialog.vue'
import DemoGkCard from '../components/demos/containment/card/DemoGkCard.vue'
import DemoGkOverlay from '../components/demos/containment/overlay/DemoGkOverlay.vue'
import DemoGkCheckbox from '../components/demos/form/checkbox/DemoGkCheckbox.vue'
import DemoGkContainer from '../components/demos/container/DemoGkContainer.vue'
import DemoGkExpansionPanels from '../components/demos/expansion/DemoGkExpansionPanels.vue'
import DemoGkDivider from '../components/demos/divider/DemoGkDivider.vue'
import DemoGkForm from '../components/demos/form/form/DemoGkForm.vue'
import DemoGkField from '../components/demos/form/field/DemoGkField.vue'
import DemoGkInput from '../components/demos/form/input/DemoGkInput.vue'
import DemoGkRadio from '../components/demos/form/radio/DemoGkRadio.vue'
import DemoGkSelect from '../components/demos/form/select/DemoGkSelect.vue'
import DemoGkSnackbar from '../components/demos/feedback/snackbar/DemoGkSnackbar.vue'
import DemoGkSkeletonLoader from '../components/demos/feedback/skeleton-loader/DemoGkSkeletonLoader.vue'
import DemoGkSpinner from '../components/demos/spinner/DemoGkSpinner.vue'
import DemoGkStack from '../components/demos/stack/DemoGkStack.vue'
import DemoGkGrid from '../components/demos/grid/DemoGkGrid.vue'
import DemoGkTextarea from '../components/demos/form/textarea/DemoGkTextarea.vue'
import { registerDataTableDemos } from '../components/demos/data-table/registerDataTableDemos'

import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(
      createGkKit({
        theme: { defaultTheme: 'light' },
      })
    )

    app.component('DemoGkButton', DemoGkButton)
    app.component('DemoGkInput', DemoGkInput)
    app.component('DemoGkForm', DemoGkForm)
    app.component('DemoGkField', DemoGkField)
    app.component('DemoGkTextarea', DemoGkTextarea)
    app.component('DemoGkCheckbox', DemoGkCheckbox)
    app.component('DemoGkRadio', DemoGkRadio)
    app.component('DemoGkSelect', DemoGkSelect)
    app.component('DemoGkMenu', DemoGkMenu)
    app.component('DemoGkTabs', DemoGkTabs)
    app.component('DemoGkPagination', DemoGkPagination)
    app.component('DemoGkNavigationDrawer', DemoGkNavigationDrawer)
    app.component('DemoGkTooltip', DemoGkTooltip)
    app.component('DemoGkBottomSheet', DemoGkBottomSheet)
    app.component('DemoGkDialog', DemoGkDialog)
    app.component('DemoGkCard', DemoGkCard)
    app.component('DemoGkOverlay', DemoGkOverlay)
    app.component('DemoGkAlert', DemoGkAlert)
    app.component('DemoGkStack', DemoGkStack)
    app.component('DemoGkGrid', DemoGkGrid)
    app.component('DemoGkContainer', DemoGkContainer)
    app.component('DemoGkExpansionPanels', DemoGkExpansionPanels)
    app.component('DemoGkDivider', DemoGkDivider)
    app.component('DemoGkSnackbar', DemoGkSnackbar)
    app.component('DemoGkSkeletonLoader', DemoGkSkeletonLoader)
    app.component('DemoGkSpinner', DemoGkSpinner)
    registerDataTableDemos(app)
  },
}
