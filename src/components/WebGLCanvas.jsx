import React from 'react'
import Graphics from '../core/gl/Graphics.js'
import { overlayLog } from './DebugOverlay.jsx'
// make full size canvas
// have event listener on resize
// reinitialize the context
// set device pixel ratio

class WebGLCanvas extends React.Component {
  constructor(props) {
    super(props)
    this._canvas = React.createRef();
  }

  get canvas() {
    return this._canvas.current
  }

  componentDidMount() {
    window.addEventListener('resize', () => { this.onResize() })
    // init webgl here
    Graphics.init(this.canvas)
    overlayLog("WebGL initialized")
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => { this.onResize() })
  }

  onResize() {
    overlayLog(`resized to ${window.innerWidth} : ${window.innerHeight}`)
    // refresh state
    this.setState({ changed: true })
    this.props.onResize()
    // also gl canvas should be updated
  }

  render() {
    return <div style={{
      position: 'fixed',
      overflow: 'hidden',
      zIndex:-1
    }}>
      <canvas ref={this._canvas} id={this.props.id}
        width={window.innerWidth * window.devicePixelRatio}
        height={window.innerHeight * window.devicePixelRatio}
        style={{
          width: window.innerWidth,
          height: window.innerHeight
        }} />
    </div>
  }
}

export default WebGLCanvas
