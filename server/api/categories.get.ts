export default defineEventHandler(async (event) => {
  return [...new Set(products.map((p) => p.category))]
})