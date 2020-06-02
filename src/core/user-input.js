import { setOverlayMessage, overlayLog } from '../components/DebugOverlay.jsx'

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
    // overlayLog(`scale: ${e.scale}`)
    gesture.active = true
    gesture.scale = e.scale
    gesture.rotation = e.rotation
    e.preventDefault()
  })
  window.addEventListener('gesturechange', (e) => {
    // overlayLog(`scale: ${e.scale}`)
    gesture.scale = e.scale
    gesture.rotation = e.rotation
    e.preventDefault()
  })
  window.addEventListener('gestureend', (e) => {
    // overlayLog(`scale: ${e.scale}`)
    gesture.active = false
    e.preventDefault()
  })

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

  // window.addEventListener('mousemove', (e) => {
  //   if (mouse[0] === 1) {
  //     if (modifiers.Space === 1) {
  //       if (modifiers.ControlLeft === 1) {
  //         overlayLog('zooming')
  //       } else {
  //         overlayLog('panning')
  //       }
  //     }
  //   }
  // })

  window.addEventListener('keydown', (e) => {
    let code = e.code
    if (code === 'Space' || code === 'ControlLeft' || code === 'AltLeft') {
      modifiers[code] = 1
    }
    showMods()
  })

  window.addEventListener('keyup', (e) => {
    let code = e.code
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
