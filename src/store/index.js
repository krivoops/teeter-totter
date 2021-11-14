import { createStore } from 'vuex'

function setupStore() {
  return createStore({
    state () {
      return {
        view: 'start'
      }
    },
    mutations: {
      change_view(state, payload) {
        state.view = payload
      }
    }
  })
}

export {
  setupStore,
}