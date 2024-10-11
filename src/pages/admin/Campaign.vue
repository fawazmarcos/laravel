

<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-3 w-full" v-if="!storeAuth.is_auth_office" >
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
              <span @click="storeAuth.getO365Url()"  :class="{ 'flex cursor-pointer items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-white rounded-lg  bg-gray-900 ': true, }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Connectez Office 365
              </span>
          </div>
        </div>
      <div class="flex flex-col gap-4 " v-if="storeCampaign.campaigns && !showForm && storeAuth.is_auth_office">
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Campagnes</h2>
            <div class="relative ">
              <input v-model="search" type="text" @keyup.enter="searchCampaigns()" class="peer py-2 px-3 ps-11 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Rechercher">
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
        <div v-if="storeCampaign.campaigns && storeCampaign.campaigns.length > 0">
            <div class="flex flex-col">
              <div class="-m-1.5 ">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg ">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Titre</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Objet</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Tags</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Crée par</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Crée le</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Envoyé le</th>
                          <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="campaign in storeCampaign.campaigns" :key="campaign.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2">  
                            <span>{{ campaign.title.length > 50 ? campaign.title.slice(0,50) + '...' : campaign.title }}</span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">  {{ campaign.subject.length > 30 ? campaign.subject.slice(0,30) + '...' : campaign.subject }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <span class="text-xs cursor-pointer w-full  gap-2 border p-1 rounded text-center" :class="get_tag_color(campaign.tags)">
                                {{ campaign.tags }}
                              </span> </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> <span class="text-xs cursor-pointer w-full  gap-2 border p-1 rounded text-center" :class="get_status_color(campaign.status_color)">
                                {{ campaign.status_label }}
                              </span> </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">  {{ campaign.user.first_name }} {{ campaign.user.last_name }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">  {{ campaign.created_at }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">  {{ campaign.sent_at }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-2 items-center justify-end">
                            <div class="dropdown dropdown-end">
                              <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                              <ul tabindex="0" class="dropdown-content !z-[100] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li class="text-gray-500 flex text-left py-2 px-4">Actions</li>
                                <li><span @click="openEditModal(campaign)"> <i class="fa fa-edit"></i>Détails</span></li>
                                <li v-if="campaign.status === 'draft'"><span @click="storeCampaign.launch(campaign.id)"> <i class="fa fa-play"></i>Lancer</span></li>
                                <li v-if="campaign.status === 'draft'"><span @click="deleteCampaign(campaign.id)" class="hover:bg-red-100 text-red-500  "> <i class="fa fa-trash"></i> Supprimer</span></li>
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
                {{ storeCampaign.meta.from }}-{{ storeCampaign.meta.to }} sur {{ storeCampaign.meta.total }}
              </span>
              <div v-if="storeCampaign && storeCampaign.links">
                <div class="inline-flex gap-x-2" >
                  <button @click="getCampaigns(storeCampaign.links.prev)" v-if="storeCampaign.links.prev" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Préc.
                  </button>

                  <button @click="getCampaigns(storeCampaign.links.next)" v-if="storeCampaign.links.next" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Suiv.
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
        </div> 
        <div class="flex flex-col gap-3 w-full" v-else>
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            <span class="text-2xl font-semibold">Aucune campagne</span>
          </div>
        </div>  
        <dialog id="modal_campaign" class="modal">
         
        </dialog>
      </div>
      <div class="flex flex-col gap-4 " v-else-if="storeAuth.is_auth_office">
        <div class="flex justify-between items-center">
          <span @click="showForm = false" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-900 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none"> <i class="fa fa-arrow-left"></i> Retour</span>
        </div>
        <form method="POST" @submit.prevent="postModal()" class="sm:max-w-5xl sm:w-full m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-800">
                 {{!update ? 'Ajouter une campagne' : 'Modifier la campagne' }}
                </h3>
                <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <div class="w-full grid grid-cols-3 gap-2">
                <div class="p-4 overflow-y-auto gap-4 grid grid-cols-1 col-span-2">
                  <!-- logo -->
                  <!-- <div class=" col-span-2 flex flex-col gap-1">
                    <label for="logo" class="cursor-pointer flex text-sm shadow font-medium m-auto rounded-full h-16 w-16 border ">
                      <img v-if="campaign.logoImg" :src="campaign.logoImg" alt="" class=" h-16 w-16 m-auto" rounded>
                      <svg v-else class="m-auto hqihs mto85" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                      </svg>
                    </label>
                    <input type="file" id="logo" class="hidden" accept="image/*" @change="readURL($event.target)" >
                  </div> -->
                  <div class="flex flex-col gap-1">
                    <label for="title" class="block text-sm font-medium">Titre</label>
                    <input type="text" id="title" v-model="campaign.title" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Titre">
                  </div> 
                  <div class="flex flex-col gap-1">
                    <label for="subject" class="block text-sm font-medium">Objet</label>
                    <input type="text" id="subject" v-model="campaign.subject" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Objet">
                  </div>
                  <div class="flex flex-col  gap-1">
                    <label for="tags" class="block text-sm font-medium">Ciblé par Tag</label>
                    <select @change="storeCampaign.get_profils_by_tag(campaign.tags)" name="tags" id="tags" v-model="campaign.tags" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Tags">
                      <option v-for="tag in storeProfil.tags" :key="tag.id" v-bind:value="tag.name" :selected="campaign.tags.includes(tag.name)">{{ tag.name }}</option>
                    </select>
                  </div>
                   <!-- Champ pour les pièces jointes -->
                <div class=" flex-col gap-1 hidden">
                  <label for="attachments" class="block text-sm font-medium">Pièces jointes</label>
                  <input type="file" id="attachments" multiple @change="handleFileChange" class="py-2 px-3 block w-full bg-white border rounded-lg" accept=".pdf,.doc,.docx,.jpg,.png,.xlsx">
                  <small class="text-gray-500">Max 5 fichiers, chaque fichier ne doit pas dépasser 10MB.</small>
                  
                  <!-- Liste des fichiers joints -->
                  <ul class="mt-2">
                    <li v-for="(file, index) in attachments" :key="index" class="flex justify-between items-center">
                      <span>{{ file.name }} ({{ (file.size / (1024 * 1024)).toFixed(2) }} MB)</span>
                      <button type="button" @click="removeAttachment(index)" class="text-red-500 hover:text-red-700"><i class="fa fa-close"></i></button>
                    </li>
                  </ul>

                  <!-- Liste des fichiers récupérés depuis le backend -->
                  <ul class="mt-2 grid grid-cols-2 gap-2">
                    <li v-for="(file) in this.campaign.attachments" :key="file.id" class="flex justify-between items-center rounded bg-gray-500/10 w-auto">
                      <a :href="file.url" target="_blank">{{ file.name }} ({{ (file.size / (1024 * 1024)).toFixed(2) }} MB)</a>
                    </li>
                  </ul>
                </div>
                  <div class="flex flex-col gap-1">
                    <label for="content" class="flex items-center gap-4 text-sm font-medium">Message <span class="flex items-center gap-2 font-semibold"> <span class="cursor-pointer" @click="add_var('[NOM]')">[NOM]</span> <span class="cursor-pointer" @click="add_var('[PRENOM]')">[PRENOM]</span>  </span> </label>
                    <textarea v-model="campaign.content" id="content" name="content" rows="15" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Message"></textarea>
                  </div>   
                </div>
                <div class="overflow-y-auto max-h-[600px] flex flex-col ">   
                  <Loading v-if="storeCampaign.loading_profils" class="m-auto" />
                  <span v-if="!storeCampaign.selected_profils" class="text-sm font-medium m-auto">
                    Aucun profil sélectionné
                  </span>
                  <span class="py-3 flex flex-col gap-5">
                    <span>Profils ciblés {{ storeCampaign.selected_profils ? `(${storeCampaign.selected_profils.length})` : '' }}</span>
                    <span v-for="profil in storeCampaign.selected_profils" :key="profil.id" class="flex gap-1 "> 
                      <img :src="profil.photo" alt="p" class="h-10 w-10 rounded-full border shadow">
                      <span class="flex flex-col text-sm ">
                        <span class=" font-medium"> {{ profil.first_name }} {{ profil.last_name }} </span>
                        <span class="" v-if="profil.email"> {{ profil.email }} </span>
                        <span v-else class="text-xs w-full  gap-2 border p-1 rounded text-center text-red-500 bg-red-500/10 border-red-500/90">email manquant</span>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <span  @click="closeModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 ">
                  Fermer
                </span>
                <button v-if="isValid && campaign.status === 'draft'"  type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                  <span v-if="storeCampaign.loading" class="loading loading-bars loading-md"></span>
                  <span v-else>{{ !update ? 'Ajouter' : 'Modifier'}}</span>
                </button>
                <span v-else-if="campaign.status === 'draft'"  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-400 text-white hover:bg-indigo-400 ">
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
import { useCampaignStore } from '@stores/campaign'
import { useProfilStore } from '@stores/profil'

import { useAuthStore } from '@stores/auth'


export default {
  components: {
  }, 
  data() {
      return {
          storeCampaign: useCampaignStore(),
          storeProfil: useProfilStore(),
          storeAuth: useAuthStore(),
          campaign: {
            title: '',
            subject: '',
            content : '',
            tags : '',
            files : '', 
            status: 'draft',
          },
          attachments: [],
          showForm : false,
          update : false,
          search: '',
      }
  },
  computed: {
      filteredLinks() {
       return this.storeCampaign.meta.links.filter(link => link.url !== null);
      },
      isValid() {
          if( this.campaign.title && this.campaign.subject) {
            return true
          }
          return false
      },
  },
  methods: {
    // init campaign
    initCampaign() {
      this.campaign = {
        title: '',
        subject: '',
        content : '',
        tags : '',  
        files : '',
        status: 'draft',
      }
    },

    add_var(e) {
      this.campaign.content += (' '+e)
    },
    readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.campaign.logoImg = e.target.result; 
          this.campaign.logo = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);

      }

    },
    initSearch() {
      this.search = ''
      this.storeCampaign.getCampaigns()
    },
    async exportCampaigns() {
      await this.storeCampaign.exportCampaigns()
    },
    async enrichCampaign(id) {
      await this.storeCampaign.enrichCampaign(id)
    },
    openAddModal() {
      this.update = false
      this.showForm = true
      this.initCampaign()
      // document.getElementById('modal_campaign').showModal()
    },
    closeModal() {
      // document.getElementById('modal_campaign').close()
      this.showForm = false
      this.initCampaign()
    },

    handleFileChange(event) {
      const selectedFiles = Array.from(event.target.files);

      // Vérifier le nombre total de fichiers (max 5)
      if (this.attachments.length + selectedFiles.length > 5) {
        alert('Vous pouvez ajouter un maximum de 5 fichiers.');
        return;
      }

      this.campaign.attachments = [];

      // Vérifier la taille de chaque fichier (max 10MB)
      for (let file of selectedFiles) {
        if (file.size > 10 * 1024 * 1024) {
          alert(`Le fichier ${file.name} dépasse la taille maximale de 10MB.`);
          return;
        }
      }

      // Ajouter les fichiers à la liste des pièces jointes
      this.attachments.push(...selectedFiles);
    },
    // Supprimer un fichier joint récupéré depuis le backend
    removeBackendAttachment(index) {
      this.campaign.attachments.splice(index, 1);
    },

    // Supprimer un fichier joint
    removeAttachment(index) {
      this.attachments.splice(index, 1);
    },
    async postModal() {
      // let data = this.campaign
      const data = new FormData();
      if (this.campaign.logo) {
        data.append("logo", this.campaign.logo);
      } 
      for (const key in this.campaign) {
        if (key !== 'logo' && key !== 'logoImg' && this.campaign.hasOwnProperty(key) && this.campaign[key]!=='') {
          data.append(key, this.campaign[key]);
        }
      }

      this.attachments.forEach((file, index) => {
        data.append(`attachments[${index}]`, file);
      });


      if(this.update) {
        data.id = this.campaign.id
        await this.storeCampaign.updateCampaigns(data)
      }else{
        await this.storeCampaign.postCampaigns(data)
        this.closeModal()
      }
    },
    async deleteCampaign(id) {
      if(confirm('Voulez-vous supprimer ce campaign ?')){
        await this.storeCampaign.deleteCampaigns(id)
      }
    },
    async updateCampaign() {
      let data = this.campaign
      await this.storeCampaign.updateCampaigns(data)
      this.closeModal()
    },
    get_tag_color(name){
      let tags  = this.storeProfil.tags.filter(tag => tag.name.toLowerCase() === name.toLowerCase())
      let color = 'blue'
      if(tags.length > 0){
        color = tags[0].color
      }
      return'text-'+color+'-500 bg-'+color+'-500/10 border-'+color+'-500/50 '
    }, 
    get_status_color(color){
      return'text-'+color+'-500 bg-'+color+'-500/10 border-'+color+'-500/50 '
    },
    openEditModal(campaign) {
      this.campaign = campaign
      this.update = true
      this.showForm = true
      if(this.campaign.tags.length > 0){
        this.storeCampaign.get_profils_by_tag(this.campaign.tags)
      }
      // document.getElementById('modal_campaign').showModal()
    },
    async getCampaigns(url) {
      await this.storeCampaign.getCampaigns(url)
    },

    async searchCampaigns() {
      // sleep 500ms
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search
      }
      await this.storeCampaign.searchCampaigns(data)
    }
  },
  mounted() {
    this.storeAuth.getMails()
    this.storeCampaign.getCampaigns()
    this.storeProfil.getTags()
  },


}

</script>
