import PlatformInfo from './platform.js'
import DrawingCanvas from './drawing-canvas.js'
import { configUserInput } from '../user-input.js'

class AppState {
  constructor() {
    this.platform = new PlatformInfo()
    this.canvas = new DrawingCanvas()

    // input should be initialized at the end
    configUserInput()
  }
}

export default AppState
