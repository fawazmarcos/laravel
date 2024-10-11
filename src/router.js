import { createRouter, createWebHistory } from 'vue-router'
 
// auth routes
import Login from './pages/auth/Login.vue'
import Register from './pages/auth/Register.vue'
import ForgotPassword from './pages/auth/ForgotPassword.vue'
import NewPassword from './pages/auth/NewPassword.vue'
import ConfirmEmail from './pages/auth/ConfirmEmail.vue'
import Profil from './pages/auth/Profil.vue'

// admin routes
import Admin from './pages/Admin.vue'
// Dash0
import Dash from './pages/Dash.vue'

// admin profils , entreprises , users
import Profils from '@pages/admin/Profil.vue'
import Entreprises from '@pages/admin/Entreprise.vue'
import Clients from '@pages/admin/Client.vue'
import Timesheet from '@pages/admin/Timesheet.vue'
import TimesheetEdit from '@pages/admin/TimesheetEdit.vue'
import TimesheetAdmin from '@pages/admin/TimesheetAdmin.vue'
import TheTimesheetAdmin from '@pages/admin/TheTimesheetAdmin.vue'
import TheTimesheetEditAdmin from '@pages/admin/TheTimesheetEditAdmin.vue'
import Projects from '@pages/admin/Project.vue'
import Offers from '@pages/admin/Offer.vue'

import CandidatsList from '@pages/admin/candidats/List.vue'
import CandidatsForm from '@pages/admin/candidats/Form.vue'



import Mails from '@pages/admin/Mails.vue'
import Campaign from '@pages/admin/Campaign.vue'
import Users from '@pages/admin/User.vue'
import Dashboard from '@pages/admin/Dashboard.vue'

import o365Callback from '@pages/o365Callback.vue'
import o365Confirm from '@pages/o365Confirm.vue'


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

  { path: '/o365Callback', component: o365Callback ,auth:2},
  { path: '/o365Confirm', component: o365Confirm ,auth:2},

  { path: '/dash', component: Dash ,auth:0},

  { path: '/admin', component: Dashboard ,auth:2, skip_check:false},
  { path: '/profils', component: Profils ,auth:2, skip_check:false},
  { path: '/entreprises', component: Entreprises ,auth:2, skip_check:false},
  { path: '/clients', component: Clients ,auth:2, skip_check:false},
  { path: '/timesheet', component: Timesheet ,auth:2, skip_check:false},
  { path: '/timesheet-admin', component: TimesheetAdmin ,auth:2, skip_check:false},
  { path: '/edit_timesheet', component: TheTimesheetAdmin ,auth:2, skip_check:false},
  { path: '/edit_my_timesheet', component: TimesheetEdit ,auth:2 , skip_check:true},
  { path: '/edit_the_timesheet', component: TheTimesheetEditAdmin ,auth:2 , skip_check:true},
  { path: '/projects', component: Projects ,auth:2, skip_check:false},

  { path: '/candidats', component: CandidatsList ,auth:2, skip_check:false},
  { path: '/candidats/new', component: CandidatsForm ,auth:2, skip_check:false},
  { path: '/candidats/:id', component: CandidatsForm ,auth:2, skip_check:false},


  { path: '/offres', component: Offers ,auth:2, skip_check:false},
  { path: '/users', component: Users ,auth:2, skip_check:false},
  { path: '/mails', component: Campaign ,auth:2, skip_check:true},
  { path: '/campaigns', component: Campaign ,auth:2, skip_check:true},
]
// if path does not exist, redirect to 404
routes.push({ path: '/:pathMatch(.*)*', redirect: '/404' })

// check if the route requires authentication , if not connected and auth is true, redirect to login

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const matchPath = (path, routePath) => {
  const paramRegex = new RegExp(`^${routePath.replace(/:[^\s/]+/g, '([\\w-]+)')}$`);
  return paramRegex.test(path);
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = useAuthStore().isLogin()
  const storeAuth = useAuthStore()
  // const route = routes.find(r => r.path === to.path);
  const route = routes.find(r => matchPath(to.path, r.path));
  const user = storeAuth.getUser();

  // console.log(to.fullPath)

  if(route.auth==1 && isAuthenticated && user &&  user.email_verified_at === null){
    if(to.path!='/confirm-email'){
      // next('/confirm-email')
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

  if(route.auth==2 && isAuthenticated && user && user.permissions_name && user.role !=='admin' && route.skip_check===false &&  !user.permissions_name.includes(to.path.split('/')[1])){
    // console.log(to.path.split('/')[1])
    next('/404')
  }
  
  else {
    next()
  }
}
);

export default router
 