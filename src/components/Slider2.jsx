
import React from 'react'
import { overlayLog } from './DebugOverlay.jsx'
import { UserInput } from '../core/user-input.js'


class Slider2 extends React.Component {
  constructor(props) {
    super(props)

    this.sliderContainer = React.createRef();

    this.title = props.title
    this.min = props.min || 0
    this.max = props.max || 1
    this.defaultValue = props.defaultValue || 1
    this.step = props.step || 0.01
    this.valueDisplayfunc = props.valueDisplayfunc || (x => x)

    this.state = { value: this.defaultValue, width: 0 }
  }

  isDown = false

  handleMouseDown(e) {
    // console.log('down' + UserInput.mouse.left)
    this.isDown = true
  }

  handleMouseUp(e) {
    this.isDown = false
  }

  handleMouseMove(e, isTouch) {
    const clientX = isTouch ? e.touches[0].pageX : e.clientX
    const clientY = isTouch ? e.touches[0].pageY : e.clientY

    const bounds = this.sliderContainer.current.getBoundingClientRect()
    const [x, y] = [
      (clientX - bounds.left) * window.devicePixelRatio,
      (clientY - bounds.top) * window.devicePixelRatio,
    ]
    let posX01 = x / (bounds.width * window.devicePixelRatio)
    posX01 = posX01 < 0 ? 0 : posX01 > 1 ? 1 : posX01

    if (this.isDown) {
      this.value = (posX01 * (this.max - this.min)) + this.min
    }

  }

  componentDidMount() {
    document.addEventListener('mouseup', e => this.handleMouseUp(e), true)
    document.addEventListener('touchend', e => this.handleMouseUp(e), true)
    document.addEventListener('mousemove', e => this.handleMouseMove(e), true)
    document.addEventListener('touchmove', e => this.handleMouseMove(e, true), false)
    this.sliderWidth = this.sliderContainer.current.getBoundingClientRect().width
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', e => this.handleMouseUp(e), true)
    document.removeEventListener('mousemove', e => this.handleMouseMove(e), true)
    document.removeEventListener('touchend', e => this.handleMouseUp(e), true)
    document.removeEventListener('touchmove', e => this.handleMouseMove(e, true), false)
  }

  get value() {
    return this.state.value
  }

  get sliderWidth() {
    return this.state.width
  }

  set sliderWidth(value) {
    this.state.width = value
    this.setState(this.state)
  }

  set value(value) {
    this.state.value = value
    this.setState(this.state)
  }

  get percents() {
    return (this.value / this.max - this.min) * 100
  }

  render() {

    const circleRadius = 9
    const circleMargin = 4

    const boundMin = circleRadius + 1
    const boundMax = this.sliderWidth - circleRadius - 1

    let circlePos = this.sliderWidth * 0.01 * this.percents
    circlePos = circlePos < boundMin ? boundMin : circlePos > boundMax ? boundMax : circlePos;


    return (
      <div onMouseDown={e => this.handleMouseDown(e)} onTouchStart={e => this.handleMouseDown(e)}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: 15,
          marginRight: 13,
          marginBottom: 5
        }} ref={this.sliderContainer}
        >
          {this.title != null ? <div>{this.title}</div> : {}}
          <div>{this.valueDisplayfunc(this.value)}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg width={this.sliderWidth} height="20" viewBox={`0 0 ${this.sliderWidth} 20`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={`M0 10H${circlePos - circleMargin - circleRadius}`} stroke="#B9B9B9" strokeWidth="2" />
            <path d={`M${circlePos + circleRadius + circleMargin} 10H${this.sliderWidth}`} stroke="#4A4A4A" strokeWidth="2" />
            <circle cx={circlePos} cy="10" r={circleRadius} stroke="#B9B9B9" strokeWidth="2" />
          </svg>
        </div>
      </div>
    )
  }
}

export default Slider2