<template>
  <div class="flex w-full">
    <section class=" min-w-6xl flex flex-col m-auto ">
       <!-- header -->
       <div class="flex w-[900px] py-5  min-w-5xl m-auto justify-between items-center   px-5 md:px-0">
         <!-- logo -->
         <logo />
         <!-- actions -->
         <close />
       </div>
       <!-- form -->
       <h3 class="font-semibold text-3xl text-center mt-9">Nouveau mot de passe</h3>
       <form method="POST" @submit.prevent="updatePasswordCode()" class="flex flex-col w-full md:w-1/2 gap-6 m-auto mt-5 px-5 md:px-0">
          <div class="flex flex-col gap-2">
            <label for="code">Code</label>
            <input type="number" v-model="data.code" id="code" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="data.password" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="password2">Confirmez votre mot de passe</label>
            <input type="password" id="password2" v-model="data.password2" class="rounded-lg border-black p-2 border ">
          </div>
          <span class="w-full text-center text-red-500" v-if="!isValidPasssword">Mots de passes différents</span>
          <button v-if="isValid"  type="submit" class="rounded-full w-full border p-3 bg-indigo-500 text-white hover:bg-indigo-500/80 duration-300">
            <span v-if="storeAuth.loading" class="loading loading-bars loading-md"></span>
            <span v-else>Mettre à jour</span>
          </button>
          <span v-else class="rounded-full w-full border p-3 bg-indigo-500/40 text-white duration-300 text-center">Mettre à jour</span>
       </form>
    </section>

  </div>
</template>

<script>
import { useAuthStore } from '@stores/auth'
export default {
  data() {
    return {
      data : {
        code: '',
        password: '',
        password2: ''
      },
      storeAuth: useAuthStore()
    }
  },
  computed: {
    isValidPasssword(){
      if( this.data.password2 === this.data.password ){
        return true
      }
      return false
    
    },
    isValid() {
      if(this.data.code != '' && this.isValidPasssword && this.data.password != '' && this.data.password2 != '' && this.data.password.length > 6 && this.data.password2.length > 6 ){
        return true
      }
      return false
    },
    
  },
  methods: {
    async updatePasswordCode() {
      await this.storeAuth.updatePasswordCode(this.data)
    },
  }
}
</script>