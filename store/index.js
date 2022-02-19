import Vue from 'vue'
import Vuex, {Store} from 'vuex'
import axios from 'axios'
import {api} from '@/config'

Vue.use(Vuex)

const state = {
    isLogin: false,
    userInfo: {},
};

const mutations = {
    setLogin(state,data){
        state.isLogin = data
    },
    setUserInfo(state,data){
        state.userInfo = data
    },
};

const getters = {
};

const actions = {
    //  api 请求示例
	async login({commit}) {
			const userInfo = await axios(`${api}/login`).data;
			commit('setLogin',true);
            commit('setUserInfo',userInfo);
	}
};

const store = () => new Store({
	state,
	getters,
	mutations,
	actions
})

export default store