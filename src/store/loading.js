export default {
  state: {
    loading: false
  },
  mutations: {
    appLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
  },
  getters: {
    getLoading (state) {
      return state.loading
    }
  }
}
