import type { App, Component } from 'vue'
import DemoGkDataTableSample01 from './DemoGkDataTableSample01.vue'
import DemoGkDataTableSample02 from './DemoGkDataTableSample02.vue'
import DemoGkDataTableSample03 from './DemoGkDataTableSample03.vue'
import DemoGkDataTableSample04 from './DemoGkDataTableSample04.vue'
import DemoGkDataTableSample05 from './DemoGkDataTableSample05.vue'
import DemoGkDataTableSample06 from './DemoGkDataTableSample06.vue'
import DemoGkDataTableSample07 from './DemoGkDataTableSample07.vue'
import DemoGkDataTableSample08 from './DemoGkDataTableSample08.vue'
import DemoGkDataTableSample09 from './DemoGkDataTableSample09.vue'
import DemoGkDataTableSample10 from './DemoGkDataTableSample10.vue'
import DemoGkDataTableSample01Doc from './DemoGkDataTableSample01Doc.vue'
import DemoGkDataTableSample02Doc from './DemoGkDataTableSample02Doc.vue'
import DemoGkDataTableSample03Doc from './DemoGkDataTableSample03Doc.vue'
import DemoGkDataTableSample04Doc from './DemoGkDataTableSample04Doc.vue'
import DemoGkDataTableSample05Doc from './DemoGkDataTableSample05Doc.vue'
import DemoGkDataTableSample06Doc from './DemoGkDataTableSample06Doc.vue'
import DemoGkDataTableSample07Doc from './DemoGkDataTableSample07Doc.vue'
import DemoGkDataTableSample08Doc from './DemoGkDataTableSample08Doc.vue'
import DemoGkDataTableSample09Doc from './DemoGkDataTableSample09Doc.vue'
import DemoGkDataTableSample10Doc from './DemoGkDataTableSample10Doc.vue'

const dataTableDemoComponents: Record<string, Component> = {
  DemoGkDataTableSample01,
  DemoGkDataTableSample02,
  DemoGkDataTableSample03,
  DemoGkDataTableSample04,
  DemoGkDataTableSample05,
  DemoGkDataTableSample06,
  DemoGkDataTableSample07,
  DemoGkDataTableSample08,
  DemoGkDataTableSample09,
  DemoGkDataTableSample10,
  DemoGkDataTableSample01Doc,
  DemoGkDataTableSample02Doc,
  DemoGkDataTableSample03Doc,
  DemoGkDataTableSample04Doc,
  DemoGkDataTableSample05Doc,
  DemoGkDataTableSample06Doc,
  DemoGkDataTableSample07Doc,
  DemoGkDataTableSample08Doc,
  DemoGkDataTableSample09Doc,
  DemoGkDataTableSample10Doc,
}

/**
 * Registers interactive GkDataTable cookbook demos for VitePress.
 * Also registers **DemoGkDataTable** as an alias of Sample 1 for backward compatibility.
 */
export function registerDataTableDemos(app: App) {
  for (const [name, component] of Object.entries(dataTableDemoComponents)) {
    app.component(name, component)
  }
  app.component('DemoGkDataTable', DemoGkDataTableSample01)
}
