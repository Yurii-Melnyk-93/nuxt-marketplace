<script setup lang="ts">
const cart = useCartStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-gray-900">Marketplace</NuxtLink>
        <NuxtLink to="/cart" class="text-sm font-medium text-gray-700 hover:text-gray-900">
          Cart ({{ cart.totalItems }})
        </NuxtLink>
      </div>
    </header>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>