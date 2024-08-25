import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useEntrepriseStore = defineStore('entreprise', {
  state: () => ({loading: false,entreprises:[],entreprise:null,secteurs:[],meta:[],links:[] }),
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
      this.getEntreprises();
      toast.success(response.data.message, {
        autoClose: 5000,
      });
    },
    // get entreprises
    getEntreprises(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/entreprises';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.entreprises = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // post entreprises
    postEntreprises(body){
      this.loading = true;
      axios.post('/api/entreprises', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // post update-entreprises/{id}
    updateEntreprises(body){
      this.loading = true;
      axios.post('/api/update-entreprises/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // delete entreprises/{id}
    deleteEntreprises(id){
      this.loading = true;
      axios.delete('/api/entreprises/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // export entreprises
    exportEntreprises(){
      this.loading = true;
      axios.get('/api/export-entreprises').then((response) => {
        this.successResponse(response);         
        const url = response.data.url;
        // download file
        window.open(url, '_blank');
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // search entreprises
    searchEntreprises(body){
      axios.post('/api/search-entreprises',body).then((response) => {
        this.entreprises = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },




  },
})

export default useEntrepriseStore;