import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    allstatus: [],
  },
  mutations: {
    login (state) {
      state.islogin = true
    },
    logout (state) {
      state.islogin = false
    },
    updateAllStatus (state, value) {
      state.allstatus = value
    }
  },
  actions: {

  }
})
