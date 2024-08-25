import { createRouter, createWebHistory } from 'vue-router'
 
// auth routes
import Login from './pages/Auth/Login.vue'
import Register from './pages/Auth/Register.vue'
import ForgotPassword from './pages/Auth/ForgotPassword.vue'
import NewPassword from './pages/Auth/NewPassword.vue'
import ConfirmEmail from './pages/Auth/ConfirmEmail.vue'
import Profil from './pages/Auth/Profil.vue'

// admin routes
import Admin from './pages/Admin.vue'
// Dash
import Dash from './pages/Dash.vue'

// admin profils , entreprises , users
import Profils from '@pages/Admin/Profil.vue'
import Entreprises from '@pages/Admin/Entreprise.vue'
import Clients from '@pages/Admin/Client.vue'
import Timesheet from '@pages/Admin/Timesheet.vue'
import TimesheetAdmin from '@pages/Admin/TimesheetAdmin.vue'
import TheTimesheetAdmin from '@pages/Admin/TheTimesheetAdmin.vue'
import Projects from '@pages/Admin/Project.vue'
import Offers from '@pages/Admin/Offer.vue'
import Candidats from '@pages/Admin/Candidat.vue'
import Users from '@pages/Admin/User.vue'
import Dashboard from '@pages/Admin/Dashboard.vue'



// 404
import NotFound from './pages/NotFound.vue'

// pages routes
import Home from './pages/Home.vue'

import { useAuthStore } from '@stores/auth'
 
// auth 0 = optional
// auth 1 = not auth required
// auth 2 = auth required

const routes = [
  { path: '/', component: Dashboard ,auth:2},
  { path: '/login', component: Login ,auth:1},
  { path: '/register', component: Register ,auth:1},
  { path: '/profil', component: Profil ,auth:2},
  { path: '/forgot-password', component: ForgotPassword ,auth:1},
  { path: '/new-password', component: NewPassword ,auth:1},
  { path: '/confirm-email', component: ConfirmEmail ,auth:2},
  { path: '/404', component: NotFound ,auth:0},

  { path: '/dash', component: Dash ,auth:0},

  { path: '/admin', component: Dashboard ,auth:2},
  { path: '/profils', component: Profils ,auth:2},
  { path: '/entreprises', component: Entreprises ,auth:2},
  { path: '/clients', component: Clients ,auth:2},
  { path: '/timesheet', component: Timesheet ,auth:2},
  { path: '/timesheet-admin', component: TimesheetAdmin ,auth:2},
  { path: '/edit_timesheet', component: TheTimesheetAdmin ,auth:2},
  { path: '/projects', component: Projects ,auth:2},
  { path: '/candidats', component: Candidats ,auth:2},
  { path: '/offres', component: Offers ,auth:2},
  { path: '/users', component: Users ,auth:2},
]
// if path does not exist, redirect to 404
routes.push({ path: '/:pathMatch(.*)*', redirect: '/404' })

// check if the route requires authentication , if not connected and auth is true, redirect to login

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = useAuthStore().isLogin()
  const storeAuth = useAuthStore()
  const route = routes.find(r => r.path === to.path);
  const user = storeAuth.getUser();

  if(route.auth==1 && isAuthenticated && user &&  user.email_verified_at === null){
    if(to.path!='/confirm-email'){
      next('/confirm-email')
    }
  }

  if( (to.path=="/admin" || to.path=="/") && user && user.role !== 'admin' && user.role !== 'recruteur'){
    next('/timesheet')
  }

  if (route.auth==1 && isAuthenticated) {
    next('/admin');
  } if(route.auth==2 && !isAuthenticated) {
    next('/login?redirect='+to.fullPath);
  }

  if(route.auth==2 && isAuthenticated && user && user.permissions_name && user.role !=='admin' && !user.permissions_name.includes(to.path.split('/')[1])){
    // console.log(to.path.split('/')[1])
    next('/404')
  }
  
  else {
    next()
  }
}
);

export default router
 