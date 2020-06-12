import React from 'react'
import { overlayLog } from './DebugOverlay.jsx'
import { Events } from '../core/events.js'
import Theme from './Theme.js'

class App extends React.Component {
  constructor(props) {
    super(props)
  }


  get childComps() {
    if (!this.props.children) {
      return this.props.children
    }
    if ('map' in this.props.children) {
      return this.props.children.map(
        (x, idx) =>
          <React.Fragment key={`comp${idx}`}>
            {React.cloneElement(x, { state: this.props.state })}
          </React.Fragment>
      )
    }
    return []
  }

  render() {
    return (
      <div style={{
        backgroundColor:Theme.bgColor,
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
        onTouchStart={e => Events.invoke('touchstart', e)}
        onTouchEnd={e => Events.invoke('touchend', e)}
        onTouchMove={e => Events.invoke('touchmove', e)}
      >
        {this.childComps}</div>
    )
  }
}

export default App
