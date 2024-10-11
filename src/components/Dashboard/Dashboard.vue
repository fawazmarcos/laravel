<script setup>
import { ref } from 'vue'
import Sidebar from '@components/Dashboard/Sidebar.vue'
import Header from '@components/Dashboard/Header.vue'

// Déclare la variable is_sidebar_open
let is_sidebar_open = ref(JSON.parse(localStorage.getItem('is_sidebar_open')) ?? false)

// Fonction pour changer l'état de la sidebar depuis le composant Sidebar
const toggleSidebar = () => {
  is_sidebar_open.value = !is_sidebar_open.value
  localStorage.setItem("is_sidebar_open", JSON.stringify(is_sidebar_open.value) )
  // set in localStorage
}
</script>

<template>
  <div>
    <!-- <Header /> -->
    <div class="flex w-full">
      <!-- Passe la variable is_sidebar_open et l'événement toggleSidebar au composant Sidebar -->
      <Sidebar :is_sidebar_open="is_sidebar_open" @toggle-sidebar="toggleSidebar" />
      <!-- Content -->
      <div class="w-full " :class="is_sidebar_open ? 'lg:ps-56' : 'lg:ps-20'">
        <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <!-- content here -->
          <slot name="content">Default content</slot>
        </div>
      </div>
    </div>
    <!-- End Content -->
  </div>
</template>
