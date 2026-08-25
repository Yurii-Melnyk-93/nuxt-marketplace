<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

function handleGoHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <div class="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <p class="text-sm font-medium uppercase tracking-wide text-gray-400">
        Error {{ error.statusCode }}
      </p>
      <h1 class="mt-2 text-2xl font-semibold text-gray-900">
        {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
      </h1>
      <p class="mt-2 max-w-md text-gray-600">
        {{
          error.statusCode === 404
            ? "We couldn't find the page you're looking for."
            : error.statusMessage || error.message || 'An unexpected error occurred.'
        }}
      </p>
      <button 
        type="button"
        class="mt-6 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        @click="handleGoHome"
      >
        Back to catalog
      </button>
    </div>

    <AppFooter />
  </div>
</template>