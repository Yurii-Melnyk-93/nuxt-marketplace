import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

const product: Product = {
  id: 1,
  name: 'Wireless Headphones',
  price: 79.99,
  category: 'Electronics',
  description: 'Test product',
  image: 'test.jpg',
}

const otherProduct: Product = {
  id: 2,
  name: 'Coffee Grinder',
  price: 34.5,
  category: 'Kitchen',
  description: 'Test product',
  image: 'test.jpg',
}

describe('useCartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a new product with quantity 1', () => {
    const cart = useCartStore()
    cart.addItem(product)

    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]!.quantity).toBe(1)
    expect(cart.totalItems).toBe(1)
  })

  it('increments quantity when adding the same product again', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.addItem(product)

    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]!.quantity).toBe(2)
  })

  it('computes totalPrice across multiple products', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.addItem(otherProduct)
    cart.addItem(otherProduct)

    expect(cart.totalPrice).toBeCloseTo(79.99 + 34.5 * 2)
  })

  it('removes an item', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.removeItem(product.id)

    expect(cart.items).toHaveLength(0)
  })

  it('updates quantity', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.updateQuantity(product.id, 5)

    expect(cart.items[0]!.quantity).toBe(5)
  })

  it('removes the item when quantity is set to 0 or less', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.updateQuantity(product.id, 0)

    expect(cart.items).toHaveLength(0)
  })

  it('ignores non-finite quantity values (e.g. NaN)', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.updateQuantity(product.id, Number.NaN)

    expect(cart.items[0]!.quantity).toBe(1)
  })

  it('clears the cart', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.addItem(otherProduct)
    cart.clear()

    expect(cart.items).toHaveLength(0)
  })
})