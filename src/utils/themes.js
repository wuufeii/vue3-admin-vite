export function getThemes() {
  let themes = localStorage.getItem('themes')
  themes = themes ? JSON.parse(themes) : {}
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
    if(themes.sidebarThemeTextColor === '#000000d9') {
      document.querySelector('body').classList.add('layout-light')
    } else {
      document.querySelector('body').classList.remove('layout-light')
    }
  }
  document.querySelector(':root').setAttribute('style', attribute)
}


