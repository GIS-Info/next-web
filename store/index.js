import Vue from 'vue'
import Vuex, { Store } from 'vuex'
// 引入less预编译器
import less from 'less'
/*
import { api } from '@/config'
import axios from 'axios'
*/

Vue.use(Vuex)
Vue.use(less)

const state = {
  language: 'zh', // ['zh', 'en'] 语言
  userToken: undefined,
}

const mutations = {
  setLanguage(state, data) {
    state.language = data
  },
  setUserToken(state, data) {
    state.userToken = data
  }
}

const getters = {}

const actions = {
  //  api 请求示例
  login({ commit }) {
    /*
    const data = await axios(`${api}/login`).data
    */
    commit('setUserToken', 'test_token')
    return Promise.resolve()
  },
  logout({ commit }) {
    commit('setUserToken', undefined)
    return Promise.resolve()
  },
}

const store = () =>
  new Store({
    state,
    getters,
    mutations,
    actions
  })

export default store
