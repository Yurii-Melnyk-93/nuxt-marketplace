import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BaseDropdown from '../components/BaseDropdown.vue'

describe('BaseDropdown', () => {
  it('is closed by default', async () => {
    const wrapper = await mountSuspended(BaseDropdown)

    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })

  it('opens the menu when the trigger button is clicked', async () => {
    const wrapper = await mountSuspended(BaseDropdown)

    await wrapper.find('button').trigger('click')

    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
  })

  it('closes on Escape and returns focus to the trigger button', async () => {
    const wrapper = await mountSuspended(BaseDropdown, {
      attachTo: document.body,
    })

    const trigger = wrapper.find('button')
    await trigger.trigger('click')
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)

    await wrapper.trigger('keydown', { key: 'Escape' })

    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
    expect(document.activeElement).toBe(trigger.element)
  })
})