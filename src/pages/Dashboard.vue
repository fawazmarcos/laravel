<script setup>
import Dashboard from '@pages/admin/Dashboard.vue' 
import Entreprise from '@pages/admin/Entreprise.vue'
import Profil from '@pages/admin/Profil.vue'
import User  from '@pages/admin/User.vue'


</script>

<template>
 <div class="w-full flex flex-col max-h-screen" v-if="storeAuth.user">
   <div class="w-full py-12 flex justify-between px-20">
     <div class="text-center sm:text-left">
       <!-- logo -->
       <h3 class="text-3xl font-bold text-indigo-500 gap-2"> <i class="	fa fa-file text-md"></i> <span>Resume</span></h3>
     </div>
    <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center ">
       <div class="flex flex-col justify-right">
           <h3 class="font-bold text-md text-right">{{ storeAuth.user.first_name + " " + storeAuth.user.last_name }}</h3>
           <span class="text-xs text-right">Consultant</span>
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
           <li><a>Paramètres</a></li>
           <li @click="logout()"><a>Déconnexion</a></li>
         </ul>
        </div>
       
    </div>
  
   </div>
   <div class="flex w-full gap-4 max-h-screen overflow-y-auto ">
     <!-- sidebar -->
     <div class="flex flex-col gap-4  px-20 w-full md:w-1/4">
        <!-- menu -->
       <div class="flex flex-col gap-3  ">
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='dashboard' ? 'font-semibold' : ''" @click="changePage('dashboard')">
           <i class="fa fa-house"></i>
           <span>Dashboard</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='profil' ? 'font-semibold' : ''" @click="changePage('profil')">
           <i class="fa fa-users"></i>
           <span>Profils</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='entreprise' ? 'font-semibold' : ''" @click="changePage('entreprise')">
           <i class="fa fa-building"></i>
           <span>Entreprises</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='user' ? 'font-semibold' : ''" @click="changePage('user')">
           <i class="fa fa-users"></i>
           <span>Utilisateurs</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='talents' ? 'font-semibold' : ''" @click="changePage('talents')">
           <i class="fa-solid fa-user"></i>
           <span class="flex items-center gap-3">Talents <span class="text-xs bg-yellow-400 rounded p-1 text-white">v2</span></span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='besoins' ? 'font-semibold' : ''" @click="changePage('besoins')">
           <i class="fa-solid fa-piggy-bank"></i>
           <span class="flex items-center gap-3">Besoins <span class="text-xs bg-yellow-400 rounded p-1 text-white">v2</span></span>
         </div>
        
       </div>
     </div>
     <!-- content -->
     <div class="w-full md:w-3/4 flex flex-col gap-4  px-20 max-h-screen overflow-y-auto pb-9">
      <Dashboard v-if="page==='dashboard'" />
      <Entreprise v-if="page==='entreprise'" />
      <Profil v-if="page==='profil'" />
      <User v-if="page==='user'" />
     </div>
   </div>
 </div>
</template>

<script>
import { useAuthStore } from '@stores/auth'
import { RouterLink } from 'vue-router';

export default {
  // return data
  data() {
    return {
     page: 'dashboard',
    storeAuth : useAuthStore(),

    };
  }, 

  // methods
  methods: {
    changePage(page) {
      this.page = page
    },
    logout() {
      this.storeAuth.logOut()
    }
  },
  mounted() {
    this.storeAuth.Me()
  }

}
</script>