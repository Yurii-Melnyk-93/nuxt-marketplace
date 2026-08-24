import { describe, expect, it } from 'vitest'

describe('vitest + nuxt test environment', () => {
  it('has access to Vue auto-imports like ref, without an explicit import', () => {
    const count = ref(0)
    count.value++
    expect(count.value).toBe(1)
  })
})