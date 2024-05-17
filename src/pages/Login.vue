<template>
  <div class="flex w-full">
    <section class=" min-w-6xl flex flex-col m-auto ">
       <!-- header -->
       <div class="flex w-[900px] py-5  min-w-5xl m-auto justify-between items-center   px-5 md:px-0">
         <!-- logo -->
         <h3 class="text-3xl font-bold text-blue-500 gap-2"> <i class="	fa fa-stethoscope text-md"></i> <span>Clinica</span></h3>
         <!-- actions -->
         <div class="cursor-pointer text-lg rounded-full py-1  px-3 hover:bg-blue-100"><i class="fa fa-close"></i></div>
       </div>
       <hr>
       <!-- form -->
       <h3 class="font-semibold text-3xl text-center mt-9">Connexion</h3>
       <div class="flex flex-col w-full md:w-1/2 gap-6 m-auto mt-5 px-5 md:px-0">
          <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <input type="email" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="email">Mot de passe</label>
            <input type="password" class="rounded-lg border-black p-2 border ">
          </div>
          <!-- boutton -->
          <button class="rounded-full w-full border p-3 bg-blue-500 text-white hover:bg-blue-500/80 duration-300">Se connecter</button>
       </div>
    </section>

  </div>
</template>

<script>
import { ref } from 'vue'
</script>