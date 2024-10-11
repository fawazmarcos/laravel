import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useResumeStore = defineStore('resume', {
  state: () => ({loading: false,resumes:[],resume:null,meta:[],links:[],currentUrl:null }),
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
      this.getResumes(this.currentUrl);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
    },
    // get resumes
    getResumes(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/resumes';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.resumes = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },
 
    // post resumes
    postResumes(body){
      this.loading = true;
      axios.post('/api/resumes', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    }, 

    // post resumes/{id}
    updateResumes(body){
      this.loading = true;
      axios.post('/api/resumes/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // delete resumes/{id}
    deleteResumes(id){
      this.loading = true;
      axios.delete('/api/resumes/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // search resumes
    searchResumes(body){
      axios.post('/api/resumes/search',body).then((response) => {
        this.resumes = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

  },
})

export default useResumeStore;