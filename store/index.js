import { getUser } from '@/api/auth'

const Cookie = process.client ? require('js-cookie') : undefined

const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: {}
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
    process.client ? Cookie.set('user', JSON.stringify(user)) : ''
  },
  removeUser(state) {
    state.user = {}
    Cookie.remove('user')
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    if (!req.headers.cookie) {
      return
    }
    const parsed = cookieparser.parse(req.headers.cookie)
    if (!!parsed.user) {
      commit('setUser', JSON.parse(parsed.user))
    }
  }
}