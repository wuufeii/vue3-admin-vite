import { createStore } from 'vuex'

let themes = localStorage.getItem('themes')
themes = themes ? JSON.parse(themes) : {}
const navbarType = themes?.navbarType ?? '左侧菜单模式'
export default createStore({
  state: {
    navbarType: navbarType,
    isCollapse: false,
    activeMenu: ''
  },
  mutations: {
    // 获取导航栏类型
    getNavbarType(state, data) {
      state.navbarType = data
    },

    // 获取菜单折叠
    getCollapse(state, data) {
      state.isCollapse = data
    },

    // 获取当前选中菜单
    getActiveMenu(state, data) {
      state.activeMenu = data
    }
  },
  actions: {},
  modules: {}
})
