import React from 'react'
import Theme from './Theme'

class LayersThumbnails extends React.Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        right: 19 + Theme.sidebarWidth,
        height: '100%',
      }}>
        <div style={{
          width: 80,
          minHeight: 80,
          borderRadius: 7,
          backgroundColor: '#303030',
          display: 'flex',
          flexDirection: 'column',
        }}></div>
      </div>
    )
  }
}

export default LayersThumbnails