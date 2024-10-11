<script setup>
import { defineProps } from 'vue'

// Reçoit la prop is_sidebar_open
 
const props = defineProps({
  show_text: {
    type: Boolean,
    default: true // Valeur par défaut
  },
  color: {
    type: String,
    default: 'indigo' // Valeur par défaut
  }
})

</script>

<template>
  <RouterLink to="/" class="text-xl font-bold flex  gap-2" :class="'text-'+color+'-500'"> <i class="	fa fa-file text-md"></i> <span v-if="show_text" class="flex w-full">Kps Group</span></RouterLink>
</template>
<style >
</style>
