export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return queryProducts(products, {
    search: String(query.search ?? ''),
    category: String(query.category ?? ''),
    sort: String(query.sort ?? ''),
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 6,
  })
})