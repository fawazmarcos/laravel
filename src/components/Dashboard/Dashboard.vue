<script setup>
</script>

<template>
  <div>
    <Header />
    <Sidebar />
    <!-- Content -->
    <div class="w-full lg:ps-64">
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <!-- content here -->
        <slot name="content">Default content</slot>
      </div>
    </div>
    <!-- End Content -->
  </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '@components/Dashboard/Sidebar.vue'
import Header from '@components/Dashboard/Header.vue'

export default {
  components: {
    Sidebar,
    Header
  },
  setup() {
    const sidebarOpen = ref(false)
    return {
      sidebarOpen
    }
  }
}
</script>
