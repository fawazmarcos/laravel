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
       <h3 class="font-semibold text-3xl text-center mt-9">Réinitialisation du mot de passe</h3>
       <form method="POST" @submit.prevent="forgotPassword()" class="flex flex-col w-full md:w-1/2 gap-6 m-auto mt-5 px-5 md:px-0">
          <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <input type="email" v-model="data.email" class="rounded-lg border-black p-2 border ">
          </div>
          <button v-if="isValid"  type="submit" class="rounded-full w-full border p-3 bg-indigo-500 text-white hover:bg-indigo-500/80 duration-300">
            <span v-if="storeAuth.loading" class="loading loading-bars loading-md"></span>
            <span v-else>Envoyez le code</span>
          </button>
          <span v-else class="rounded-full w-full border p-3 bg-indigo-500/40 text-white duration-300 text-center">Envoyez le code</span>
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
        email: '',
      },
      storeAuth: useAuthStore()
    }
  },
  computed: {
    isValid() {
      if(this.data.email != ''){
        return true
      }
      return false
    }
  },
  methods: {
    async forgotPassword() {
      await this.storeAuth.forgotPassword(this.data)
    },
  }
}
</script>