import React from 'react'
import WebGLCanvas from './WebGLCanvas.jsx'
import { setOverlayMessage, overlayLog } from '../components/DebugOverlay.jsx'
import { UserInput } from '../core/user-input.js'

import { mat2d, vec2 } from 'gl-matrix'

import Graphics from '../core/gl/Graphics.js'

class DrawingCanvasDisplay extends React.Component {
  bounds = null
  mousePrevious = { x: 0, y: 0 }
  zoomIncrement = 0.01

  componentDidMount() {
    this.initSession()
    this.repaint()
  }

  initSession() {
    this.canvas.onInit()
  }

  get canvas() {
    return this.props.state.canvas
  }

  refCallback(el) {
    if (el) {
      this.bounds = el.getBoundingClientRect()
    }
  }

  repaint() {
    setOverlayMessage(0, `w: ${this.canvas.width}, h: ${this.canvas.height}`)
    setOverlayMessage(1, `posx: ${this.canvas.position.x}, posy: ${this.canvas.position.y} zoom: ${this.canvas.zoom}`)
    Graphics.setViewport()
    Graphics.clearColor([128, 128, 128, 1.0])

    this.canvas.framebuffer.draw(this.canvas.position.x, this.canvas.position.y,
      this.canvas.width * this.canvas.zoom, this.canvas.height * this.canvas.zoom)
  }

  getAbsoluteMouseCoords(e) {
    var bounds = this.bounds
    let x = e.clientX
    let y = e.clientY

    if (event.touches && event.touches.length) {
      x = 0
      y = 0

      for (let t of event.touches) {
        x += t.pageX
        y += t.pageY
      }

      x /= event.touches.length
      y /= event.touches.length
    }

    return [
      (x - bounds.left) * window.devicePixelRatio,
      (y - bounds.top) * window.devicePixelRatio
    ]
  }

  getCanvasXformMatrix() {
    const transform = mat2d.identity(mat2d.create())
    mat2d.translate(transform, transform, [this.canvas.position.x, this.canvas.position.y])
    mat2d.scale(transform, transform, [this.canvas.zoom, this.canvas.zoom])
    return transform
  }

  canvasToViewport(x, y) {
    let transform = this.getCanvasXformMatrix()
    let v2 = vec2.create()
    vec2.transformMat2d(v2, [x, y], transform)
    return { x: v2[0], y: v2[1] }
  }

  viewportToCanvas(x, y) {
    let transform = this.getCanvasXformMatrix()
    mat2d.invert(transform, transform)
    let v2 = vec2.create()
    vec2.transformMat2d(v2, [x, y], transform)
    return { x: v2[0], y: v2[1] }
  }

  isZooming = false
  zoomPos = null

  origin = { x: 0, y: 0 }

  touchStart = { x: 0, y: 0 }
  canvasPosTouchStart = { x: 0, y: 0 }

  touchZoomStart = 1

  handleTouchStart(e) {
    let [x, y] = this.getAbsoluteMouseCoords(e)
    this.touchStart = { x: x, y: y }
    this.canvasPosTouchStart = { x: this.canvas.position.x, y: this.canvas.position.y }
    overlayLog(`touch start ${event.touches.length} ${this.touchStart.x} ${this.touchStart.y}`)
  }

  updateZoom(newScale, zoomPos) {
    const rel = this.viewportToCanvas(zoomPos.x, zoomPos.y)
    this.canvas.zoom = newScale
    const relZoomed = this.viewportToCanvas(zoomPos.x, zoomPos.y)
    this.canvas.position.x += (relZoomed.x - rel.x) * this.canvas.zoom
    this.canvas.position.y += (relZoomed.y - rel.y) * this.canvas.zoom
  }



  updateZoom2(newScale, zoomPos) {
    const rel = this.viewportToCanvas(zoomPos.x, zoomPos.y)
    this.canvas.zoom = newScale
    const relZoomed = this.viewportToCanvas(zoomPos.x, zoomPos.y)
    this.canvasPosTouchStart.x += (relZoomed.x - rel.x) * this.canvas.zoom
    this.canvasPosTouchStart.y += (relZoomed.y - rel.y) * this.canvas.zoom
  }

  handleTouchMove(e) {
    let [x, y] = this.getAbsoluteMouseCoords(e)

    if (e.touches.length > 1) {
      if (UserInput.gesture.active) {
        if (!this.isZooming) {
          this.isZooming = true;
          this.zoomPos = { x: x, y: y }
          this.touchZoomStart = this.canvas.zoom
        }
        this.updateZoom2(this.touchZoomStart * UserInput.gesture.scale, this.touchStart)
      }
      this.canvas.position = {
        x: this.canvasPosTouchStart.x + (x - this.touchStart.x),
        y: this.canvasPosTouchStart.y + (y - this.touchStart.y)
      }
      this.repaint()
      this.invalidateTool()
    } else {
      this.touchZoomStart = this.canvas.zoom
      this.isZooming = false;
      this.paintTool(x, y)
      this.repaint()
    }
  }

  get tool() {
    return this.props.state.currentTool
  }

  invalidateTool() {
    if (this.tool.isBeingUsed) {
      this.tool.onToolEnd()
    }
    this.tool.isBeingUsed = false
  }

  paintTool(x, y) {
    const rel = this.viewportToCanvas(x, y)
    if(!this.tool.isBeingUsed) {
      this.tool.isBeingUsed = true
      this.tool.onToolBegin(rel.x, rel.y)
      return
    } else {
      this.tool.toolCallback(rel.x, rel.y)
    }
  }

  handleMouseMove(e) {
    let [x, y] = this.getAbsoluteMouseCoords(e)
    let p = this.mousePrevious
    this.mousePrevious = { x: x, y: y }

    const u = UserInput

    if (u.mouse.left === 1) {
      if (u.modifiers.Space === 1) {
        let delta = { x: x - p.x, y: y - p.y }
        if (u.modifiers.ControlLeft === 1) {
          if (!this.isZooming) {
            this.isZooming = true;
            this.zoomPos = { x: x, y: y }
          }
          var zoom = Math.exp(-delta.y * this.zoomIncrement);
          this.updateZoom(this.canvas.zoom * zoom, this.zoomPos)
          this.repaint()
        } else {
          this.canvas.position = {
            x: this.canvas.position.x + delta.x,
            y: this.canvas.position.y + delta.y,
          }
          this.repaint()
        }
      } else {
        // painting
        this.paintTool(x, y)
        // overlayLog('painting')
        this.repaint()

        // An early return so 
        // current tool is not invalidated
        return
      }
    } else {
      this.isZooming = false;
    }

    this.invalidateTool()

  }

  render() {
    return <div ref={(el) => this.refCallback(el)}
      onTouchStart={e => this.handleTouchStart(e)}
      onTouchMove={(e) => this.handleTouchMove(e)}
      onTouchCancel={(e) => overlayLog("cancel fired")}
      onTouchEnd={(e) => overlayLog("touch end")}
      onMouseMove={(e) => this.handleMouseMove(e)}><WebGLCanvas onResize={() => this.repaint()} /></div>
  }
}

export default DrawingCanvasDisplay