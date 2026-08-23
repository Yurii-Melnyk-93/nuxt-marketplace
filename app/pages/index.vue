<script setup lang="ts">
const search = ref('')
const debouncedSearch = refDebounced(search, 300)
const category = ref('')

const { data: categories } = await useFetch<string[]>('/api/categories')

const { data: products, status, error } = await useFetch<Product[]>('/api/products', {
  query: computed(() => ({ search: debouncedSearch.value, category: category.value })),
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">Products</h1>

    <div class="mb-6 flex flex-col sm:flex-row gap-3">
      <input v-model="search" type="text" placeholder="Search products…"
        class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm">

      <select v-model="category" class="rounded-lg border border-gray-300 px-3 py-2 text-sm">
        <option value="">All categories</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <p v-if="status === 'pending'" class="text-gray-500">Loading products…</p>
    <p v-else-if="error" class="text-red-600">Failed to load products.</p>
    <p v-else-if="products?.length === 0" class="text-gray-500">No products found.</p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </main>
</template>