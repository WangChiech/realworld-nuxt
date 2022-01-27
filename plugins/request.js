import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://api.realworld.io'
})

export default ({ store }) => {
  axios.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
}