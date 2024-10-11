<script setup>

import { defineProps } from 'vue'

const props = defineProps({
  lines: {
    type: Number,
    default: 3  
  },
  height: {
    type: Number,
    default: 8  
  }
})

</script>

<template>
    <div class="flex flex-col gap-2">
        <div v-for="i in lines" :key="i" class="w-full bg-gray-200 rounded-lg skeleton" :class="'h-'+height+''" ></div>
    </div>
</template> 