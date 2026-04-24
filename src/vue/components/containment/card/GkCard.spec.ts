import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GkCard from './GkCard.vue'

describe('GkCard', () => {
  it('renders default slot', () => {
    const w = mount(GkCard, {
      slots: { default: 'Card body' },
    })
    expect(w.text()).toContain('Card body')
  })

  it('uses anchor when href is set', () => {
    const w = mount(GkCard, {
      props: { href: '/x' },
      slots: { default: 'Link' },
    })
    expect(w.find('a[href="/x"]').exists()).toBe(true)
  })

  it('emits click for clickable card', async () => {
    const w = mount(GkCard, {
      props: { clickable: true },
      slots: { default: 'X' },
    })
    await w.find('.gk-card').trigger('click')
    expect(w.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent)
  })

  it('applies loading overlay', () => {
    const w = mount(GkCard, {
      props: { loading: true },
      slots: { default: 'Y' },
    })
    expect(w.find('.gk-card__loader').exists()).toBe(true)
  })

  it('applies variant class', () => {
    const w = mount(GkCard, {
      props: { variant: 'outlined' },
      slots: { default: 'Z' },
    })
    expect(w.find('.gk-card--outlined').exists()).toBe(true)
  })

  it('applies maxWidth style from prop', () => {
    const w = mount(GkCard, {
      props: { maxWidth: 320 },
      slots: { default: 'Q' },
    })
    const el = w.find('.gk-card')
    const style = (el.element as HTMLElement).style
    expect(style.maxWidth).toBe('320px')
  })
})
