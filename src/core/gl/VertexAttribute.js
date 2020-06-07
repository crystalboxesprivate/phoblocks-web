class VertexAttribute {
  constructor(size, glType, normalized, stride, offset) {
    this.size = size
    this.glType = glType
    this.normalized = normalized
    this.stride = stride
    this.offset = offset
  }
}
export default VertexAttribute