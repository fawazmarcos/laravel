<script setup>
defineProps({
  label: String,
  value: String,
})
</script>

<template>
    <div class="flex flex-col gap-4 rounded-lg border border-indigo-200 bg-white p-6">
      <!-- percent -->
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
