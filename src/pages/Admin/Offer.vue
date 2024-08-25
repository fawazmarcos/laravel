

<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 " v-if="storeOffer.offers">
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Offres</h2>
            <div class="relative ">
              <input v-model="search" type="text" @keyup.enter="searchOffers()" class="peer py-2 px-3 ps-11 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Rechercher">
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
        <div v-if="storeOffer.offers && storeOffer.offers.length > 0">
            <div class="flex flex-col">
              <div class="-m-1.5 ">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg ">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Titre</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Secteur</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Expérience</th>
                          <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="offer in storeOffer.offers" :key="offer.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2"> <img v-if="offer.photo" class=" border shadow w-10 h-10 rounded-full" :src="offer.photo" alt=""> 
                            <span>{{ offer.title }} </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="offer.website" class="fa fa-globe text-orange-500 mr-2"></i> <span class="rounded-md p-2  text-white text-xs" :class="offer.status == 'open' ? 'bg-green-500' : 'bg-red-500'">{{ offer.status == 'open' ? 'Ouvert' : 'Fermé' }}</span> </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="offer.website" class="fa fa-globe text-orange-500 mr-2"></i>{{ offer.category }} </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="offer.telephone" class="fa fa-phone text-green-400 mr-2"></i>{{ offer.industry }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="offer.email" class="fa fa-envelope text-blue-500 mr-2"></i> {{ offer.experience_years }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-2 items-center justify-end">
                            <div class="dropdown dropdown-end">
                              <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                              <ul tabindex="0" class="dropdown-content !z-[100] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li class="text-gray-500 flex text-left py-2 px-4">Actions</li>
                                <li><span @click="openEditModal(offer)"> <i class="fa fa-edit"></i>Détails</span></li>
                                <li><span @click="deleteOffer(offer.id)" class="hover:bg-red-100 text-red-500  "> <i class="fa fa-trash"></i> Supprimer</span></li>
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
                {{ storeOffer.meta.from }}-{{ storeOffer.meta.to }} sur {{ storeOffer.meta.total }}
              </span>
              <div v-if="storeOffer && storeOffer.links">
                <div class="inline-flex gap-x-2" >
                  <button @click="getOffers(storeOffer.links.prev)" v-if="storeOffer.links.prev" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Préc.
                  </button>

                  <button @click="getOffers(storeOffer.links.next)" v-if="storeOffer.links.next" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Suiv.
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
        </div> 
        <div class="flex flex-col gap-3 w-full" v-else>
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            <span class="text-2xl font-semibold">Aucune offre</span>
          </div>
        </div>  
        <dialog id="modal_offer" class="modal">
          <form method="POST" @submit.prevent="postModal()" class="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-800">
                 {{!update ? 'Ajouter une offre' : 'Modifier l\'offre' }}
                </h3>
                <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-3">
                <!-- photo -->
                <div class=" col-span-3 flex flex-col gap-1">
                  <label for="photo" class="cursor-pointer flex text-sm shadow font-medium m-auto rounded-full h-16 w-16 border ">
                    <img v-if="offer.photoImg" :src="offer.photoImg" alt="" class=" h-16 w-16 m-auto" rounded>
                    <svg v-else class="m-auto hqihs mto85" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                  </label>
                  <input type="file" id="photo" class="hidden" accept="image/*" @change="readURL($event.target)" >
                </div>
                <div class="flex flex-col gap-1 col-span-3">
                  <label for="title" class="block text-sm font-medium">Titre</label>
                  <input type="text" id="title" v-model="offer.title" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Titre">
                </div> 
                <div class="flex flex-col gap-1 col-span-3">
                  <label for="description" class="block text-sm font-medium">Description</label>
                  <!-- <input type="text" id="description" v-model="offer.description" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Description"> -->
                  <textarea name="" id="" cols="30" v-model="offer.description" rows="4" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Description"></textarea>
                </div>   
                <div class="flex flex-col gap-1 ">
                  <label for="experience_years" class="block text-sm font-medium">Années d'expériences</label>
                  <input type="number" min="0" id="experience_years" v-model="offer.experience_years" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Expériences">
                </div>
                <div class="flex flex-col gap-1">
                  <label for="category" class="block text-sm font-medium">Catégorie</label>
                  <input type="text" id="category" v-model="offer.category" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Catégorie">
                </div>   
                <div class="flex flex-col gap-1">
                  <label for="country" class="block text-sm font-medium">Pays</label>
                  <input type="text" id="country" v-model="offer.country" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Pays">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="city" class="block text-sm font-medium">Ville</label>
                  <input type="text" id="city" v-model="offer.city" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Ville ">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="status" class="block text-sm font-medium">Status</label>
                  <select name="" id="" v-model="offer.status" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 ">
                    <option value="open">Ouvert ✅ </option>
                    <option value="close">Fermé  ❌</option>
                  </select>
                  <!-- <input type="text" id="status" v-model="offer.status" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="status"> -->
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="industry" class="block text-sm font-medium">Domaine d'activité</label>
                  <input type="text" id="industry" v-model="offer.industry" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Domaine d'activité">
                </div>   
               
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <span  @click="closeModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 ">
                  Fermer
                </span>
                <button v-if="isValid"  type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                  <span v-if="storeOffer.loading" class="loading loading-bars loading-md"></span>
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
import { useOfferStore } from '@stores/offer' 

export default {
  components: {
  }, 
  data() {
      return {
          storeOffer: useOfferStore(),
          offer: {
            title: '',
            experience_years: '',
            category: '',
            country: '',
            city: '',
            status: 'open',
            industry: '',
            description: '',
            photoImg: '',
            photo: '',
            type: 'o',
          },
          update : false,
          search: ''
      }
  },
  computed: {
      filteredLinks() {
       return this.storeOffer.meta.links.filter(link => link.url !== null);
      },
      isValid() {
          if( this.offer.title) {
            return true
          }
          return false
      }
  },
  methods: {
    // init offer
    initOffer() {
      this.offer = {
        title: '',
        experience_years: '',
        category: '',
        country: '',
        city: '',
        status: 'open',
        industry: '',
        description: '',
        photoImg: '',
        photo: '',
        type: 'o',
      }
    },
    readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.offer.photoImg = e.target.result; 
          this.offer.photo = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);

      }

    },
    initSearch() {
      this.search = ''
      this.storeOffer.getOffers()
    },
    async exportOffers() {
      await this.storeOffer.exportOffers()
    },
    async enrichOffer(id) {
      await this.storeOffer.enrichOffer(id)
    },
    openAddModal() {
      this.update = false
      document.getElementById('modal_offer').showModal()
    },
    closeModal() {
      document.getElementById('modal_offer').close()
      this.initOffer()
    },
    async postModal() {
      // let data = this.offer
      const data = new FormData();
      if (this.offer.photo) {
        data.append("photo", this.offer.photo);
      } 
      for (const key in this.offer) {
        if (key !== 'photo' && key !== 'photoImg' && this.offer.hasOwnProperty(key) && this.offer[key]!=='') {
          data.append(key, this.offer[key]);
        }
      }
      if(this.update) {
        data.id = this.offer.id
        await this.storeOffer.updateOffers(data)
      }else{
        await this.storeOffer.postOffers(data)
      }
      this.closeModal()
    },
    async deleteOffer(id) {
      if(confirm('Voulez-vous supprimer ce offer ?')){
        await this.storeOffer.deleteOffers(id)
      }
    },
    async updateOffer() {
      let data = this.offer
      await this.storeOffer.updateOffers(data)
      this.closeModal()
    },
    openEditModal(offer) {
      this.offer = offer
      this.update = true
      document.getElementById('modal_offer').showModal()
    },
    async getOffers(url) {
      await this.storeOffer.getOffers(url)
    },

    async searchOffers() {
      // sleep 500ms
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search
      }
      await this.storeOffer.searchOffers(data)
    }
  },
  mounted() {
     this.storeOffer.getOffers()
  }

}

</script>  