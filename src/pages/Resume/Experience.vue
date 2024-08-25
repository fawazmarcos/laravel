<template>
    <div class="flex flex-col gap-4 " v-if="storeAuth.experiences">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">Mes experiences</h2>
            <span  onclick="new_experience.showModal()" class="bg-indigo-700 text-white rounded px-4 py-2 cursor-pointer  hover:font-bold duration-300">Ajouter</span>
        </div>
        <!-- experiences -->
        <div class="flex flex-col gap-3" v-if="storeAuth.experiences && storeAuth.experiences.length > 0">
            <div v-for="experience in storeAuth.experiences" :key="experience.label" class="rounded p-5 w-full flex items-center justify-between bg-indigo-100" >
                <!-- designation -->
                <!-- <h3>{{ experience?.desc }} </h3> -->
                <h3> <strong>{{ experience?.title }} : </strong> <span>{{ experience.entreprise }}</span> ( {{ experience.duration }} )  </h3>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><span @click="openEditModal(experience)">Modifier</span></li>
                        <li><span @click="deleteExperience(experience.id)" class="hover:bg-red-100">Supprimer</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-3 w-full" v-else>
            <div class="flex justify-center items-center w-full h-48 bg-100 rounded">
                <span class="text-2xl font-semibold">Aucune experience</span>
            </div>
        </div>
    </div>
    <!-- modal new experience -->
    <dialog id="new_experience" class="modal">
        <div class="modal-box">
        <form method="POST" @submit.prevent="createExperience()" class="flex flex-col w-full gap-3 m-auto px-5 md:px-0">
            <h2 class="text-lg font-bold">Nouvelle experience</h2>
            <div class="flex flex-col gap-2">
                <input type="entreprise" v-model="experience.entreprise" required placeholder="Entreprise"  class="rounded border-black p-1 text-sm border ">
                <input type="title" v-model="experience.title" required placeholder="Titre" class="rounded border-black p-1 text-sm border ">
            </div>
            <div class="flex gap-2 w-full">
                <input type="text" v-model="experience.project" required placeholder="Projet" class="w-full rounded border-black p-1 text-sm border ">
                <input type="date" v-model="experience.start_date" required placeholder="Date de début" class="w-full rounded border-black p-1 text-sm border ">
                <input type="date" v-model="experience.end_date" required placeholder="Date de fin" class="w-full rounded border-black p-1 text-sm border ">
            </div>
            <div class="flex flex-col gap-2">
                <textarea type="mission" v-model="experience.mission" required placeholder="Mission" rows="6" class="rounded border-black p-1 text-sm border "></textarea>
                <textarea type="envs" v-model="experience.envs" required placeholder="Environnement" rows="6" class="rounded border-black p-1 text-sm border "></textarea>
            </div>
            <div class="flex justify-end gap-2">
                <span @click="closeModal()" class="cursor-pointer rounded  border py-1 items-center px-4 text-sm bg-red-500 text-white items-center justify-center flex ">Fermer</span>
                <!-- boutton -->
                <button v-if="isValid"  type="submit" class="rounded  border  text-sm px-4 py-1 bg-indigo-500 text-white hover:bg-indigo-500/80 duration-300">
                    <span v-if="storeAuth.loading" class="loading loading-bars loading-md"></span>
                    <span v-else>Ajouter</span>
                </button>
                <span v-else class="rounded  border  text-sm px-4 py-1 bg-indigo-500/40 text-white duration-300 text-center">Ajouter</span>
            </div>
        </form>
        </div>
    </dialog>
    <!-- modal edit experience -->
    <dialog id="edit_experience" class="modal">
        <div class="modal-box">
        <form method="POST" @submit.prevent="updateExperience(experience.id)" class="flex flex-col w-full gap-3 m-auto px-5 md:px-0">
            <h2 class="text-xl font-bold">Mettre à jour</h2>
            <div class="flex flex-col gap-2">
                <input type="entreprise" v-model="experience.entreprise" placeholder="Entreprise" class="rounded border-black p-1 text-sm border ">
                <input type="title" v-model="experience.title" placeholder="Titre" class="rounded border-black p-1 text-sm border ">
                <input type="project" v-model="experience.project" placeholder="Projet" class="w-full rounded border-black p-1 text-sm border ">
            </div>
            <div class="flex gap-2 w-full items-center">
                <span>Du</span>
                <input type="date" v-model="experience.start_date" placeholder="Date de début" class="w-full rounded border-black p-1 text-sm border ">
                <span>Au</span>
                <input type="date" v-model="experience.end_date" placeholder="Date de fin" class="w-full rounded border-black p-1 text-sm border ">
            </div>
            <div class="flex flex-col gap-2">
                <textarea type="mission" rows="6" v-model="experience.mission" placeholder="Mission" class="rounded border-black p-1 text-sm border "></textarea>
                <textarea type="envs" rows="6" v-model="experience.envs" placeholder="Environnement" class="rounded border-black p-1 text-sm border "></textarea>
            </div>
            <div class="flex justify-end gap-2">
                <span @click="closeModal()" class="cursor-pointer rounded  border py-1 items-center px-4 text-sm bg-red-500 text-white items-center justify-center flex ">Fermer</span>
                <!-- boutton -->
                <button v-if="isValid"  type="submit" class="rounded  border  text-sm px-4 py-1 bg-indigo-500 text-white hover:bg-indigo-500/80 duration-300">
                    <span v-if="storeAuth.loading" class="loading loading-bars loading-md"></span>
                    <span v-else>Modifier</span>
                </button>
                <span v-else class="rounded  border  text-sm px-4 py-1 bg-indigo-500/40 text-white duration-300 text-center">Modifier</span>
            </div>
        </form>
        </div>
    </dialog>
</template>

<script>
import { useAuthStore } from '@stores/auth'
export default {
  
    data() {
        return {
            storeAuth: useAuthStore(),
            experience: {
                entreprise : '',
                title : '',
                project : '',
                start_date : '',
                end_date : '',
                mission : '',
                envs : '',
            }
        }
    },
    computed: {
        isValid() {
            if( this.experience.entreprise !=='') {
                return true
            }
            return false
        }
    },
    methods: {
        // init experience
        initExperience() {
            this.experience = {
                entreprise : '',
                title : '',
                project : '',
                start_date : '',
                end_date : '',
                mission : '',
                envs : '',
            }
        },
        closeModal() {
            document.getElementById('new_experience').close()
            document.getElementById('edit_experience').close()
            this.initExperience()
        },
        async createExperience() {
            let data = this.experience
            await this.storeAuth.createExperience(data)
            this.closeModal()

        },
        async deleteExperience(id) {
            // use confirm dialog before delete
            if(confirm('Voulez-vous vraiment supprimer cette experience ?')){
                await this.storeAuth.deleteExperience(id)
            }
        },
        async updateExperience(id) {
            let data = this.experience
            await this.storeAuth.updateExperience(id, data)
            this.closeModal()
        },
        openEditModal(experience) {
            this.experience = experience
            document.getElementById('edit_experience').showModal()
        }
    },
    mounted() {
       this.storeAuth.myExperiences()
    }

}
 
</script>
