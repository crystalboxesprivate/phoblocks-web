import Graphics from '../gl/Graphics.js'
import FrameBuffer from '../gl/Framebuffer.js'


class DrawingCanvas {
  constructor(width, height) {
    this.width = width || 640
    this.height = height || 480
    this.position = { x: 0, y: 0 }
    this.zoom = 1.0

    this.framebuffer = new FrameBuffer()
    this.checkerboardShader = null
  }

  // this is called once the actual webgl canvas is initialized
  // since the page dimensions are referenced
  onInit() {

    if (this.checkerboardShader == null) {
      this.checkerboardShader = Graphics.createShader(
        require('../gl/shaders/image-uvflip.vert.glsl'),
        require('./shaders/checker.frag.glsl'))
    }


    // init framebuffer
    this.position.x = Graphics.width / 2 - this.width / 2
    this.position.y = Graphics.height / 2 - this.height / 2

    this.framebuffer.allocate(this.width, this.height)
    this.framebuffer.begin()
    Graphics.clearColor([255, 255, 255, 1.0])

    // draw the checkerboard pattern
    const that = this
    const mat = function () {
      Graphics.pushMatrix()
      Graphics.translate(0, 0, 0)
      Graphics.scale(that.framebuffer.width, that.framebuffer.height)
      const m = Graphics.currentMatrix
      Graphics.popMatrix()
      return m
    }()

    const shader = this.checkerboardShader
    shader.setMatrix('xform', mat)
    shader.setVector('aspect', [
      that.framebuffer.width / that.framebuffer.height,
      this.zoom,
      0
    ]
    )
    const shapeData = Graphics.solidShape.shapes.rect

    Graphics.draw(shader, ['pos',], [{
      size: 2,
      glType: Graphics.gl.FLOAT,
      normalized: false,
      stride: 0,
      offset: 0,
    },], 0, shapeData.size, shapeData.arrayBuffer, null)




    this.framebuffer.end()
  }
}

export default DrawingCanvas
