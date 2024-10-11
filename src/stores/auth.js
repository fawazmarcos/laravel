import axios from '@axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { defineStore } from 'pinia'
import router from '../router'



export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, loading: false, email: '', error: false , theUser : null, formations: [],certifications: [],expertises: [],interests: [],skills: [], mskills: [], tskills: [],experiences: [],loadingPasse: false,mails: [], is_auth_office:true,is_office_loading:false}),
  actions: {
    login(body) {
      this.loading = true;
      axios.post('/api/login', body).then(async (r) => {
        // status
        const status = r.status;
        if(status == 200){
          localStorage.setItem("access_token", r.data.access_token)
          const query = router.currentRoute.value.query.redirect;
          this.Me(true);
          
        }
        this.loading = false;
      }).catch((e) => {
        this.loading = false;
        console.log(e);
        toast.error("Identifiants incorrects.", {
          autoClose: 3000,
        }); 
      })
    },
    Me(redirect = false) {
      this.loading = true;
      axios.get('/api/me').then((response) => {
        this.user = response.data.data;
        const s_user = JSON.stringify(response.data.data);
        localStorage.setItem("user", s_user);
        this.loading = false;
        if(redirect){
          const query = router.currentRoute.value.query.redirect;
          if (query) {
            window.location.href = query;
          }else{
            if(this.user.role === 'admin'){
              window.location.href = "/admin";
            }else{
              window.location.href = "/timesheet";
            }
          }
        }
      }).catch(() => {
        
        this.error = true;
        this.loading = false;
      })
    },
    getUser(){
      // return user from local storage
      let user = localStorage.getItem("user");
      if(user){
        user = JSON.parse(user);
        return user;
      }
      return null;
    },
    register(body) {
      this.loading = true;
      axios.post('/api/register', body).then(async (r) => {
        localStorage.setItem("access_token", r.data.access_token)
        this.loading = false;
        window.location.href = "/confirm-email";
      }).catch((error) => {
        console.log(error);
        let message = "";
        if (error.response){
            message = error.response.data.message;
        }
        toast.error(message, {
          autoClose: 5000,
        });
        this.loading = false;
      })
    },
    confirmEmail(body) {
      this.loading = true;
      axios.post('/api/confirm-code', body).then(async (r) => {
        let code = r.data.code;
        let message = r.data.message;
        this.loading = false;
        if(code >220){
          toast.error(message, {
            autoClose: 3000,
          }); 
        }else{
        window.location.href = "/admin";
        }
      }).catch((error) => {
        console.log(error);
        let message = "Une erreur est survenue!";
        if (error.response) {
          message = error.response.data.message;
        }
        toast.error(message, {
          autoClose: 5000,
        });
        this.loading = false;
      })
    },

    // resend code with this route resend-code
    resendCode() {
      this.loading = true;
      axios.post('/api/resend-code').then(async (r) => {
        let code = r.data.code;
        let message = r.data.message;
        this.loading = false;
        if(code >220){
          toast.error(message, {
            autoClose: 3000,
          }); 
        }else{
          toast.success(message, {
              autoClose: 3000,
          }); 
        }
      }).catch((error) => {
        console.log(error);
        let message = "Une erreur est survenue!";
        if (error.response) {
          message = error.response.data.message;
        }
        toast.error(message, {
          autoClose: 5000,
        });
        this.loading = false;
      })
    },

    logOut() {
      axios.post('/api/logout', {}).then((response) => {
        localStorage.clear();
        window.location.href = "/";
      }).catch(() => {
        console.error("Une erreur est survenue!")
      })
    },
    isLogin(){
      if (localStorage.getItem("access_token") !== null) {
        return true;
      } else {
        return false;
      }
    },
    updateProfile(body) {
      this.loading = true;
      axios.post('api/updateProfile', body).then(async () => {
        this.Me();
        toast.success("Profil mise à jour", {
          autoClose: 3000,
        }); 
        this.loading = false;
      }).catch((error) => {

        let message = "Une erreur est survenue!";
        toast.error(message, {
          autoClose: 5000,
        });
        this.loading = false;
      })
    }, 
    updatePassword(body) {
      this.loadingPasse = true;
      axios.post(`/api/changePassword`, body).then(async (r) => {
        let code = r.data.code;
        let message = r.data.message;
        this.loadingPasse = false;
        if(code >220){
          toast.error(message, {
            autoClose: 3000,
          }); 
        }else{
          toast.success(message, {
              autoClose: 3000,
          }); 
        }
        // this.logOut()
        // this.$router.push("/instructor-dashboard");
      }).catch((error) => {
        console.log(error);
        let message = "Une erreur est survenue!";
        if (error.response) {
          message = error.response.data.message;
        }
        toast.error(message, {
          autoClose: 5000,
        });
        this.loadingPasse = false;
        // console.error("Une erreur est survenue!")
      })
    },
    contact(body) {
      this.loading = true;
      axios.post(`/api/contact`, body).then(async () => {
        // this.$router.push("/instructor-dashboard");
        toast.success("Nous vous remercions pour votre message. Nous y répondrons dans les plus brefs délais.", {
            autoClose: 3000,
        }); 
        this.loading = false;
      }).catch((error) => {
        console.log(error);
        let message = "Une erreur est survenue!";
        if (error.response) {
          message = error.response.data.message;
        }
        toast.error(message, {
          autoClose: 5000,
        });
        this.loading = false;
        // console.error("Une erreur est survenue!")
      })
    },
    forgotPassword(body) {
      this.loading = true;
      axios.post(`/api/forgotPassword`, body).then(async () => {
        toast.success("Code envoyé par mail.", {
            autoClose: 3000,
        });
        const email = body.email;
        localStorage.setItem("email", email);
        router.push("/new-password"); 
        this.loading = false;
      }).catch((error) => {
        console.log(error);
        let message = "Une erreur est survenue!";
        if (error.response) {
          message = error.response.data.message;
        }
        toast.error(message, {
          autoClose: 5000,
        });
        this.loading = false;
      })
    },
    updatePasswordCode(body) {
      this.loading = true;
      const email = localStorage.getItem("email");
      body.email = email;
      axios.post(`/api/updatePassword`, body).then(async (r) => {
        // router.push("/login");
        let code = r.data.code;
        let message = r.data.message;

        if(code >220){
          toast.error(message, {
            autoClose: 3000,
          }); 
        }else{
          toast.success(message, {
              autoClose: 3000,
          }); 
        } 
        window.location.href = "/login";
        this.loading = false;
      }).catch((error) => {
        console.log(error);
        let message = "Une erreur est survenue!";
        if (error.response) {
          message = error.response.data.message;
        }
        toast.error(message, {
          autoClose: 5000,
        });
        this.loading = false;
      })
    }, 

    // get my formations my-formations
    myFormations() {
      this.loading = true;
      axios.get('/api/my-formations').then((response) => {
        this.formations = response.data.data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },

    // create formation create-formation
    createFormation(body) {
      this.loading = true;
      axios.post('/api/create-formation', body).then((response) => {
        this.loading = false;
        toast.success("Formation ajoutée.", {
          autoClose: 3000,
        });
        this.myFormations();
      }).catch(() => {
        this.loading = false;
        toast.error("Une erreur est survenue.", {
          autoClose: 3000,
        });
      })
    },

    // update formation update-formation
    updateFormation(id,body) {
      this.loading = true;
      axios.post(`/api/update-formation/${id}`, body).then((response) => {
        this.loading = false;
        toast.success("Formation mise à jour.", {
          autoClose: 3000,
        });
        this.myFormations();
      }).catch(() => {
        this.loading = false;
        toast.error("Une erreur est survenue.", {
          autoClose: 3000,
        });
      })
    },

    // delete formation delete-formation
    deleteFormation(id) {
      this.loading = true;
      axios.delete(`/api/delete-formation/${id}`).then((response) => {
        this.loading = false;
          toast.success("Formation supprimée.", {
            autoClose: 3000,
          });
        this.myFormations();
      }).catch(() => {
        this.loading = false;
        toast.error("Une erreur est survenue.", {
          autoClose: 3000,
        });
      })
    },

    // get my certifications
    myCertifications() {
      axios.get('/api/my-certifications').then((response) => {
        this.certifications = response.data.data;
      }).catch(() => {
      })
    },

    // get my expertises
    myExpertises() {
      axios.get('/api/my-expertises').then((response) => {
        this.expertises = response.data.data;
      }).catch(() => {
      })
    },

    // get my interests
    myInterests() {
      axios.get('/api/my-interests').then((response) => {
        this.interests = response.data.data;
      }).catch(() => {
      })
    },

    // get my skills
    mySkills() {
      axios.get('/api/my-skills').then((response) => {
        this.skills = response.data.data;
      }).catch(() => {
      })
    },

    myMSkills() {
      axios.get('/api/my-mskills').then((response) => {
        this.mskills = response.data.data;
      }).catch(() => {
      })
    },

    myTSkills() {
      axios.get('/api/my-tskills').then((response) => {
        this.tskills = response.data.data;
      }).catch(() => {
      })
    },

    myMetas(){
      this.myFormations();
      this.myCertifications();
      this.myExpertises();
      this.myExperiences();
      this.myInterests();
      this.mySkills();
      this.myMSkills();
      this.myTSkills();
    },


    // create user meta
    createUserMeta(body) {
      this.loading = true;
      axios.post('/api/create-meta', body).then((response) => {
        this.loading = false;
        toast.success("Informations ajoutées.", {
          autoClose: 3000,
        });
        this.myMetas();
      }).catch(() => {
        this.loading = false;
        toast.error("Une erreur est survenue.", {
          autoClose: 3000,
        });
      })
    },

    // update user meta
    updateUserMeta(id,body) {
      this.loading = true;
      axios.post(`/api/update-meta/${id}`, body).then((response) => {
        this.loading = false;
        toast.success("Informations mises à jour.", {
          autoClose: 3000,
        });
        this.myMetas();
      }).catch(() => {
        this.loading = false;
        toast.error("Une erreur est survenue.", {
          autoClose: 3000,
        });
      })
    },

    // delete user meta
    deleteUserMeta(id) {
      this.loading = true;
      axios.delete(`/api/delete-meta/${id}`).then((response) => {
        this.loading = false;
          toast.success("Informations supprimées.", {
            autoClose: 3000,
          });
        this.myMetas();
      }).catch(() => {
        this.loading = false;
        toast.error("Une erreur est survenue.", {
          autoClose: 3000,
        });
      })
    },


     // get my experiences my-experiences
     myExperiences() {
      this.loading = true;
      axios.get('/api/my-experiences').then((response) => {
        this.experiences = response.data.data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },

    // create experience create-experience
    createExperience(body) {
      this.loading = true;
      axios.post('/api/create-experience', body).then((response) => {
        this.loading = false;
        toast.success("Experience ajoutée.", {
          autoClose: 3000,
        });
        this.myExperiences();
      }).catch(() => {
        this.loading = false;
        toast.error("Une erreur est survenue.", {
          autoClose: 3000,
        });
      })
    },

    // update experience update-experience
    updateExperience(id,body) {
      this.loading = true;
      axios.post(`/api/update-experience/${id}`, body).then((response) => {
        this.loading = false;
        toast.success("Experience mise à jour.", {
          autoClose: 3000,
        });
        this.myExperiences();
      }).catch(() => {
        this.loading = false;
        toast.error("Une erreur est survenue.", {
          autoClose: 3000,
        });
      })
    },

    // delete experience delete-experience
    deleteExperience(id) {
      this.loading = true;
      axios.delete(`/api/delete-experience/${id}`).then((response) => {
        this.loading = false;
          toast.success("Experience supprimée.", {
            autoClose: 3000,
          });
        this.myExperiences();
      }).catch(() => {
        this.loading = false;
        toast.error("Une erreur est survenue.", {
          autoClose: 3000,
        });
      })
    },

    // get o365 url
    getO365Url(){
      axios.get('/api/microsoft-auth/redirect').then((response) => {
        const url = response.data.url;
        window.location.href = url;
      }).catch((error) => {
        console.log(error);
      })
    },

    // confirm o365 code
    confirmO365Code(code) {
      const body = {
        code: code
      }
      this.loading = true;
      axios.post('/api/microsoft-auth/callback', body).then((response) => {
         toast.success("Connexion Office 365réussie.", {
          autoClose: 3000,
        });
        this.loading = false;
        window.location.href = "/mails";
      }).catch((error) => {
        console.log(error);
      })

    },

    // get mails
    getMails(){
      this.is_office_loading = true;
      axios.get('/api/mails').then((response) => {
        this.mails = response.data.value;
        this.is_office_loading = false;
      }).catch((error) => {
        const code = error.response.status;
        this.is_office_loading = false;
        const message = error.response.data.message;
        if(error.response.data.url){
          window.location.href = error.response.data.url;
        }
        // toast.error(message, {
        //   autoClose: 5000,
        // });
        // if(code == 523){
        //   this.is_auth_office = false;
        // }
      })
    },

    sendMail(body) {
      this.loading = true;
      axios.post('/api/mails/send', body).then((response) => {
        this.loading = false;
        toast.success("Email envoyé.", {
          autoClose: 3000,
        });
      }).catch((error) => {
        console.log(error);
        let message = "Une erreur est survenue!"
        if (error.response) {
          message = error.response.data.message;
        }
        toast.error(message, {
          autoClose: 5000,
        });
        this.loading = false;
      })
    },
 
  },
})

export default useAuthStore;