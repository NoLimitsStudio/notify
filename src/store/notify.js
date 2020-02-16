import loadMore from '../assets/js/loadmore.js'
import axios from 'axios'

export default {
  state: {
    messages: [],
    messagesMain: [],
    apiURL: 'http://realtykrd.ru/api/notifyApi.php'
  },
  mutations: {
    setMessage (state, payload) {
      state.messages = payload
    },
    setMessageMain (state, payload) {
      state.messagesMain = payload
    },
    loadMessages (state, payload) {
      state.messagesMain = [...state.messagesMain, ...payload]
      state.messages = [...state.messages, ...payload]
    }
  },
  actions: {
    setMessage ({ commit }, payload) {
      commit('setMessage', payload)
    },
    setMessageMain ({ commit }, payload) {
      commit('setMessageMain', payload)
    },
    loadMessages ({ commit, getters }) {
      let res = getters.getMessageFilter
      commit('loadMessages', loadMore(res))
    },
    apiMessages ({ commit, getters }) {
      commit('appLoading', true)
      // get URL from state
      const url = getters.getURL
      console.log(url)
      setTimeout(() => {
        axios
          .get(url)
          .then(response => {
            const res = response.data.notify
            let messages = []
            let messagesMain = []
            res.forEach(e => e.main ? messagesMain.push(e) : messages.push(e))
            commit('setMessage', messages)
            commit('setMessageMain', messagesMain)
          })
          .catch((error) => { commit('setError', error) })
          .finally(() => commit('appLoading', false))
      }, 1800)
    }
  },
  getters: {
    getMessageFilter (state) {
      return state.messages.filter(el => !el.main)
    },
    getMessage (state) {
      return state.messagesMain
    },
    getURL (state) {
      return state.apiURL
    }
  }
}
