import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)


const state = {
  language: 'zh', // ['zh', 'en'] 语言
  userToken: undefined,
  isSuperUser: false,
  userInfo: {},
}

const mutations = {
  setLanguage(state, data) {
    state.language = data
  },
  setUserToken(state, data) {
    state.userToken = data
  },
  setSuperUser(state, data) {
    state.isSuperUser = data
  },
  setUserInfo(state, data) {
    state.userInfo = data
  }
}

const getters = {}

const actions = {
  logout({ commit }){
    commit('setUserToken', undefined)
    commit('setSuperUser', false)
    commit('setUserInfo', {})
    return Promise.resolve()
  }
}

const store = () =>
  new Store({
    state,
    getters,
    mutations,
    actions
  })

export default store
