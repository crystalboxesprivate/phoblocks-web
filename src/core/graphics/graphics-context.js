class GraphicsContext {
  constructor() {
    this.gl = null
  }

  presetup() {
    // Only continue if WebGL is available and working
    if (this.gl === null) {
      alert(
        'Unable to initialize WebGL. Your browser or machine may not support it.'
      )
      return
    }
    // Set clear color to black, fully opaque
    this.gl.clearColor(0.3, 0.3, 0.3, 1.0)
    // Clear the color buffer with specified clear color
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }
}

export default GraphicsContext
