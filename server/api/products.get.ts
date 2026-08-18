export default defineEventHandler(async (event) => {
  return [
    { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics' },
    { id: 2, name: 'Coffee Grinder', price: 34.5, category: 'Kitchen' },
    { id: 3, name: 'Yoga Mat', price: 22.0, category: 'Sports' },
  ]
})