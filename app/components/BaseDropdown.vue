<script setup lang="ts">
const isOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)

onClickOutside(rootEl, () => {
  isOpen.value = false
})

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function closeAndRefocus() {
  isOpen.value = false
  rootEl.value?.querySelector('button')?.focus()
}

defineExpose({ close })
</script>

<template>
  <div
    ref="rootEl"
    class="relative inline-block"
    @keydown.escape="closeAndRefocus"
  >
    <slot
      name="trigger"
      :toggle="toggle"
      :is-open="isOpen"
    >
      <button
        type="button"
        class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
        :aria-expanded="isOpen"
        aria-haspopup="menu"
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
    </slot>

    <div
      v-if="isOpen"
      role="menu"
      class="absolute right-0 z-30 mt-1 min-w-[10rem] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
    >
      <slot :close="close" />
    </div>
  </div>
</template>