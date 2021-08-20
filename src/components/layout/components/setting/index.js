// 定义变量
export const _data = {
  drawer: false,
  dayMode: false,
  navbarType: '左侧菜单模式',
  navbarList: [
    '左侧菜单模式',
    '顶部菜单混合模式',
    '顶部菜单模式',
    '左侧菜单混合模式',
  ],
  systemThemeColor: '#0096bd',
  systemThemeList: [
    '#0096bd',
    '#0084f4',
    '#009688',
    '#536df3',
    '#ff5c93',
    '#ee4f12',
    '#0096c7',
    '#9c27b0',
    '#ff9800',
  ],
  navbarThemeColor: '#ffffff',
  navbarThemeList: [
    '#ffffff',
    '#151515',
    '#009688',
    '#5172dc',
    '#409eff',
    '#e74c3c',
    '#24292e',
    '#394664',
    '#001529',
    '#383f45',
  ],
  sidebarThemeColor: '#001529',
  sidebarThemeList: [
    '#001529',
    '#212121',
    '#273352',
    '#ffffff',
    '#191b24',
    '#191a23',
    '#304156',
    '#28333e',
    '#344058',
    '#383f45',
  ],
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

// 设置主题，暂存localStorage
const settingThemes = (params) => {
  const { type, value } = params
  let themes = localStorage.getItem('themes')
  themes = themes ? JSON.parse(themes) : {}
  themes[type] = value
  localStorage.setItem('themes', JSON.stringify(themes))
  _getThemes()
}

// 读取主题
export const _getThemes = (params) => {
  let themes = localStorage.getItem('themes')
  themes = themes ? JSON.parse(themes) : {}
  if (params) {
    let { data } = params
    Object.keys(data).forEach((key) => {
      data[key] = themes[key] || data[key];
    })
  }
  let attribute = ''
  if (themes.systemThemeColor) {
    attribute += `--systemThemeColor: ${themes.systemThemeColor};`
  }
  if (themes.navbarThemeColor) {
    attribute += `--navbarThemeColor: ${themes.navbarThemeColor};`
    let result = lighten(themes.navbarThemeColor, 6)
    attribute += `--sidebarThemeColorActive: ${result};`
  }
  if (themes.sidebarThemeColor) {
    attribute += `--sidebarThemeColor: ${themes.sidebarThemeColor};`
    toggleClass({
      flag: themes.sidebarThemeColor === '#ffffff',
      cls: 'sidebar--white'
    })
  }
  toggleClass({
    flag: themes?.navbarThemeColor ? themes.navbarThemeColor ==='#ffffff' : true,
    cls: 'navbar--white'
  })
  document.querySelector(':root').setAttribute('style', attribute)
}

// 添加移除class
const toggleClass = (params) => {
  let { flag, cls } = params
  let classList = document.querySelector('body').classList
  flag ? classList.add(cls) : classList.remove(cls)
}

// 颜色计算方法
const lighten = (color, amount) => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`;
}

// 颜色计算方法
const addLight = (color, amount) => {
  const cc = parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}
