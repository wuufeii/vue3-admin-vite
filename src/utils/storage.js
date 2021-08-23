export const setTags = (data, value) => {
  if (value) {
    data.forEach((item) => (item.active = item.id === value))
  }
  localStorage.setItem('TAGS_LIST', JSON.stringify(data))
}

export const getTags = () => {
  let result = localStorage.getItem('TAGS_LIST')
  result = result ? JSON.parse(result) : []
  return result
}
