<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  category: string
  description?: string
  image?: string
}

defineProps<{ product: Product }>()
</script>

<template>
  <NuxtLink :to="`/products/${product.id}`"
    class="block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
    <img v-if="product.image" :src="product.image" :alt="product.name" class="h-40 w-full object-cover">
    <div class="p-4">
      <span class="text-xs uppercase tracking-wide text-gray-400">{{ product.category }}</span>
      <h2 class="mt-1 font-medium text-gray-900">{{ product.name }}</h2>
      <p class="mt-2 text-lg font-semibold text-gray-900">${{ product.price.toFixed(2) }}</p>
    </div>
  </NuxtLink>
</template>