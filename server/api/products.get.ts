export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = String(query.search ?? '').toLowerCase()
  const category = String(query.category ?? '')
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.max(1, Number(query.limit) || 6)

  const filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search)
    const matchesCategory = !category || product.category === category
    return matchesSearch && matchesCategory
  })

  const total = filtered.length
  const start = (page - 1) * limit
  const items = filtered.slice(start, start + limit)

  return { items, total, page, limit }
})