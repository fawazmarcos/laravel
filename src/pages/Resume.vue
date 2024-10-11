<script setup>
// import page/admin component

import AdminPage from '@pages/resume/Admin.vue'
import InteretPage from '@pages/resume/Interet.vue'
import CompetencePage from '@pages/resume/Competence.vue'
import CompetenceMetierPage from '@pages/resume/CompetenceMetier.vue'
import CompetenceTechPage from '@pages/resume/CompetenceTech.vue'
import ExperiencePage from '@pages/resume/Experience.vue'
import FormationPage from '@pages/resume/Formation.vue'
import CertificationPage from '@pages/resume/Certification.vue'
import ExpertisePage from '@pages/resume/Expertise.vue'


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
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='admin' ? 'font-semibold' : ''" @click="changePage('admin')">
           <i class="fa fa-house"></i>
           <span>Accueil</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='formations' ? 'font-semibold' : ''" @click="changePage('formations')">
           <i class="fa-solid fa-money-bill"></i>
           <span>Formations</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='experiences' ? 'font-semibold' : ''" @click="changePage('experiences')">
           <i class="fa-solid fa-piggy-bank"></i>
           <span>Expériences</span>
         </div>
         
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='certifications' ? 'font-semibold' : ''" @click="changePage('certifications')">
           <i class="fa fa-users"></i>
           <span>Certifications</span>
         </div>
         <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='expertises' ? 'font-semibold' : ''" @click="changePage('expertises')">
           <i class="fa fa-user"></i>
           <span>Expertises</span>
         </div>
          <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='mskills' ? 'font-semibold' : ''" @click="changePage('mskills')">
            <i class="fa fa-pills"></i>
            <span>C. Métiers</span>
          </div>
          <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='tskills' ? 'font-semibold' : ''" @click="changePage('tskills')">
            <i class="fa fa-pills"></i>
            <span>C. Techniques</span>
          </div>
          <div class="flex items-center gap-3 rounded p-2 hover:font-semibold duration-300 text-xl cursor-pointer " :class="page==='interets' ? 'font-semibold' : ''" @click="changePage('interets')">
            <i class="fa fa-pills"></i>
            <span>Intérêts</span>
          </div>
       </div>
     </div>
     <!-- content -->
     <div class="w-full md:w-3/4 flex flex-col gap-4  px-20 max-h-screen overflow-y-auto pb-9">
       <AdminPage v-if="page==='admin'" />
      <FormationPage v-if="page==='formations'" />
      <ExperiencePage v-if="page==='experiences'" />
      <CertificationPage v-if="page==='certifications'" />
      <ExpertisePage v-if="page==='expertises'" />
      <CompetencePage v-if="page==='competences'" />
      <CompetenceMetierPage v-if="page==='mskills'" />
      <CompetenceTechPage v-if="page==='tskills'" />
      <InteretPage v-if="page==='interets'" />
        
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
     page: 'admin',
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