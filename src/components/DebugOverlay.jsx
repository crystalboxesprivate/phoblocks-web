import React from 'react'
import Events from '../core/events'

let formatTime = x => x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds() + ':' + x.getMilliseconds()

class DebugOverlay extends React.Component {
  messages = []
  constructor(props) {
    super(props)
    this.state = { update: false }
    Events.addListener('debugoverlaymessage', msg => {
      this.setState({ update: !this.state.update })
      this.messages.push({ time: new Date(), msg: msg })
    })
  }

  getMessageLog() {
    let m = []
    for (let x = this.messages.length; x >= Math.max(this.messages.length - (this.props.maxMessages || 10), 0); x--) {
      if (this.messages[x] == null) {
        continue
      }
      m.push(<div key={`log_${x}`}><p>{`[${formatTime(this.messages[x].time)}]: ${this.messages[x].msg}`}</p></div>)
    }
    return m
  }
  render() {
    return <div style={{ fontFamily: 'monospace', fontSize: '8pt', color: 'white', position: 'absolute', background: 'rgba(0,0,0,0.8)', maxWidth: 400 }}>{this.getMessageLog()}</div>
  }
}

let overlayLog = msg => Events.invoke('debugoverlaymessage', msg)
export { DebugOverlay, overlayLog }
