import { undoableOperationLog } from '../../components/DebugOverlay.jsx'
import {
  Layer, LayerType,
  GroupLayer,
  AdjustmentLayer
} from './layer.js'
import { Events, EventType } from '../events.js'
const DocumentUnits = {
  PIXELS: 'Pixels',
  INCHES: 'Inches',
  CENTIMETERS: 'Centimeters',
  MILLIMETERS: 'Millimeters',
  POINTS: 'Points',
}

const DocumentOrientation = {
  PORTRAIT: 'Portrait',
  LANDSCAPE: 'Landscape'
}

const ResolutionUnits = {
  PPI: 'ppi',
  PPCM: 'ppcm'
}

const DocumentContents = {
  WHITE: 'white',
  BLACK: 'black',
  TRANSPARENT: 'transparent'
}

const ColorMode = {
  RGB8: 'RGB, 8 bit'
}

class Document {
  // Creation
  name = 'Untitled-1'
  units = DocumentUnits.PIXELS
  width = 1920
  height = 1080

  // orientation
  resolution = 72
  resolutionUnits = ResolutionUnits.PPI

  // background contents
  colorMode = ColorMode.RGB8

  layers = []
  state = null

  layerCounter = 0

  layersPool = {}


  removeLayer(index) {
    if (typeof (index) !== 'number') {
      index = this.state.activeLayer
    }
    undoableOperationLog('Remove Layer ' + index)
    const targetLayer = this.layersPool[index]
    this.layersPool[index] = null
    targetLayer.parent.splice(targetLayer.parent.layers.indexOf(targetLayer), 1)
  }


  addLayer(type, parent, name,  prefix) {
    parent = parent || this
    const layer = (() => {
      switch (type) {
        case LayerType.LAYER:
          {
            prefix = prefix || 'Layer'
            return new Layer
          }
        case LayerType.GROUP:
          {
            prefix = prefix || 'Group'
            return new GroupLayer
          }
        case LayerType.ADJUSTMENT:
          {
            prefix = prefix || 'Adjustment'
            return new AdjustmentLayer
          }
        default:
          return null
      }
    })()

    if (layer) {
      layer.name = name || prefix + ' ' + (this.layerCounter + 1)
      undoableOperationLog('Add Layer ' + layer.name)

      layer.parent = parent
      this.layersPool[this.layerCounter] = layer
      layer.id = this.layerCounter
      parent.layers.push(layer)
      this.layerCounter++

      Events.invoke(EventType.LayerHierarchyChanged)

      return layer
    }
    return null
  }
}

export {
  DocumentUnits,
  DocumentOrientation,
  ResolutionUnits,
  DocumentContents,
  ColorMode,
  Document
}