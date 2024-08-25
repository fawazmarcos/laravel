import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({loading: false,stats:[],stat:null,secteurs:[],meta:[], last_data:[] }),
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
      this.getDashboards();
      toast.success(response.data.message, {
        autoClose: 5000,
      });
    },

    // get dashboards
    getStats(period='this_month'){
      const url = '/api/stats/'+period;
      this.loading = true;
      axios.get(url).then((response) => {
        this.stats = response.data;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // get last data
    getLastData(){
      const url = '/api/last-data';
      this.loading = true;
      axios.get(url).then((response) => {
        this.last_data = response.data;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },


  },
})

export default useDashboardStore;