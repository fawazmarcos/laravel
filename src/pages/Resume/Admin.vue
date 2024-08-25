<script setup>
</script>

<template>
  <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
          <h2 class="text-2xl font-semibold">Mes CVs</h2>
          <span  onclick="new_cvs.showModal()" class="bg-indigo-700 text-white rounded px-4 py-2 cursor-pointer  hover:font-bold duration-300">Ajouter</span>
      </div>
      <!-- operations -->
      <div class="flex flex-col gap-3">
        <div   class="rounded p-5 w-full flex items-center justify-between bg-indigo-100" >
          <!-- designation -->
          <h3> <strong>KNTYE</strong> </h3>
          <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><span @click="openEditModal(mskill)">Modifier</span></li>
                  <li><span @click="deleteUserMeta(mskill.id)" class="hover:bg-red-100">Supprimer</span></li>
              </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
// auth store
import { useAuthStore } from '@stores/auth'

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
    
    };
  }, 

  // methods
  methods: {
    changePage(page) {
      this.page = page
    }
  },
  mounted() {
    this.storeAuth.Me()
  }

}
</script>
