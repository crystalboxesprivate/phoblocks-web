import React from 'react'
import Theme from './Theme'

const Sidebar = ({ children, alignment, style }) => {
  const align = alignment === 'right' ? { right: 0 } : {}
  style = style || {}

  return <div style={{
    backgroundColor: Theme.bgColor,
    top: Theme.headerHeight,
    display: 'flex ',
    position: 'absolute',
    height: '100%',
    ...align
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: Theme.sidebarWidth,
      height: '100%',
      position: 'relative',
      marginTop: '1px',
      paddingTop: '8px',
      backgroundColor: Theme.panelColor,
      ...style
    }}>
      {children}
    </div></div>
}

const ToolGroup = ({ children, style }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      ...style
    }}>
      {children}
    </div>
  )
}

export { Sidebar, ToolGroup }