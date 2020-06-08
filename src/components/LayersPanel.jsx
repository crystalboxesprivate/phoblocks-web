import React, { useState } from 'react'
import Icon from './Icon.jsx'
import Theme from './Theme.js'
const Layer = ({ layerName, selected }) => {
  return (
    <div style={{
      display: 'flex',
      paddingTop: 6, paddingBottom: 6,
      alignItems: 'center',
      ...(selected ? { backgroundColor: '#353F4C' } : {})
    }}>
      <div style={{
        width: 32, height: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#508CE3',
        borderRadius: 2, marginLeft: 25
      }}>
        <div style={{ width: 26, height: 26, backgroundColor: '#C4C4C4' }}></div>
      </div>
      <div style={{ ...Theme.getFont(14), color: Theme.textBright0, marginLeft: 7, flexGrow: 4 }}>{layerName}</div>
      <div style={{ marginRight: 6 }}><Icon name='eye' /></div>
    </div>)
}

const LayersList = ({ height }) => (
  <div style={{
    height: height
  }}>
    <h1 style={{
      color: Theme.textBright0,
      paddingTop: 11,
      paddingLeft: 15,
      ...Theme.font
    }}>Layers</h1>
    <ul style={{
      marginTop: 9,

    }}>
      <li>
        <Layer layerName="Layer1" selected={true} />
      </li>
    </ul>
  </div>
)

const Holder = () => (
  <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 12 }}>
    <svg width="30" height="4" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2H28" stroke="#6E6E6E" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>)



const Slider = ({ title, min, max, defaultValue, step, valueDisplayfunc }) => {
  min = min || 0
  max = max || 1
  defaultValue = defaultValue || 1
  step = step || 0.01
  valueDisplayfunc = valueDisplayfunc || (x => x)
  const [value, setValue] = useState(defaultValue)
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg width="226" height="20" viewBox="0 0 226 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10H80" stroke="#B9B9B9" strokeWidth="2" />
        <path d="M109 10H226" stroke="#4A4A4A" strokeWidth="2" />
        <circle cx="95" cy="10" r="9" stroke="#B9B9B9" strokeWidth="2" />
      </svg>
    </div>
  </div>)
}

const ButtonBody = ({ children }) => (<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: 16,
  marginRight: 16,
  background: Theme.buttonColor,
  border: `1px solid ${Theme.separatorColor0}`,
  borderRadius: 4,
  padding: '11px 17px 11px 15px',
  // paddingTop: 8, paddingBottom: 8, paddingLeft: 15, paddingRight: 17,
  fontSize: 16
}}>
  {children}
</div >)

const DropdownList = ({ title, items, selectedItem }) => {
  return (<div style={{ marginTop: 14 }}>
    {title != null ? <div style={{ marginLeft: 15, marginBottom: 9 }}>{title}</div> : {}}
    <ButtonBody>
      <div>{selectedItem}</div>
      <div>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L4 4L7 1" stroke="#B9B9B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </ButtonBody>
  </div>)
}

const CollapseIcon = ({ isClosed }) => (
  <div style={{
    transform: `rotate(${isClosed ? -90 : 0}deg)`,
    marginRight: 8.5
  }}>
    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 1L5.5 5L9.5 1" stroke="#B9B9B9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>)

const PropertiesTitle = ({ title, hasToggle, isClosed }) => {
  if (typeof (hasToggle) !== 'boolean') { hasToggle = true }
  if (typeof (isClosed) !== 'boolean') { isClosed = false }
  let marginBottomTitle = 0
  if (hasToggle && !isClosed) {
    marginBottomTitle = 20
  }
  return (
    <div style={{ marginLeft: 15, marginBottom: marginBottomTitle, fontSize: 16, display: 'flex', alignItems: 'center' }}>
      {hasToggle ? <CollapseIcon isClosed={isClosed} /> : ''}
      <div>{title}</div>
    </div>
  )
}

const Module = ({ children, title, hasToggle, isClosed, noPaddingTop, padding, style }) => {
  padding = padding || 20
  let defaultStyle = { paddingBottom: padding }
  if (style) { defaultStyle = style }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      paddingTop: noPaddingTop ? 0 : padding,
      borderTop: noPaddingTop ? 0 : `1px solid ${Theme.bgColor}`,
      ...defaultStyle
    }}>
      {title != null ? <PropertiesTitle title={title} hasToggle={hasToggle} isClosed={isClosed} /> : ''}
      {children}
    </div>
  )
}

const LayerProperties = ({ layerName }) => (
  <div style={{
    borderTop: `1px solid ${Theme.bgColor}`,
    paddingTop: 3,
    fontFamily: Theme.fontFamily,
    color: Theme.textBright0
  }}>
    <Holder />
    <Module title='Layer Properties' hasToggle={false} noPaddingTop={true} padding={12} style={{ paddingBottom: 0 }}>
      <div style={{ display: 'flex', marginTop: 11, alignItems: 'center', marginLeft: 17, marginBottom: 12 }}>
        <div style={{
          width: 32,
          height: 32,
          background: '#FFFFFF',
          border: '1px solid #909090',
          boxSizing: 'border-box',
          borderRadius: 2,
          marginRight: 18
        }}></div>
        <div style={{ fontSize: 14 }}>{layerName}</div>
      </div>
    </Module>
    <Module title='Blending options'>
      <Slider title='Opacity' valueDisplayfunc={x => Math.floor(x * 100) + '%'} />
      <DropdownList title='BlendMode' selectedItem='Normal' />
    </Module>

    <Module padding={11}>
      <ButtonBody>
        <div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.34314 14.6569C4.79083 16.1046 6.79089 17 9 17C13.4183 17 17 13.4183 17 9C17 6.76431 16.0829 4.7428 14.6044 3.29117L14.5 3.5L14 4L3.34314 14.6569Z" fill="#C4C4C4" />
            <circle cx="9" cy="9" r="8" stroke="#C4C4C4" />
          </svg>
        </div>
        <div>Add clipped adjustment</div>
      </ButtonBody>
    </Module>
    <Module title='Effects' isClosed={true}></Module>
    <Module title='Smart Filters' isClosed={true}></Module>
  </div>
)

const LayersPanel = () => {
  return (
    <div style={{
      position: 'absolute',
      width: '256px',
      right: `${(Theme.sidebarWidth)}px`,
      top: `${Theme.headerHeight}px`,
      height: '100%',
      backgroundColor: Theme.bgColor,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: '1px',
        marginTop: '1px',
        backgroundColor: Theme.panelColor,
        height: '100%'
      }}>
        <LayersList height={250} />
        <LayerProperties layerName='Layer1' />
      </div>
    </div>
  )
}

export default LayersPanel