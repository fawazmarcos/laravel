import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useTimesheetStore = defineStore('timesheet', {
  state: () => ({loading: false,timesheets:[],timesheet:null,secteurs:[],meta:[],links:[],total_timesheets:0,total_entreprises:0,currentUrl:null,pending_timesheets:[],monthYear:null,current_timesheet:null }),
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
    successResponse(response,showToast=true,reload=true){
      this.loading = false;
      if(reload){
        this.getTimesheets(this.currentUrl);
      }
      if(showToast){
        toast.success(response.data.message, {
          autoClose: 5000,
        });
      }
     
    },
    // get timesheets
    getTimesheets(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/timesheets';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.timesheets = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // get timesheets
    getAllTimesheets(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/all-timesheets';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.timesheets = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // get month and year
    getMonthYear(){
      this.loading = true;
      axios.get('/api/month-year').then((response) => {
        this.monthYear = response.data.data;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },
 
    // post timesheets
    postTimesheets(body){
      this.loading = true;
      axios.post('/api/timesheets', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    }, 

    // post update-timesheets/{id}
    updateTimesheets(body){
      this.loading = true;
      axios.post('/api/update-timesheets/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // post update-timesheets/{id}
    updateEntry(body){
      this.loading = true;
      axios.post('/api/update-entry/'+body.id, body).then((response) => {
        this.successResponse(response,false);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // update timesheet entry project
    updateEntryProject(body){
      // this.loading = true;
      axios.post('/api/update-entry-project/'+body.id, body).then((response) => {
        this.successResponse(response,false,false);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // get timesheet by id
    getTimesheetById(id){
      this.loading = true;
      axios.get('/api/timesheet/'+id).then((response) => {
        this.current_timesheet = response.data.data;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // reinit
    reinit(id){
      this.loading = true;
      axios.post('/api/reinit-timesheet/'+id).then((response) => {
        this.successResponse(response,false);
      }).catch((error) => {
        this.catchError(error);
      })

    },

    // delete timesheets/{id}
    deleteTimesheets(id){
      this.loading = true;
      axios.delete('/api/timesheets/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // search timesheets
    searchTimesheets(body){
      axios.post('/api/search-timesheets',body).then((response) => {
        this.timesheets = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    exportTimesheets(param){
      this.loading = true;
      axios.get('/api/export-timesheet'+param).then((response) => {
        this.successResponse(response);         
        const url = response.data.url;
        window.open(url, '_blank');
      }).catch((error) => {
        this.catchError(error);
      })
    },

  },
})

export default useTimesheetStore;