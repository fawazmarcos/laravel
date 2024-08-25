

<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 " v-if="storeClient.clients">
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Clients</h2>
            <div class="relative ">
              <input v-model="search" type="text" @keyup.enter="searchClients()" class="peer py-2 px-3 ps-11 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Rechercher">
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i class="fa fa-search text-gray-400"></i>
              </div>
              </div>
                <div @click="initSearch()" v-if="search!=''" class=" cursor-pointer flex items-center  ps ">
                  <i  class=" fa fa-close text-gray-400"></i>
                </div>
          </div>
          <div class="flex items-center gap-2">
            <span @click="openAddModal()"  class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 " href="#">
              <i class="fa fa-plus"></i>
              Ajouter
            </span>
          </div>
        </div>
        <div v-if="storeClient.clients && storeClient.clients.length > 0">
            <div class="flex flex-col">
              <div class="-m-1.5 ">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg ">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nom</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Site web</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="client in storeClient.clients" :key="client.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2"> <img v-if="client.logo" class=" border shadow w-10 h-10 rounded-full" :src="client.logo" alt=""> 
                            <span>{{ client.name }} </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="client.website" class="fa fa-globe text-orange-500 mr-2"></i>{{ client.website }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="client.telephone" class="fa fa-phone text-green-400 mr-2"></i>{{ client.telephone }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="client.email" class="fa fa-envelope text-blue-500 mr-2"></i> {{ client.email }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-2 items-center justify-end">
                            <div class="dropdown dropdown-end">
                              <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                              <ul tabindex="0" class="dropdown-content !z-[100] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li class="text-gray-500 flex text-left py-2 px-4">Actions</li>
                                <li><span @click="openEditModal(client)"> <i class="fa fa-edit"></i>Détails</span></li>
                                <li><span @click="deleteClient(client.id)" class="hover:bg-red-100 text-red-500  "> <i class="fa fa-trash"></i> Supprimer</span></li>
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
                {{ storeClient.meta.from }}-{{ storeClient.meta.to }} sur {{ storeClient.meta.total }}
              </span>
              <div v-if="storeClient && storeClient.links">
                <div class="inline-flex gap-x-2" >
                  <button @click="getClients(storeClient.links.prev)" v-if="storeClient.links.prev" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Préc.
                  </button>

                  <button @click="getClients(storeClient.links.next)" v-if="storeClient.links.next" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Suiv.
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
        </div> 
        <div class="flex flex-col gap-3 w-full" v-else>
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            <span class="text-2xl font-semibold">Aucun client</span>
          </div>
        </div>  
        <dialog id="modal_client" class="modal">
          <form method="POST" @submit.prevent="postModal()" class="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-800">
                 {{!update ? 'Ajouter un client' : 'Modifier le client' }}
                </h3>
                <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-2">
                <!-- logo -->
                <div class=" col-span-2 flex flex-col gap-1">
                  <label for="logo" class="cursor-pointer flex text-sm shadow font-medium m-auto rounded-full h-16 w-16 border ">
                    <img v-if="client.logoImg" :src="client.logoImg" alt="" class=" h-16 w-16 m-auto" rounded>
                    <svg v-else class="m-auto hqihs mto85" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                  </label>
                  <input type="file" id="logo" class="hidden" accept="image/*" @change="readURL($event.target)" >
                </div>
                <div class="flex flex-col gap-1">
                  <label for="name" class="block text-sm font-medium">Nom</label>
                  <input type="text" id="name" v-model="client.name" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Nom">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="domain" class="block text-sm font-medium">Domaine</label>
                  <input type="text" id="domain" v-model="client.domain" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Domaine">
                </div>
                <div class="flex flex-col gap-1">
                  <label for="website" class="block text-sm font-medium">Site Web</label>
                  <input type="text" id="website" v-model="client.website" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Site web">
                </div>   
                <div class="flex flex-col gap-1">
                  <label for="email" class="block text-sm font-medium">Email</label>
                  <input type="email" id="email" v-model="client.email" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Email">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="contact" class="block text-sm font-medium">Référence</label>
                  <input type="text" id="contact" v-model="client.contact" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Nom du contact ">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="telephone" class="block text-sm font-medium">Téléphone</label>
                  <input type="text" id="telephone" v-model="client.telephone" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Téléphone">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="adress" class="block text-sm font-medium">Adresse</label>
                  <input type="text" id="adress" v-model="client.adress" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Adresse">
                </div>  
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <span  @click="closeModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 ">
                  Fermer
                </span>
                <button v-if="isValid"  type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                  <span v-if="storeClient.loading" class="loading loading-bars loading-md"></span>
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
import { useClientStore } from '@stores/client'


export default {
  components: {
  }, 
  data() {
      return {
          storeClient: useClientStore(),
          client: {
            name: '',
            website: '',
            domain: '',
            country: '',
            city: '',
            adress: '',
            contact: '',
            email: '',
            telephone: '',
            logoImg: '',
            logo: '',
          },
          update : false,
          search: ''
      }
  },
  computed: {
      filteredLinks() {
       return this.storeClient.meta.links.filter(link => link.url !== null);
      },
      isValid() {
          if( this.client.name) {
            return true
          }
          return false
      }
  },
  methods: {
    // init client
    initClient() {
      this.client = {
        name: '',
        website: '',
        domain: '',
        country: '',
        city: '',
        adress: '',
        contact: '',
        email: '',
        telephone: '',
        logoImg: '',
        logo: '',
      }
    },
    readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.client.logoImg = e.target.result; 
          this.client.logo = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);

      }

    },
    initSearch() {
      this.search = ''
      this.storeClient.getClients()
    },
    async exportClients() {
      await this.storeClient.exportClients()
    },
    async enrichClient(id) {
      await this.storeClient.enrichClient(id)
    },
    openAddModal() {
      this.update = false
      document.getElementById('modal_client').showModal()
    },
    closeModal() {
      document.getElementById('modal_client').close()
      this.initClient()
    },
    async postModal() {
      // let data = this.client
      const data = new FormData();
      if (this.client.logo) {
        data.append("logo", this.client.logo);
      } 
      for (const key in this.client) {
        if (key !== 'logo' && key !== 'logoImg' && this.client.hasOwnProperty(key) && this.client[key]!=='') {
          data.append(key, this.client[key]);
        }
      }
      if(this.update) {
        data.id = this.client.id
        await this.storeClient.updateClients(data)
      }else{
        await this.storeClient.postClients(data)
      }
      this.closeModal()
    },
    async deleteClient(id) {
      if(confirm('Voulez-vous supprimer ce client ?')){
        await this.storeClient.deleteClients(id)
      }
    },
    async updateClient() {
      let data = this.client
      await this.storeClient.updateClients(data)
      this.closeModal()
    },
    openEditModal(client) {
      this.client = client
      this.update = true
      document.getElementById('modal_client').showModal()
    },
    async getClients(url) {
      await this.storeClient.getClients(url)
    },

    async searchClients() {
      // sleep 500ms
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search
      }
      await this.storeClient.searchClients(data)
    }
  },
  mounted() {
     this.storeClient.getClients()
  }

}

</script>
