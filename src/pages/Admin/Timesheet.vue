

<template>
  <Dashboard>
    <template #content>
      <div class="flex flex-col gap-4 " v-if="storeTimesheet.timesheets && !storeTimesheet.loading" >
        <div class="flex justify-between items-center">
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Mes Temps</h2>
          </div>
          <div class="flex items-center gap-2">
            <span @click="openAddModal()"  class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 " href="#">
              <i class="fa fa-plus"></i>
              Ajouter
            </span>
          </div>
        </div>
        <div v-if="storeTimesheet.timesheets && storeTimesheet.timesheets.length > 0" >
          <div class="grid grid-cols-4 gap-4">
              <span target="_blank" v-for="timesheet in storeTimesheet.timesheets" :key="timesheet.id" class=" flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition" >
                <div class="p-4 md:p-5 gap-4 flex flex-col">
                  <div class="flex justify-between gap-2 items-center">
                    <h3 class="text-md font-bold text-gray-800">
                      {{ timesheet.month_label }} {{ timesheet.year }}
                    </h3>
                    <RouterLink :to="'edit_my_timesheet?timesheet_id='+timesheet.id"  class="cursor-pointer text-gray-900 hover:text-blue-900"><i class="fa fa-edit"></i></RouterLink>
                  </div>
                  <div class="flex justify-between items-center">
                    <p class="mt-1 text-gray-500 text-xs">
                      <!-- {{ timesheet.project.title }} -->
                    </p>
                    <p>
                      <span class=" text-gray- rounded-md p-1 text-xs " :class="'bg-'+timesheet.status_color+'-500'">{{ timesheet.status_label }}</span>
                    </p>

                  </div>
                </div>
              </span>
              <div class="-m-1.5 ">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class=" rounded-lg ">
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-5" >
              <span class="text-sm">
                {{ storeTimesheet.meta.from }}-{{ storeTimesheet.meta.to }} sur {{ storeTimesheet.meta.total }}
              </span>
              <div v-if="storeTimesheet && storeTimesheet.links">
                <div class="inline-flex gap-x-2" >
                  <button @click="getTimesheets(storeTimesheet.links.prev)" v-if="storeTimesheet.links.prev" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Préc.
                  </button>

                  <button @click="getTimesheets(storeTimesheet.links.next)" v-if="storeTimesheet.links.next" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Suiv.
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
        </div> 
        <div class="flex flex-col gap-3 w-full" v-else>
          <div class="flex justify-center items-center w-full h-48 bg-100 rounded-lg">
            <span class="text-2xl font-semibold">Aucun projet</span>
          </div>
        </div>  
        <dialog id="modal_timesheet" class="modal">
          <form method="POST" @submit.prevent="postModal()" class="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="flex justify-between items-center py-3 px-4 border-b">
                <h3 class="font-bold text-gray-800">
                 {{!update ? 'Ajouter un projet' : 'Modifier le projet' }}
                </h3>
                <i  @click="closeModal()" class="fa fa-close cursor-pointer"></i>
              </div>
              <div class="p-4 overflow-y-auto gap-4 grid grid-cols-">
                <div class="flex flex-col gap-2">
                  <label for="year" class="text-sm font-medium text-gray-800">Année</label>
                  <input v-model="timesheet.year" type="number" min="2024" step="1" max="2050" id="year" name="year" class="py-2 px-3 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Année">
                </div>
                <div class="flex flex-col gap-2">
                  <label for="month" class="text-sm font-medium text-gray-800">Mois</label>
                  <select v-model="timesheet.month" id="month" name="month" class="py-2 px-3 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none">
                    <option value="1">Janvier</option>
                    <option value="2">Février</option>
                    <option value="3">Mars</option>
                    <option value="4">Avril</option>
                    <option value="5">Mai</option>
                    <option value="6">Juin</option>
                    <option value="7">Juillet</option>
                    <option value="8">Août</option>
                    <option value="9">Septembre</option>
                    <option value="10">Octobre</option>
                    <option value="11">Novembre</option>
                    <option value="12">Décembre</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <span  @click="closeModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 ">
                  Fermer
                </span>
                <button v-if="isValid"  type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                  <span v-if="storeTimesheet.loading" class="loading loading-bars loading-md"></span>
                  <span v-else>{{ !update ? 'Ajouter' : 'Modifier'}}</span>
                </button>
                <span v-else  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-400 text-white hover:bg-indigo-400 ">
                  {{ !update ? 'Ajouter' : 'Modifier'}}
                </span>
              </div>
            </div>
          </form>
        </dialog>
      </div>
      <div v-else-if="storeTimesheet.loading">
        <Loading /> 
      </div>
      <div v-else>
        TimeSheet not found
      </div>
    </template>
  </Dashboard>
</template>

<script>
import { useTimesheetStore } from '@stores/timesheet'
import { useProjectStore } from '@stores/project'


export default {
  components: {
  }, 
  data() {
      return {
        storeTimesheet: useTimesheetStore(),
        storeProject: useProjectStore(),
        timesheet: {
          month : this.getMonthId(),
          year : 2024,
        },
        update : false,
        search: '',
        current_timesheet: null,
        current_page: 0,
        per_page: 7,
      }
  },
  computed: {
    filteredLinks() {
      return this.storeTimesheet.meta.links.filter(link => link.url !== null);
    },
    get_entry_project(entry,project_id) {
      return entry.timesheet_entry_projects.find(project => project.project_id === project_id)  
    },
    totalPages() {
      // total count entries / per_page
      return Math.ceil(this.current_timesheet.entries.length / this.per_page);
    },
    totalDays() {
      return Array.from({ length: this.getTotalDayInMonth(this.current_timesheet.month, this.current_timesheet.year) }, (_, i) => i + 1);
    },
    daysOfWeek() {
      return this.totalDays.reduce((acc, day) => {
        acc[day] = this.getDayOfWeek(day, this.current_timesheet.month, this.current_timesheet.year);
        return acc;
      }, {});
    },
    isValid() {
      if( this.timesheet.year !== '' && this.timesheet.month !== '') {
        return true
      }
      return false
    },
    get_current_timesheet_entries() {
      // return slice of current_timesheet.entries 
      return this.current_timesheet.entries.slice(this.current_page * this.per_page, (this.current_page + 1) * this.per_page)
    },
    
  },
  methods: {
    // init timesheet
    initTimesheet() {
      this.timesheet = {
        month : this.getMonthId(),
        year : 2024,
      }
    },
    get_classes(total){
      if(total > 16){
        return 'bg-red-500 text-white'
      }
      return 'bg-green-500 text-white'
    },
    dayClasses(can_edit) {
      return !can_edit  ? 'bg-gray-300' : 'cursor-pointer hover:bg-gray-100';
    },
    get_total_month_by_project(project_id) {
      // return total work duration of a project
      const project_entries = this.current_timesheet.entries.slice(this.current_page * this.per_page, (this.current_page + 1) * this.per_page);
      let total = 0;
      project_entries.forEach(entry => {
        const project_entry = entry.timesheet_entry_projects.find(project => project.project_id === project_id);
        if (project_entry) {
          // cast to number
          total += Number(project_entry.work_duration);
        }
      });
      return total;
    },

    get_total_by_day(entry) {
      let total = 0;
      entry.timesheet_entry_projects.forEach(project => {
        total += Number(project.work_duration);
      })
      return total;
    },

    get_total_month(){
      let total = 0;
      this.current_timesheet.entries.forEach(entry => {
        entry.timesheet_entry_projects.forEach(project => {
          total += Number(project.work_duration);
        })
      })
      return total;
    },

    get_total_effectif_month(){
      let total = 0;
      this.current_timesheet.entries.forEach(entry => {
        entry.timesheet_entry_projects.forEach(project => {
          if (project.can_effective) {
            total += Number(project.work_duration);
          }
        })
      })
      return total;
    },

    get_total_effectif_month_by_project(project_id) {
      // return total work duration of a project
      const project_entries = this.current_timesheet.entries.slice(this.current_page * this.per_page, (this.current_page + 1) * this.per_page);
      let total = 0;
      project_entries.forEach(entry => {
        const project_entry = entry.timesheet_entry_projects.find(project => project.project_id === project_id);
        if (project_entry && project_entry.can_effective) {
          // cast to number
          total += Number(project_entry.work_duration);
        }
      });
      return total;
      
    },

    

    // get day of the week of a month , like 1,1,2024 is a Lun and 2,1,2024 is a Mar , if not exist return ''
    getDayOfWeek(day, month, year) {
      const date = new Date(year, month-1, day)
      const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
       
      return days[date.getDay()]
    },

    enableEditing(entry) {
    if (entry.can_edit) {
      // Désactiver l'édition pour toutes les autres entrées
      this.current_timesheet.entries.forEach(e => {
        if (e !== entry) e.isEditing = false;
      });
      entry.isEditing = true;
    }
  },
  
  disableEditing(entry) {
    entry.isEditing = false;
    this.updateWorkDuration(entry); // Appeler la méthode pour mettre à jour la durée de travail
  },
  updateWorkDuration(entry) {
    this.current_timesheet.status = 'pending';
    this.current_timesheet.status_label = 'En attente';
    this.storeTimesheet.updateEntry(entry);
  },

  updateEntryProject(entry) {
    console.log('update entry project : ',entry.id)
    this.current_timesheet.status = 'pending';
    this.current_timesheet.status_label = 'En attente';
    this.storeTimesheet.updateEntryProject(entry);
  },

    // get total day in a month and year , like 1/2024 has 31 days , 2/2024 has 29 days , if not exist return 0
    getTotalDayInMonth(month, year) {
    //  month is integer 1-12
    //  year is integer 2024
      return new Date(year, month, 0).getDate()
    },


    // show timesheet
    showTimesheet(timesheet) {
      this.current_timesheet = timesheet
    },

    // get current month id
    getMonthId() {
      // get current month
      const month = new Date().toLocaleString('default', { month: 'long' });
      switch(month) {
        case 'Janvier':
          return 1
        case 'Février':
          return 2
        case 'Mars':
          return 3
        case 'Avril':
          return 4
        case 'Mai':
          return 5
        case 'Juin':
          return 6
        case 'Juillet':
          return 7
        case 'Août':
          return 8
        case 'Septembre':
          return 9
        case 'Octobre':
          return 10
        case 'Novembre':
          return 11
        case 'Décembre':
          return 12
        default:
          return 1
      }
    },
    
    initSearch() {
      this.search = ''
      this.storeTimesheet.getTimesheets()
    },
    async exportTimesheets() {
      await this.storeTimesheet.exportTimesheets()
    },
    async enrichTimesheet(id) {
      await this.storeTimesheet.enrichTimesheet(id)
    },
    openAddModal() {
      this.update = false
      document.getElementById('modal_timesheet').showModal()
    },
    closeModal() {
      document.getElementById('modal_timesheet').close()
      this.initTimesheet()
    },
    async postModal() {
      const data = new FormData();
      for (const key in this.timesheet) {
        if (key !== 'logo' && key !== 'logoImg' && this.timesheet.hasOwnProperty(key) && this.timesheet[key]!=='') {
          data.append(key, this.timesheet[key]);
        }
      }
      if(this.update) {
        data.id = this.timesheet.id
        await this.storeTimesheet.updateTimesheets(data)
      }else{
        await this.storeTimesheet.postTimesheets(data)
      }
      this.closeModal()
    },
    async deleteTimesheet(id) {
      if(confirm('Voulez-vous supprimer ce projet ?')){
        await this.storeTimesheet.deleteTimesheets(id)
      }
    },
    async updateTimesheet() {
      let data = this.timesheet
      await this.storeTimesheet.updateTimesheets(data)
      this.closeModal()
    },
    async updateTimesheetToPendingValidation() {
      let data = {
        id: this.current_timesheet.id,
        status: 'pending_validation'
      }
      this.current_timesheet.status = 'pending_validation'
      this.current_timesheet.status_label = 'En attente de validation'
      await this.storeTimesheet.updateTimesheets(data)
      this.closeModal()
    },
    openEditModal(timesheet) {
      this.timesheet = timesheet
      this.update = true
      document.getElementById('modal_timesheet').showModal()
    },
    async getTimesheets(url) {
      await this.storeTimesheet.getTimesheets(url)
    },

    async searchTimesheets() {
      // sleep 500ms
      await new Promise(r => setTimeout(r, 500));
      const data = {
        search: this.search
      }
      await this.storeTimesheet.searchTimesheets(data)
    },
    async reinit(){
      // confirm
      if(confirm('Voulez-vous réinitialiser les temps de ce mois ? (Cette action est irréversible)')){  
        await this.storeTimesheet.reinit(this.current_timesheet.id)
        // set all timesheet entry project to 0
        this.current_timesheet.entries.forEach(entry => {
          entry.timesheet_entry_projects.forEach(project => {
            project.work_duration = 0
          })
        })
      }
    }
  },
  mounted() {

    this.storeTimesheet.getTimesheets()
    this.storeProject.getPendingProjects()
    // this.storeTimesheet.getMonthYear()
  }

}

</script>
