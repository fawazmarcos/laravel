

<template>
    <div class="flex flex-col gap-4 " v-if="storeAuth.certifications">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">Mes certifications</h2>
            <span  onclick="new_certification.showModal()" class="bg-indigo-700 text-white rounded px-4 py-2 cursor-pointer  hover:font-bold duration-300">Ajouter</span>
        </div>
        <!-- certifications -->
        <div class="flex flex-col gap-3" v-if="storeAuth.certifications && storeAuth.certifications.length > 0">
            <div v-for="certification in storeAuth.certifications" :key="certification.label" class="rounded p-5 w-full flex items-center justify-between bg-indigo-100" >
                <!-- designation -->
                <h3> <strong>{{ certification?.label }}</strong> :  {{ certification.description }} </h3>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><span @click="openEditModal(certification)">Modifier</span></li>
                        <li><span @click="deleteUserMeta(certification.id)" class="hover:bg-red-100">Supprimer</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-3 w-full" v-else>
            <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
                <span class="text-2xl font-semibold">Aucune certification</span>
            </div>
        </div>
    </div>
    <!-- modal new certification -->
    <dialog id="new_certification" class="modal">
        <div class="modal-box">
        <form method="POST" @submit.prevent="createUserMeta()" class="flex flex-col w-full gap-3 m-auto px-5 md:px-0">
            <h2 class="text-xl font-bold">Nouvelle certification</h2>
            <div class="flex flex-col gap-2">
                <input type="label" placeholder="Titre"  v-model="certification.label" class="rounded border-black p-1 text-sm border ">
            </div> 
            <div class="flex flex-col gap-2">
                <input type="address" placeholder="Description" v-model="certification.description" class="rounded border-black p-1 text-sm border ">
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
    <!-- modal edit certification -->
    <dialog id="edit_certification" class="modal">
        <div class="modal-box">
        <form method="POST" @submit.prevent="updateUserMeta(certification.id)" class="flex flex-col w-full gap-3 m-auto px-5 md:px-0">
            <h2 class="text-xl font-bold">Mettre à jour</h2>
            <div class="flex flex-col gap-2">
                <input type="label" placeholder="Titre"  v-model="certification.label" class="rounded border-black p-1 text-sm border ">
            </div> 
            <div class="flex flex-col gap-2">
                <input type="address" placeholder="Description" v-model="certification.description" class="rounded border-black p-1 text-sm border ">
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
    components: {
    },
    data() {
        return {
            storeAuth: useAuthStore(),
            certification: {
                label: '',
                description: '',
                type: 'certification'
            }
        }
    },
    computed: {
        isValid() {
            if( this.certification.label !=='') {
                return true
            }
            return false
        }
    },
    methods: {
        // init certification
        initCertification() {
            this.certification = {
                label: '',
                description: '',
                type: 'certification'
            }
        },
        closeModal() {
            document.getElementById('new_certification').close()
            document.getElementById('edit_certification').close()
            this.initCertification()
        },
        async createUserMeta() {
            let data = this.certification
            await this.storeAuth.createUserMeta(data)
            this.closeModal()

        },
        async deleteUserMeta(id) {
            // use confirm dialog before delete
            if(confirm('Voulez-vous vraiment supprimer cette certification ?')){
                await this.storeAuth.deleteUserMeta(id)
            }
        },
        async updateUserMeta(id) {
            let data = this.certification
            await this.storeAuth.updateUserMeta(id, data)
            this.closeModal()
        },
        openEditModal(certification) {
            this.certification = certification
            document.getElementById('edit_certification').showModal()
        }
    },
    mounted() {
       this.storeAuth.myCertifications()
    }

}
 
</script>
