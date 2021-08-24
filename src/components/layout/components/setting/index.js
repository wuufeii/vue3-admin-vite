import { setThemes, getThemes } from 'utils/storage'
// 定义变量
export const _data = {
  drawer: false,
  dayMode: false,
  navbarType: '左侧菜单模式',
  navbarList: [
    '左侧菜单模式',
    '顶部菜单混合模式',
    '顶部菜单模式',
    '左侧菜单混合模式'
  ],
  systemThemeColor: '#0960BD',
  systemThemeList: [
    '#0960BD',
    '#0084F4',
    '#009688',
    '#536DF3',
    '#FF5C93',
    '#EE4F12',
    '#0096C7',
    '#9C27B0',
    '#FF9800'
  ],
  navbarThemeColor: '#FFFFFF',
  navbarThemeList: [
    '#FFFFFF',
    '#151515',
    '#009688',
    '#5172DC',
    '#409EFF',
    '#E74C3C',
    '#24292E',
    '#394664',
    '#001529',
    '#383F45'
  ],
  sidebarThemeColor: '#001529',
  sidebarThemeList: [
    '#001529',
    '#212121',
    '#273352',
    '#FFFFFF',
    '#191B24',
    '#191A23',
    '#304156',
    '#28333E',
    '#344058',
    '#383F45'
  ],
  showBreadcrumb: true

}

// 主题切换
export const _changeSetting = (params) => {
  let { type, value, store, data } = params
  data[type] = value
  settingThemes({ type, value })
  if (type === 'navbarType') {
    data.drawer = false
    store.commit('getNavbarType', value)
  }
}

// 设置主题并暂存缓存
const settingThemes = (params) => {
  const { type, value } = params
  let themes = getThemes()
  themes[type] = value
  setThemes(themes)
  _getThemes()
}

// 读取主题
export const _getThemes = (params) => {
  let themes = getThemes()
  if (params) {
    let { data } = params
    Object.keys(data).forEach((key) => {
      data[key] = themes[key] || data[key]
    })
  }
  let attribute = ''
  if (themes.systemThemeColor) {
    attribute += `--systemThemeColor: ${themes.systemThemeColor};`
    let result = lighten(themes.systemThemeColor, 58)
    attribute += `--systemThemeColorActive: ${result};`
  }
  if (themes.navbarThemeColor) {
    attribute += `--navbarThemeColor: ${themes.navbarThemeColor};`
    let result = lighten(themes.navbarThemeColor, 6)
    attribute += `--sidebarThemeColorActive: ${result};`
  }
  if (themes.sidebarThemeColor) {
    attribute += `--sidebarThemeColor: ${themes.sidebarThemeColor};`
    toggleClass({
      flag: themes.sidebarThemeColor === '#FFFFFF',
      cls: 'sidebar--white'
    })
  }
  toggleClass({
    flag: themes.showBreadcrumb,
    dom: '.el-breadcrumb',
    cls: 'is-show'
  })
  toggleClass({
    flag: themes?.navbarThemeColor
      ? themes.navbarThemeColor === '#FFFFFF'
      : true,
    cls: 'navbar--white'
  })
  _data.navbarList.forEach((item, index) => {
    toggleClass({
      flag: item === _data.navbarType,
      cls: `layout-type-${index + 1}`
    })
  })

  document.querySelector(':root').setAttribute('style', attribute)
}

// 添加移除class
const toggleClass = (params) => {
  let { flag, cls, dom } = params
  dom = dom || 'body'
  let classList = document.querySelector(dom)?.classList
  flag ? classList?.add(cls) : classList?.remove(cls)
}

// 颜色计算方法
const lighten = (color, amount) => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`
}

// 颜色计算方法
const addLight = (color, amount) => {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}
