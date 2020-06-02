class DrawingCanvas {
  constructor(width, height) {
    this.width = width || 640
    this.height = height || 480
    this.position = { x: 0, y: 0 }
    this.zoom = 1.0
  }
}

export default DrawingCanvas
