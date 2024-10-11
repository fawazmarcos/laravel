import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router' 
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import MultiSelect from 'primevue/multiselect';



import Logo from '@components/Logo.vue'
import Close from '@components/Close.vue'
import Loading from '@components/Loading.vue'
import Dashboard from '@components/Dashboard/Dashboard.vue'


const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.use(PrimeVue, { 
  theme: {
    preset: Aura,
    options: {
        darkModeSelector: 'false',
    }
  }
})
.component('Logo', Logo)
.component('MultiSelect', MultiSelect)
.component('Dashboard', Dashboard)
.component('Close', Close)
.component('Loading', Loading)
.mount('#app')
