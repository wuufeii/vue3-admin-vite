import { createStore } from 'vuex'
import { getThemes } from 'utils/storage'

const navbarType = getThemes()?.navbarType ?? '左侧菜单模式'
export default createStore({
  state: {
    navbarType: navbarType,
    isCollapse: false,
    activeMenu: ''
  },
  mutations: {
    // 设置导航栏类型
    setNavbarType(state, data) {
      state.navbarType = data
    },

    // 设置菜单折叠
    setCollapse(state, data) {
      state.isCollapse = data
    },

    // 设置当前选中菜单
    setActiveMenu(state, data) {
      state.activeMenu = data
    }
  },
  actions: {},
  modules: {}
})
