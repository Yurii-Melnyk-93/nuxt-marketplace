import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SearchInput from '../components/SearchInput.vue'

describe('SearchInput', () => {
  it('does not show the clear button when empty', async () => {
    const wrapper = await mountSuspended(SearchInput, {
      props: { modelValue: '' },
    })

    expect(wrapper.find('button[aria-label="Clear search"]').exists()).toBe(false)
  })

  it('shows the clear button when there is a value', async () => {
    const wrapper = await mountSuspended(SearchInput, {
      props: { modelValue: 'phone' },
    })

    expect(wrapper.find('button[aria-label="Clear search"]').exists()).toBe(true)
  })

  it('emits an empty value when the clear button is clicked', async () => {
    const wrapper = await mountSuspended(SearchInput, {
      props: { modelValue: 'phone' },
    })

    await wrapper.find('button[aria-label="Clear search"]').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })
})