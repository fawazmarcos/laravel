

<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 " v-if="storeProfil.profils && !showForm">
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Profils</h2>
            <div class="relative ">
              <input v-model="search" type="text" @keyup.enter="searchProfils()" class="peer py-2 px-3 ps-11 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Rechercher">
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i class="fa fa-search text-gray-400"></i>
              </div>
            </div>
            <div class="flew w-54 w-auto max-w-[172px] overflow-x-hidden">
              <MultiSelect
                  id="multiselect-1"
                  class="custom-multiselect block w-full bg-white border rounded-lg text-sm "
                  v-model="multiTags"
                  @change="filterTags()"
                  :options="storeProfil.tags"
                  optionLabel="name"
                  filter
                  placeholder="Filtrer par Tags"
                  display="chip"
                >
                  <template #option="slotProps" >
                    <div class="flex items-center text-sm ">
                      <div>{{ slotProps.option.name }}</div>
                    </div>
                  </template>
                  <template #footer>
                    <div class="py-2 px-4 text-sm">
                      <b>{{ multiTags  ? multiTags .length : 0 }}</b> item{{ (multiTags  ? multiTags .length : 0) > 1 ? 's' : '' }} selected.
                    </div>
                  </template> 
              </MultiSelect>
            </div>
                <div @click="initSearch()" v-if="search!=''" class=" cursor-pointer flex items-center  ps ">
                  <i  class=" fa fa-close text-gray-400"></i>
                </div>
          </div>
          <div class="flex items-center gap-2">
            <span @click="exportProfils()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-black bg-white-600 text-black hover:bg-white-700 "> <i class="fa fa-file-export"></i> <span>Exporter</span> </span>
            <span @click="openAddModal()"  class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 " href="#">
              <i class="fa fa-plus"></i>
              Ajouter
            </span>
          </div>
        </div>
        <div v-if="storeProfil.profils">
            <div class="flex flex-col">
              <div class="-m-1.5 ">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg ">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nom et Prénoms</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Contact</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Entreprise</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Tags</th>
                          <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200" v-if="storeProfil.profils && storeProfil.profils.length > 0 && !storeProfil.loading">
                        <tr v-for="profil in storeProfil.profils" :key="profil.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2"> 
                            <img v-if="profil.photo" class=" border shadow w-6 h-6 rounded-full" :src="profil.photo" alt=""> 
                            <div class="flex flex-col">
                              <span>{{ profil.first_name }} {{ profil.last_name }}</span>
                              <span class="text-xs font-light">{{ profil.title ? profil.title.slice(0,30) + '...' : ''}}</span>
                            </div>
                           </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> 
                            <div class="flex flex-col gap-1">
                              <span><i v-if="profil.email" class="fa fa-envelope text-blue-500 mr-2"></i> {{ profil.email }}</span>
                              <span>
                                <i v-if="profil.telephone" class="fa fa-phone text-green-400 mr-2"></i>
                                {{ profil.telephone }}</span>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <i v-if="profil.entreprise" class="fa fa-building text-orange-500 mr-2"></i>{{ profil.entreprise.slice(0,20) }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> 
                            <span v-if="profil.tags_labels.length === 0" @click="openTagModal(profil)" class="text-sm text-blue-500 cursor-pointer flex items-center gap-2"> 
                              <i class="fa fa-tag"></i>
                              Ajouter
                            </span> 
                            <span @click="openTagModal(profil)" v-else class="text-sm  cursor-pointer grid grid-cols-2 gap-1"> 
                              <span class="text-xs cursor-pointer w-full  gap-2 border p-1 rounded text-center" :class="get_tag_color(profil.tags_labels[0])">
                                {{ profil.tags_labels[0] }}
                              </span>
                              <span v-if="profil.tags_labels.length > 1" class=" my-auto text-xs bg-gray-500/10 border border-gray-500/90 w-6 h-6 items-center justify-center rounded-full flex">+{{ profil.tags_labels.length - 1 }}</span>
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-2 items-center justify-end">
                            <span v-if="profil.can_enrich" :id="'enrich_'+profil.id" @click="storeProfil.enrichProfil(profil.id)" class="cursor-pointer py-1 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-black bg-white-600 text-black ">
                              Kaspr
                            </span>
                            <span v-if="!profil.is_enrich_cout" :id="'enrich_cout_'+profil.id" @click="storeProfil.enrichProfilCout(profil.id)" class="cursor-pointer py-1 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-black bg-white-600 text-black ">
                              ContactOut
                            </span>
                            <span :id="'spinner_'+profil.id"  class="hidden loading loading-bars loading-md py-1 px-2 items-center gap-x-2 text-xs font-semibold rounded-lg border border-black bg-white-600 text-black "></span>
                            <span :id="'spinner_cout_'+profil.id"  class="hidden loading loading-bars loading-md py-1 px-2 items-center gap-x-2 text-xs font-semibold rounded-lg border border-black bg-white-600 text-black "></span>
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
                      <tbody class="divide-y divide-gray-200" v-else-if="storeProfil.loading">
                        <tr v-for="i in 10" :key="i"> 
                          <td v-for="j in 5" :key="j" class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> 
                            <Loading :lines="1" :height="4" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-5" v-if="storeProfil.meta">
              <span class="text-sm" >
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
        <div class="flex flex-col gap-3 w-full" v-if="storeProfil.profils && storeProfil.profils.length == 0 && !storeProfil.loading">
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            <span class="text-2xl font-semibold">Aucun profil</span>
          </div>
        </div>  
        <dialog id="modal_profil" class="modal">
        </dialog>

        <dialog id="modal_profil_tag" class="modal">
          <form method="POST"  class=" m-3 w-[400px]" @submit.prevent="update_profil_tags()"> 
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-800">
                Tags
                </h3>
                <i  @click="closeTagModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <div class="p-4">
                <input type="text" v-model="search_tags" @keyup.enter="search_in_tags()" class="w-full px-4 py-2 border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Rechercher ou créer un tag">
              </div>
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-1" v-if="storeProfil.tags && storeProfil.tags.length > 0 && !storeProfil.loading_tags">
                <span v-if="filteredTags.length == 0" @click="this.storeProfil.postTag(search_tags)" class="cursor-pointer items-center gap-2 flex w-full py-2 justify-center text-sm text-blue-500">
                  Ajouter le tag "{{ search_tags }}"
                </span>
                <span class="flex w-full items-center" v-for="tag in filteredTags" :key="tag.id">
                  <input  v-model="selectedTags" type="checkbox" name="tags" :value="tag.name" :id="tag.name" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 ">
                  <label :for="tag.name" class="ml-3 text-sm font-medium text-gray-900 ">
                    {{ tag.name }}
                  </label>
                </span>
              </div>
              <div v-else-if="storeProfil.loading_tags">
                <Loading />
              </div>
              <div v-else>
                <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
                  <span class="text-md font-semibold">Aucun tag</span>
                </div>
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <span  @click="closeTagModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 ">
                  Fermer
                </span>
                <button v-if="isValid"  type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                  <span v-if="storeProfil.loading_tags" class="loading loading-bars loading-md"></span>
                  <span v-else>Valider</span>
                </button>
                <span v-else  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-400 text-white hover:bg-indigo-400 ">
                  Valider
                </span>
              </div>
            </div>
          </form>
        
        </dialog>
  
      </div>

      <div class="flex flex-col gap-4 " v-else-if="showForm">
        <div class="flex justify-between items-center">
          <span @click="closeForm()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none"> <i class="fa fa-arrow-left"></i> Retour</span>
        </div>
        <form method="POST" @submit.prevent="postModal()" class=" m-3 ">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-800">
                 {{!update ? 'Ajouter un profil' : 'Modifier le profil' }}
                </h3>
                <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-3">
                <div class="flex flex-col gap-1">
                  <label for="nom" class="block text-sm font-medium">Nom</label>
                  <input type="text" id="nom" v-model="profil.first_name" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Nom">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="prenom" class="block text-sm font-medium">Prénom</label>
                  <input type="text" id="prenom" v-model="profil.last_name" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Prénom">
                </div>   

                <div class="flex flex-col gap-1">
                  <label for="prenom" class="block text-sm font-medium">Titre</label>
                  <input type="text" id="prenom" v-model="profil.title" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Titre">
                </div>   
                <div class="flex flex-col gap-1">
                  <label for="email" class="block text-sm font-medium">Email</label>
                  <input type="email" id="email" v-model="profil.email" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Email">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="email" class="block text-sm font-medium">Email Secondaire</label>
                  <input type="email" id="email" v-model="profil.email_two" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Email Secondaire">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="telephone" class="block text-sm font-medium">Téléphone</label>
                  <input type="text" id="telephone" v-model="profil.telephone" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Téléphone">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="telephone" class="block text-sm font-medium">Téléphone Secondaire</label>
                  <input type="text" id="telephone" v-model="profil.telephone_two" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Téléphone Secondaire">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="adress" class="block text-sm font-medium">Adresse</label>
                  <input type="text" id="adress" v-model="profil.adress" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Adresse">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="linkedin" class="block text-sm font-medium">Linkedin</label>
                  <a :href="profil.linkedin" class="text-blue-900" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <!-- <input type="text" id="linkedin" v-model="profil.linkedin" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Linkedin"> -->
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
      </div>
    </template>
  </Dashboard>
</template>

<script>
import { useProfilStore } from '@stores/profil'
import Loading from '../../components/Loading.vue';


export default {
  components: {
    Loading
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
            tags:'',
          },
          update : false,
          search: '',
          showForm : false,
          current_profil_id : null,
          search_tags : '',
          selectedTags: [],
          multiTags: [],
          
      }
  },
  computed: {
    filteredLinks() {
      return this.storeProfil.meta.links.filter(link => link.url !== null);
    },
    filteredTags() {
      return this.storeProfil.tags.filter(tag => tag.name.toLowerCase().includes(this.search_tags.toLowerCase()))
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
        tags:'',
      }
    },
    openTagModal(profil){
      this.profil = profil
      this.current_profil_id = profil.id
      this.selectedTags = this.profil.tags_labels
      document.getElementById('modal_profil_tag').showModal()
      // this.initTagModal()
    },
    async filterTags() {
      // sleep 500ms
      const tags = this.multiTags.map(tag => tag.name)
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search,
        tags: tags,
      }
      await this.storeProfil.searchProfils(data)
    },
    get_tag_color(name){
      let tags  = this.storeProfil.tags.filter(tag => tag.name.toLowerCase() === name.toLowerCase())
      let color = 'blue'
      if(tags.length > 0){
        color = tags[0].color
      }
      return'text-'+color+'-500 bg-'+color+'-500/10 border-'+color+'-500/50 '
    },
    closeTagModal(){
      this.current_profil_id = null
      this.search_tags = ''
      document.getElementById('modal_profil_tag').close()
    },
    initSearch() {
      this.search = ''
      this.multiTags = []
      this.storeProfil.getProfils()
    },
    search_in_tags(){
      this.storeProfil.getTags()
    },
    async exportProfils() {
      await this.storeProfil.exportProfils()
    },
    async enrichProfil(id) {
      await this.storeProfil.enrichProfil(id)
    },
    openAddModal() {
      this.update = false
      // document.getElementById('modal_profil').showModal()
      this.showForm = true;
    },
    closeModal() {
      // document.getElementById('modal_profil').close()
      this.showForm = false;
      this.initProfil()
    },
    async postModal() {
      let data = this.profil
      if(this.update) {
        await this.storeProfil.updateProfils(data)
      }else{
        await this.storeProfil.postProfils(data)
        this.closeModal()
      }
    },
    async deleteProfil(id) {
      if(confirm('Voulez-vous supprimer ce profil ?')){
        await this.storeProfil.deleteProfils(id)
      }
    },

    async update_profil_tags(){
      this.profil.tags = JSON.stringify(this.selectedTags)
      await this.storeProfil.updateProfils(this.profil)
      this.closeTagModal()
    },
    closeForm(){
      this.showForm = false;
      this.initOffer();
    },
    async updateProfil() {
      let data = this.profil
      await this.storeProfil.updateProfils(data)
      this.closeModal()
    },
    openEditModal(profil) {
      this.profil = profil
      this.update = true
      // document.getElementById('modal_profil').showModal()
      this.showForm = true;
    },
    async getProfils(url) {
      await this.storeProfil.getProfils(url)
    },

    async searchProfils() {
      // sleep 500ms
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search,
        tags: this.multiTags.map(tag => tag.name)
      }
      await this.storeProfil.searchProfils(data)
    }
  },
  mounted() {
     this.storeProfil.getProfils()
     this.storeProfil.getTotalProfils()
     this.storeProfil.getTags()

  }

}

</script>
