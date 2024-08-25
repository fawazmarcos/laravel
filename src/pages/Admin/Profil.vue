

<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 " v-if="storeProfil.profils">
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Profils</h2>
            <div class="relative ">
              <input v-model="search" type="text" @keyup.enter="searchProfils()" class="peer py-2 px-3 ps-11 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Rechercher">
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i class="fa fa-search text-gray-400"></i>
              </div>
              </div>
                <div @click="initSearch()" v-if="search!=''" class=" cursor-pointer flex items-center  ps ">
                  <i  class=" fa fa-close text-gray-400"></i>
                </div>
          </div>
          <div class="flex items-center gap-2">
            <!-- <span v-if="storeProfil.total_profils" >{{ storeProfil.total_profils }} profils à enrichir</span> -->
            <!-- <span v-if="storeProfil.total_entreprises" >{{ storeProfil.total_entreprises }} entreprises à enrichir</span> -->
            <span @click="exportProfils()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-black bg-white-600 text-black hover:bg-white-700 "> <i class="fa fa-file-export"></i> <span>Exporter</span> </span>
            <span @click="openAddModal()"  class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 " href="#">
              <i class="fa fa-plus"></i>
              Ajouter
            </span>
          </div>
        </div>
        <div v-if="storeProfil.profils && storeProfil.profils.length > 0">
            <div class="flex flex-col">
              <div class="-m-1.5 ">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg ">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nom et Prénoms</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Entreprise</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                          <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="profil in storeProfil.profils" :key="profil.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2"> <img v-if="profil.photo" class=" border shadow w-10 h-10 rounded-full" :src="profil.photo" alt=""> 
                            <span>{{ profil.first_name }} {{ profil.last_name }}</span>
                           </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="profil.email" class="fa fa-envelope text-blue-500 mr-2"></i> {{ profil.email }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="profil.entreprise" class="fa fa-building text-orange-500 mr-2"></i>{{ profil.entreprise }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="profil.telephone" class="fa fa-phone text-green-400 mr-2"></i>{{ profil.telephone }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-2 items-center justify-end">
                            <span v-if="profil.can_enrich" :id="'enrich_'+profil.id" @click="enrichProfil(profil.id)" class="cursor-pointer py-1 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-black bg-white-600 text-black ">
                              Enrichir
                            </span>
                            <span :id="'spinner_'+profil.id"  class="hidden loading loading-bars loading-md py-1 px-2 items-center gap-x-2 text-xs font-semibold rounded-lg border border-black bg-white-600 text-black "></span>
                            <div class="dropdown dropdown-end">
                              <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                              <ul tabindex="0" class="dropdown-content !z-[100] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li class="text-gray-500 flex text-left py-2 px-4">Actions</li>
                                <li><span @click="openEditModal(profil)"> <i class="fa fa-edit"></i>Détails</span></li>
                                <li><span @click="deleteProfil(profil.id)" class="hover:bg-red-100 text-red-500  "> <i class="fa fa-trash"></i> Supprimer</span></li>
                              </ul>
                            </div> 
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-5" >
              <span class="text-sm">
                {{ storeProfil.meta.from }}-{{ storeProfil.meta.to }} sur {{ storeProfil.meta.total }}
              </span>
              <div v-if="storeProfil && storeProfil.links">
                <div class="inline-flex gap-x-2" >
                  <button @click="getProfils(storeProfil.links.prev)" v-if="storeProfil.links.prev" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Préc.
                  </button>

                  <button @click="getProfils(storeProfil.links.next)" v-if="storeProfil.links.next" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Suiv.
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
        </div> 
        <div class="flex flex-col gap-3 w-full" v-else>
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            <span class="text-2xl font-semibold">Aucun profil</span>
          </div>
        </div>  
        <dialog id="modal_profil" class="modal">
          <form method="POST" @submit.prevent="postModal()" class="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-800">
                 {{!update ? 'Ajouter un profil' : 'Modifier le profil' }}
                </h3>
                <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-2">
                <div class="flex flex-col gap-1">
                  <label for="nom" class="block text-sm font-medium">Nom</label>
                  <input type="text" id="nom" v-model="profil.first_name" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Nom">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="prenom" class="block text-sm font-medium">Prénom</label>
                  <input type="text" id="prenom" v-model="profil.last_name" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Prénom">
                </div>   
                <div class="flex flex-col gap-1">
                  <label for="email" class="block text-sm font-medium">Email</label>
                  <input type="email" id="email" v-model="profil.email" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Email">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="telephone" class="block text-sm font-medium">Téléphone</label>
                  <input type="text" id="telephone" v-model="profil.telephone" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Téléphone">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="adress" class="block text-sm font-medium">Adresse</label>
                  <input type="text" id="adress" v-model="profil.adress" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Adresse">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="linkedin" class="block text-sm font-medium">Linkedin</label>
                  <input type="text" id="linkedin" v-model="profil.linkedin" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Linkedin">
                </div>   
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <span  @click="closeModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 ">
                  Fermer
                </span>
                <button v-if="isValid"  type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                  <span v-if="storeProfil.loading" class="loading loading-bars loading-md"></span>
                  <span v-else>{{ !update ? 'Ajouter' : 'Modifier'}}</span>
                </button>
                <span v-else  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-400 text-white hover:bg-indigo-400 ">
                  {{ !update ? 'Ajouter' : 'Modifier'}}
                </span>
              </div>
            </div>
          </form>
        </dialog>
  
      </div>



    </template>
  </Dashboard>
</template>

<script>
import { useProfilStore } from '@stores/profil'


export default {
  components: {
  }, 
  data() {
      return {
          storeProfil: useProfilStore(),
          profil: {
            first_name: '',
            last_name: '',
            email: '',
            title: '',
            linkedin: '',
            telephone: '',
            email: '',
          },
          update : false,
          search: ''
      }
  },
  computed: {
      filteredLinks() {
       return this.storeProfil.meta.links.filter(link => link.url !== null);
      },
      isValid() {
          if( this.profil.first_name && this.profil.last_name) {
            return true
          }
          return false
      }
  },
  methods: {
    // init profil
    initProfil() {
      this.profil = {
        first_name: '',
        last_name: '',
        email: '',
        entreprise_id: '',
        title: '',
        linkedin: '',
        telephone: '',
        email: '',
      }
    },
    initSearch() {
      this.search = ''
      this.storeProfil.getProfils()
    },
    async exportProfils() {
      await this.storeProfil.exportProfils()
    },
    async enrichProfil(id) {
      await this.storeProfil.enrichProfil(id)
    },
    openAddModal() {
      this.update = false
      document.getElementById('modal_profil').showModal()
    },
    closeModal() {
      document.getElementById('modal_profil').close()
      this.initProfil()
    },
    async postModal() {
      let data = this.profil
      if(this.update) {
        await this.storeProfil.updateProfils(data)
      }else{
        await this.storeProfil.postProfils(data)
      }
      this.closeModal()
    },
    async deleteProfil(id) {
      if(confirm('Voulez-vous supprimer ce profil ?')){
        await this.storeProfil.deleteProfils(id)
      }
    },
    async updateProfil() {
      let data = this.profil
      await this.storeProfil.updateProfils(data)
      this.closeModal()
    },
    openEditModal(profil) {
      this.profil = profil
      this.update = true
      document.getElementById('modal_profil').showModal()
    },
    async getProfils(url) {
      await this.storeProfil.getProfils(url)
    },

    async searchProfils() {
      // sleep 500ms
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search
      }
      await this.storeProfil.searchProfils(data)
    }
  },
  mounted() {
     this.storeProfil.getProfils()
     this.storeProfil.getTotalProfils()
  }

}

</script>
