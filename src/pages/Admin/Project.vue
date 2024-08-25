

<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 " v-if="storeProject.projects && !showForm">
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Projects</h2>
            <div class="relative ">
              <input v-model="search" type="text" @keyup.enter="searchProjects()" class="peer py-2 px-3 ps-11 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Rechercher">
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
        <div v-if="storeProject.projects && storeProject.projects.length > 0">
            <div class="flex flex-col">
              <div class="-m-1.5 ">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg ">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nom</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Client</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Statut</th>
                          <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="project in storeProject.projects" :key="project.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2"> 
                            <span>{{ project.title }} </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> {{ project.client }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> {{ project.status == 'pending' ? "En cours 🟠" : "Terminé ✅" }} </td> 
                          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-2 items-center justify-end">
                            <div class="dropdown dropdown-end">
                              <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                              <ul tabindex="0" class="dropdown-content !z-[100] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li class="text-gray-500 flex text-left py-2 px-4">Actions</li>
                                <li><span @click="openEditModal(project)"> <i class="fa fa-edit"></i>Détails</span></li>
                                <li><span @click="deleteProject(project.id)" class="hover:bg-red-100 text-red-500  "> <i class="fa fa-trash"></i> Supprimer</span></li>
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
                {{ storeProject.meta.from }}-{{ storeProject.meta.to }} sur {{ storeProject.meta.total }}
              </span>
              <div v-if="storeProject && storeProject.links">
                <div class="inline-flex gap-x-2" >
                  <button @click="getProjects(storeProject.links.prev)" v-if="storeProject.links.prev" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Préc.
                  </button>

                  <button @click="getProjects(storeProject.links.next)" v-if="storeProject.links.next" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Suiv.
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
        </div> 
        <div class="flex flex-col gap-3 w-full" v-else>
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            <span class="text-2xl font-semibold">Aucun projet</span>
          </div>
        </div>  
        <dialog id="modal_project" class="modal">
         
        </dialog>
      </div>
      <div class="flex flex-col gap-4 " v-else>
        <div class="flex justify-between items-center">
          <span @click="showForm = false" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none"> <i class="fa fa-arrow-left"></i> Retour</span>
        </div>
      <form method="POST" @submit.prevent="postModal()" class="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="flex flex-col bg-white border shadow-sm rounded-xl">
            <div class="flex justify-between items-center py-3 px-4 border-b">
              <h3 class="font-bold text-gray-800">
                {{!update ? 'Ajouter un projet' : 'Modifier le projet' }}
              </h3>
              <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
            </div>
            <div class="p-4 overflow-y-auto gap-4 grid grid-cols-">
              <div class="flex flex-col gap-2">
                <label for="title" class="text-sm font-medium text-gray-800">Nom</label>
                <input v-model="project.title" type="text" id="title" name="title" class="py-2 px-3 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Nom du projet">
              </div>
              <div class="flex flex-col gap-2">
                <label for="client" class="text-sm font-medium text-gray-800">Client</label>
                <input v-model="project.client" type="text" id="client" name="client" class="py-2 px-3 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Nom du client">
              </div>
              <div class="flex flex-col gap-2">
                <label for="status" class="text-sm font-medium text-gray-800">Statut</label>
                <select v-model="project.status" id="status" name="status" class="py-2 px-3 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none">
                  <option value="pending">En cours 🟠</option>
                  <option value="finished">Terminé ✅</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label for="description" class="text-sm font-medium text-gray-800">Description</label>
                <textarea v-model="project.description" id="description" name="description" class="py-2 px-3 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Description du projet"></textarea>
              </div>
              <div class="flex flex-col gap-2 w-full overflow-x-auto">
                <label for="consultant" class="text-sm font-medium text-gray-800">Consultant</label>
                <MultiSelect
                  class="custom-multiselect block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none "
                  v-model="selectedUsers"
                  :options="storeUser.allUsers"
                  optionLabel="full_name"
                  filter
                  placeholder="Consultants"
                  display="chip"
                >
                  <template #option="slotProps" >
                    <div class="flex items-center !z-[9999]">
                      <img :alt="slotProps.option.full_name" :src="slotProps.option.photo" class="mr-2 rounded-full" style="width: 22px;height: 22px;" />
                      <div>{{ slotProps.option.full_name }}</div>
                    </div>
                  </template>
                  <template #footer>
                    <div class="py-2 px-4">
                      <b>{{ selectedUsers  ? selectedUsers .length : 0 }}</b> item{{ (selectedUsers  ? selectedUsers .length : 0) > 1 ? 's' : '' }} selected.
                    </div>
                  </template> 
                </MultiSelect>
              </div>
            </div>
            <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <span  @click="closeModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 ">
                Fermer
              </span>
              <button v-if="isValid"  type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                <span v-if="storeProject.loading" class="loading loading-bars loading-md"></span>
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
import { useProjectStore } from '@stores/project'
// user store
import { useUserStore } from '@stores/user'


export default {
  components: {
  }, 
  data() {
      return {
          storeProject: useProjectStore(),
          storeUser: useUserStore(),
          project: {
            title : '',
            client : '',
            status : 'pending',
            description : '',
          },
          showForm: false,
          update : false,
          search: '',
          selectedCountries: [],
          selectedUsers: [],
          countries: [
            { name: 'Afghanistan', code: 'AF' },
            { name: 'Åland Islands', code: 'AX' },
            { name: 'Albania', code: 'AL' },
        ],
      }
  },
  computed: {
    filteredLinks() {
      return this.storeProject.meta.links.filter(link => link.url !== null);
    },
    isValid() {
      if( this.project.title) {
        return true
      }
      return false
    }
  },
  methods: {
    // init project
    initProject() {
      this.project = {
        title : '',
        client : '',
        status : 'pending',
        description : '',
      }
    },
    updateCountries() {
      // show the selected countries
      console.log(this.selectedCountries)
    },
    
    initSearch() {
      this.search = ''
      this.storeProject.getProjects()
    },
    async exportProjects() {
      await this.storeProject.exportProjects()
    },
    async enrichProject(id) {
      await this.storeProject.enrichProject(id)
    },
    openAddModal() {
      this.update = false
      this.showForm = true
      // document.getElementById('modal_project').showModal()
    },
    closeModal() {
      this.showForm = false
      // document.getElementById('modal_project').close()
      this.initProject()
    },
    async postModal() {
      const data = new FormData();
      for (const key in this.project) {
        if (key !== 'logo' && key !== 'logoImg' && this.project.hasOwnProperty(key) && this.project[key]!=='') {
          data.append(key, this.project[key]);
        }
      }

      const all_users = this.selectedUsers.map(user => user.id)
      data.append('users', all_users)

      if(this.update) {
        data.id = this.project.id
        await this.storeProject.updateProjects(data)
      }else{
        await this.storeProject.postProjects(data)
        this.closeModal()
      }
    },
    async deleteProject(id) {
      if(confirm('Voulez-vous supprimer ce projet ?')){
        await this.storeProject.deleteProjects(id)
      }
    },
    async updateProject() {
      let data = this.project
      await this.storeProject.updateProjects(data)
      // this.closeModal()
    },
    openEditModal(project) {
      this.project = project
      this.update = true
      this.showForm = true
      this.selectedUsers = project.users
      // document.getElementById('modal_project').showModal()
    },
    async getProjects(url) {
      await this.storeProject.getProjects(url)
    },

    async searchProjects() {
      // sleep 500ms
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search
      }
      await this.storeProject.searchProjects(data)
    }
  },
  mounted() {
     this.storeProject.getProjects()
     this.storeUser.getAllUsers()
  }

}

</script>