<script setup>
// import page/admin component
import Dashboard from '@pages/Dashboard.vue'
import Resume from './Resume.vue';
</script>

<template>
  <div class="flex flex-col" v-if="storeAuth.getUser()">
    <Dashboard v-if="storeAuth.getUser() && storeAuth.getUser().role==='admin' "></Dashboard>
    <Resume v-else ></Resume> 
  </div>
</template>

<script>
import { useAuthStore } from '@stores/auth'
import { RouterLink } from 'vue-router';

export default {
  // return data
  data() {
    return {
    storeAuth : useAuthStore(),
    };
  },  

}
</script>