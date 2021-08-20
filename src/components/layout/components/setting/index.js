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

export const _changeSetting = (params) => {
  let { type, value, store, data } = params
  data[type] = value
  settingThemes({ type, value })
  if (type === 'navbarThemeColor') {
    let color = value === '#ffffff' ? '#000000' : '#ffffff'
    let params = {
      type: 'navbarThemeTextColor',
      value: color,
    }
    settingThemes(params)
  }
  if (type === 'sidebarThemeColor') {
    let color = value === '#ffffff' ? '#000000d9' : '#ffffff'
    let params = {
      type: 'sidebarThemeTextColor',
      value: color,
    }
    settingThemes(params)
  }
}

const settingThemes = (params) => {
  const {type, value} = params
  let themes =  localStorage.getItem('themes')
  themes = themes ? JSON.parse(themes) : {}
  themes[type] = value
  localStorage.setItem('themes', JSON.stringify(themes))
  _getThemes()
}

export const _getThemes = (params) => {
  let themes = localStorage.getItem('themes')
  themes = themes ? JSON.parse(themes) : {}
  if(params) {
    let {data} = params
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
  }
  if (themes.navbarThemeTextColor) {
    attribute += `--navbarThemeTextColor: ${themes.navbarThemeTextColor};`
  }
  if (themes.sidebarThemeColor) {
    attribute += `--sidebarThemeColor: ${themes.sidebarThemeColor};`
  }
  if (themes.sidebarThemeTextColor) {
    attribute += `--sidebarThemeTextColor: ${themes.sidebarThemeTextColor};`
    if (themes.sidebarThemeTextColor === '#000000d9') {
      document.querySelector('body').classList.add('layout-light')
    } else {
      document.querySelector('body').classList.remove('layout-light')
    }
  }
  document.querySelector(':root').setAttribute('style', attribute)
}

