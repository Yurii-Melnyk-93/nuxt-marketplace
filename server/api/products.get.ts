export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = String(query.search ?? '').toLowerCase()
  const category = String(query.category ?? '')

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search)
    const matchesCategory = !category || product.category === category
    return matchesSearch && matchesCategory
  })
})