<script setup>
defineProps({
  label: String,
  value: String,
  percent : String,
  isPositive: Boolean

})
</script>

<template>
    <div class="flex flex-col gap-4 rounded-lg border border-blue-200 bg-white p-6">
      <!-- percent -->
      <div class="inline-flex gap-2 self-end rounded p-1 " :class="isPositive ? 'bg-green-100  text-green-600' : 'bg-red-100  text-red-600'">
          <svg v-if="isPositive" xmlns="http://www.w3.org/2000/svg"  class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
          </svg>
          <svg v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
          <span class="text-xs font-medium"> {{ percent }} </span>
      </div>
      <div>
          <strong class="block text-sm font-medium text-gray-500"> {{ label }} </strong>
          <p>
          <span class="text-2xl font-medium text-gray-900"> {{ value }} </span>
          </p>
      </div>
  </div>
</template>

<style >
 
</style>
