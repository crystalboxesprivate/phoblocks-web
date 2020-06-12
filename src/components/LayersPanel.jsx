import React from 'react'
import Icon from './Icon.jsx'
import Slider from './Slider.jsx'
import Theme from './Theme.js'
import { Events } from '../core/events.js'
import { overlayLog } from './DebugOverlay.jsx'
import styled from 'styled-components'
import Scrollbar from "react-scrollbars-custom";

const Layer = ({ layer, selected, maskEditing, level }) => {
  if (typeof (level) !== 'number') {
    level = 0
  }
  const PreviewBox = ({ selected, image }) => (
    <div style={{
      width: 32, height: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: selected ? '#508CE3' : '#C4C4C4',
      borderRadius: 2,
    }}>
      <div style={{ width: selected ? 26 : 30, height: selected ? 26 : 30, backgroundColor: 'white', borderRadius: selected ? 0 : 2 }}></div>
    </div>
  )
  const clippingMask = (() => {
    if ('clippingMask' in layer) {
      return layer.clippingMask
    } else {
      return false
    }
  })()

  const isGroup = 'layers' in layer
  return (
    <div id={`layer-hierarchy-${layer.id}`} style={{
      display: 'flex',
      paddingTop: 6, paddingBottom: 6,
      alignItems: 'center',
      ...(selected ? { backgroundColor: '#353F4C' } : {})
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 16 * level }}>
        <div style={{ width: 25, display: 'flex', alignSelf: isGroup ? 'center' : 'flex-end', justifyContent: isGroup ? 'center' : 'space-between' }}>
          <div key='spacer' style={{ transform: `rotate(${layer.closed ? -90 : 0}deg)` }}>{isGroup ? <Icon name='groupTriangle' /> : ''}</div>
          {clippingMask ? (
            <div key='icon-hold' style={{ marginRight: 6 }}>
              <Icon name='clippingMask' />
            </div>) : ''}
        </div>
        <PreviewBox selected={selected && !maskEditing} />
        {layer.mask ?
          [<div key={'layerDot'} style={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: '#C4C4C4', margin: '0 3px 0 3px' }}></div>,
          <PreviewBox selected={selected && maskEditing} key={'maskPreview'} />] : ''}
      </div>
      <div style={{ ...Theme.getFont(14), color: layer.visible ? Theme.textBright0 : '#6E6E6E', marginLeft: 7, flexGrow: 4 }}>{layer.name}</div>
      <div style={{ marginRight: 6 }}>{
        layer.visible ? <Icon fill='#6B6B6B' name='eye' /> : <Icon name='eyeCrossed' />
      }</div>
    </div>)
}

const getLayers = (state, parent, level) => {
  const layers = parent.layers.map((_, idx, arr) => {
    const index = arr.length - 1 - idx
    return (<li key={`layerListItem${index}`}>
      <Layer
        layer={arr[index]}
        selected={arr[index].id == state.activeLayer}
        maskEditing={state.maskEditing}
        level={level} />
      {('layers' in arr[index] && !arr[index].closed)
        ? <LayersList state={state} container={arr[index]} level={level + 1} />
        : ''}
    </li>)
  })
  return layers
}
const LayersList = ({ state, container, level, style }) => (
  <ul style={style}>
    {getLayers(state, container, level)}
  </ul>
)


const LayersListStyled = styled.div`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  height: ${props => props.height}px;
`;

const LayersListPanel = ({ height, style, state }) => {
  return (
    <div key='layers' style={{
      height: height,
      ...style
    }}>
      <h1 style={{
        color: Theme.textBright0,
        paddingTop: 11,
        paddingLeft: 15,
        marginBottom: 9,
        ...Theme.font
      }}>Layers</h1>

      {/* <Scrollbar
        permanentTracks={false}
        mobileNative={true}
        // native={true}

        removeTrackYWhenNotUsed={true}
        disableTracksWidthCompensation style={{
          height: height - 39,
          overflowScrolling: "touch",
          WebkitOverflowScrolling: "touch",
        }}> */}
      <LayersListStyled height={height - 39}>
        <LayersList state={state} container={state.document} level={0} />

      </LayersListStyled>
      {/* </Scrollbar> */}


    </div>
  )
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

const LayerProperties = ({ layerName, style }) => (
  <div style={{
    fontFamily: Theme.fontFamily,
    color: Theme.textBright0,
    ...style
  }}>

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
      <Slider title='Opacity' defaultValue={0.5} valueDisplayfunc={x => Math.floor(x * 100) + '%'} />
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

class Draggable extends React.Component {
  constructor(props) {
    super(props)
    this.region = React.createRef()

  }
  componentDidMount() {
    document.addEventListener('mouseup', e => this.handleMouseUp(e), true)
    document.addEventListener('mousemove', e => this.handleMouseMove(e), true)
    document.addEventListener('mousedown', e => this.handleMouseDown(e), true)

    Events.addListener('touchend', e => this.handleMouseUp(e, true))
    Events.addListener('touchmove', e => this.handleMouseMove(e, true))
    Events.addListener('touchstart', e => this.handleMouseDown(e, true))

  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', e => this.handleMouseUp(e), true)
    document.removeEventListener('mousemove', e => this.handleMouseMove(e), true)
    document.removeEventListener('mousedown', e => this.handleMouseDown(e), true)

    Events.removeListener('touchend', e => this.handleMouseUp(e, true))
    Events.removeListener('touchmove', e => this.handleMouseMove(e, true))
    Events.removeListener('touchstart', e => this.handleMouseDown(e, true))
  }

  x = 0
  y = 0

  handleMouseUp(e, isTouch) {
    if (!this.isDown) {
      return
    }

    if (this.props.onDragUp != null) {
      if (isTouch) {
        e.clientX = this.x
        e.clientY = this.y
      }
      this.props.onDragUp(e)
    }
    this.isDown = false

  }


  handleMouseMove(e, isTouch) {
    if (this.props.onDragMove) {
      if (isTouch) {
        e.clientX = e.touches[0].pageX
        e.clientY = e.touches[0].pageY
        this.x = e.clientX
        this.y = e.clientY
      }
      this.props.onDragMove(e)
    }
  }


  handleMouseDown(e, isTouch) {
    if (this.props.onDragDown) {
      if (isTouch) {
        e.clientX = e.touches[0].pageX
        e.clientY = e.touches[0].pageY
        this.x = e.clientX
        this.y = e.clientY
      }

      const bounds = this.region.current.getBoundingClientRect()
      if (this.props.expand) {
        const e = this.props.expand
        bounds.y -= e[0]
        bounds.height += e[0]

        bounds.width += e[1]
        bounds.height += e[2]
        bounds.x -= e[3]
        bounds.width += e[3]
      }

      if (e.clientX >= bounds.x && e.clientX < bounds.x + bounds.width &&
        e.clientY >= bounds.y && e.clientY < bounds.y + bounds.height) {
        this.isDown = true
        this.props.onDragDown(e)
      }
    }
  }

  render() {
    return (<div ref={this.region}
      style={{ ...this.props.style }}>
      {this.props.children}
    </div>)
  }
}

class LayersPanel extends React.Component {
  constructor(props) {
    super(props)
    this.holder = React.createRef()

    this.divisor = 0.5
    this.state = { topHeight: 100, bottomHeight: 100 }
  }

  get totalHeight() {
    const holderBounds = this.holder.current.getBoundingClientRect()
    const parentBounds = this.holder.current.parentNode.getBoundingClientRect()
    return parentBounds.height - holderBounds.height
  }
  recalculate() {
    // get height of the holder
    const totalHeight = this.totalHeight
    this.setState({
      topHeight: totalHeight * this.divisor,
      bottomHeight: totalHeight * (1.0 - this.divisor)
    })
  }

  componentDidMount() {
    this.recalculate()
  }

  startY = 0
  isDown = false

  handleMouseDown(e) {
    this.isDown = true
  }

  handleMouseMove(e) {
    if (!this.isDown) {
      return
    }
    const bound = this.holder.current.parentNode.getBoundingClientRect()
    const currY01 = (e.clientY - bound.y) / bound.height
    this.divisor = currY01
    if (this.divisor < 0.005) {
      this.divisor = 0
    } else if (this.divisor > 0.92) {
      this.divisor = .92
    }
    this.recalculate()
  }

  handleMouseUp(e) {
    this.isDown = false
  }

  render() {
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
          <LayersListPanel height={this.state.topHeight} state={this.props.state} />
          <div ref={this.holder} key='holder' style={{
            backgroundColor: Theme.panelColor,
            borderTop: `1px solid ${Theme.bgColor}`,
            marginTop: -1
          }}>
            <Draggable expand={[30, 0, 30, 0]}
              onDragDown={(e) => this.handleMouseDown(e)}
              onDragMove={(e) => this.handleMouseMove(e)}
              onDragUp={(e) => this.handleMouseUp(e)}
              style={{
                paddingTop: 3,
                display: 'flex', marginTop: 0, justifyContent: 'center', width: '100%', marginBottom: 12
              }}>
              <svg width="30" height="4" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2H28" stroke="#6E6E6E" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </Draggable>
          </div>
          <LayerProperties layerName='Layer1' style={{
            backgroundColor: Theme.panelColor,
            overflow: 'hidden', height: this.state.bottomHeight
          }} />
        </div>
      </div >
    )
  }
}
export default LayersPanel