<script setup lang="ts">
const model = defineModel<string>({ default: '' })

defineProps<{
  placeholder?: string
}>()

const inputEl = ref<HTMLInputElement | null>(null)

function clear() {
  model.value = ''
  inputEl.value?.focus()
}
</script>

<template>
  <div class="relative">
    <svg
      class="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clip-rule="evenodd"
      />
    </svg>

    <input
      ref="inputEl"
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-8 text-sm"
    >

    <button
      v-if="model"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
      aria-label="Clear search"
      @click="clear"
    >
      <svg
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>