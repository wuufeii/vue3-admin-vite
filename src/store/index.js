import { createStore } from 'vuex'
import {getThemes} from 'utils/themes'

export default createStore({
  state: {
    themes: localStorage.getItem('themes') ? JSON.parse(localStorage.getItem('themes')) : {}
  },
  mutations: {
    changeThemes(state,data) {
      state.themes[data.type] = data.value
      // document.querySelector(':root').setAttribute('style', `--${data.type}: ${data.value}`)
      localStorage.setItem('themes', JSON.stringify(state.themes))
      getThemes()
    }
  },
  actions: {},
  modules: {},
})
