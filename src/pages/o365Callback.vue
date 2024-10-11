 

<template>
  <div class="flex w-full min-h-screen">
    <Loading />
  </div>
</template>

<script>
// mounted route path
import { useAuthStore } from '@stores/auth'
export default {
  data() {
    return {
      path: '',
      storeAuth : useAuthStore(),
    }
  }, 
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')
    if(code){
      this.storeAuth.confirmO365Code(code)
    }
  }
}
 
</script>