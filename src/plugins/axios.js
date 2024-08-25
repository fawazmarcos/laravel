import { useAuthStore } from '@/stores/auth'
import axios from 'axios'


const axiosIns = axios.create({
// You can add your headers here
// ================================
// baseURL: 'https://api.planus-analytics.com',
baseURL: 'http://localhost:8000',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
})

// Request Interceptor
axiosIns.interceptors.request.use(
  config => {
    // Get token from localStorage
    const accessToken = getToken()

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error),
)

// Add request/response interceptor
axiosIns.interceptors.response.use(
  response => response,
  error => {
    // const { config, response: { status } } = error
    const { config, response } = error
    const originalRequest = config
    // clear localStorage
    // localStorage.clear()
    // if (status === 401) {
    if (response && response.status === 401 && !["/api/refreshToken", "api/changePassword","updatePassword"].includes(originalRequest.url)) {

      refreshToken().then(r => {

        setToken(r.data.accessToken)

      })
      const retryOriginalRequest = new Promise(resolve => {
        const accessToken = getToken()
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
          resolve(axiosIns(originalRequest))
      })
      return retryOriginalRequest
    } else if (
      response &&
      response.status === 401 &&
      originalRequest.url === "/api/refreshToken"
    ) {
      // useAuthStore().logOut()
      // clear localStorage
      localStorage.clear()
      // redirect to login
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

function getToken() {
  return localStorage.getItem("access_token")
}

function setToken(token) {
  localStorage.setItem("access_token", token)
}

function refreshToken() {
  return axiosIns.post('/api/refreshToken', {})
}

export default axiosIns