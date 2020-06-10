import React from 'react'
import { overlayLog } from './DebugOverlay.jsx'
import Events from '../core/events.js'

class App extends React.Component {
  get childComps() {
    // give children the app state
    return this.props.children.map(
      (x, idx) =>
        <React.Fragment key={`comp${idx}`}>
          {React.cloneElement(x, { state: this.props.state })}
        </React.Fragment>
    )
  }
  render() {
    return (
      <div
        onTouchStart={e => Events.invoke('touchstart', e)}
        onTouchEnd={e => Events.invoke('touchend', e)}
        onTouchMove={e => Events.invoke('touchmove', e)}
      >{this.childComps}</div>
    )
  }
}

export default App
