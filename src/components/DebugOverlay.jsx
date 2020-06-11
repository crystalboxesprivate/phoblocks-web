import React from 'react'
import { Events } from '../core/events'

let formatTime = x => x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds() + ':' + x.getMilliseconds()

function resize(arr, newSize, defaultValue) {
  return [...arr, ...Array(Math.max(newSize - arr.length, 0)).fill(defaultValue)];
}

class DebugOverlay extends React.Component {
  log = []
  messages = []

  constructor(props) {
    super(props)
    this.state = { update: false }
    Events.addListener('debugoverlaylog', msg => {
      this.setState({ update: !this.state.update })
      this.log.push({ time: new Date(), msg: msg })
    })


    Events.addListener('debugoverlaymessage', msgInfo => {
      this.setState({ update: !this.state.update })
      if (msgInfo.slot >= this.messages.length) {
        resize(this.messages, msgInfo.slot + 1, '')
      }
      this.messages[msgInfo.slot] = msgInfo.msg
    })
  }

  getMessageLog() {
    let m = []


    if (this.messages.length > 0) {
      m.push(<div key={`brs`}>Status</div>)
      this.messages.forEach((x, i) => m.push(<div key={`logi_${i}`}>{`${x}`}</div>))
      m.push(<div key={`br`}><br /></div>)
    }
    for (let x = this.log.length; x >= Math.max(this.log.length - (this.props.maxMessages || 10), 0); x--) {
      if (this.log[x] == null) {
        continue
      }
      m.push(<div key={`log_${x}`}><p>{`[${formatTime(this.log[x].time)}]: ${this.log[x].msg}`}</p></div>)
    }
    return m
  }

  render() {
    return <div style={{
      fontFamily: 'monospace',
      fontSize: '8pt',
      color: 'white',
      position: 'absolute',
      background: 'rgba(0,0,0,0.8)',
      maxWidth: 400,
      top: 0,
      left: 0,
      zIndex: 99
    }}>{this.getMessageLog()}</div>
  }
}

const overlayLog = msg => Events.invoke('debugoverlaylog', msg)
const undoableOperationLog = msg => Events.invoke('debugoverlaylog', `W: Undoable operation(${msg})`)

const setOverlayMessage = (slot, msg) => {
  Events.invoke('debugoverlaymessage', { slot: slot, msg: msg })
}
export { DebugOverlay, overlayLog, setOverlayMessage, undoableOperationLog }
