import PlatformInfo from './platform.js'
import DrawingCanvas from './drawing-canvas.js'
import { configUserInput } from '../user-input.js'
import BrushTool from './brushTool'
import Color from '../gl/Color.js'

import { Document } from './document'
import { Layer, LayerType, LayerMask } from './layer.js'


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

    this.commandList = []

    // create document
    this.document = new Document()
    this.document.state = this
    this.activeLayer = 0
    this.maskEditing = false

    this.document.addLayer(LayerType.LAYER)

    // test construction
    {
      const layer = this.document.addLayer(LayerType.LAYER)
      layer.mask = new LayerMask()

      this.document.addLayer(LayerType.LAYER)
      this.document.addLayer(LayerType.LAYER)
      this.document.addLayer(LayerType.LAYER)
      
      const layer2 = this.document.addLayer(LayerType.LAYER)
      layer2.clippingMask = true
      layer2.visible = false

      const group = this.document.addLayer(LayerType.GROUP)

      const group2 = this.document.addLayer(LayerType.GROUP, group)

      this.document.addLayer(LayerType.LAYER, group, 'my layer')
      this.document.addLayer(LayerType.LAYER, group, 'my layer 2')
      this.document.addLayer(LayerType.LAYER, group2, 'my layer EEEE')
    }

    this.commandList = []
  }

}

export default AppState
