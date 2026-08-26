<script setup lang="ts">
const route = useRoute()
const cart = useCartStore()
const { data: product, error } = await useFetch<Product>(() => `/api/products/${route.params.id}`)

useSeoMeta({
 title: () => product.value?.name ?? 'Product',
   description: () => product.value?.description,
  ogTitle: () => product.value?.name,
  ogDescription: () => product.value?.description,
  ogImage: () => product.value?.image,
  twitterCard: 'summary_large_image',
})


if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 404,
    statusMessage: 'Product not found',
    fatal: true,
  })
}

function addToCart() {
  if (product.value) {
    cart.addItem(product.value)
  }
}
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-8">
    <NuxtLink
      to="/"
      class="text-sm text-gray-500 hover:text-gray-700"
    >
      &larr; Back to catalog
    </NuxtLink>

    <div
      v-if="product"
      class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
    >
      <NuxtImg
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        width="400"
        height="300"
        loading="lazy"
        class="w-full rounded-xl object-cover"
      />

      <div>
        <span class="text-xs uppercase tracking-wide text-gray-400">{{ product.category }}</span>
        <h1 class="mt-1 text-2xl font-semibold text-gray-900">{{ product.name }}</h1>
        <p class="mt-4 text-2xl font-bold text-gray-900">{{ formatPrice(product.price) }}</p>
        <p class="mt-4 text-gray-600">{{ product.description }}</p>

        <button
          type="button"
          class="mt-6 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          @click="addToCart"
        >
          Add to cart
        </button>
      </div>
    </div>
  </main>
</template>