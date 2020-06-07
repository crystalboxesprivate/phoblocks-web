import React from 'react'
import Icon from './Icon.jsx'
import Theme from './Theme'

const ToolIcon = ({ name, isActive, style, activeColor }) => {
  activeColor = activeColor || '#3571DE'
  style = style || {}
  isActive = isActive || false
  const activeStyle = isActive ? {
    backgroundColor: activeColor,
    borderRadius: '5px'
  } : {}

  return (<div style={{
    display: 'flex',
    width: '40px',
    height: '40px',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    ...activeStyle
  }}><div style={style}><Icon name={name} /></div></div>)
}

const ToolSeparator = ({ color }) => (<div style={{
  width: '26px', height: '0px', borderColor: color ? color : Theme.separatorColor,
  borderWidth: '1px 0 0 0', borderStyle: 'solid',
  marginTop: '4px',
  marginBottom: '4px',
}}></div>)

export { ToolIcon, ToolSeparator }
