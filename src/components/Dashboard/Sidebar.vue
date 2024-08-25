<template>
  <div id="application-sidebar" class="hs-overlay [--auto-close:lg]
      hs-overlay-open:translate-x-0
      -translate-x-full transition-all duration-300 transform
      w-[260px]
      hidden
      fixed inset-y-0 start-0 z-[60]
      bg-white border-e border-gray-200
      lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
    
    ">
      <div class="px-8 pt-4">
        <!-- Logo -->
          <Logo />
        <!-- End Logo -->
      </div>

      <nav class="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open v-if="storeAuth.user">
        <ul class="space-y-1.5"> 
          <li v-if="user_have_permission('dashboard')">
            <RouterLink :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/admin', 'w-full': path !== '/admin' }" to="/admin">
              <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Dashboard
            </RouterLink>
          </li>
          <li v-if="user_have_permission('profils')">
            <RouterLink :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/profils', 'w-full': path !== '/profils' }"  to="/profils">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Profils
            </RouterLink>
          </li>
          <li v-if="user_have_permission('entreprises')"> 
            <RouterLink to="/entreprises" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/entreprises', 'w-full': path !== '/entreprises' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
            Entreprises
            </RouterLink>
          </li>
          <li  v-if="user_have_permission('candidats')"> 
            <RouterLink to="/candidats"  :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/candidats', 'w-full': path !== '/candidats' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-user-round"><path d="M18 21a6 6 0 0 0-12 0"/><circle cx="12" cy="11" r="4"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
            Candidats
            </RouterLink>
          </li>
          <li v-if="user_have_permission('offres')"> 
            <RouterLink to="/offres" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/offres', 'w-full': path !== '/offres' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
            Offres
            </RouterLink>
          </li>
          <li  v-if="user_have_permission('clients')"> 
            <RouterLink to="/clients" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/clients', 'w-full': path !== '/clients' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
            Clients
            </RouterLink>
          </li>
          <li v-if="user_have_permission('users')">
            <RouterLink to="/users"  :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/users', 'w-full': path !== '/users' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Utilisateurs
            </RouterLink>
          </li>
          <li v-if="user_have_permission('timesheet')">
            <RouterLink to="/timesheet" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/timesheet', 'w-full': path !== '/timesheet' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
            Mes Temps
            </RouterLink>
          </li>
          <li v-if="user_have_permission('timesheet-admin')">
            <RouterLink to="/timesheet-admin" :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/timesheet-admin', 'w-full': path !== '/timesheet-admin' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
            Feuilles de temps
            </RouterLink>
          </li>
          <li v-if="user_have_permission('projects')">
            <RouterLink to="/projects"  :class="{ 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/projects', 'w-full': path !== '/projects' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Mes Projets
            </RouterLink>
          </li> 
          <li>
            <span @click="logout()" :class="{ 'cursor-pointer flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100': true, 'bg-gray-100': path === '/besoins', 'w-full': path !== '/besoins' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>  
              Déconnexion
            </span>
          </li>
        </ul>
      </nav>
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
  setup() {
    const sidebarOpen = ref(false)
    return {
      sidebarOpen
    }
  },
  methods: {
    logout() {
      this.storeAuth.logOut()
    },
    user_have_permission(permission){
      // check if permission is in user permissions
      const role = this.storeAuth.getUser().role
      return role === 'admin' ||  this.storeAuth.getUser().permissions_name.includes(permission)
    }
  },
  mounted() {
    this.storeAuth.Me()
    this.path = this.$route.path
  }
}
 
</script>
