import React, { useState } from 'react'
import Icon from './Icon.jsx'
import Theme from './Theme.js'
const Layer = ({ layerName }) => {
  return (
    <div style={{
      display: 'flex'
    }}>
      <div></div>
      <div>{layerName}</div>
      <div><Icon name='eye' /></div>
    </div>)
}

const LayersList = () => (
  <div>
    <h1>Layers</h1>
    <ul>
      <li>
        <Layer layerName="Layer1" />
      </li>
    </ul>
  </div>
)

const Holder = () => (
  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <svg width="30" height="4" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2H28" stroke="#6E6E6E" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>)

const CollapseIcon = (isClosed) => (
  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1L5.5 5L9.5 1" stroke="#B9B9B9" strokeWidth="2" strokeLinecap="round" transform={`rotate(${isClosed ? 0 : 90})`} />
  </svg>)

const PropertiesTitle = ({ title, hasToggle, isClosed }) => {
  if (typeof (hasToggle) !== 'boolean') {
    hasToggle = true
  } 
  return (
    <div>
      {hasToggle ? <CollapseIcon isClosed={isClosed} /> : ''}
      <div>{title}</div>
    </div>
  )
}

const Slider = ({ title, min, max, defaultValue, step, valueDisplayfunc }) => {
  min = min || 0
  max = max || 1
  defaultValue = defaultValue || 1
  step = step || 0.01
  valueDisplayfunc = valueDisplayfunc || (x => x)
  const [value, setValue] = useState(defaultValue)
  return (<div>
    <div>
      {title != null ? <div>{title}</div> : {}}
      <div>{value}</div>
    </div>
    <div>
      <svg width="226" height="20" viewBox="0 0 226 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10H80" stroke="#B9B9B9" strokeWidth="2" />
        <path d="M109 10H226" stroke="#4A4A4A" strokeWidth="2" />
        <circle cx="95" cy="10" r="9" stroke="#B9B9B9" strokeWidth="2" />
      </svg>
    </div>
  </div>)
}

const ButtonBody = ({ children }) => (<div>
  {children}
</div>)

const DropdownList = (title, items, selectedItem) => {
  return (<div>
    {title != null ? <div></div> : {}}
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

const Module = ({ children, title, hasToggle, isClosed }) => (
  <div>
    {title != null ? <PropertiesTitle title={title} hasToggle={hasToggle} isClosed={isClosed} /> : ''}
    {children}
  </div>
)

const LayerProperties = ({ layerName }) => (
  <div>
    <Holder />
    <Module title='Layer Properties' hasToggle={false}>
      <div style={{ display: 'flex' }}>
        <div></div>
        <div>{layerName}</div>
      </div>
    </Module>
    <Module title='Blending options'>
      <Slider title='Opacity' valueDisplayfunc={x => Math.floor(x * 100) + '%'} />
      <DropdownList title='BlendMode' selectedItem='Normal' />
    </Module>

    <Module>
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
        marginRight: '1px',
        marginTop: '1px',
        backgroundColor: Theme.panelColor,
        height: '100%'
      }}>
        <LayersList />
        <LayerProperties layerName='Layer1' />
      </div>
    </div>
  )
}

export default LayersPanel