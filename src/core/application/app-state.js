import PlatformInfo from './platform.js'
import DrawingCanvas from './drawing-canvas.js'
import { configUserInput } from '../user-input.js'
import Graphics from '../gl/Graphics.js'
import { overlayLog } from '../../components/DebugOverlay.jsx'
import { vec2 } from 'gl-matrix'
class AppState {
  constructor() {
    this.canvas = new DrawingCanvas()
    let that = this
    this.currentTool = {
      isBeingUsed: false,
      lastPos: [0, 0],
      step: 1,
      onToolBegin(x, y) {
        this.lastPos = [x, y]
      },
      onToolEnd() { },
      toolCallback(x, y) {
        // differrence
        let a = vec2.fromValues(this.lastPos[0], this.lastPos[1])
        let b = vec2.fromValues(x, y)

        vec2.sub(b, b, a)


        let count = Math.floor(vec2.length(b) / this.step)


        vec2.normalize(b, b)

        b[0] *= this.step
        b[1] *= this.step

        for (let x = 0; x < count; x++) {

          that.canvas.framebuffer.begin()
          Graphics.drawCircle(a[0], a[1], 5, [0, 0, 0, 0.1])
          that.canvas.framebuffer.end()

          vec2.add(a, a, b)
        }

        this.lastPos = [x, y]
      },
    }

    // input should be initialized at the end
    configUserInput()
  }
}

export default AppState
