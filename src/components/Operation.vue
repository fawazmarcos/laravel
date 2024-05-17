<script setup>
defineProps({
  label: String,
  value: String,
  isPositive: Boolean

})
</script>

<template>
  <div class="rounded-2xl p-5 w-full flex items-center justify-between bg-slate-100">
    <!-- designation -->
    <span>{{label}}</span>
    <span :class="isPositive ? 'text-green-700' : 'text-red-700'">{{value}}</span>
  </div>
</template>

<style >
 
</style>
