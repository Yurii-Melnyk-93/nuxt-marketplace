export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    description: 'Over-ear Bluetooth headphones with active noise cancellation.',
    image: 'https://picsum.photos/seed/wireless-headphones/400/300',
  },
  {
    id: 2,
    name: 'Coffee Grinder',
    price: 34.5,
    category: 'Kitchen',
    description: 'Manual burr grinder for consistent, fresh coffee grounds.',
    image: 'https://picsum.photos/seed/coffee-grinder/400/300',
  },
  {
    id: 3,
    name: 'Yoga Mat',
    price: 22.0,
    category: 'Sports',
    description: 'Non-slip 6mm mat, ideal for yoga and home workouts.',
    image: 'https://picsum.photos/seed/yoga-mat/400/300',
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 89.0,
    category: 'Electronics',
    description: 'Hot-swappable mechanical keyboard with RGB backlight.',
    image: 'https://picsum.photos/seed/mechanical-keyboard/400/300',
  },
  {
    id: 5,
    name: 'Cast Iron Skillet',
    price: 45.0,
    category: 'Kitchen',
    description: 'Pre-seasoned 10-inch skillet, great for stovetop and oven.',
    image: 'https://picsum.photos/seed/cast-iron-skillet/400/300',
  },
  {
    id: 6,
    name: 'Running Shoes',
    price: 64.99,
    category: 'Sports',
    description: 'Lightweight running shoes with breathable mesh upper.',
    image: 'https://picsum.photos/seed/running-shoes/400/300',
  },
  {
    id: 7,
    name: 'The Silent Peak',
    price: 14.99,
    category: 'Books',
    description: 'A quiet, atmospheric novel about a mountain expedition.',
    image: 'https://picsum.photos/seed/the-silent-peak/400/300',
  },
  {
    id: 8,
    name: 'Cotton Hoodie',
    price: 39.99,
    category: 'Clothing',
    description: 'Soft cotton-blend hoodie, unisex fit, machine washable.',
    image: 'https://picsum.photos/seed/cotton-hoodie/400/300',
  },
  {
    id: 9,
    name: 'Building Blocks Set',
    price: 29.99,
    category: 'Toys',
    description: '250-piece building blocks set compatible with major brands.',
    image: 'https://picsum.photos/seed/building-blocks/400/300',
  },
  {
    id: 10,
    name: 'Scented Candle',
    price: 12.5,
    category: 'Home',
    description: 'Soy wax candle with a warm sandalwood and vanilla scent.',
    image: 'https://picsum.photos/seed/scented-candle/400/300',
  },
  {
    id: 11,
    name: 'Bluetooth Speaker',
    price: 49.99,
    category: 'Electronics',
    description: 'Portable waterproof speaker with 12-hour battery life.',
    image: 'https://picsum.photos/seed/bluetooth-speaker/400/300',
  },
  {
    id: 12,
    name: 'French Press',
    price: 27.0,
    category: 'Kitchen',
    description: 'Borosilicate glass French press, 1L capacity.',
    image: 'https://picsum.photos/seed/french-press/400/300',
  },
  {
    id: 13,
    name: 'Resistance Bands Set',
    price: 18.0,
    category: 'Sports',
    description: 'Set of 5 resistance bands with varying tension levels.',
    image: 'https://picsum.photos/seed/resistance-bands/400/300',
  },
  {
    id: 14,
    name: 'Everyday Meals Cookbook',
    price: 19.99,
    category: 'Books',
    description: 'Simple, budget-friendly recipes for weeknight cooking.',
    image: 'https://picsum.photos/seed/everyday-meals-cookbook/400/300',
  },
  {
    id: 15,
    name: 'Denim Jacket',
    price: 59.99,
    category: 'Clothing',
    description: 'Classic straight-fit denim jacket with button closure.',
    image: 'https://picsum.photos/seed/denim-jacket/400/300',
  },
  {
    id: 16,
    name: '1000-Piece Puzzle',
    price: 15.99,
    category: 'Toys',
    description: 'Landscape-themed jigsaw puzzle, 1000 pieces.',
    image: 'https://picsum.photos/seed/1000-piece-puzzle/400/300',
  },
]

export function queryProducts(
  allProducts: Product[],
  {
    search = '',
    category = '',
    sort = '',
    page = 1,
    limit = 6,
  }: {
    search?: string
    category?: string
    sort?: string
    page?: number
    limit?: number
  } = {},
) {
  const normalizedSearch = search.toLowerCase()
  const clampedLimit = Math.min(50, Math.max(1, limit))
  const clampedPage = Math.max(1, page)

  const filtered = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch)
    const matchesCategory = !category || product.category === category
    return matchesSearch && matchesCategory
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return 0
  })

  const total = sorted.length
  const start = (clampedPage - 1) * clampedLimit
  const items = sorted.slice(start, start + clampedLimit)

  return { items, total, page: clampedPage, limit: clampedLimit }
}