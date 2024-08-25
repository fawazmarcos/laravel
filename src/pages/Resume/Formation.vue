

<template>
    <div class="flex flex-col gap-4 " v-if="storeAuth.formations">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">Mes formations</h2>
            <span  onclick="new_formation.showModal()" class="bg-indigo-700 text-white rounded px-4 py-2 cursor-pointer  hover:font-bold duration-300">Ajouter</span>
        </div>
        <!-- formations -->
        <div class="flex flex-col gap-3" v-if="storeAuth.formations && storeAuth.formations.length > 0">
            <div v-for="formation in storeAuth.formations" :key="formation.label" class="rounded p-5 w-full flex items-center justify-between bg-indigo-100" >
                <!-- designation -->
                <!-- <h3>{{ formation?.desc }} </h3> -->
                <h3> <strong>{{ formation?.label }} : </strong> <span>{{ formation.address }}</span> ( {{ formation.year }} )  </h3>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><span @click="openEditModal(formation)">Modifier</span></li>
                        <li><span @click="deleteFormation(formation.id)" class="hover:bg-red-100">Supprimer</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-3 w-full" v-else>
            <div class="flex justify-center items-center w-full h-48 bg-100 rounded">
                <span class="text-2xl font-semibold">Aucune formation</span>
            </div>
        </div>
    </div>
    <!-- modal new formation -->
    <dialog id="new_formation" class="modal">
        <div class="modal-box">
        <form method="POST" @submit.prevent="createFormation()" class="flex flex-col w-full gap-3 m-auto px-5 md:px-0">
            <h2 class="text-lg font-bold">Nouvelle formation</h2>
            <div class="flex flex-col gap-2">
                <input type="label" v-model="formation.label" placeholder="Description" class="rounded border-black p-1 text-sm border ">
            </div> 
            
            <div class="flex gap-2 w-full">
                <input type="address" v-model="formation.address" placeholder="Adresse" class="w-full rounded border-black p-1 text-sm border ">
                <input type="year" v-model="formation.year" placeholder="Année" class="w-full rounded border-black p-1 text-sm border ">
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
    <!-- modal edit formation -->
    <dialog id="edit_formation" class="modal">
        <div class="modal-box">
        <form method="POST" @submit.prevent="updateFormation(formation.id)" class="flex flex-col w-full gap-3 m-auto px-5 md:px-0">
            <h2 class="text-xl font-bold">Mettre à jour</h2>
            <div class="flex flex-col gap-2">
                <input type="label" v-model="formation.label" placeholder="Description" class="rounded border-black p-1 text-sm border ">
            </div> 
            
            <div class="flex gap-2 w-full">
                <input type="address" v-model="formation.address" placeholder="Adresse" class="w-full rounded border-black p-1 text-sm border ">
                <input type="year" v-model="formation.year" placeholder="Année" class="w-full rounded border-black p-1 text-sm border ">
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
import Formation from '@components/Formation.vue'
import { useAuthStore } from '@stores/auth'
export default {
    components: {
        Formation
    },
    data() {
        return {
            storeAuth: useAuthStore(),
            formation: {
                label: '',
                address: '',
                year: ''
            }
        }
    },
    computed: {
        isValid() {
            if( this.formation.label !=='' && this.formation.address !=='' && this.formation.year !=='' ) {
                return true
            }
            return false
        }
    },
    methods: {
        // init formation
        initFormation() {
            this.formation = {
                label: '',
                address: '',
                year: ''
            }
        },
        closeModal() {
            document.getElementById('new_formation').close()
            document.getElementById('edit_formation').close()
            this.initFormation()
        },
        async createFormation() {
            let data = this.formation
            await this.storeAuth.createFormation(data)
            this.closeModal()

        },
        async deleteFormation(id) {
            // use confirm dialog before delete
            if(confirm('Voulez-vous vraiment supprimer cette formation ?')){
                await this.storeAuth.deleteFormation(id)
            }
        },
        async updateFormation(id) {
            let data = this.formation
            await this.storeAuth.updateFormation(id, data)
            this.closeModal()
        },
        openEditModal(formation) {
            this.formation = formation
            document.getElementById('edit_formation').showModal()
        }
    },
    mounted() {
       this.storeAuth.myFormations()
    }

}
 
</script>
