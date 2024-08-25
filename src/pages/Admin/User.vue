

<template>
   <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 " v-if="storeUser.users && !showForm">
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Utilisateurs</h2>
            <div class="relative ">
              <input v-model="search" type="text" @keyup.enter="searchUsers()" class="peer py-2 px-3 ps-11 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Rechercher">
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i class="fa fa-search text-gray-400"></i>
              </div>
              </div>
              <div @click="initSearch()" v-if="search!=''" class=" cursor-pointer flex items-center  ps ">
                <i  class=" fa fa-close text-gray-400"></i>
              </div>
          </div>
          <div class="flex items-center gap-2">
            <span @click="exportUsers()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-black bg-white-600 text-black hover:bg-white-700 "> <i class="fa fa-file-export"></i> <span>Exporter</span> </span>
              <span @click="openAddModal()"  class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 " href="#">
                <i class="fa fa-plus"></i>
                Ajouter
              </span>
          </div>
        </div>
        <div v-if="storeUser.users && storeUser.users.length > 0">
            <div class="flex flex-col">
              <div class="-m-1.5 overflow-x-">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg overflow-">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nom et Prénoms</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Rôle</th>
                          <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="user in storeUser.users" :key="user.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-2">
                            <div>
                              <img v-if="user.photo" class=" border shadow w-10 h-10 rounded-full" :src="user.photo" alt=""> 
                            </div>
                            <div class="flex flex-col ">
                              <span>{{ user.first_name }} {{ user.last_name }}</span>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ user.email }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ user.role }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <div class="dropdown dropdown-end">
                              <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                              <ul tabindex="0" class="dropdown-content !z-[100] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li class="text-gray-500 flex text-left py-2 px-4">Actions</li>
                                <li><span @click="openEditModal(user)"> <i class="fa fa-edit"></i>Détails</span></li>
                                <li><span @click="deleteUser(user.id)" class="hover:bg-red-100 text-red-500  "> <i class="fa fa-trash"></i> Supprimer</span></li>
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
                {{ storeUser.meta.from }}-{{ storeUser.meta.to }} sur {{ storeUser.meta.total }}
              </span>
              <div v-if="storeUser && storeUser.links">
                <div class="inline-flex gap-x-2" >
                  <button @click="getUsers(storeUser.links.prev)" v-if="storeUser.links.prev" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Préc.
                  </button>

                  <button @click="getUsers(storeUser.links.next)" v-if="storeUser.links.next" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Suiv.
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
        </div> 
        <div class="flex flex-col gap-3 w-full" v-else>
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            <span class="text-2xl font-semibold">Aucun user</span>
          </div>
        </div>  
        <dialog id="modal_user" class="modal">
          
        </dialog>
  
      </div>
      <div class="flex flex-col gap-4 " v-else>
        <div class="flex justify-between items-center">
          <span @click="showForm = false" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none"> <i class="fa fa-arrow-left"></i> Retour</span>
        </div>
        <form method="POST" @submit.prevent="postModal()" class=" sm:w-full lg:w-[700px] m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-800">
                 {{!update ? 'Ajouter un utilisateur' : 'Modifier l\'utilisateur ' }}
                </h3>
                <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <!-- photo -->
              <div class=" col-span-4 flex flex-col gap-1">
                  <label for="photo" class="cursor-pointer flex text-sm shadow font-medium m-auto rounded-full h-16 w-16 border ">
                    <img v-if="user.photoImg" :src="user.photoImg" alt="" class=" h-16 w-16 m-auto" rounded>
                    <svg v-else class="m-auto hqihs mto85" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                  </label>
                  <input type="file" id="photo" class="hidden" accept="image/*" @change="readURL($event.target)" >
                </div>
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-3">
                <div class="flex flex-col gap-1">
                  <label for="nom" class="block text-sm font-medium">Nom</label>
                  <input type="text" id="nom" v-model="user.first_name" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Nom">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="prenom" class="block text-sm font-medium">Prénom</label>
                  <input type="text" id="prenom" v-model="user.last_name" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Prénom">
                </div>   
                <div class="flex flex-col gap-1">
                  <label for="email" class="block text-sm font-medium">Email</label>
                  <input type="email" id="email" v-model="user.email" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Email">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="society" class="block text-sm font-medium">Société</label>
                  <input type="text"  id="society" v-model="user.society" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Société">
                </div>
                <div class="flex flex-col gap-1">
                  <label for="tjm" class="block text-sm font-medium">TJM</label>
                  <input type="number" min="0" id="tjm" v-model="user.tjm" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="TJM">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="address" class="block text-sm font-medium">Adresse</label>
                  <input type="text"  id="address" v-model="user.address" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Adresse">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="entry_date" class="block text-sm font-medium">Date d'entrée</label>
                  <input type="date"  id="entry_date" v-model="user.entry_date" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Date d'entrée">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="role" class="block text-sm font-medium">Rôle</label>
                  <select v-model="user.role" id="" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 ">
                    <option value="user">Utilisateur</option>
                    <option value="consultant">Consultant</option>
                    <option value="commercial">Commerciale</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div> 
                <div class=" flex flex-col gap-1" v-if="!update">
                  <label for="password" class="block text-sm font-medium">Mot de passe</label>
                  <input type="password" id="password" v-model="user.password" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Mot de passe">
                </div>   
                <span class="lg:col-span-3 font-semibold text-md mt-3">Informations personnelles</span>
                
                <div class="flex flex-col gap-1">
                  <label for="birth_date" class="block text-sm font-medium">Date de naissance</label>
                  <input type="date"  id="birth_date" v-model="user.birth_date" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Date de naissance">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="birth_place" class="block text-sm font-medium">Lieu de naissance</label>
                  <input type="text"  id="birth_place" v-model="user.birth_place" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Lieu de naissance">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="nationality" class="block text-sm font-medium">Nationalité</label>
                  <input type="text"  id="nationality" v-model="user.nationality" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Nationalité">
                </div> 
                <div class="flex flex-col gap-1">
                  <label for="iban" class="block text-sm font-medium">Iban</label>
                  <input type="text"  id="iban" v-model="user.iban" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="IBAN">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="tel_one" class="block text-sm font-medium">Tel 1</label>
                  <input type="text"  id="tel_one" v-model="user.tel_one" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Tel 1">
                </div>  
                <div class="flex flex-col gap-1">
                  <label for="tel_two" class="block text-sm font-medium">Tel 2</label>
                  <input type="text"  id="tel_two" v-model="user.tel_two" class="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 " placeholder="Tel 2">
                </div>  
                <span class="lg:col-span-3 font-semibold text-md mt-3">Permissions</span>
                <div class="flex flex-col gap-2 w-full overflow-x-auto lg:col-span-3">
                <MultiSelect
                  class="custom-multiselect  block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none "
                  v-model="selectedPermissions"
                  :options="storeUser.allPermissions"
                  optionLabel="name"
                  filter
                  placeholder="Permissions"
                  display="chip"
                >
                  <template #option="slotProps" >
                    <div class="flex items-center ">
                      <div class="text-sm">{{ slotProps.option.name }} ( <span class="text-xs">{{ slotProps.option.description }}</span> )</div>
                    </div>
                  </template>
                  <template #footer>
                    <div class="py-2 px-4">
                      <b>{{ selectedPermissions  ? selectedPermissions .length : 0 }}</b> item{{ (selectedPermissions  ? selectedPermissions .length : 0) > 1 ? 's' : '' }} selected.
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
                  <span v-if="storeUser.loading" class="loading loading-bars loading-md"></span>
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
import { useUserStore } from '@stores/user'


export default {
  components: {
  }, 
  data() {
      return {
          storeUser: useUserStore(),
          user: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            role: 'user',
            tjm:0,
            society:'',
            tel_one:'',
            tel_two:'',
            entry_date:'',
            birth_date:'',
            address:'',
            adress:'',
           birth_place:'',
           nationality:'',
           iban : '',
           comments : '',
          },
          showForm: false,
          update : false,
          search: '',
          selectedPermissions: [],
      }
  },
  computed: {
      filteredLinks() {
       return this.storeUser.meta.links.filter(link => link.url !== null);
      },
      isValid() {
        if(this.update) {
          if( this.user.first_name && this.user.last_name && this.user.email) {
            return true
          }
          return false
        } 

          if( this.user.first_name && this.user.last_name && this.user.email && this.user.password && this.user.password.length > 8) {
            return true
          }
          return false
      }
  },
  methods: {
    // init user
    initUser() {
      this.user = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'user',
        photo: '',
        photoImg: ''
      }
    },

    readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.photoImg = e.target.result; 
          this.user.photo = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);

      }

    },
    initSearch() {
      this.search = ''
      this.storeUser.getUsers()
    },
    async exportUsers() {
      await this.storeUser.exportUsers()
    },
    openAddModal() {
      this.update = false
      this.showForm = true
      // document.getElementById('modal_user').showModal()
    },
    closeModal() {
      this.showForm = false
      // document.getElementById('modal_user').close()
      this.initUser()
    },
    async postModal() {
      // let data = this.user
      const data = new FormData();
      if (this.user.photo) {
        data.append("photo", this.user.photo);
      } 
      for (const key in this.user) {
        if (key !== 'photo' && key !== 'photoImg' && this.user.hasOwnProperty(key) && this.user[key]!=='' && this.user[key]!==null) {
          data.append(key, this.user[key]);
        }
      }

      const all_permissions = this.selectedPermissions.map(permission => permission.id)
      data.append('permissions', all_permissions)

      if(this.update) {
        data.id = this.user.id
        await this.storeUser.updateUsers(data)
      }else{
        this.closeModal()
        await this.storeUser.postUsers(data)
      }
    },
    async deleteUser(id) {
      if(confirm('Voulez-vous supprimer ce user ?')){
        await this.storeUser.deleteUsers(id)
      }
    },
    async updateUser() {
      let data = this.user
      await this.storeUser.updateUsers(data)
      this.closeModal()
    },
    openEditModal(user) {
      this.user = user
      this.update = true
      this.showForm = true
      this.selectedPermissions = user.permissions
      // document.getElementById('modal_user').showModal()
    },
    async getUsers(url) {
      await this.storeUser.getUsers(url)
    },

    async searchUsers() {
      // sleep 500ms
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search
      }
      await this.storeUser.searchUsers(data)
    }
  },
  mounted() {
     this.storeUser.getUsers()
     this.storeUser.getAllPermissions()
  }

}

</script>
