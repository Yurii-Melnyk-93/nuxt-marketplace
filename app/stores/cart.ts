interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: (): { items: CartItem[] } => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  },

  actions: {
    addItem(product: Product) {
      const existing = this.items.find((item) => item.product.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },

    removeItem(productId: number) {
      this.items = this.items.filter((item) => item.product.id !== productId)
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => item.product.id === productId)

      if (!item) return

      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
      }
    },

    clear() {
      this.items = []
    },
  },
})