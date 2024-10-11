<script setup>
import { defineProps, defineEmits } from 'vue'

// Reçoit la prop is_sidebar_open
const props = defineProps({
  is_sidebar_open: Boolean
})

// Émet l'événement pour toggle la sidebar
const emit = defineEmits(['toggle-sidebar'])

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>

<template>
    <div id="application-sidebar" class="hs-overlay [--auto-close:lg]
      hs-overlay-open:translate-x-0
      -translate-x-full transition-all duration-500 transform
      flex flex-col justify-between min-h-screen
      fixed inset-y-0 start-0 z-[60]
      bg-gray-900 text-white border-e border-gray-200
      lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
      
    " :class="is_sidebar_open ? 'w-56' : 'w-20' ">
      <div class="flex flex-col">
        <div class="p-4">
          <!-- Logo -->
            <Logo :show_text="is_sidebar_open" color="white" />
          <!-- End Logo -->
        </div>

        <nav class="hs-accordion-group w-full flex flex-col flex-wrap" data-hs-accordion-always-open v-if="storeAuth.user">
          <ul class="space-y-1.5 menu"> 
            <li v-if="user_have_permission('dashboard')">
              <RouterLink :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/admin', 'w-full': path !== '/admin' }" to="/admin">
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                {{ is_sidebar_open ? 'Dashboard' : '' }}
              </RouterLink>
            </li>
            <li v-if="user_have_permission('profils')">
              <RouterLink :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/profils', 'w-full': path !== '/profils' }"  to="/profils">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                {{ is_sidebar_open ? 'Profils' : '' }}
              </RouterLink>
            </li>
            <li v-if="user_have_permission('entreprises')"> 
              <RouterLink to="/entreprises" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/entreprises', 'w-full': path !== '/entreprises' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
                {{ is_sidebar_open ? 'Entreprises' : '' }}
              </RouterLink>
            </li>
            <li  v-if="user_have_permission('candidats')"> 
              <RouterLink to="/candidats"  :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/candidats', 'w-full': path !== '/candidats' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-user-round"><path d="M18 21a6 6 0 0 0-12 0"/><circle cx="12" cy="11" r="4"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                {{ is_sidebar_open ? 'Candidats' : '' }}
              </RouterLink>
            </li>
            <li v-if="user_have_permission('offres')"> 
              <RouterLink to="/offres" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/offres', 'w-full': path !== '/offres' }">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-euro"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M7 12h5"/><path d="M15 9.4a4 4 0 1 0 0 5.2"/></svg>
                {{ is_sidebar_open ? 'Offres' : '' }}
              </RouterLink>
            </li>
            <li  v-if="user_have_permission('clients')"> 
              <RouterLink to="/clients" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/clients', 'w-full': path !== '/clients' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
                {{ is_sidebar_open ? 'Clients' : '' }}
              </RouterLink>
            </li> 
            <li class="p-0">
              <details  >
                <summary class="py-2 px-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {{ is_sidebar_open ? 'Timesheet' : '' }}
                </summary>
                <ul>  
                  <li v-if="user_have_permission('timesheet')">
                    <RouterLink to="/timesheet" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/timesheet', 'w-full': path !== '/timesheet' }">
                      {{ is_sidebar_open ? 'Mes Temps' : '' }}
                    </RouterLink>
                  </li>
                  <li v-if="user_have_permission('timesheet-admin')">
                    <RouterLink to="/timesheet-admin" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/timesheet-admin', 'w-full': path !== '/timesheet-admin' }">
                      {{ is_sidebar_open ? 'Tous les temps' : '' }}
                    </RouterLink>
                  </li>
                  <li v-if="user_have_permission('projects')">
                    <RouterLink to="/projects"  :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/projects', 'w-full': path !== '/projects' }">
                      {{ is_sidebar_open ? 'Projets des temps' : '' }}
                    </RouterLink>
                  </li>  
                </ul>
              </details>
            </li> 
            <li v-if="user_have_permission('users')">
              <RouterLink to="/users"  :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/users', 'w-full': path !== '/users' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {{ is_sidebar_open ? 'Utilisateurs' : '' }}
              </RouterLink>
            </li>
            <li v-if="!storeAuth.user.is_login_office" class="hidden">
              <span @click="storeAuth.getO365Url()"  :class="{ 'flex cursor-pointer items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                {{ is_sidebar_open ? 'Connectez Office 365' : '' }}
              </span>
            </li>

           
            <li >
              <RouterLink   to="/mails"  :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/mails', 'w-full': path !== '/mails' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                {{ is_sidebar_open ? 'Mails' : '' }}
              </RouterLink>
            </li>
            <li>
              <span @click="toggleSidebar" :class="{ 'cursor-pointer flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/besoins', 'w-full': path !== '/besoins' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>
                  {{ is_sidebar_open ? 'Fermer' : '' }}
              </span>
            </li>
            <li  v-if="storeAuth.user">
              <RouterLink to="profil"  :class="{ 'cursor-pointer flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/profil', 'w-full': path !== '/profil' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-user-round"><path d="M18 21a6 6 0 0 0-12 0"/><circle cx="12" cy="11" r="4"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg> 
                {{ is_sidebar_open ? storeAuth.user.first_name + " " + storeAuth.user.last_name : '' }}
              </RouterLink>
            </li>
            <li  v-if="storeAuth.user">
              <span @click="logout()" :class="{ 'cursor-pointer flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white hover:text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100 text-neutral-700': path === '/besoins', 'w-full': path !== '/besoins' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>  
                {{ is_sidebar_open ? 'Déconnexion' : '' }}
              </span>
            </li>
          </ul>
        </nav> 
      </div> 
    </div>
</template>
<script>
// mounted route path
import { useAuthStore } from '@stores/auth'
import { ref } from 'vue'
export default {
  components: {
  },
  data() {
    return {
      path: '',
      storeAuth : useAuthStore(),
    }
  },
  computed:{
   
  }, 
  methods: {
    logout() {
      this.storeAuth.logOut()
    },
    user_have_permission(permission){
      // check if permission is in user permissions
      const role = this.storeAuth.getUser().role
      return role === 'admin' ||  this.storeAuth.getUser().permissions_name.includes(permission)
    }, 
  },
  mounted() {
    this.storeAuth.Me()
    this.path = this.$route.path
     
  }
}
 
</script>
