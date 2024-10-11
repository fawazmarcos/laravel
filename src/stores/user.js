import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useUserStore = defineStore('user', {
  state: () => ({loading: false,users:[],user:null,secteurs:[],meta:[],allUsers:[],allPermissions:[], }),
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
      this.getUsers();
      toast.success(response.data.message, {
        autoClose: 5000,
      });
    },
    // get users
    getUsers(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/users';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.users = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // post users
    postUsers(body){
      this.loading = true;
      axios.post('/api/users', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // post update-users/{id}
    updateUsers(body){
      this.loading = true;
      axios.post('/api/update-users/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);

      })
    },

    // delete users/{id}
    deleteUsers(id){
      this.loading = true;
      axios.delete('/api/users/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },


    // search users
    searchUsers(body){
      axios.post('/api/search-users',body).then((response) => {
        this.users = response.data.data;
        this.meta = response.data.meta;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // get all users
    getAllUsers(){
      this.loading = true;
      axios.get('/api/all-users').then((response) => {  
        this.allUsers = response.data.data;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // get all permissions
    getAllPermissions(){
      this.loading = true;
      axios.get('/api/all-permissions').then((response) => {  
        this.allPermissions = response.data.data;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },


  },
})

export default useUserStore;