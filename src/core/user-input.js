import { setOverlayMessage, overlayLog } from '../components/DebugOverlay.jsx'
import PlatformInfo from './application/platform.js'

const modifiers = {}
const mouse = {}
const mousePos = { x: 0, y: 0 }
const isTouchActive = false
const gesture = {
  active: false,
  scale: 1,
  rotation: 1,
}

const mouseButtons = ['left', 'middle', 'right']

const showMods = () => {
  // overlayLog(
  //   `Modifier Keys: ${Object.entries(modifiers)
  //     .filter(([_, v]) => v === 1)
  //     .map((x) => x[0])}`
  // )
}

const configUserInput = () => {
  // handle scale
  window.addEventListener('gesturestart', (e) => {
    gesture.active = true
    gesture.scale = e.scale
    gesture.rotation = e.rotation
    e.preventDefault()
  })
  window.addEventListener('gesturechange', (e) => {
    gesture.scale = e.scale
    gesture.rotation = e.rotation
    e.preventDefault()
  })
  window.addEventListener('gestureend', (e) => {
    gesture.active = false
    e.preventDefault()
  })

  // This will prevent the double tap zoom gesture
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  window.addEventListener('mousedown', (e) => {
    if (mouseButtons[e.button] == null) {
      mouse['unknown'] = 1
    } else {
      mouse[mouseButtons[e.button]] = 1
    }
  })
  window.addEventListener('mouseup', (e) => {
    if (mouseButtons[e.button] == null) {
      mouse['unknown'] = 0
    } else {
      mouse[mouseButtons[e.button]] = 0
    }
  })


  window.addEventListener('keydown', (e) => {
    let code = PlatformInfo.validateKeyCode(e.code)
    if (code === 'Space' || code === 'ControlLeft' || code === 'AltLeft') {
      modifiers[code] = 1
    }
    showMods()
  })

  window.addEventListener('keyup', (e) => {
    let code = PlatformInfo.validateKeyCode(e.code)
    if (code === 'Space' || code === 'ControlLeft' || code === 'AltLeft') {
      modifiers[code] = 0
    }
    showMods()
  })
}

class UserInput {
  static get gesture() {
    return gesture
  }

  static get isTouchActive() {
    return isTouchActive
  }
  static get modifiers() {
    return modifiers
  }
  static get mouse() {
    return mouse
  }
  static get mousePos() {
    return mousePos
  }
}

export { configUserInput, UserInput }
