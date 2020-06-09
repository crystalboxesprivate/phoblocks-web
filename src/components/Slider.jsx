import React, { useState, useEffect, useRef } from 'react'
import { overlayLog } from './DebugOverlay.jsx'
import Theme from './Theme'

import { Range, getTrackBackground } from 'react-range';
import { cpus } from 'os';



class SuperSimple extends React.Component {
  state = { values: [50] };
  render() {
    return (
      <Range
        step={0.1}
        min={0}
        max={100}
        values={this.state.values}
        onChange={values => this.setState({ values })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '2px',
              width: '100%',
              backgroundImage: getTrackBackground({
                values: this.state.values,
                colors: ["#B9B9B9", "#4A4A4A"],
                min: 0,
                max: 100
              })
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div key='d' style={{

            ...props.style,
            display: 'flex'
          }}>
            <div style={{ width: 4, backgroundColor: Theme.panelColor }} key='a'></div>
            <div key='b'
              {...props}
              style={{

                width: 20, height: 20,
                border: '2px solid #B9B9B9',
                boxSizing: 'border-box',
                borderRadius: '50%',
                outline: 'none',
                backgroundColor: Theme.panelColor

                // height: '42px',
                // width: '42px',
                // backgroundColor: '#999'
              }}
            />
            <div key='c' style={{ width: 4, backgroundColor: Theme.panelColor }}></div>
          </div>
        )}
      />
    );
  }
}


const Slider2 = ({ title, min, max, defaultValue, step, valueDisplayfunc }) => {
  // parameters
  min = min || 0
  max = max || 1
  defaultValue = defaultValue || 1
  step = step || 0.01
  valueDisplayfunc = valueDisplayfunc || (x => x)
  const getPercent = () => (value / max - min) * 100

  // state functions
  const [value, setValue] = useState(defaultValue)
  const sliderEl = useRef(null)
  const [isDown, setIsDown] = useState(false)
  let isDownIm = false


  const handleMouseUp = (e) => {
    if (isDownIm) {
      overlayLog('up')
      isDownIm = false
      setIsDown(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp, true);
    };
  });
  return (<div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: 15,
      marginRight: 13,
      marginBottom: 5
    }}>
      {title != null ? <div>{title}</div> : {}}
      <div>{valueDisplayfunc(value)}</div>
    </div>
    <div ref={sliderEl} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginLeft: 15,
      marginRight: 13,
    }}>
      <div style={{ borderTop: '2px solid #B9B9B9', height: 0, width: `${getPercent()}%`, flexGrow: 1 }}></div>
      <div style={{ width: 4, flexShrink: 1 }}></div>
      <div
        onMouseDown={() => { overlayLog("down"); setIsDown(true); isDownIm = true }}
        style={{
          width: 20, height: 20,
          border: '2px solid #B9B9B9',
          boxSizing: 'border-box',
          borderRadius: '50%'
        }}></div>
      <div style={{ width: 4, flexShrink: 1 }}></div>
      <div style={{ borderTop: '2px solid #4A4A4A', height: 0, width: `${100 - getPercent()}%`, flexGrow: 1 }}></div>
    </div>
    {/*  */}
  </div>)
}

const Slider = ({ title, min, max, defaultValue, step, valueDisplayfunc }) => {
  return <div style={{ display: 'flex', marginLeft: 10, marginRight: 10 }}><SuperSimple /></div>
}

export default Slider