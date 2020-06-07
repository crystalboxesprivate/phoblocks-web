import PlatformInfo from './platform.js'
import DrawingCanvas from './drawing-canvas.js'
import { configUserInput } from '../user-input.js'
import Graphics from '../gl/Graphics.js'
import { overlayLog } from '../../components/DebugOverlay.jsx'
import Framebuffer from '../gl/Framebuffer.js'
import BrushTool from './brushTool'
import Color from '../gl/Color.js'
class AppState {
  constructor() {
    this.canvas = new DrawingCanvas()

    // generic brush tool
    class AppColor {
      fg = Color.make(0, 0, 0, .1)
      bg = Color.make(255, 255, 255, .1)
      isBgColorActive = false
      get current() {
        return this.isBgColorActive ? this.bg : this.fg
      }
    }

    this.color = new AppColor()

    let that = this
    this.currentTool = new BrushTool(that)

    // input should be initialized at the end
    configUserInput()
  }
}

export default AppState
