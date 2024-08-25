<script setup>

</script>

<template>
  <h3 class="font-semibold text-3xl">Bienvenue {{ storeAuth.getUser().first_name }} 🎉 </h3>
    <div class="grid grid-cols-3 gap-3" v-if="storeDashboard.stats">
    <div class="flex flex-col gap-4 rounded-lg border border-indigo-200 bg-white p-6 cursor-pointer hover:bg-indigo-100 duration-300">
      <div>
        <strong class="block text-sm font-medium text-gray-500 cursor-pointer hover:bg-indigo-100 duration-300">Utilisateurs </strong>
        <p> <span class="text-2xl font-medium text-gray-900"> 
          {{ storeDashboard.stats.users }} 
        </span> </p>
      </div>
    </div>
    <div class="flex flex-col gap-4 rounded-lg border border-indigo-200 bg-white p-6 cursor-pointer hover:bg-indigo-100 duration-300">
      <div>
        <strong class="block text-sm font-medium text-gray-500 ">Entreprises </strong>
        <p> <span class="text-2xl font-medium text-gray-900"> 
          {{ storeDashboard.stats.entreprises }} 
        </span> </p>
      </div>
    </div>
    <div class="flex flex-col gap-4 rounded-lg border border-indigo-200 bg-white p-6 cursor-pointer hover:bg-indigo-100 duration-300">
      <div>
        <strong class="block text-sm font-medium text-gray-500">Profils </strong>
        <p> <span class="text-2xl font-medium text-gray-900"> 
          {{ storeDashboard.stats.profils }} 
        </span> </p>
      </div>
    </div>
    </div>
    <div class="flex flex-col gap-4" v-if="storeDashboard.last_data">
      <H4 class="font-semibold text-xl">Derniers profils ajoutés</H4>
      <div class="grid grid-cols-2  gap-3">
        <a :href="profil.linkedin" class="rounded hover:bg-indigo-100 duration-300 p-2 border flex border-indigo-300 " v-for="profil in storeDashboard.last_data.profils" :key="profil.id">{{ profil.first_name + ' ' +  profil.last_name }}</a>
      </div>
    </div>
    <div class="flex flex-col gap-4" v-if="storeDashboard.last_data">
      <H4 class="font-semibold text-xl">Dernières entreprises ajoutées</H4>
      <div class="grid grid-cols-2 gap-3">
        <span class="rounded p-2 border border-indigo-300 " v-for="entreprise in storeDashboard.last_data.entreprises" :key="entreprise.id">{{ entreprise.name }}</span>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'
// auth store
import { useAuthStore } from '@stores/auth'
import { useDashboardStore } from '@stores/dashboard'

export default {
  // return data
  data() {
    return {
     page: 'dashboard',
     stats : [
        {label: 'Profit', value: '350,300 XOF', percent: '67.81%', isPositive: true},
        {label: 'En rupture de stock', value: '32', percent: '67.81%', isPositive: false},
        {label: 'Stock utilisé', value: '50%', percent: '50%', isPositive: false},
        {label: 'Produits en stock', value: '32', percent: '67.81%', isPositive: true},
     ],
    operations: [
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: true},
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: false},
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: true},
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: true},
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: false},
    ],
    storeAuth : useAuthStore(),
    storeDashboard: useDashboardStore()
    
    };
  }, 

  // methods
  methods: {
    changePage(page) {
      this.page = page
    }
  },
  mounted() {
    // this.storeAuth.Me()
    this.storeDashboard.getStats()
    this.storeDashboard.getLastData()
  },

}
</script>
