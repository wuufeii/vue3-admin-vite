export const changeFullScreen = (data) => {
  let element = document.documentElement
  if (data.fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  }
}

export const listenerEvent = (fn, data) => {
  document.onkeydown = (event) => {
    if (event.keyCode == 122) {
      event.preventDefault()
      changeFullScreen(data)
    }
  }
  document.addEventListener('fullscreenchange', fn)
  document.addEventListener('mozfullscreenchange', fn)
  document.addEventListener('webkitfullscreenchange', fn)
  document.addEventListener('msfullscreenchange', fn)
}
