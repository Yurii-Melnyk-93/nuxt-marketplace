<script setup lang="ts">
const model = defineModel<string>({ default: '' })

const options = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

const currentLabel = computed(() => {
  if (model.value === 'price-asc') return 'Price: Low to High'
  if (model.value === 'price-desc') return 'Price: High to Low'
  return 'Sort by'
})

function select(value: string) {
  model.value = value
}
</script>

<template>
  <BaseDropdown menu-class="w-full">
    <template #trigger="{ toggle, isOpen }">
      <button
        type="button"
        class="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-50"
        :aria-expanded="isOpen"
        aria-haspopup="menu"
        @click="toggle"
      >
        <span>{{ currentLabel }}</span>
        <svg
          class="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-150"
          :class="{ 'rotate-180': isOpen }"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </template>

    <template #default="{ close }">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        role="menuitem"
        class="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
        :class="{ 'bg-gray-50 font-medium': model === option.value }"
        @click="() => { select(option.value); close() }"
      >
        {{ option.label }}
      </button>
    </template>
  </BaseDropdown>
</template>