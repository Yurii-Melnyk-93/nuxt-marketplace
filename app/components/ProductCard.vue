<script setup lang="ts">
const props = defineProps<{ product: Product }>()

const cart = useCartStore()
const { copy, copied } = useClipboard()

function addToCart() {
  cart.addItem(props.product)
}

function copyLink() {
  copy(`${window.location.origin}/products/${props.product.id}`)
}
</script>

<template>
  <div class="relative rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
    <div class="absolute right-2 top-2 z-10">
      <BaseDropdown>
        <template #trigger="{ toggle }">
          <button
            type="button"
            class="rounded-full bg-white/90 p-1.5 text-gray-600 shadow hover:bg-white"
            @click="toggle"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 100-4 2 2 0 000 4zM10 12a2 2 0 100-4 2 2 0 000 4zM10 18a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </template>

        <template #default="{ close }">
          <NuxtLink
            :to="`/products/${product.id}`"
            class="block px-3 py-2 text-left text-sm hover:bg-gray-100"
            @click="close"
          >
            View details
          </NuxtLink>
          <button
            type="button"
            class="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
            @click="() => { copyLink(); close() }"
          >
            {{ copied ? 'Copied!' : 'Copy link' }}
          </button>
        </template>
      </BaseDropdown>
    </div>

    <NuxtLink
      :to="`/products/${product.id}`"
      class="block overflow-hidden rounded-t-xl"
    >
      <NuxtImg
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        width="400"
        height="300"
        loading="lazy"
        class="h-40 w-full object-cover"
      />
      <div class="p-4">
        <span class="text-xs uppercase tracking-wide text-gray-400">{{ product.category }}</span>
        <h2 class="mt-1 font-medium text-gray-900">{{ product.name }}</h2>
        <p class="mt-2 text-lg font-semibold text-gray-900">{{ formatPrice(product.price) }}</p>
      </div>
    </NuxtLink>

    <div class="px-4 pb-4">
      <button
        type="button"
        class="w-full rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
        @click="addToCart"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>