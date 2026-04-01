import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import GkTab from './GkTab.vue'
import GkTabs from './GkTabs.vue'
import GkTabsWindowItem from './GkTabsWindowItem.vue'

describe('GkTabs', () => {
  it('selects first tab from items by default', async () => {
    const w = mount(GkTabs, {
      props: {
        items: ['a', 'b'],
      },
      attachTo: document.body,
    })
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['a'])
    await w.setProps({ modelValue: 'a' })
    expect(w.text()).toContain('a')
    expect(w.text()).toContain('b')
    w.unmount()
  })

  it('updates model when a tab is clicked', async () => {
    const w = mount(GkTabs, {
      props: {
        modelValue: 'a',
        items: ['a', 'b'],
      },
      attachTo: document.body,
    })
    const buttons = w.findAll('button[role="tab"]')
    expect(buttons.length).toBe(2)
    await buttons[1].trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual(['b'])
    w.unmount()
  })

  it('renders slot-based tabs and window items', async () => {
    const w = mount(GkTabs, {
      props: { modelValue: 1 },
      attachTo: document.body,
      slots: {
        default: () => [
          h(GkTab, { value: 1 }, () => 'One'),
          h(GkTab, { value: 2 }, () => 'Two'),
        ],
        window: () => [
          h(GkTabsWindowItem, { value: 1 }, () => h('div', { class: 'p1' }, 'Panel 1')),
          h(GkTabsWindowItem, { value: 2 }, () => h('div', { class: 'p2' }, 'Panel 2')),
        ],
      },
    })
    await w.vm.$nextTick()
    expect(w.find('.p1').exists()).toBe(true)
    expect(w.find('.p1').isVisible()).toBe(true)
    expect(w.find('.p2').exists()).toBe(true)
    expect(w.find('.p2').isVisible()).toBe(false)
    w.unmount()
  })

  it('skips disabled items while keyboard navigating', async () => {
    const w = mount(GkTabs, {
      props: {
        modelValue: 'one',
        items: [
          { text: 'One', value: 'one' },
          { text: 'Two', value: 'two', disabled: true },
          { text: 'Three', value: 'three' },
        ],
      },
      attachTo: document.body,
    })
    const buttons = w.findAll('button[role="tab"]')
    await buttons[0].trigger('keydown', { key: 'ArrowRight' })
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual(['three'])
    w.unmount()
  })
})
