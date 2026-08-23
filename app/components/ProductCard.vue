<script setup lang="ts">
const props = defineProps<{ product: Product }>()

const cart = useCartStore()

function addToCart() {
  cart.addItem(props.product)
}
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
    <NuxtLink :to="`/products/${product.id}`">
      <img v-if="product.image" :src="product.image" :alt="product.name" class="h-40 w-full object-cover">
      <div class="p-4">
        <span class="text-xs uppercase tracking-wide text-gray-400">{{ product.category }}</span>
        <h2 class="mt-1 font-medium text-gray-900">{{ product.name }}</h2>
        <p class="mt-2 text-lg font-semibold text-gray-900">${{ product.price.toFixed(2) }}</p>
      </div>
    </NuxtLink>

    <div class="px-4 pb-4">
      <button type="button"
        class="w-full rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
        @click="addToCart">
        Add to cart
      </button>
    </div>
  </div>
</template>