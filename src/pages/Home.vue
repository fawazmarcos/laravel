<script setup>
 
</script>

<template>
  <div class="flex w-full min-h-screen">
    <div class="flex flex-col m-auto max-w-3xl gap-7 items-center">
      <logo />
      <div class="flex m-auto max-w-3xl gap-4">
        <!-- login  link -->
        <RouterLink to="/register" class="text-center rounded bg-indigo-500 text-white p-3 duration-300 hover:font-bold">  S'inscrire</RouterLink>
        <!-- register linl -->
        <RouterLink to="/login" class="text-center rounded bg-indigo-500 text-white p-3 duration-300 hover:font-bold">Se connecter</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
 
</script>