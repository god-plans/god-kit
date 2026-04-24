#!/usr/bin/env node
/**
 * Generates cli/templates/*.vue (passthrough wrappers) and cli/manifests/components.json.
 * Run from god-kit package root: node scripts/generate-cli-templates.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

/** @type {{ key: string; component: string; template: string }[]} */
const registry = [
  { key: 'button', component: 'GkButton', template: 'button/GkButton.vue' },
  { key: 'form', component: 'GkForm', template: 'form/gk-form/GkForm.vue' },
  { key: 'input', component: 'GkInput', template: 'form/input/GkInput.vue' },
  { key: 'field', component: 'GkField', template: 'form/field/GkField.vue' },
  { key: 'textarea', component: 'GkTextarea', template: 'form/textarea/GkTextarea.vue' },
  { key: 'checkbox', component: 'GkCheckbox', template: 'form/checkbox/GkCheckbox.vue' },
  { key: 'radio-group', component: 'GkRadioGroup', template: 'form/radio/GkRadioGroup.vue' },
  { key: 'radio', component: 'GkRadio', template: 'form/radio/GkRadio.vue' },
  { key: 'select', component: 'GkSelect', template: 'form/select/GkSelect.vue' },
  { key: 'alert', component: 'GkAlert', template: 'alert/GkAlert.vue' },
  { key: 'overlay', component: 'GkOverlay', template: 'containment/overlay/GkOverlay.vue' },
  { key: 'dialog', component: 'GkDialog', template: 'containment/dialog/GkDialog.vue' },
  { key: 'bottom-sheet', component: 'GkBottomSheet', template: 'containment/bottom-sheet/GkBottomSheet.vue' },
  { key: 'menu', component: 'GkMenu', template: 'containment/menu/GkMenu.vue' },
  { key: 'tooltip', component: 'GkTooltip', template: 'containment/tooltip/GkTooltip.vue' },
  {
    key: 'navigation-drawer',
    component: 'GkNavigationDrawer',
    template: 'containment/navigation-drawer/GkNavigationDrawer.vue',
  },
  { key: 'card', component: 'GkCard', template: 'containment/card/GkCard.vue' },
  { key: 'stack', component: 'GkStack', template: 'stack/GkStack.vue' },
  { key: 'container', component: 'GkContainer', template: 'container/GkContainer.vue' },
  { key: 'divider', component: 'GkDivider', template: 'divider/GkDivider.vue' },
  { key: 'spinner', component: 'GkSpinner', template: 'spinner/GkSpinner.vue' },
  {
    key: 'skeleton-loader',
    component: 'GkSkeletonLoader',
    template: 'feedback/skeleton-loader/GkSkeletonLoader.vue',
  },
  { key: 'snackbar', component: 'GkSnackbar', template: 'feedback/snackbar/GkSnackbar.vue' },
  { key: 'snackbar-host', component: 'GkSnackbarHost', template: 'feedback/snackbar/GkSnackbarHost.vue' },
  {
    key: 'expansion-panels',
    component: 'GkExpansionPanels',
    template: 'expansion/GkExpansionPanels.vue',
  },
  { key: 'expansion-panel', component: 'GkExpansionPanel', template: 'expansion/GkExpansionPanel.vue' },
  {
    key: 'expansion-panel-title',
    component: 'GkExpansionPanelTitle',
    template: 'expansion/GkExpansionPanelTitle.vue',
  },
  {
    key: 'expansion-panel-text',
    component: 'GkExpansionPanelText',
    template: 'expansion/GkExpansionPanelText.vue',
  },
  { key: 'tabs', component: 'GkTabs', template: 'navigation/tabs/GkTabs.vue' },
  { key: 'tab', component: 'GkTab', template: 'navigation/tabs/GkTab.vue' },
  { key: 'tabs-window', component: 'GkTabsWindow', template: 'navigation/tabs/GkTabsWindow.vue' },
  {
    key: 'tabs-window-item',
    component: 'GkTabsWindowItem',
    template: 'navigation/tabs/GkTabsWindowItem.vue',
  },
  { key: 'pagination', component: 'GkPagination', template: 'navigation/pagination/GkPagination.vue' },
  { key: 'table', component: 'GkTable', template: 'data-table/GkTable.vue' },
  { key: 'table-scroll', component: 'GkTableScroll', template: 'data-table/GkTableScroll.vue' },
  { key: 'data-table', component: 'GkDataTable', template: 'data-table/GkDataTable.vue' },
  {
    key: 'data-table-server',
    component: 'GkDataTableServer',
    template: 'data-table/GkDataTableServer.vue',
  },
  {
    key: 'data-table-virtual',
    component: 'GkDataTableVirtual',
    template: 'data-table/GkDataTableVirtual.vue',
  },
]

const buttonTemplate = `<script setup lang="ts">
import { GkButton } from 'god-kit/vue'

withDefaults(
  defineProps<{
    label?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    label: 'Button',
    variant: 'primary',
    loading: false,
    disabled: false,
  }
)
</script>

<template>
  <GkButton :variant="variant" :loading="loading" :disabled="disabled">
    <slot>{{ label }}</slot>
  </GkButton>
</template>
`

function passthroughTemplate(component) {
  return `<script setup lang="ts">
import { ${component} } from 'god-kit/vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <${component} v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData || {}" />
    </template>
  </${component}>
</template>
`
}

async function main() {
  const manifest = {
    version: 2,
    components: {},
  }

  for (const { key, component, template: rel } of registry) {
    const outPath = join(root, 'cli', 'templates', rel)
    await mkdir(dirname(outPath), { recursive: true })
    const body = key === 'button' ? buttonTemplate : passthroughTemplate(component)
    await writeFile(outPath, body, 'utf8')

    const fileName = rel.split('/').pop()
    manifest.components[key] = {
      description: `App-level wrapper around ${component} with forwarded attrs and slots.`,
      files: [{ template: rel, target: `component:${fileName}` }],
      deps: ['god-kit'],
    }
  }

  await writeFile(
    join(root, 'cli', 'manifests', 'components.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8'
  )

  console.log(`Wrote ${registry.length} templates and components.json`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
