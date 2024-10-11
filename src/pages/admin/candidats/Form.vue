<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 ">
        <div class="flex justify-between items-center">
          <RouterLink to="/candidats" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-900 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none"> <i class="fa fa-arrow-left"></i> Retour</RouterLink>
        </div>
          <form method="POST" v-if="candidat.id" @submit.prevent="postModal()" class="sm:max-w-lg w-full !max-w-7xl sm:w-full m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-900">
                 {{!is_update ? 'Ajouter un candidat' : 'Modifier le candidat' }}
                </h3>
                <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-4"  >
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
                <span class="col-span-4 font-bold border-b"> Informations personnelles</span>
                <!-- first_name -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="first_name" class="text-sm font-medium text-gray-900">Prénom</label>
                  <input v-model="candidat.first_name" type="text" id="first_name" name="first_name" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Prénom">
                </div>
                <!-- last_name -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="last_name" class="text-sm font-medium text-gray-900">Nom</label>
                  <input v-model="candidat.last_name" type="text" id="last_name" name="last_name" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Nom">
                </div> 
                <!-- email -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="email" class="text-sm font-medium text-gray-900">Email</label>
                  <input v-model="candidat.email" type="email" id="email" name="email" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Email">
                </div>
                 <!-- email_s -->
                 <div class=" col-span-1 flex flex-col gap-1">
                  <label for="email_s" class="text-sm font-medium text-gray-900">Email secondaire</label>
                  <input v-model="candidat.email_s" type="email" id="email_s" name="email_s" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Email secondaire">
                </div>
                <!-- statut_matrimonial -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="statut_matrimonial" class="text-sm font-medium text-gray-900">Statut matrimonial</label>
                  <input v-model="candidat.statut_matrimonial" type="text" id="statut_matrimonial" name="statut_matrimonial" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Statut matrimonial">
                </div> 
                <!-- annee_experience -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="annee_experience" class="text-sm font-medium text-gray-900">Années d'expérience</label>
                  <input v-model="candidat.annee_experience" type="number" min="0" step="1" id="annee_experience" name="annee_experience" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Années d'expérience">
                </div> 
                <span class="col-span-4 font-bold pt-3 border-b"> Contact & Adresse</span>
                  <!-- telephone -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="telephone" class="text-sm font-medium text-gray-900">Téléphone</label>
                  <input v-model="candidat.telephone" type="text" id="telephone" name="telephone" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Téléphone">
                </div>
                <!-- telephone_s -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="telephone_s" class="text-sm font-medium text-gray-900">Téléphone secondaire</label>
                  <input v-model="candidat.telephone_s" type="text" id="telephone_s" name="telephone_s" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Téléphone secondaire">
                </div>
                <!-- adress -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="adress" class="text-sm font-medium text-gray-900">Adresse complète</label>
                  <input v-model="candidat.adress" type="text" id="adress" name="adress" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Adresse">
                </div> 
                <!-- city -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="city" class="text-sm font-medium text-gray-900">Ville</label>
                  <input v-model="candidat.city" type="text" id="city" name="city" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Ville">
                </div>
                <!-- country -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="country" class="text-sm font-medium text-gray-900">Pays</label>
                  <input v-model="candidat.country" type="text" id="country" name="country" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Pays">
                </div>
                <span class="col-span-4 font-bold pt-3 border-b"> Recrutement</span>
                 <!-- last_situation -->
                 <div class=" col-span-1 flex flex-col gap-1">
                  <label for="last_situation" class="text-sm font-medium text-gray-900">Dernière situation</label>
                  <input v-model="candidat.last_situation" type="text" id="last_situation" name="last_situation" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Dernière situation">
                </div>
               
             
                <!-- linkedin -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="linkedin" class="text-sm font-medium text-gray-900">Linkedin</label>
                  <input v-model="candidat.linkedin" type="text" id="linkedin" name="linkedin" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Linkedin">
                </div>
                
               
                <!-- entreprise_id -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="entreprise_id" class="text-sm font-medium text-gray-900">Entreprise</label>
                  <input v-model="candidat.entreprise_id" type="text" id="entreprise_id" name="entreprise_id" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Entreprise">
                </div>
                <!-- current_client_id -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="current_client_id" class="text-sm font-medium text-gray-900">Client actuel</label>
                  <input v-model="candidat.current_client_id" type="text" id="current_client_id" name="current_client_id" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Client actuel">
                </div>
                <!-- contrat_type -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="contrat_type" class="text-sm font-medium text-gray-900">Type de contrat</label>
                  <select v-model="candidat.contrat_type" type="text" id="contrat_type" name="contrat_type" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900">
                    <option value="cdi">CDI</option>
                    <option value="cdd">CDD</option>
                    <option value="alternance">Alternance</option>
                  </select>
                  <!-- <input v-model="candidat.contrat_type" type="text" id="contrat_type" name="contrat_type" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Type de contrat"> -->
                </div>
                <!-- <div class=" col-span-1 flex flex-col gap-1">
                  <label for="etape_id" class="text-sm font-medium text-gray-900">Etape de la candidature</label>
                  <select v-model="candidat.etape_id" type="text" id="etape_id" name="etape_id" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900">
                    <option value=""></option>
                    <option v-for="etape in storeCandidat.allEtapes" :key="etape.id" v-bind:value="etape.id">{{ etape.name }}</option>
                  </select>
                </div> -->
                <!-- <input v-model="candidat.contrat_type" type="text" id="contrat_type" name="contrat_type" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Type de contrat"> -->
                <!-- contrat_start -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="contrat_start" class="text-sm font-medium text-gray-900">Début de contrat</label>
                  <input v-model="candidat.contrat_start" type="date" id="contrat_start" name="contrat_start" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Début de contrat">
                </div>
                <!-- contrat_end -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="contrat_end" class="text-sm font-medium text-gray-900">Fin de contrat</label>
                  <input v-model="candidat.contrat_end" type="date" id="contrat_end" name="contrat_end" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Fin de contrat">
                </div>
                <!-- tjm -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="tjm" class="text-sm font-medium text-gray-900">TJM</label>
                  <input v-model="candidat.tjm" type="integer" step="0.01" min="0" id="tjm" name="tjm" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="TJM">
                </div>
                <!-- sal_net -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="sal_net" class="text-sm font-medium text-gray-900">Salaire net</label>
                  <input v-model="candidat.sal_net" type="number" min="0" step="0.01" id="sal_net" name="sal_net" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Salaire net">
                </div>
                <!-- sal_brut -->
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="sal_brut" class="text-sm font-medium text-gray-900">Salaire brut</label>
                  <input v-model="candidat.sal_brut" type="number" min="0" step="0.01" id="sal_brut" name="sal_brut" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Salaire brut">
                </div>

                <span class="col-span-4 font-bold pt-3 border-b"> CV </span>
                <div class=" col-span-1 flex flex-col gap-1">
                  <label for="resume" class="text-sm font-medium text-gray-900">Uploader le CV</label>
                  <label for="resume" class="cursor-pointer flex text-sm shadow font-medium m-auto rounded py-2 h-full  min-h-20 px-3 w-full  border border-dotted border-gray-400 ">
                    <i  class="fa fa-upload m-auto"></i>
                  </label>
                  <input @change="readResumeURL($event.target)" type="file" id="resume" class="hidden" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,application/pdf,image/jpeg,image/png,image/jpg,image/gif,image/bmp,image/tiff,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,application/pdf,image/jpeg,image/png,image/jpg,image/gif,image/bmp,image/tiff"  >
                </div>
                <div class=" col-span-1 flex flex-col gap-1">
                  <a :href="candidat.resumeImg" target="_blank" v-if="candidat.resumeImg" class="text-sm underline text-gray-900" >Voir le CV <i class="fa fa-external-link"></i></a>
                </div>

                <span class="col-span-4 font-bold pt-3 border-b pb-2"> Expertise Technique <span @click="addExpertise()" class="p- text-sm  cursor-pointer rounded text-green-500"><i class="fa fa-plus"></i></span></span>
                <div class="grid grid-cols-2 gap-3 col-span-4"> 
                  <div class="w-full flex items-center gap-2 border  rounded-lg text-sm divide-x  justify-between" v-for=" expertise,index in expertises" :key="index"> 
                    <input type="text" class="w-3/6 !outline-none p-2" v-model="expertises[index].name" placeholder="Anaplan">
                    <input type="number" class="w-2/6 p-2 !outline-none" v-model="expertises[index].exp" placeholder="2 (en année) ">
                    <i class="fa fa-close cursor-pointer p-2 text-red-500" @click="expertises.splice(expertises.indexOf(expertise), 1)"></i>
                  </div> 
                </div>

                <span class="col-span-4 font-bold pt-3 border-b"> Clients <span @click="addClient()" class="p- text-sm  cursor-pointer rounded text-green-500"><i class="fa fa-plus"></i></span></span>
                <div class="grid grid-cols-2 gap-3 col-span-4"> 
                  <div class="w-full flex items-center gap-2 border  rounded-lg text-sm divide-x  justify-between" v-for=" client,index in clients" :key="index"> 
                    <input type="text" class="w-3/6 !outline-none p-2" v-model="clients[index].name" placeholder="KPS Group">
                    <input type="text" class="w-2/6 p-2 !outline-none" v-model="clients[index].reference" placeholder="Yves AHYI">
                    <i class="fa fa-close cursor-pointer p-2 text-red-500" @click="clients.splice(clients.indexOf(client), 1)"></i>
                  </div> 
                </div>

                <span class="col-span-4 font-bold pt-3 border-b"> Langues <span @click="addLangue()" class="p- text-sm  cursor-pointer rounded text-green-500"><i class="fa fa-plus"></i></span></span>
                <div class="grid grid-cols-2 gap-3 col-span-4"> 
                  <div class="w-full flex items-center gap-2 border  rounded-lg text-sm divide-x  justify-between" v-for=" langue,index in langues" :key="index"> 
                    <input type="text" class="w-3/6 !outline-none p-2" v-model="langues[index].name" placeholder="Anglais">
                    <input type="text" class="w-2/6 p-2 !outline-none" v-model="langues[index].level" placeholder="Courant ">                    
                    <i class="fa fa-close cursor-pointer p-2 text-red-500" @click="langues.splice(langues.indexOf(langue), 1)"></i>
                  </div> 
                </div>    

                <span class="col-span-4 font-bold pt-3 border-b"> Etl <span @click="addEtl()" class="p- text-sm  cursor-pointer rounded text-green-500"><i class="fa fa-plus"></i></span></span>
                <div class="grid grid-cols-2 gap-3 col-span-4"> 
                  <div class="w-full flex items-center gap-2 border  rounded-lg text-sm divide-x  justify-between" v-for=" etl_,index in etl" :key="index"> 
                    <input type="text" class="w-3/6 !outline-none p-2" v-model="etl[index].name" placeholder="Talend">
                    <input type="number" class="w-2/6 p-2 !outline-none" v-model="etl[index].exp" placeholder="1 (en année) ">                    
                    <i class="fa fa-close cursor-pointer p-2 text-red-500" @click="etl.splice(etl.indexOf(etl_), 1)"></i>
                  </div> 
                </div>

                <span class="col-span-4 font-bold pt-3 border-b"> Pretentions salariales <span @click="addPretentions_salariales()" class="p- text-sm  cursor-pointer rounded text-green-500"><i class="fa fa-plus"></i></span></span>  
                <div class="grid grid-cols-2 gap-3 col-span-4"> 
                  <div class="w-full flex items-center gap-2 border  rounded-lg text-sm divide-x  justify-between" v-for=" sal,index in pretentions_salariales" :key="index"> 
                    <input type="text" class="w-3/6 !outline-none p-2" v-model="pretentions_salariales[index].name" placeholder="France">
                    <input type="text" class="w-2/6 p-2 !outline-none" v-model="pretentions_salariales[index].salary" placeholder="55-60000 / an">                    
                    <i class="fa fa-close cursor-pointer p-2 text-red-500" @click="pretentions_salariales.splice(pretentions_salariales.indexOf(sal), 1)"></i>
                  </div> 
                </div>


                <span class="col-span-4 font-bold pt-3 border-b"> Certifications <span @click="addCertifications()" class="p- text-sm  cursor-pointer rounded text-green-500"><i class="fa fa-plus"></i></span></span>
                <div class="grid grid-cols-2 gap-3 col-span-4"> 
                  <div class="w-full flex items-center gap-2 border  rounded-lg text-sm divide-x  justify-between" v-for=" certif,index in certifications" :key="index"> 
                    <input type="text" class="w-3/6 !outline-none p-2" v-model="certifications[index].name" placeholder="GCP">
                    <i class="fa fa-close cursor-pointer p-2 text-red-500" @click="certifications.splice(certifications.indexOf(certif), 1)"></i>
                  </div> 
                </div>

                <span class="col-span-4 font-bold pt-3 border-b"> Gestion projet <span @click="addGestion_projet()" class="p- text-sm  cursor-pointer rounded text-green-500"><i class="fa fa-plus"></i></span></span>
                <div class="grid grid-cols-2 gap-3 col-span-4"> 
                  <div class="w-full flex items-center gap-2 border  rounded-lg text-sm divide-x  justify-between" v-for=" proj,index in gestion_projet" :key="index"> 
                    <input type="text" class="w-3/6 !outline-none p-2" v-model="gestion_projet[index].name" placeholder="Jira/Confluence">
                    <i class="fa fa-close cursor-pointer p-2 text-red-500" @click="gestion_projet.splice(gestion_projet.indexOf(proj), 1)"></i>
                  </div> 
                </div>


                <span class="col-span-4 font-bold pt-3 border-b"> Commentaires</span>
                 <!-- comment -->
                 <div class=" col-span-1 flex flex-col gap-1">
                  <label for="comment" class="text-sm font-medium text-gray-900">Ajouter un commentaire</label>
                  <textarea v-model="candidat.comment" id="comment" name="comment" class="py-2 px-3 border rounded-lg text-sm focus:border-gray-900 focus:ring-gray-900" placeholder="Commentaire"></textarea>
                </div>
               
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <span  @click="closeModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50 ">
                  Fermer
                </span>
                <button v-if="isValid"  type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-900 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                  <span v-if="storeCandidat.loading" class="loading loading-bars loading-md"></span>
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
          is_update: false,
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
  async mounted() {
    this.storeCandidat.getCandidats()
    this.storeCandidat.getAllEtapes()

    const id = this.$route.params.id

    const candidatData = await this.storeCandidat.theCandidat(id);

    if (candidatData) {
      this.candidat = candidatData;
      this.update = true;
    }  

    
  }

}

</script>  