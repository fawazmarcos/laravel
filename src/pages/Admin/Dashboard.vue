<script setup>

</script>

<template>
  <Dashboard>
    <template #content>
      <h3 class="font-semibold text-3xl">Tableau de bord</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" v-if="!storeDashboard.loading_stats">
        <!-- Card -->
        <RouterLink to="/users" class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Utilisateurs
              </p>
            </div>
            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ storeDashboard.stats.users }} 
              </h3>
            </div>
          </div>
        </RouterLink>
        <!-- End Card -->

        <!-- Card -->
        <RouterLink to="/entreprises" class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Entreprises
              </p>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ storeDashboard.stats.entreprises }} 
              </h3>
            </div>
          </div>
        </RouterLink>
        <!-- End Card -->
        <!-- Card -->
        <RouterLink to="/profils" class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Profils scrappés
              </p>
            </div>
            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ storeDashboard.stats.profils }} 
              </h3>
            </div>
          </div>
        </RouterLink>
        <!-- Card -->
        <RouterLink to="/candidats" class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Candidats
              </p>
            </div>
            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ storeDashboard.stats.candidats }} 
              </h3>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/offers" class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Offres en cours
              </p>
            </div>
            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ storeDashboard.stats.open_offers }} 
              </h3>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/offers" class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Offres clôturées
              </p>
            </div>
            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ storeDashboard.stats.close_offers }} 
              </h3>
            </div>
          </div>
        </RouterLink>
        <!-- End Card --> 
            <!-- Card -->
        <RouterLink to="/clients" class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Clients
              </p>
            </div>
            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ storeDashboard.stats.clients }} 
              </h3>
            </div>
          </div>
        </RouterLink>
        <!-- End Card --> 
      </div>
      <div v-if="storeDashboard.loading_stats">
        <Loading />
      </div>
      <div class="flex flex-col gap-5" v-if="!storeDashboard.loading_last_data">
        <div class="flex flex-col gap-4" v-if="storeDashboard.last_data">
          <H4 class="font-semibold text-xl">Derniers profils ajoutés</H4>
          <div class="grid grid-cols-4  gap-3">
            <a target="_blank" v-for="profil in storeDashboard.last_data.profils" :key="profil.id" class="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition" :href="profil.linkedin">
              <div class="p-4 md:p-5">
                <div class="flex gap-2 items-center">
                  <img :src="profil.photo" alt="p" class="h-10 w-10 rounded-full border shadow">
                  <h3 class="text-md font-bold text-gray-800">
                    {{ profil.first_name + ' ' +  profil.last_name }}
                  </h3>
                </div>
                <p class="mt-1 text-gray-500 text-xs">
                  {{ profil.title ? profil.title.slice(0,72) + '...' : ''}}
                </p>
              </div>
            </a>
          </div>
        </div>
        <div class="flex flex-col gap-4" v-if="storeDashboard.last_data">
          <H4 class="font-semibold text-xl">Dernières entreprises ajoutées</H4>
          <div class="grid grid-cols-4  gap-3">
            <a target="_blank" v-for="entreprise in storeDashboard.last_data.entreprises" :key="entreprise.id" class="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition" :href="entreprise.linkedin">
              <div class="p-4 md:p-5">
                <div class="flex gap-2 items-center">
                  <img :src="entreprise.logo" alt="p" class="h-10 w-10 rounded-full border shadow">
                  <h3 class="text-md font-bold text-gray-800">
                    {{ entreprise.name}}
                  </h3>
                </div>
                <p class="mt-1 text-gray-500 text-xs">
                  {{ entreprise.industry }}
                </p>
              </div>
            </a>
          </div> 
        </div>
      </div> 
    </template>
  </Dashboard>
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
