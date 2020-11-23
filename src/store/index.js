import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [
      {
        title: 'Item 1',
        description: 'Description item 1'
      },
      {
        title: 'Item 2',
        description: 'Description item 2'
      }
    ]
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    },
    SET_ITEM(state, item) {
      state.items.push(item)
    }
  },
  actions: {
    GET_ITEMS({state, commit}) {
      if (localStorage.getItem('items')) {
        try {
          const items = JSON.parse(localStorage.getItem('items'))
          commit('SET_ITEMS', items)
          return state.items
        } catch (e) {
          localStorage.removeItem('items')
        }
      } else {
        return state.items
      }
    },
    ADD_ITEM({state, commit}, item) {
      commit('SET_ITEM', item)
      addLocalStorageDate(state.items)
    },
    RELOAD_ITEM({commit}, items) {
      commit('SET_ITEMS', items)
      addLocalStorageDate(items)
    }
  },
  getters: {},
  modules: {}
})

function addLocalStorageDate(data) {
  const parsed = JSON.stringify(data)
  localStorage.setItem('items', parsed)
}
