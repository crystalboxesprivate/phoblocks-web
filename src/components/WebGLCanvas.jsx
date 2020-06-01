import React from 'react'
import GraphicsContext from '../core/graphics/graphics-context.js'
import { overlayLog } from './DebugOverlay.jsx'
// make full size canvas
// have event listener on resize
// reinitialize the context
// set device pixel ratio

class WebGLCanvas extends React.Component {
  constructor(props) {
    super(props)
    this._canvas = React.createRef();
    this.context = null
  }

  get canvas() {
    return this._canvas.current
  }

  componentDidMount() {
    window.addEventListener('resize', () => { this.onResize() })
    // init webgl here
    overlayLog('initializing webgl')
    this.context = new GraphicsContext()
    this.context.gl = this.canvas.getContext('webgl')
    this.context.presetup()
    overlayLog("WebGL initialized")
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => { this.onResize() })
  }

  onResize() {
    overlayLog(`resized to ${window.innerWidth} : ${window.innerHeight}`)
    // refresh state
    this.setState({ changed: true })
    // also gl canvas should be updated
  }

  render() {
    return <canvas ref={this._canvas} id={this.props.id}
      width={window.innerWidth * window.devicePixelRatio}
      height={window.innerHeight * window.devicePixelRatio}
      style={{
        width: window.innerWidth,
        height: window.innerHeight
      }} />
  }
}

export default WebGLCanvas
