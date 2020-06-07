import React from 'react'
import Icon from './Icon.jsx'

import Theme from './Theme'

const HeaderButton = ({ name }) => (
  <div style={{
    marginLeft: '27px',
  }}>
    <Icon name={name}></Icon>
  </div>)

const Header = ({ title }) => {
  return (
    <header style={{
      display: 'flex',
      position: 'absolute',
      width: '100%',
      height: '48px',
      backgroundColor: Theme.panelColor,
      justifyContent: 'space-between',
      alignItems: 'center',
      ...Theme.font
    }}>
      <div style={{marginLeft:'10px'}}><Icon name='home'></Icon></div>
      <div style={{ display: 'flex' }}>
        <div style={{ color: Theme.textBright, marginRight: '7px', marginTop: '3px' }}>Untitled-1</div>
        <div style={{
          width: '54px',
          height: '24px',
          fontSize: '12px',
          fontFamily: 'monospace',
          letterSpacing: '-0.05em',
          background: '#4A4A4A',
          borderRadius: '4px',
          textAlign: "center",
          verticalAlign: 'middle',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          color: Theme.textBright0
        }}><div>105%</div></div>
      </div>
      <div style={{
        display: 'flex',
        // marginTop:'5px',
        alignItems: 'center',
          paddingRight: "14px"
      }}>
        <HeaderButton name='undo' />
        <HeaderButton name='redo' />
        <HeaderButton name='cloud' />
        <HeaderButton name='share' />
        <HeaderButton name='help' />
      </div>
    </header>
  )
}

export default Header