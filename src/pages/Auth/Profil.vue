<template>
  <div class="flex w-full" v-if="storeAuth.getUser()">
    <section class=" min-w-6xl flex flex-col m-auto ">
       <!-- header -->
       <div class="flex w-[900px] py-5  min-w-5xl m-auto justify-between items-center   px-5 md:px-0">
         <!-- logo -->
         <logo />
         <!-- actions -->
         <close />
       </div>
       <!-- form -->
       <h3 class="font-semibold text-3xl text-center mt-9">Modifier mon profil</h3>
       <form method="POST" @submit.prevent="updateProfile()" class="grid grid-cols-2 w-full  gap-6 m-auto mt-5 px-5 md:px-0">
          <label for="photo" class="cursor-pointer col-span-2">
            <input  type="file" name="photo" id="photo" @change="readURL($event.target)" class="hidden" accept=".png, .jpg, .jpeg">
            <div v-if="user.photoImg" class="rounded-full h-36 w-36 m-auto bg-indigo-300 items-center justify-center flex bg-cover bg-center  " :class="'bg-[url('+user.photoImg+')]'">
            </div>
            <div v-else class="rounded-full h-24 w-24 m-auto bg-indigo-300 items-center justify-center flex">
              <i class="fa fa-user text-4xl "></i>
            </div>
          </label>
          <div class="flex flex-col gap-2">
            <label for="first_name">Nom</label>
            <input  type="text" v-model="user.first_name"  id="first_name" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="last_name">Prénom</label>
            <input  type="text" v-model="user.last_name" id="last_name" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="telephone">Téléphone</label>
            <input  type="text" v-model="user.telephone" id="telephone" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="address">Adresse</label>
            <input  type="text" v-model="user.address" id="address" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="birth_date">Date de naissance</label>
            <input  type="date" v-model="user.birth_date" id="birth_date" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="birth_place">Lieu de naissance</label>
            <input  type="text" v-model="user.birth_place" id="birth_place" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="nationality">Nationalité</label>
            <input  type="text" v-model="user.nationality" id="nationality" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="iban">Iban</label>
            <input  type="text" v-model="user.iban" id="iban" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="tel_one">Tel 1</label>
            <input  type="text" v-model="user.tel_one" id="tel_one" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="tel_two">Tel 2</label>
            <input  type="text" v-model="user.tel_two" id="tel_two" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          
          <div class="flex flex-col gap-2">
            <label for="exp_years">Années d'expérience</label>
            <input  type="number" min="0" v-model="user.exp_years" id="exp_years" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          <div class="flex flex-col gap-2">
            <label for="linkedin">Linkedin</label>
            <input  type="text" v-model="user.linkedin" id="linkedin" placeholder="" class="rounded-lg border-black p-2 border ">
          </div>
          <!-- boutton -->
          <div class="col-span-2 flex">
            <button v-if="isValid"  type="submit" class=" m-auto rounded-full w-auto border py-3 px-7 bg-indigo-500 text-white hover:bg-indigo-500/80 duration-300">
              <span v-if="storeAuth.loading" class="loading loading-bars loading-md"></span>
              <span v-else>Mettre à jour</span>
            </button>
            <span v-else class=" m-auto rounded-full w-auto border py-3 px-7 bg-indigo-500/40 text-white duration-300 text-center">Mettre à jour</span>
          </div>
        </form>
    </section>

  </div>
</template>

<script>
// use storeAuth to access the store
import { useAuthStore } from '@stores/auth'
export default {
  data() {
    return {
      user : {
        first_name: '',
        last_name: '',
        telephone:'',
        address:'',
        birth_date:'',
        exp_years:'',
        linkedin:'',
        photo:'',
        photoImg:'',
      },
      storeAuth: useAuthStore()
    }
  },
  computed: {
    isValid() {
      if(this.user.first_name!=='' && this.user.last_name !=='' && this.user.email !=='' && this.user.password !=='' ) {
        return true
      }
      return false
    }
  },
  methods: {
    async updateProfile() {

      this.storeAuth.loading = true;
      const data = new FormData();
      if (this.user.photo) {
        data.append("photo", this.user.photo);
      } 

      for (const key in this.user) {
        if (key !== 'photo' && key !== 'photoImg' && this.user.hasOwnProperty(key) && this.user[key]!=='') {
          data.append(key, this.user[key]);
        }
      }

      await this.storeAuth.updateProfile(data);
    },
    readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.photoImg = e.target.result; 
          this.user.photo = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);
      }

    },
  },
  created() {
    const authUser = this.storeAuth.getUser();
    if (authUser) {
      this.user.first_name = authUser.first_name || '';
      this.user.last_name = authUser.last_name || '';
      this.user.telephone = authUser.telephone || '';
      this.user.address = authUser.address || '';
      this.user.birth_date = authUser.birth_date || '';
      this.user.exp_years = authUser.exp_years || '';
      this.user.linkedin = authUser.linkedin || '';
      this.user.photoImg = authUser.photo || '';
      this.user.nationality = authUser.nationality || '';
      this.user.iban = authUser.iban || '';
      this.user.tel_one = authUser.tel_one || '';
      this.user.tel_two = authUser.tel_two || '';
      this.user.birth_place = authUser.birth_place || '';
       
    }
  }
  
}
</script>