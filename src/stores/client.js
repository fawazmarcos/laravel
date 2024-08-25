import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useClientStore = defineStore('client', {
  state: () => ({loading: false,clients:[],client:null,secteurs:[],meta:[],links:[],total_clients:0,total_entreprises:0,currentUrl:null }),
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
      this.getClients(this.currentUrl);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
    },
    // get clients
    getClients(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/clients';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.clients = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },
 

    // post clients
    postClients(body){
      this.loading = true;
      axios.post('/api/clients', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    }, 

    // post update-clients/{id}
    updateClients(body){
      this.loading = true;
      axios.post('/api/update-clients/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // delete clients/{id}
    deleteClients(id){
      this.loading = true;
      axios.delete('/api/clients/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // search clients
    searchClients(body){
      axios.post('/api/search-clients',body).then((response) => {
        this.clients = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },


  },
})

export default useClientStore;