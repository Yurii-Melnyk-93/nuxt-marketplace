<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  category: string
  description?: string
  image?: string
}

const { data: products, status, error } = await useFetch<Product[]>('/api/products')
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">Products</h1>

    <p v-if="status === 'pending'" class="text-gray-500">Loading products…</p>
    <p v-else-if="error" class="text-red-600">Failed to load products.</p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </main>
</template>