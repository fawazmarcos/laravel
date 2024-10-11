<template>
    <header class="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64">
      <nav class="flex basis-full items-center w-full mx-auto px-4 sm:px-6" aria-label="Global">
        <div class="me-5 lg:me-0 lg:hidden">
          <!-- Logo -->
         <Logo/>
          <!-- End Logo -->
        </div>

        <div class="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
          

          <div class="hidden sm:block">
            
          </div>

          <div class="flex flex-row items-center justify-end gap-2">
            

              <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center " v-if="storeAuth.user">
                <div class="flex flex-col justify-right">
                    <h3 class="font-bold text-md text-right">{{ storeAuth.user.first_name + " " + storeAuth.user.last_name }}</h3>
                    <span class="text-xs text-right">{{ storeAuth.user.role }}</span>
                </div>
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="flex items-center gap-2">
                    <div class="avatar cursor-pointer">
                      <div class="w-12 rounded-full bg-indigo-200">
                      <img :src="storeAuth.user.photo" class="m-auto" />
                      </div>
                    </div>
                    <i class="fa fa-chevron-down text-sm"></i>
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><RouterLink to="profil">Mon compte</RouterLink></li>
                    <li @click="logout()"><a>Déconnexion</a></li>
                </ul>
              </div>
                
            </div>
          </div>
        </div>
      </nav>
    </header>
</template>
<script>
import { useAuthStore } from '@stores/auth'

export default {
  // return data
  data() {
    return {
    storeAuth : useAuthStore(),
    };
  }, 

  // methods
  methods: { 
    logout() {
      this.storeAuth.logOut()
    }
  },
  mounted() {
    this.storeAuth.Me()
  }

}

</script>
  