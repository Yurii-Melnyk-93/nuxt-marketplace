<script setup lang="ts">
const searchRaw = ref('')
const debouncedSearch = refDebounced(searchRaw, 300)

const categoryRaw = ref('')
const page = ref(1)
const limit = 6

const search = computed({
  get: () => searchRaw.value,
  set: (value: string) => {
    searchRaw.value = value
    page.value = 1
  },
})

const category = computed({
  get: () => categoryRaw.value,
  set: (value: string) => {
    categoryRaw.value = value
    page.value = 1
  },
})

const { data: categories } = await useFetch<string[]>('/api/categories')

const { data, status, error } = await useFetch<{
  items: Product[]
  total: number
  page: number
  limit: number
}>('/api/products', {
  query: computed(() => ({
    search: debouncedSearch.value,
    category: category.value,
    page: page.value,
    limit,
  })),
})

const products = computed(() => data.value?.items ?? [])
const totalPages = computed(() => Math.max(1, Math.ceil((data.value?.total ?? 0) / limit)))
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">Products</h1>

    <div class="mb-6 flex flex-col sm:flex-row gap-3">
      <BaseInput
        v-model="search"
        placeholder="Search products…"
        class="flex-1"
      />
      <BaseCombobox
        v-model="category"
        :options="categories ?? []"
        placeholder="All categories"
        class="sm:w-56"
      />
    </div>

    <p
      v-if="status === 'pending'"
      class="text-gray-500"
    >
      Loading products…
    </p>
    <p
      v-else-if="error"
      class="text-red-600"
    >
      Failed to load products.
    </p>
    <p
      v-else-if="products.length === 0"
      class="text-gray-500"
    >
      No products found.
    </p>

    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <div
        v-if="totalPages > 1"
        class="mt-8 flex items-center justify-center gap-4"
      >
        <button
          type="button"
          class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="page <= 1"
          @click="page--"
        >
          Previous
        </button>
        <span class="text-sm text-gray-500">Page {{ page }} of {{ totalPages }}</span>
        <button
          type="button"
          class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="page >= totalPages"
          @click="page++"
        >
          Next
        </button>
      </div>
    </template>
  </main>
</template>