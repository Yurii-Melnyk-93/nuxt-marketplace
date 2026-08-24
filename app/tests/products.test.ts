import { describe, expect, it } from 'vitest'
import { queryProducts } from '../../server/utils/product'

const fixture: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics', description: '', image: '' },
  { id: 2, name: 'Coffee Grinder', price: 34.5, category: 'Kitchen', description: '', image: '' },
  { id: 3, name: 'Yoga Mat', price: 22.0, category: 'Sports', description: '', image: '' },
  { id: 4, name: 'Wireless Speaker', price: 49.99, category: 'Electronics', description: '', image: '' },
]

describe('queryProducts', () => {
  it('returns all products when no filters are applied', () => {
    const result = queryProducts(fixture, {})
    expect(result.total).toBe(4)
    expect(result.items).toHaveLength(4)
  })

  it('filters by search (case-insensitive, matches name)', () => {
    const result = queryProducts(fixture, { search: 'wireless' })
    expect(result.total).toBe(2)
    expect(result.items.map((p) => p.id)).toEqual([1, 4])
  })

  it('filters by category', () => {
    const result = queryProducts(fixture, { category: 'Electronics' })
    expect(result.total).toBe(2)
    expect(result.items.every((p) => p.category === 'Electronics')).toBe(true)
  })

  it('combines search and category filters', () => {
    const result = queryProducts(fixture, { search: 'yoga', category: 'Sports' })
    expect(result.total).toBe(1)
    expect(result.items[0]!.id).toBe(3)
  })

  it('paginates results', () => {
    const page1 = queryProducts(fixture, { limit: 2, page: 1 })
    const page2 = queryProducts(fixture, { limit: 2, page: 2 })

    expect(page1.items.map((p) => p.id)).toEqual([1, 2])
    expect(page2.items.map((p) => p.id)).toEqual([3, 4])
    expect(page1.total).toBe(4)
  })

  it('clamps limit to a maximum of 50', () => {
    const result = queryProducts(fixture, { limit: 9999 })
    expect(result.limit).toBe(50)
  })

  it('clamps page to a minimum of 1', () => {
    const result = queryProducts(fixture, { page: -5 })
    expect(result.page).toBe(1)
  })
})