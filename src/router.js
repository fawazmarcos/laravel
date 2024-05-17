import { createRouter, createWebHistory } from 'vue-router'
 
// landing
import Login from './pages/Login.vue'
import Admin from './pages/Admin.vue'
 
// auth 0 = optional
// auth 1 = not auth required
// auth 2 = auth required

const routes = [
  { path: '/login', component: Login ,auth:0},
  { path: '/admin', component: Admin ,auth:0},
]
// if path does not exist, redirect to 404
routes.push({ path: '/:pathMatch(.*)*', redirect: '/404' })

// check if the route requires authentication , if not connected and auth is true, redirect to login

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {

  next()
}
);

export default router