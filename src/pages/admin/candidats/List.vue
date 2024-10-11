

<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 " v-if="storeCandidat.candidats">
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Candidats</h2>
            <div class="relative ">
              <input v-model="search" type="text" @keyup.enter="searchCandidats()" class="peer py-2 px-3 ps-11 block w-full bg-white border rounded-lg text-sm  " placeholder="Rechercher">
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i class="fa fa-search text-gray-400"></i>
              </div>
            </div>
              <div @click="initSearch()" v-if="search!='' || selectedEtapes.length > 0" class=" cursor-pointer flex items-center  ps ">
                <i  class=" fa fa-close text-gray-400"></i>
              </div>
            </div>
          <div class="flex items-center gap-2">
            <RouterLink to="/candidats/new"  class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-900 text-white hover:bg-indigo-700 " href="#">
              <i class="fa fa-plus"></i>
              Ajouter
            </RouterLink>
          </div>
        </div>
        <form class="flex w-full gap-5" method="POST" @submit.prevent="searchCandidats()">
          <div class="flex items-center gap-2">
            <label for="" class="text-sm">Etape</label>
            <div class="flex gap-4 overflow-x-hidden w-auto max-w-[172px] "> 
              <MultiSelect
                id="multiselect-1"
                class="custom-multiselect block w-full bg-white border rounded-lg text-sm "
                v-model="selectedEtapes"
                @change="filterCandidats()"
                :options="storeCandidat.allEtapes"
                optionLabel="name"
                filter
                placeholder="Filtrer par Etape"
                display="chip"
              >
                <template #option="slotProps" >
                  <div class="flex items-center text-sm ">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
                <template #footer>
                  <div class="py-2 px-4 text-sm">
                    <b>{{ selectedEtapes  ? selectedEtapes .length : 0 }}</b> item{{ (selectedEtapes  ? selectedEtapes .length : 0) > 1 ? 's' : '' }} selected.
                  </div>
                </template> 
              </MultiSelect>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <label for="" class="text-sm">Expérience</label>
            <input type="number" v-model="min_exp" placeholder="min" class="py-2 px-3 block w-24 bg-white border rounded-lg text-sm ">
            <input type="number" v-model="max_exp" placeholder="max" class="py-2 px-3 block w-24 bg-white border rounded-lg text-sm ">
          </div>
          <div class="flex items-center gap-2">
            <label for="" class="text-sm">Type de contrat</label>
            <select v-model="type_contrat" type="text" id="contrat_type" name="contrat_type" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900">
              <option value="cdi">CDI</option>
              <option value="cdd">CDD</option>
              <option value="alternance">Alternance</option>
            </select>
          </div>
          <button class="rounded p-2 bg-gray-900 text-white text-sm px-4">Filtrer</button>
        </form>
        <div v-if="storeCandidat.candidats && storeCandidat.candidats.length > 0">
          <div class="col-span-5 flex flex-col w-full gap-2">
            <div class="grid grid-cols-4 gap-4">
              <div v-for="candidat in storeCandidat.candidats" :key="candidat.id" class="max-w-xs flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl">
                <div class="p-4 md:p-5 gap-2 flex flex-col">
                  <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    {{ candidat.first_name }} {{ candidat.last_name }}
                  </h3>
                  <p class=" text-gray-500 text-sm">
                    {{ candidat.email }}
                  </p>
                  <div class="flex items-center justify-between">
                    <span class=" rounded-md bg-transparent text-black border w-auto text-center p-1 text-xs font-normal ">{{ candidat.etape.name }}</span>
                    <div class="dropdown dropdown-end">
                      <div tabindex="0" role="button" class=""><i class="fa-solid fa-edit cursor-pointer"></i></div>
                      <ul tabindex="0" class="dropdown-content !z-[100] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li class="text-gray-500 flex text-left py-2 px-4">Actions</li>
                        <li><RouterLink :to="'/candidats/'+candidat.id" class="cursor-pointer" href="#"> <i class="fa fa-edit"></i>Détails</RouterLink></li>
                        <li><a :href="candidat.resumeImg" target="_blank" v-if="candidat.resumeImg" > <i class="fa fa-download"></i>Télécharger le CV</a></li>
                        <li><span @click="showCandidatStatusModal(candidat)" > <i class="fa fa-step-forward"></i>Voir le status</span></li>
                        <li><span @click="deleteCandidat(candidat.id)" class="hover:bg-red-100 text-red-500  "> <i class="fa fa-trash"></i> Supprimer</span></li>
                      </ul>
                    </div> 
                  </div> 
                </div>
              </div>
              <div class="-m-1.5 ">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class=" rounded-lg ">
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-5" >
              <span class="text-sm">
                {{ storeCandidat.meta.from }}-{{ storeCandidat.meta.to }} sur {{ storeCandidat.meta.total }}
              </span>
              <div v-if="storeCandidat && storeCandidat.links">
                <div class="inline-flex gap-x-2" >
                  <button @click="getCandidats(storeCandidat.links.prev)" v-if="storeCandidat.links.prev" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Préc.
                  </button>
  
                  <button @click="getCandidats(storeCandidat.links.next)" v-if="storeCandidat.links.next" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Suiv.
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div class="flex flex-col gap-3 w-full" v-else>
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            <span class="text-2xl font-semibold">Aucun candidat</span>
          </div>
        </div>  
        <dialog id="modal_candidat" class="modal">
        </dialog>
        <dialog id="modal_cv" class="modal">
          <form method="POST"  class="sm:max-w-lg w-full !max-w-7xl sm:w-full m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-900">
                 {{'Uploader le CV du candidat'}}
                </h3>
                <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-4">
                <!-- photo -->
                <div class=" col-span-4 flex flex-col gap-1">
                  <label for="photo" class="cursor-pointer flex text-sm shadow font-medium m-auto rounded-full h-16 w-16 border ">
                    <img v-if="candidat.photoImg" :src="candidat.photoImg" alt="" class=" h-16 w-16 m-auto" rounded>
                    <svg v-else class="m-auto hqihs mto85" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                  </label>
                  <input type="file" id="photo" class="hidden" accept="image/*" @change="readURL($event.target)" >
                </div>
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <span  @click="closeModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50 ">
                  Fermer
                </span>
                <button v-if="isValid"  type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-900 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                  <span v-if="storeCandidat.loading" class="loading loading-bars loading-md"></span>
                  <span v-else>Uploader</span>
                </button>
                <span v-else  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-400 text-white hover:bg-indigo-400 ">
                 Uploader
                </span>
              </div>
            </div>
          </form>
        </dialog>
        <dialog id="modal_statut" class="modal">
          <div  class="sm:max-w-lg w-full  sm:w-full m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-4 h-full max-h-[600px]">
                <div class=" col-span-4 flex flex-col gap-1">
                  <label for="photo" class="cursor-pointer flex text-sm shadow font-medium m-auto rounded-full h-16 w-16 border ">
                    <img v-if="candidat.photo" :src="candidat.photo" alt="" class="rounded-full h-16 w-16 m-auto">
                  </label>
                  <span class="text-center">{{ candidat.first_name }} {{ candidat.last_name }}</span>
                </div>
                <div class="col-span-4 flex flex-col gap-3 justify-center items-center"> 
                  <ul class="timeline timeline-vertical">
                    <li v-for="(etape, index) in storeCandidat.allEtapes" :key="etape.id">
                      <hr :class="candidat.etape_id >= etape.id ? 'bg-primary' : 'bg-slate-200'" />
                      
                      <div :class="index % 2 === 0 ? 'timeline-start timeline-box text-left' : 'timeline-end timeline-box text-right'">
                        <span class="text-sm">{{ etape.description }}</span>
                      </div>
                      
                      <div class="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          :class="candidat.etape_id >= etape.id ? 'text-primary' : 'text-slate-200'"
                          class="h-5 w-5">
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clip-rule="evenodd" />
                        </svg>
                      </div>
                      
                      <hr :class="candidat.etape_id >= etape.id ? 'bg-primary' : 'bg-slate-200'" />
                    </li>
                  </ul>

                </div>
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <span @click="closeTheModal('modal_statut')" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50 ">
                  Fermer
                </span>
              </div>
            </div>
          </div>
          
        </dialog>
      </div>
    </template>
  </Dashboard>
</template>

<script>
import { useCandidatStore } from '@stores/candidat' 

export default {
  components: {
  }, 
  data() {
      return {
          storeCandidat: useCandidatStore(),
          showForm: false,
          candidat: {
            first_name:'',
            last_name:'',
            email:'',
            email_s:'',
            telephone:'',
            telephone_s:'',
            city:'',
            country:'',
            linkedin:'',
            adress:'',
            last_situation:'',
            entreprise_id:'',
            current_client_id:'',
            contrat_type:'cdi',
            contrat_start:'',
            contrat_end:'',
            tjm:'',
            sal_net:'',
            sal_brut:'',
            status_ano:'',
            status:'',
            comment:'',
            statut_matrimonial:'',
            annee_experience: '',
            clients : '',
            langues : '',
            etl : '',
            pretentions_salariales : '',
            certifications : '',
            gestion_projet : '',
          },
          update : false,
          search: '',
          type_contrat: '',
          min_exp: '',
          max_exp: '',
          selectedEtapes: [],
          expertises: [
            {  name: '',exp: '' },
          ],
          clients : [
            {  name: '',reference: '' },
          ],
          langues : [
            {  name: '',level: '' },
          ],
          etl : [
            {  name: '',exp: '' },
          ],
          pretentions_salariales : [
            {  name: '',salary: '' },
          ],
          certifications : [
            {  name: '' },
          ],
          gestion_projet : [
            {  name: '' },
          ],
      }
  },
  computed: {
      filteredLinks() {
       return this.storeCandidat.meta.links.filter(link => link.url !== null);
      },
      isValid() {
        if( this.candidat.first_name && this.candidat.last_name && this.candidat.email ) {
          return true
        }
        return false
      }
  },
  methods: {
    // init candidat
    initCandidat() {
      this.candidat = {
        first_name:'',
        last_name:'',
        email:'',
        email_s:'',
        telephone:'',
        telephone_s:'',
        city:'',
        country:'',
        linkedin:'',
        adress:'',
        last_situation:'',
        entreprise_id:'',
        current_client_id:'',
        contrat_type:'',
        contrat_start:'',
        contrat_end:'',
        tjm:'',
        sal_net:'',
        sal_brut:'',
        status_ano:'',
        status:'',
        comment:'',
        statut_matrimonial:'',
        annee_experience: '',
        clients : '',
        langues : '',
        etl : '',
        pretentions_salariales : '',
        certifications : '',
        gestion_projet : '',
      }
      this.expertises = [
        {  name: '',exp: '' },
      ]
      this.clients = [
        {  name: '',reference: '' },
      ]
      this.langues = [
        {  name: '',level: '' },
      ]
      this.etl = [
        {  name: '',exp: '' },
      ]
      this.pretentions_salariales = [
        {  name: '',salary: '' },
      ]
      this.certifications = [
        {  name: '' },
      ]
      this.gestion_projet = [
        {  name: '' },
      ],
      this.etl = [
        {  name: '',exp: '' },
      ]
    }, 
    readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.candidat.photoImg = e.target.result; 
          this.candidat.photo = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);

      }
    },
    addExpertise() {
      if(!this.expertises || this.expertises.length === 0){
        this.expertises = [ { name: '', exp: '' } ]
      }
      // cant add more than 8 expertise
      if ( this.expertises.length >= 8){
        alert('Vous ne pouvez pas ajouter plus de 8 expertises')
        return
      } 
      this.expertises.push({ name: '', exp: '' })
    },
    addClient() {
      if(!this.clients  || this.clients.length === 0){
        this.clients = [ { name: '', reference: '' } ]
      }
      // cant add more than 8 expertise
      if ( this.clients.length >= 8){
        alert('Vous ne pouvez pas ajouter plus de 8 clients')
        return
      } 
      this.clients.push({ name: '', reference: '' })
    },
    addLangue() {
      if(!this.langues || this.langues.length === 0){
        this.langues = [
          { name: '', level: '' }
        ]
      }
      // cant add more than 8 expertise
      if ( this.langues.length >= 8){
        alert('Vous ne pouvez pas ajouter plus de 8 langues')
        return
      } 
      this.langues.push({ name: '', level: '' })
    },
    addEtl() {
      if(!this.etl || this.etl.length === 0){
        this.etl = [
          { name: '', exp: '' }
        ]
      }
      // cant add more than 8 expertise
      if (  this.etl.length >= 8){
        alert('Vous ne pouvez pas ajouter plus de 8 etl')
        return
      } 
      this.etl.push({ name: '', exp: '' })
    },
    addPretentions_salariales() {
      if(!this.pretentions_salariales || this.pretentions_salariales.length === 0){
        this.pretentions_salariales = [ { name: '', salary: '' } ]
      }
      // cant add more than 8 expertise
      if ( this.pretentions_salariales.length >= 8){
        alert('Vous ne pouvez pas ajouter plus de 8 pretentions salariales')
        return
      } 
      this.pretentions_salariales.push({ name: '', salary: '' })
    },
    addCertifications() {
      if(!this.certifications || this.certifications.length === 0){
        this.certifications = [ { name: '' } ]
      }
      // cant add more than 8 expertise

      if (this.certifications.length >= 8){
        alert('Vous ne pouvez pas ajouter plus de 8 certifications')
        return
      } 

      this.certifications.push({ name: '' })
    },
    addGestion_projet() {
      if(!this.gestion_projet || this.gestion_projet.length === 0){
        this.gestion_projet = [ { name: '' } ]
      }
      // cant add more than 8 expertise
      if ( this.gestion_projet.length >= 8){
        alert('Vous ne pouvez pas ajouter plus de 8 gestion projet')
        return
      } 
      this.gestion_projet.push({ name: '' })
    },
    readResumeURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.candidat.resumeImg = e.target.result; 
          this.candidat.resume = input.files[0];
        };
        reader.readAsDataURL(input.files[0]); 
      }
    },
    openTheModal(modal){
      document.getElementById(modal).showModal()
    },
    closeTheModal(modal){
      document.getElementById(modal).close()
    },
    showCandidatStatusModal(candidat){
      this.candidat = candidat
      this.openTheModal('modal_statut')
    },
    initSearch() {
      this.search = ''
      this.selectedEtapes = []
      this.storeCandidat.getCandidats()
    },
    async exportCandidats() {
      await this.storeCandidat.exportCandidats()
    },
    async enrichCandidat(id) {
      await this.storeCandidat.enrichCandidat(id)
    },
    openAddModal() {
      this.update = false
      this.showForm = true
      // document.getElementById('modal_candidat').showModal()
    },
    closeModal() {
      this.showForm = false
      // document.getElementById('modal_candidat').close()
      this.initCandidat()
    },
    async postModal() {
      // let data = this.candidat
      const data = new FormData();
      if (this.candidat.photo) {
        data.append("photo", this.candidat.photo);
      } 

      if (this.candidat.resume) {
        data.append("resume", this.candidat.resume);
      }

      // append expertises as json encoded string
      
      for (const key in this.candidat) {
        if (key !== 'photo' && key !== 'photoImg' && this.candidat.hasOwnProperty(key) && this.candidat[key]!=='' && this.candidat[key]!==null) {
          data.append(key, this.candidat[key]);
        }
      }

      data.append("expertise_technique", JSON.stringify(this.expertises) ?? [ { name: '', exp: '' } ]);
      data.append("clients", JSON.stringify(this.clients) ?? [ { name: '', reference: '' } ]);
      data.append("langues", JSON.stringify(this.langues) ?? [ { name: '', level: '' } ]);
      data.append("etl", JSON.stringify(this.etl) ?? [ { name: '', exp: '' } ]);
      data.append("pretentions_salariales", JSON.stringify(this.pretentions_salariales) ?? [ { name: '', salary: '' } ]);
      data.append("certifications", JSON.stringify(this.certifications) ?? [ { name: '' } ]);
      data.append("gestion_projet", JSON.stringify(this.gestion_projet) ?? [ { name: '' } ]); 
      
      if(this.update) {
        data.id = this.candidat.id
        await this.storeCandidat.updateCandidats(data)
      }else{
        await this.storeCandidat.postCandidats(data)
        this.closeModal()
      }
    },
    async deleteCandidat(id) {
      if(confirm('Voulez-vous supprimer ce candidat ?')){
        await this.storeCandidat.deleteCandidats(id)
      }
    },
    async updateCandidat() {
      let data = this.candidat
      await this.storeCandidat.updateCandidats(data)
      this.closeModal()
    },
    openEditModal(candidat) {
      this.candidat = candidat

      // format from string to array expertise_technique
      this.expertises = JSON.parse(candidat.expertise_technique) ?? [ { name: '', exp: '' } ]
      this.clients = JSON.parse(candidat.clients) ?? [ { name: '', reference: '' } ]
      this.langues = JSON.parse(candidat.langues) ?? [ { name: '', level: '' } ]
      this.pretentions_salariales = JSON.parse(candidat.pretentions_salariales) ?? [ { name: '', salary: '' } ]
      this.certifications = JSON.parse(candidat.certifications) ?? [ { name: '' } ]
      this.gestion_projet = JSON.parse(candidat.gestion_projet) ?? [ { name: '' } ]
      this.etl = JSON.parse(candidat.etl) ?? [ { name: '', exp: '' } ] 

      console.log('here :')

      this.update = true
      this.showForm = true
      // document.getElementById('modal_candidat').showModal()
    },
    async getCandidats(url) {
      await this.storeCandidat.getCandidats(url)
    },

    async searchCandidats() {
      // sleep 500ms
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search,
        etapes: this.selectedEtapes.map(etape => etape.id),
        type_contrat: this.type_contrat,
        min_exp: this.min_exp,
        max_exp: this.max_exp,
      }
      await this.storeCandidat.searchCandidats(data)
    },
    async filterCandidats() {
      // sleep 500ms
      const etapes = this.selectedEtapes.map(etape => etape.id)
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: '',
        etapes: etapes,
      }
      await this.storeCandidat.searchCandidats(data)
    }
  },
  mounted() {
    this.storeCandidat.getCandidats()
    this.storeCandidat.getAllEtapes()

  }

}

</script>  