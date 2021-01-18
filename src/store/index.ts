import { createStore } from 'vuex'

export default createStore({
  state: {
    loaded: false
  },
  mutations: {
    setLoaded(state, loaded) {
      state.loaded = loaded
    }
  },
  actions: {},
  modules: {}
})
