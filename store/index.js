import Cookies from 'js-cookie'
import { getUser } from '@/api/auth'

export const state = () => {
  return {
    user: process.client ? window.localStorage.getItem('token') : null
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
    Cookies.set('token', user.token)
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    const token = Cookies.get('token')
    if (token) {
      commit('setUser', { token })
      const { data } = await getUser()
      commit('setUser', data.user || {})
      console.log(mm)
    }
  }
}