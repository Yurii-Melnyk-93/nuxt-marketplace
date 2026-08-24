<script setup lang="ts">
const model = defineModel<string>({ default: '' })

defineProps<{
  placeholder?: string
  type?: string
}>()
</script>

<template>
  <input
    v-model="model"
    :type="type ?? 'text'"
    :placeholder="placeholder"
    class="rounded-lg border border-gray-300 px-3 py-2 text-sm"
  >
</template>