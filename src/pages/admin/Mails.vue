

<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 " >
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Campagnes</h2>
          </div> 
        </div> 

        <div class="flex flex-col gap-3 w-full" v-if="storeAuth.mails && storeAuth.mails.length > 0">
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            mails
          </div>
        </div>

        <div class="flex flex-col gap-3 w-full" v-if="!storeAuth.is_auth_office" >
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
              <span @click="storeAuth.getO365Url()"  :class="{ 'flex cursor-pointer items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-white rounded-lg  bg-gray-900 ': true, }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Connectez Office 365
              </span>
          </div>
        </div>

        <div class="flex flex-col gap-3 w-full" v-if="storeAuth.is_office_loading"  >
          <Loading />
        </div>
  
      </div> 
    </template>
  </Dashboard>
</template>

<script>

import { useAuthStore } from '@stores/auth' 

export default {
  components: {
  }, 
  data() {
      return {
          storeAuth: useAuthStore(),
          profil: {
            first_name: '',
            last_name: '',
            email: '',
            title: '',
            linkedin: '',
            telephone: '',
            email: '',
            tags:'',
          },
          update : false,
          search: '',
          showForm : false,
          current_profil_id : null,
          search_tags : '',
          selectedTags: [],
          multiTags: [],
          
      }
  }, 
  methods: {
  },
  mounted() {
    // this.storeAuth.getMails()
  }

}

</script>
