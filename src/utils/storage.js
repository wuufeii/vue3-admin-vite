// 设置导航
export const setTabs = (data, value) => {
  if (value) {
    data.forEach((item) => (item.active = item.id === value))
  }
  sessionStorage.setItem('TABS_LIST', JSON.stringify(data))
}

// 获取导航
export const getTabs = () => {
  let result = sessionStorage.getItem('TABS_LIST')
  result = result ? JSON.parse(result) : []
  return result
}

// 设置主题
export const setThemes = (data) => {
  localStorage.setItem('THEMES', JSON.stringify(data))
}

// 获取主题
export const getThemes = () => {
  let result = localStorage.getItem('THEMES')
  result = result
    ? JSON.parse(result)
    : {
        showBreadcrumb: true,
        showTabs: true
      }
  return result
}

// 设置面包屑
export const setBreadcrumb = (data) => {
  data = data || []
  data = data.reverse()
  sessionStorage.setItem('BREADCRUMB', JSON.stringify(data))
}

// 获取面包屑
export const getBreadcrumb = () => {
  let result = sessionStorage.getItem('BREADCRUMB')
  result = result ? JSON.parse(result) : []
  return result
}
