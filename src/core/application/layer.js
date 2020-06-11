const LayerType = {
  LAYER: 'Layer',
  ADJUSTMENT: 'Adjustment',
  GROUP: 'Group'
}

const BlendMode = {
  NORMAL: 'Normal',
  PASSTHROUGH: 'Passthrough'
}

class LayerMask {
  enabled = true
  transformLock = true
}

class LayerBase {
  id = -1
  name = 'Layer'
  visible = true
  type = LayerType.LAYER
  locked = false
  mask = null

  parent = null

  opacity = 1
  blendMode = BlendMode.NORMAL
}


class AdjustmentLayer extends LayerBase {
  clippingMask = false
  adjustment = null
}

class Layer extends LayerBase {
  clippingMask = false
  dimensions = [0, 0, 0, 0]
}

class GroupLayer extends LayerBase {
  constructor() {
    super()
    this.blendMode = BlendMode.PASSTHROUGH
  }
  layers = []
  closed = false
}


export { LayerType, Layer, GroupLayer, AdjustmentLayer, LayerMask }