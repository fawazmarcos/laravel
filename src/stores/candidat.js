import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useCandidatStore = defineStore('candidat', {
  state: () => ({loading: false,candidats:[],candidat:null,secteurs:[],meta:[],links:[],total_candidats:0,total_entreprises:0,currentUrl:null,allEtapes:[] }),
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
      this.getCandidats(this.currentUrl);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
    },
    // get candidats
    getCandidats(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/candidats';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.candidats = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },
 

    // post candidats
    postCandidats(body){
      this.loading = true;
      axios.post('/api/candidats', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    }, 

    // post update-candidats/{id}
    updateCandidats(body){
      this.loading = true;
      axios.post('/api/update-candidats/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // delete candidats/{id}
    deleteCandidats(id){
      this.loading = true;
      axios.delete('/api/candidats/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // search candidats
    searchCandidats(body){
      axios.post('/api/search-candidats',body).then((response) => {
        this.candidats = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // all etapes
    getAllEtapes(){
      axios.get('/api/all-etapes').then((response) => {
        this.allEtapes = response.data.data;
      }).catch((error) => {
        this.catchError(error);
      })
    },


  },
})

export default useCandidatStore;