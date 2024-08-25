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
       <h3 class="font-semibold text-3xl text-center mt-9">Inscription</h3>
       <form method="POST" @submit.prevent="register()" class="flex flex-col w-full md:w-1/2 gap-6 m-auto mt-5 px-5 md:px-0">
          <div class="flex flex-col gap-2">
            <label for="first_name">Nom</label>
            <input  type="text" v-model="user.first_name"  id="first_name" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="last_name">Prénom</label>
            <input  type="text" v-model="user.last_name" id="last_name" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="email" >Email</label>
            <input id="email" v-model="user.email" type="email" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="email">Mot de passe</label>
            <input type="password" v-model="user.password" class="rounded-lg border-black p-2 border ">
          </div> 
          <!-- boutton -->
          <button v-if="isValid"  type="submit" class="rounded-full w-full border p-3 bg-indigo-500 text-white hover:bg-indigo-500/80 duration-300">
            <span v-if="storeAuth.loading" class="loading loading-bars loading-md"></span>
            <span v-else>S'inscrire</span>
          </button>
          <span v-else class="rounded-full w-full border p-3 bg-indigo-500/40 text-white duration-300 text-center">S'inscrire</span>
          <!-- login -->
          <RouterLink class="text-center underline duration-300 hover:font-bold" to="/login">Déja insrit ? Connectes-toi</RouterLink>
       </form>
    </section>

  </div>
</template>

<script>
// use storeAuth to access the store
import { useAuthStore } from '@stores/auth'
export default {
  data() {
    return {
      user : {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      storeAuth: useAuthStore()
    }
  },
  computed: {
    isValid() {
      if(this.user.first_name!=='' && this.user.last_name !=='' && this.user.email !=='' && this.user.password !=='' ) {
        return true
      }
      return false
    }
  },
  methods: {
    async register() {
      await this.storeAuth.register(this.user)
    }
  }
}
</script>