

<template>
  <Dashboard>
    <template #content>
      <div v-if="storeTimesheet.current_timesheet && !storeTimesheet.loading" class="flex flex-col gap-5 p-4">
        <div class="flex justify-between items-center">
          <RouterLink to="/edit_timesheet"   class="cursor-pointer font-semibold text-md" > <i class="fa fa-chevron-left"></i> Retour</RouterLink>
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold"> {{ storeTimesheet.current_timesheet.user.first_name+" "+storeTimesheet.current_timesheet.user.last_name }} - Feuille de Temps {{ storeTimesheet.current_timesheet.month_label }} {{ storeTimesheet.current_timesheet.year }}</h2> <span class=" text-gray- rounded-md p-1 text-xs " :class="'bg-'+storeTimesheet.current_timesheet.status_color+'-500'">{{ storeTimesheet.current_timesheet.status_label }}</span>
          </div>
        </div> 

        <div v-if="storeTimesheet.current_timesheet!=null" class="flex items-center justify- gap-3 mt-5" >
          <button @click="current_page--" v-if="current_page > 0" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            Prev.
          </button>
          <button @click="current_page++" v-if="current_page < totalPages-1" type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            Suiv.
          </button>
        </div>
            <div v-if="storeTimesheet.current_timesheet!=null" class="flex flex-col">
              <div class="-m-1.5 ">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="border rounded-lg overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Activité</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"  v-for="entry in get_current_timesheet_entries" 
                          :key="entry.id" ><span class="flex">{{ entry.day }} {{ entry.day_label }}</span></th>
                          <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Total du Mois</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Total Effectif</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200"> 
                        <!-- <tr v-for="project in storeProject.pending_projects" :key="project.id"> -->
                        <tr v-for="project in storeTimesheet.current_timesheet.user.projects" :key="project.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ project.title }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800" :id="project.id+'/'+entry.id" v-for="entry in get_current_timesheet_entries" :key="entry.id"> 
                          <!-- {{ entry }} -->
                          <!-- {{ entry.timesheet_entry_projects.find(p => p.project_id === project.id).work_duration }} -->
                          <!-- {{ get_entry_project(entry,project.id) }} -->
                          {{ entry.timesheet_entry_projects.find(p => p.project_id === project.id)? entry.timesheet_entry_projects.find(p => p.project_id === project.id).work_duration : 0 }}
                        </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ get_total_month_by_project(project.id) }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ get_total_effectif_month_by_project(project.id) }}</td>
                        </tr> 
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Total</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center" :class="get_classes(get_total_by_day(entry))" v-for="entry in get_current_timesheet_entries" :key="entry.id">{{ get_total_by_day(entry) }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{ get_total_month() }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{ get_total_effectif_month() }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
      
          <div class="flex  gap-2 w-full mx-auto">
            <div class="mx-auto flex gap-2">
              <span v-if="storeTimesheet.current_timesheet.status=='approved'" @click="openRefusedModal()" class="rounded bg-red-500 text-sm p-2 mx-auto cursor-pointer text-white">Invalider la feuille de temps</span>
              <span v-if="storeTimesheet.current_timesheet.status=='pending_validation'" @click="updateTimesheetToValidate()" class="rounded bg-green-500 text-sm p-2 mx-auto cursor-pointer text-white">Valider</span>
              <span v-if="storeTimesheet.current_timesheet.status=='pending_validation'" @click="openRefusedModal()" class="rounded bg-red-500 text-sm p-2 mx-auto cursor-pointer text-white">Rejeter</span>
            </div>
          </div>
          <dialog id="refused_modal_timesheet" class="modal">
                    <form method="POST" @submit.prevent="refusedTimesheet()" class="sm:max-w-lg sm:w-full m-3 sm:mx-auto" v-if="current_timesheet" >
                      <div class="flex flex-col bg-white border shadow-sm rounded-xl">
                        <div class="flex justify-between items-center py-3 px-4 border-b">
                          <h3 class="font-bold text-gray-800">
                          Refuser la feuille de temps de {{ storeTimesheet.current_timesheet.user.first_name+" "+storeTimesheet.current_timesheet.user.last_name }}
                          </h3>
                          <i  @click="closeRefusedModal()" class="fa fa-close cursor-pointer"></i>
                        </div>
                        <div class="p-4 overflow-y-auto gap-4 grid grid-cols-">
                          <div class="flex flex-col gap-2">
                            <label for="comment" class="text-sm font-medium text-gray-800">Commentaire</label>
                            <input v-model="storeTimesheet.current_timesheet.comment" type="text" id="comment" name="comment" class="py-2 px-3 block w-full bg-white border rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Commentaire">
                          </div> 
                        </div>
                        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                          <span  @click="closeRefusedModal()" class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 ">
                            Fermer
                          </span>
                          <button   type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-500 disabled:opacity-50 disabled:pointer-events-none">
                            Refuser
                          </button> 
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
            project_id : '',
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
      return Math.ceil(this.storeTimesheet.current_timesheet.entries.length / this.per_page);
    },
      totalDays() {
    return Array.from({ length: this.getTotalDayInMonth(this.storeTimesheet.current_timesheet.month, this.storeTimesheet.current_timesheet.year) }, (_, i) => i + 1);
  },
  daysOfWeek() {
    return this.totalDays.reduce((acc, day) => {
      acc[day] = this.getDayOfWeek(day, this.storeTimesheet.current_timesheet.month, this.storeTimesheet.current_timesheet.year);
      return acc;
    }, {});
  },
      isValid() {
        if( this.timesheet.year !== '' && this.timesheet.month !== '' && this.timesheet.project_id !== '') {
          return true
        }
        return false
      },
      get_current_timesheet_entries() {
      // return slice of storeTimesheet.current_timesheet.entries 
      return this.storeTimesheet.current_timesheet.entries.slice(this.current_page * this.per_page, (this.current_page + 1) * this.per_page)
    },
      

  },
  methods: {
    // init timesheet
    initTimesheet() {
      this.timesheet = {
        month : this.getMonthId(),
        year : 2024,
        project_id : '',
      }
    },
    dayClasses(can_edit) {
      return !can_edit  ? 'bg-gray-300' : 'cursor-pointer hover:bg-gray-100';
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
      this.storeTimesheet.current_timesheet.entries.forEach(e => {
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
    this.storeTimesheet.current_timesheet.status = 'pending';
    this.storeTimesheet.current_timesheet.status_label = 'En attente';
    this.storeTimesheet.updateEntry(entry);
  },

    // get total day in a month and year , like 1/2024 has 31 days , 2/2024 has 29 days , if not exist return 0
    getTotalDayInMonth(month, year) {
    //  month is integer 1-12
    //  year is integer 2024
      return new Date(year, month, 0).getDate()
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
      const project_entries = this.storeTimesheet.current_timesheet.entries.slice(this.current_page * this.per_page, (this.current_page + 1) * this.per_page);
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
      this.storeTimesheet.current_timesheet.entries.forEach(entry => {
        entry.timesheet_entry_projects.forEach(project => {
          total += Number(project.work_duration);
        })
      })
      return total;
    },

    get_total_effectif_month(){
      let total = 0;
      this.storeTimesheet.current_timesheet.entries.forEach(entry => {
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
      const project_entries = this.storeTimesheet.current_timesheet.entries.slice(this.current_page * this.per_page, (this.current_page + 1) * this.per_page);
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
    closeRefusedModal() {
      document.getElementById('refused_modal_timesheet').close()
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
        id: this.storeTimesheet.current_timesheet.id,
        status: 'pending_validation'
      }
      this.storeTimesheet.current_timesheet.status = 'pending_validation'
      this.storeTimesheet.current_timesheet.status_label = 'En attente de validation'
      await this.storeTimesheet.updateTimesheets(data)
    },
    // updateTimesheetToValidate
    async updateTimesheetToValidate() {
      let data = {
        id: this.storeTimesheet.current_timesheet.id,
        status: 'approved'
      }
      this.storeTimesheet.current_timesheet.status = 'approved'
      this.storeTimesheet.current_timesheet.status_label = 'Approuvé'
      await this.storeTimesheet.updateTimesheets(data)
    },
    // refusedTimesheet
    async refusedTimesheet() {
      let data = {
        id: this.storeTimesheet.current_timesheet.id,
        status: 'rejected',
        comment: this.storeTimesheet.current_timesheet.comment
      }
      this.storeTimesheet.current_timesheet.status = 'rejected'
      this.storeTimesheet.current_timesheet.status_label = 'Refusé'
      await this.storeTimesheet.updateTimesheets(data)
      this.closeRefusedModal()
    },
    openEditModal(timesheet) {
      this.timesheet = timesheet
      this.update = true
      document.getElementById('modal_timesheet').showModal()
    },
    // openRefusedModal
    openRefusedModal() {
      document.getElementById('refused_modal_timesheet').showModal()
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
    }
  },
  mounted() {
    // get url params
    const urlParams = new URLSearchParams(window.location.search);
    const timesheet_id = urlParams.get('timesheet_id')

    console.log("the timesheet id : ",timesheet_id)

    if(timesheet_id){
      this.storeTimesheet.getTimesheetById(timesheet_id)
    }

  }

}

</script>
