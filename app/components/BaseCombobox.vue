<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  options: string[]
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const query = ref('')
const rootEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

const filteredOptions = computed(() =>
  props.options.filter((option) => option.toLowerCase().includes(query.value.toLowerCase()))
)

onClickOutside(rootEl, () => {
  isOpen.value = false
})

function open() {
  isOpen.value = true
  query.value = ''
}

function onInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value
  isOpen.value = true
}

function select(option: string) {
  emit('update:modelValue', option)
  isOpen.value = false
  query.value = ''
}

function close() {
  isOpen.value = false
  inputEl.value?.blur()
}
</script>

<template>
  <div ref="rootEl" class="relative">
    <div class="relative">
      <input ref="inputEl" type="text" :value="isOpen ? query : modelValue" :placeholder="placeholder"
        class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 text-sm text-gray-900" @focus="open"
        @input="onInput" @keydown.escape="close">
      <svg
        class="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-transform duration-150"
        :class="{ 'rotate-180': isOpen }" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd" />
      </svg>
    </div>

    <ul v-if="isOpen" role="listbox"
      class="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
      <li>
        <button type="button" role="option" :aria-selected="modelValue === ''"
          class="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
          :class="{ 'bg-gray-50 font-medium': modelValue === '' }" @click="select('')">
          {{ placeholder || 'All' }}
        </button>
      </li>
      <li v-for="option in filteredOptions" :key="option">
        <button type="button" role="option" :aria-selected="modelValue === option"
          class="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
          :class="{ 'bg-gray-50 font-medium': modelValue === option }" @click="select(option)">
          {{ option }}
        </button>
      </li>
      <li v-if="filteredOptions.length === 0" class="px-3 py-2 text-sm text-gray-400">
        No matches
      </li>
    </ul>
  </div>
</template>