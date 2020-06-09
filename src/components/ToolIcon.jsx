import React from 'react'
import Icon from './Icon.jsx'
import Theme from './Theme'

const ToolIcon = ({ name, isActive, style, activeColor, hasOptions }) => {
  activeColor = activeColor || '#3571DE'
  style = style || {}
  isActive = isActive || false
  const activeStyle = isActive ? {
    backgroundColor: activeColor,
    borderRadius: '5px'
  } : {}

  return (<div style={{
    position: 'relative',
    display: 'flex',
    width: '40px',
    height: '40px',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    ...activeStyle
  }}>
    <div style={style}>
      <Icon name={name} />
    </div>
    {hasOptions ? (<div style={{ position: 'absolute', right: 4, bottom: 1 }}>
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6V0L0 6H6Z" fill="#B9B9B9" />
      </svg>
    </div>) : ''}
  </div>)
}

const ToolSeparator = ({ color }) => (<div style={{
  width: '26px', height: '0px', borderColor: color ? color : Theme.separatorColor,
  borderWidth: '1px 0 0 0', borderStyle: 'solid',
  marginTop: '4px',
  marginBottom: '4px',
}}></div>)

export { ToolIcon, ToolSeparator }
