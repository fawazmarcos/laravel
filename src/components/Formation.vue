<script setup>
defineProps({
  formation: Object

})
</script>

<template>
  <div class="rounded-2xl p-5 w-full flex items-center justify-between bg-indigo-100">
    <!-- designation -->
    <div class="flex flex-col gap-">
      <h3>{{ formation?.label }} ({{ formation?.year }})</h3>
      <p class="text-sm">{{ formation?.address }}</p>
    </div>
    <span></span>
  </div>
</template>

<style >
 
</style>
