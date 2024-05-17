<script setup>
// import page/admin component

import AdminPage from '@pages/Dashboard/Admin.vue'
// caisse page
import CaissePage from '@pages/Dashboard/Caisse.vue'
</script>

<template>
 <div class="w-full flex flex-col max-h-screen">
   <div class="w-full py-12 flex justify-between px-20">
     <div class="text-center sm:text-left">
       <!-- logo -->
       <h3 class="text-3xl font-bold text-blue-500 gap-2"> <i class="	fa fa-stethoscope text-md"></i> <span>Clinica</span></h3>
     </div>
     <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center ">
       <div class="flex flex-col justify-right">
           <h3 class="font-bold text-md text-right">Gilles AKAKPO</h3>
           <span class="text-xs text-right">Administrateur</span>
       </div>
       <div class="dropdown dropdown-end">
         <div tabindex="0" role="button" class="flex items-center gap-2">
           <div class="avatar cursor-pointer">
             <div class="w-12 rounded-full">
               <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
             </div>
           </div>
           <i class="fa fa-chevron-down text-sm"></i>
         </div>
         <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
           <li><a>Mon compte</a></li>
           <li><a>Paramètres</a></li>
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
           <span>Tableau de bord</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='caisse' ? 'font-semibold' : ''" @click="changePage('caisse')">
           <i class="fa-solid fa-piggy-bank"></i>
           <span>Caisse</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='factures' ? 'font-semibold' : ''" @click="changePage('factures')">
           <i class="fa-solid fa-money-bill"></i>
           <span>Facture</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='clients' ? 'font-semibold' : ''" @click="changePage('clients')">
           <i class="fa fa-users"></i>
           <span>Clients</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='users' ? 'font-semibold' : ''" @click="changePage('users')">
           <i class="fa fa-user"></i>
           <span>Utilisateurs</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='produits' ? 'font-semibold' : ''" @click="changePage('produits')">
           <i class="fa fa-pills"></i>
           <span>Produits</span>
         </div>
       </div>
     </div>
     <!-- content -->
     <div class="w-full md:w-3/4 flex flex-col gap-4  px-20 max-h-screen overflow-y-auto pb-9">
       <AdminPage v-if="page==='dashboard'" />
       <CaissePage v-if="page==='caisse'" />
     </div>
   </div>
 </div>
</template>

<script>
import { ref } from 'vue'

export default {
  // return data
  data() {
    return {
     page: 'dashboard'
    };
  }, 

  // methods
  methods: {
    changePage(page) {
      this.page = page
    }
  }

}
</script>