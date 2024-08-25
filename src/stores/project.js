import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useProjectStore = defineStore('project', {
  state: () => ({loading: false,projects:[],project:null,secteurs:[],meta:[],links:[],total_projects:0,total_entreprises:0,currentUrl:null,pending_projects:[] }),
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
      this.getProjects(this.currentUrl);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
    },
    // get projects
    getProjects(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/projects';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.projects = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },
 

     // get projects
     getPendingProjects(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/pending-projects';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.pending_projects = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },
 

    // post projects
    postProjects(body){
      this.loading = true;
      axios.post('/api/projects', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    }, 

    // post update-projects/{id}
    updateProjects(body){
      this.loading = true;
      axios.post('/api/update-projects/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // delete projects/{id}
    deleteProjects(id){
      this.loading = true;
      axios.delete('/api/projects/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // search projects
    searchProjects(body){
      axios.post('/api/search-projects',body).then((response) => {
        this.projects = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

  },
})

export default useProjectStore;