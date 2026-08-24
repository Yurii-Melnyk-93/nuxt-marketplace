<script setup lang="ts">
const cart = useCartStore()
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-8">
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">Your cart</h1>

    <p v-if="cart.items.length === 0" class="text-gray-500">Your cart is empty.</p>

    <div v-else class="space-y-4">
      <div v-for="item in cart.items" :key="item.product.id"
        class="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
        <img :src="item.product.image" :alt="item.product.name" class="h-16 w-16 rounded-lg object-cover">

        <div class="flex-1">
          <h2 class="font-medium text-gray-900">{{ item.product.name }}</h2>
          <p class="text-sm text-gray-500">${{ item.product.price.toFixed(2) }}</p>
        </div>

        <div class="flex items-center gap-2">
          <button type="button"
            class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="item.quantity <= 1" @click="cart.updateQuantity(item.product.id, item.quantity - 1)">
            −
          </button>
          <span class="w-6 text-center text-sm">{{ item.quantity }}</span>
          <button type="button"
            class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            @click="cart.updateQuantity(item.product.id, item.quantity + 1)">
            +
          </button>
        </div>

        <p class="w-20 text-right font-medium text-gray-900">
          ${{ (item.product.price * item.quantity).toFixed(2) }}
        </p>

        <button type="button" class="text-sm text-red-600 hover:text-red-700" @click="cart.removeItem(item.product.id)">
          Remove
        </button>
      </div>

      <div class="flex items-center justify-between border-t border-gray-200 pt-4">
        <button type="button" class="text-sm text-gray-500 hover:text-gray-700" @click="cart.clear()">
          Clear cart
        </button>
        <p class="text-lg font-semibold text-gray-900">Total: ${{ cart.totalPrice.toFixed(2) }}</p>
      </div>
    </div>
  </main>
</template>