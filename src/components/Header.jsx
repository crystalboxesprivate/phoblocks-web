import React from 'react'
import Icon from './Icon.jsx'
import Theme from './Theme'

const HeaderButton = ({ name }) => (
  <div style={{
    marginLeft: '27px',
  }}>
    <Icon name={name}></Icon>
  </div>)

const DocTitle = ({ title, scale }) => (<div style={{
  display: 'flex',
}}>
  <div style={{ color: Theme.textBright, marginRight: '7px', marginTop: '3px' }}>{title}</div>
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
  }}><div>{`${Math.floor(scale * 100)}%`}</div></div>
</div>)

const headerStyle = {
  display: 'flex',
  position: 'absolute',
  width: '100%',
  height: Theme.headerHeight,
  alignItems: 'center',
  ...Theme.font
}

const Header = ({ title }) => {
  return (
    <header>
      <div style={{
        justifyContent: 'space-between',
        backgroundColor: Theme.panelColor, ...headerStyle
      }}>
        <div style={{
          marginLeft: '15px',
        }}><Icon name='home'></Icon></div>
        <div style={{
          display: 'flex',
          justifySelf: 'flex-end',
          alignItems: 'center',
          paddingRight: "14px"
        }}>
          <HeaderButton name='undo' />
          <HeaderButton name='redo' />
          <HeaderButton name='cloud' />
          <HeaderButton name='share' />
          <HeaderButton name='help' />
        </div>
      </div>
      <div style={{...headerStyle, justifyContent:'center'}}>
        <DocTitle title='Untitled-1' scale={1.05} />
      </div>
    </header >
  )
}

export default Header