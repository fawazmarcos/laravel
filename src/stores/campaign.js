import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'

export const useCampaignStore = defineStore('campaign', {
  state: () => ({loading: false,campaigns:[],campaign:null,secteurs:[],meta:[],links:[],total_campaigns:0,total_entreprises:0,currentUrl:null,tags:[],loading_tags:false, loading_profils:false, selected_profils:null }),
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
    successResponse(response,show_toast=true){
      this.loading = false;
      this.getCampaigns(this.currentUrl);
      if(show_toast){
        toast.success(response.data.message, {
          autoClose: 5000,
        });
      } 
    },
    // get campaigns
    getCampaigns(url=null){
      if(url){
        url = url;
      }else{
        url = '/api/campaigns';
      }
      this.loading = true;
      axios.get(url).then((response) => {
        this.currentUrl = url;
        this.campaigns = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // get total campaigns total-campaigns
    getTotalCampaigns(){
      axios.get('/api/total-campaigns').then((response) => {
        this.total_campaigns = response.data.total_campaigns;
        this.total_entreprises = response.data.total_entreprises;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // post campaigns
    postCampaigns(body){
      this.loading = true;
      axios.post('/api/campaigns', body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // enrichCampaigns
    enrichCampaign(id){
      this.loading = true;
      // hide span id enrich_{id}
      document.getElementById('enrich_'+id).style.display = 'none';
      // show spinner id spinner_{id} by adding class inline-flex and removing class hidden
      document.getElementById('spinner_'+id).classList.remove('hidden');
      document.getElementById('spinner_'+id).classList.add('inline-flex');
      axios.get('/api/enrich-campaign/'+id).then((response) => {
        this.successResponse(response,false);
        document.getElementById('spinner_'+id).classList.remove('inline-flex');
        document.getElementById('spinner_'+id).classList.add('hidden');
      }).catch((error) => {
        this.catchError(error);
        document.getElementById('spinner_'+id).classList.remove('inline-flex');
        document.getElementById('spinner_'+id).classList.add('hidden');
      })
      
    },

    // post update-campaigns/{id}
    updateCampaigns(body){
      this.loading = true;
      axios.post('/api/update-campaigns/'+body.id, body).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // delete campaigns/{id}
    deleteCampaigns(id){
      this.loading = true;
      axios.delete('/api/campaigns/'+id).then((response) => {
        this.successResponse(response);
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // export campaigns
    exportCampaigns(){
      this.loading = true;
      axios.get('/api/export-campaigns').then((response) => {
        this.successResponse(response);         
        const url = response.data.url;
        // download file
        window.open(url, '_blank');
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // search campaigns
    searchCampaigns(body){
      axios.post('/api/search-campaigns',body).then((response) => {
        this.campaigns = response.data.data;
        this.meta = response.data.meta;
        this.links = response.data.links;
        this.loading = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },

    // get campaign tags
    getTags(){
      this.loading_tags = true;
      axios.get('/api/campaign-tags').then((response) => {
        this.tags = response.data.data;
        this.loading_tags = false;
      }).catch((error) => {
        this.catchError(error);
      })
    },
 

    get_profils_by_tag(tag){
      this.loading_profils = true;
      axios.get('/api/profils-by-tag/'+tag).then((response) => {
        this.selected_profils = response.data.data;
        this.loading_profils = false;
      }).catch((error) => {
        // this.catchError(error);
        this.loading_profils = false;
      })
    },

    // lauch 
    launch(id){

      if(confirm('Voulez-vous lancer ce campagne ?')){
        this.loading = true;
        axios.post('/api/campaigns/'+id+'/launch').then((response) => {
          this.successResponse(response);
        }).catch((error) => {
          this.catchError(error);
        })
      }

    },

  },
})

export default useCampaignStore;