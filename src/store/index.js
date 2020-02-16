import Vue from 'vue'
import Vuex from 'vuex'

import notify from './notify'
import appLoading from './loading'
import appError from './error'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    notify, appLoading, appError
  }
})
