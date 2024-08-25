<template>
  <span @click="close()" class="cursor-pointer text-lg rounded-full py-1  px-3 hover:bg-indigo-100"><i class="fa fa-close"></i></span>
</template>
<script>
export default {
  data() {
    return {
      prevRoute: '',
    }
  }, 
  mounted() {
  }, 
  methods: {
    close() {
      this.$router.go(-1);
    }
  }
  
}
</script>
