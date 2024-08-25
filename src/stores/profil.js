import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useProfilStore = defineStore('profil', {
  state: () => ({loading: false,profils:[],profil:null,secteurs:[],meta:[],links:[],total_profils:0,total_entreprises:0,currentUrl:null }),
  actions: {

    // catch error
    catchError(error){
      this.loading = false;
      let message = "Une erreur est survenue!";
      if (error.response) {
        message = error.response.data.message;
      }
      toast.error(message, {
        autoClose: 5000,
      });
    },
    // notify response
    successResponse(response){
      this.loading = false;
      console.log(response.data);
      this.getProfils(this.currentUrl);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
    },
    // get profils
    getProfils(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/profils';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.profils = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // get total profils total-profils
    getTotalProfils(){
      axios.get('/api/total-profils').then((response) => {
        this.total_profils = response.data.total_profils;
        this.total_entreprises = response.data.total_entreprises;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // post profils
    postProfils(body){
      this.loading = true;
      axios.post('/api/profils', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // enrichProfils
    enrichProfil(id){
      this.loading = true;
      // hide span id enrich_{id}
      document.getElementById('enrich_'+id).style.display = 'none';
      // show spinner id spinner_{id} by adding class inline-flex and removing class hidden
      document.getElementById('spinner_'+id).classList.remove('hidden');
      document.getElementById('spinner_'+id).classList.add('inline-flex');
      axios.get('/api/enrich-profil/'+id).then((response) => {
        this.successResponse(response);
        document.getElementById('spinner_'+id).classList.remove('inline-flex');
        document.getElementById('spinner_'+id).classList.add('hidden');
      }).catch((error) => {
        this.catchError(error);
        document.getElementById('spinner_'+id).classList.remove('inline-flex');
        document.getElementById('spinner_'+id).classList.add('hidden');
      })
      
    },

    // post update-profils/{id}
    updateProfils(body){
      this.loading = true;
      axios.post('/api/update-profils/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // delete profils/{id}
    deleteProfils(id){
      this.loading = true;
      axios.delete('/api/profils/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // export profils
    exportProfils(){
      this.loading = true;
      axios.get('/api/export-profils').then((response) => {
        this.successResponse(response);         
        const url = response.data.url;
        // download file
        window.open(url, '_blank');
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // search profils
    searchProfils(body){
      axios.post('/api/search-profils',body).then((response) => {
        this.profils = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },




  },
})

export default useProfilStore;