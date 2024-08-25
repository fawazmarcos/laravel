<template>
  <div class="flex w-full">
    <section class="container mx-auto">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800">Connexion</h1>
          </div>

          <div class="mt-5"> 
            <!-- Form -->
            <form>
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label for="email" class="block text-sm mb-2">Email</label>
                  <div class="relative">
                    <input type="email" id="email" name="email" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error">
                  </div>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div>
                  <div class="flex justify-between items-center">
                    <label for="password" class="block text-sm mb-2">Mot de passe</label>
                    <a class="text-sm text-indigo-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                  </div>
                  <div class="relative">
                    <input type="password" id="password" name="password" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 " required aria-describedby="password-error">
                  </div>
                </div>
                <!-- End Form Group --> 
                <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 ">Se connecter</button>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
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
        email: 'dev@yopmail.com',
        password: 'azertyuiop'
      },
      storeAuth: useAuthStore()
    }
  },
  computed: {
    isValid() {
      if( this.user.email !=='' && this.user.password !=='' ) {
        return true
      }
      return false
    }
  },
  methods: {
    async login() {
      await this.storeAuth.login(this.user)
    }
  }
}
</script>