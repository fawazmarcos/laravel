

<template>
    <div class="flex flex-col gap-4 " v-if="storeAuth.interests">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">Mes intérêts</h2>
            <span  onclick="new_interest.showModal()" class="bg-indigo-700 text-white rounded px-4 py-2 cursor-pointer  hover:font-bold duration-300">Ajouter</span>
        </div>
        <!-- interests -->
        <div class="flex flex-col gap-3" v-if="storeAuth.interests && storeAuth.interests.length > 0">
            <div v-for="interest in storeAuth.interests" :key="interest.label" class="rounded p-5 w-full flex items-center justify-between bg-indigo-100" >
                <!-- designation -->
                <h3> <strong>{{ interest?.label }}</strong> </h3>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class=""><i class="fa-solid fa-ellipsis cursor-pointer"></i></div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><span @click="openEditModal(interest)">Modifier</span></li>
                        <li><span @click="deleteUserMeta(interest.id)" class="hover:bg-red-100">Supprimer</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-3 w-full" v-else>
            <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
                <span class="text-2xl font-semibold">Aucun intérêt</span>
            </div>
        </div>
    </div>
    <!-- modal new interest -->
    <dialog id="new_interest" class="modal">
        <div class="modal-box">
        <form method="POST" @submit.prevent="createUserMeta()" class="flex flex-col w-full gap-3 m-auto px-5 md:px-0">
            <h2 class="text-xl font-bold">Nouvel intérêt</h2>
            <div class="flex flex-col gap-2">
                <input type="label" placeholder="Intérêt" v-model="interest.label" class="rounded border-black p-1 text-sm border ">
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
    <!-- modal edit interest -->
    <dialog id="edit_interest" class="modal">
        <div class="modal-box max-w-md">
        <form method="POST" @submit.prevent="updateUserMeta(interest.id)" class="flex flex-col w-full gap-3 m-auto px-5 md:px-0">
            <h2 class="text-xl font-bold">Mettre à jour</h2>
            <div class="flex flex-col gap-2">
                <input type="label" placeholder="Intérêt" v-model="interest.label" class="rounded border-black p-1 text-sm border ">
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
            interest: {
                label: '',
                description: '',
                type: 'interest'
            }
        }
    },
    computed: {
        isValid() {
            if( this.interest.label !==''  ) {
                return true
            }
            return false
        }
    },
    methods: {
        // init interest
        initInterest() {
            this.interest = {
                label: '',
                description: '',
                type: 'interest'
            }
        },
        closeModal() {
            document.getElementById('new_interest').close()
            document.getElementById('edit_interest').close()
            this.initInterest()
        },
        async createUserMeta() {
            let data = this.interest
            await this.storeAuth.createUserMeta(data)
            this.closeModal()

        },
        async deleteUserMeta(id) {
            // use confirm dialog before delete
            if(confirm('Voulez-vous vraiment supprimer cette interest ?')){
                await this.storeAuth.deleteUserMeta(id)
            }
        },
        async updateUserMeta(id) {
            let data = this.interest
            await this.storeAuth.updateUserMeta(id, data)
            this.closeModal()
        },
        openEditModal(interest) {
            this.interest = interest
            document.getElementById('edit_interest').showModal()
        }
    },
    mounted() {
       this.storeAuth.myInterests()
    }

}
 
</script>
