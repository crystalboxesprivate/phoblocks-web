

class ArrayBuffer {
  static Type = {
    VERTEX: 'vertex',
    INDEX: 'index'
  }
  constructor(gl, type, data) {
    this.gl = gl
    this.type = type || ArrayBuffer.Type.VERTEX
    this.buffer = gl.createBuffer()
    if (data) { this.setData(data) }
  }

  get glBufferType() {
    if (this.type === ArrayBuffer.Type.VERTEX) {
      return this.gl.ARRAY_BUFFER
    } else {
      return this.gl.ELEMENT_ARRAY_BUFFER
    }
  }

  setData(data) {
    const gl = this.gl
    gl.bindBuffer(this.glBufferType, this.buffer)
    gl.bufferData(this.glBufferType, new Float32Array(data), gl.STATIC_DRAW)
    gl.bindBuffer(this.glBufferType, null)
  }
}

export default ArrayBuffer