

<template>
  <Dashboard>
    <template #content>
      <div v-if="storeTimesheet.current_timesheet && !storeTimesheet.loading" class="flex flex-col gap-5 p-4">
        <div class="flex justify-between items-center">
          <RouterLink to="/timesheet" class="cursor-pointer font-semibold text-md" > <i class="fa fa-chevron-left"></i> Retour</RouterLink>
          <div class="flex gap-3 items-center">
            <h2 class="text-xl font-semibold">Feuille de Temps {{ storeTimesheet.current_timesheet.month_label }} {{ storeTimesheet.current_timesheet.year }}</h2> <span class=" text-gray- rounded-md p-1 text-xs " :class="'bg-'+storeTimesheet.current_timesheet.status_color+'-500'">{{ storeTimesheet.current_timesheet.status_label }}</span>
          </div>
        </div> 
        <div class="grid grid-cols-7 gap-2 w-full max-w-2xl mx-auto !hidden">
      <div 
        class="rounded border p-2 shadow h-16 text-center text-sm flex flex-col gap-1" 
        v-for="entry in get_current_timesheet_entries" 
        :key="entry.id" 
        :class="dayClasses(entry.can_edit)"
        @click="enableEditing(entry)">
        <span class="text-xs">{{ entry.day }} {{ entry.day_label }}</span>
        <span v-if="!entry.isEditing" id="input" class="rounded bg-gray-300">{{ entry.work_duration }}</span>
        <input 
          v-else 
          type="number" 
          step="0.25" 
          max="1" 
          min="0" 
          class="rounded p-1 border text-center"
          v-model="entry.work_duration"
          @change="updateWorkDuration(entry)"
          />
          <!-- @keyup.enter="disableEditing(entry)" -->
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
                <tr v-for="project in storeProject.pending_projects" :key="project.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ project.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800" :id="project.id+'/'+entry.id" v-for="entry in get_current_timesheet_entries" :key="entry.id"> 
                  <!-- {{ entry }} -->
                  <!-- {{ entry.timesheet_entry_projects.find(p => p.project_id === project.id).work_duration }} -->
                  <!-- {{ get_entry_project(entry,project.id) }} -->
                  <!--  -->
                  <select v-if="storeTimesheet.current_timesheet.status !=='approved' && entry.timesheet_entry_projects.find(p => p.project_id === project.id)" name="" id=""  v-model="entry.timesheet_entry_projects.find(p => p.project_id === project.id).work_duration"
                   @change="updateEntryProject(entry.timesheet_entry_projects.find(p => p.project_id === project.id))" class="rounded p-1 borde text-center">
                   <option value="0">0</option> 
                   <option :value="i" v-for="i=0 in 16" :key="i">{{ i }}</option>
                  </select>
                  <span v-else>{{ entry.timesheet_entry_projects.find(p => p.project_id === project.id)?.work_duration ?? 0 }}</span>
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
<div class="flex flex-col gap-2 w-full">
  <div v-if="storeTimesheet.current_timesheet.comment"  class=" mx-auto mt-2 bg-red-800 text-sm text-white rounded-lg p-4 " role="alert">
    <span class="font-bold"> Note :  </span> {{ storeTimesheet.current_timesheet.comment }} 
  </div>
  <div class="flex gap-2 items-center mx-auto mt-2" v-if="storeTimesheet.current_timesheet.status=='pending'">
    <span  @click="updateTimesheetToPendingValidation()" class="rounded bg-gray-900 text-sm p-2 mx-auto cursor-pointer text-white">Soumission pour validation</span>
    <a href="/timesheet" class="rounded bg-red-500 text-sm p-2 mx-auto cursor-pointer text-white">Quitter</a>
    <span @click="reinit()" class="rounded bg-blue-700 text-sm p-2 mx-auto cursor-pointer text-white">REINITIALISATION</span>
  </div>
  <span v-if="storeTimesheet.current_timesheet.status=='pending_validation'" class="rounded border-orange-500 text-orange-500 text-sm p-2 mx-auto cursor-pointer text- gap-2 flex items-center border"> <i class="fa fa-clock"></i>{{ storeTimesheet.current_timesheet.status_label }}</span>
  <span v-if="storeTimesheet.current_timesheet.status=='approved'" class="rounded border-green-500 text-green-500 text-sm p-2 mx-auto text- gap-2 flex items-center border"> <i class="fa fa-check"></i>{{ storeTimesheet.current_timesheet.status_label }} le {{ storeTimesheet.current_timesheet.updated_at }}</span>
  <span>
    Pour saisir vos temps , cliquez sur le jour de votre choix , puis saisissez le temps que vous avez passé pour ce jour.
  </span>
  <span>1 : 30 minutes</span>
  <span> 2 : 1 heure</span> 
 <span> 8 : 4 heures</span>
 <span> 16 : 8 heures</span>
</div>
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
        default_duration: 0,
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
      if( this.timesheet.year !== '' && this.timesheet.month !== '') {
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

  updateEntryProject(entry) {
    this.storeTimesheet.current_timesheet.status = 'pending';
    this.storeTimesheet.current_timesheet.status_label = 'En attente';
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
        id: this.storeTimesheet.current_timesheet.id,
        status: 'pending_validation'
      }
      this.storeTimesheet.current_timesheet.status = 'pending_validation'
      this.storeTimesheet.current_timesheet.status_label = 'En attente de validation'
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
        await this.storeTimesheet.reinit(this.storeTimesheet.current_timesheet.id)
        // set all timesheet entry project to 0
        this.storeTimesheet.current_timesheet.entries.forEach(entry => {
          entry.timesheet_entry_projects.forEach(project => {
            project.work_duration = 0
          })
        })
      }
    }
  },
  mounted() {

    const urlParams = new URLSearchParams(window.location.search);
    const timesheet_id = urlParams.get('timesheet_id')

    console.log("the timesheet id : ",timesheet_id)

    if(timesheet_id){
      this.storeTimesheet.getTimesheetById(timesheet_id)
    }
    this.storeProject.getPendingProjects()

  }

}

</script>
