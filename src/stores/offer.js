import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useOfferStore = defineStore('offer', {
  state: () => ({loading: false,offers:[],offer:null,secteurs:[],meta:[],links:[],total_offers:0,total_entreprises:0,currentUrl:null }),
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
      this.getOffers(this.currentUrl);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
    },
    // get offers
    getOffers(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/offers';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.offers = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },
 

    // post offers
    postOffers(body){
      this.loading = true;
      axios.post('/api/offers', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    }, 

    // post update-offers/{id}
    updateOffers(body){
      this.loading = true;
      axios.post('/api/update-offers/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // delete offers/{id}
    deleteOffers(id){
      this.loading = true;
      axios.delete('/api/offers/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // search offers
    searchOffers(body){
      axios.post('/api/search-offers',body).then((response) => {
        this.offers = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },


  },
})

export default useOfferStore;