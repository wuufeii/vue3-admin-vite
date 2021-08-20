import { createStore } from 'vuex'

let themes = localStorage.getItem('themes')
themes = themes ? JSON.parse(themes) : {}
const navbarType = themes?.navbarType ?? '左侧菜单模式'
export default createStore({
  state: {
    navbarType: navbarType
  },
  mutations: {
    getNavbarType(state, data) {
      state.navbarType = data
    }
  },
  actions: {},
  modules: {},
})
