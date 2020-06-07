import React from 'react'
import Theme from './Theme'
import { ToolIcon, ToolSeparator } from './ToolIcon.jsx'
import { Sidebar, ToolGroup } from './Sidebar.jsx'

// margin top 15px
const ColorSelector = ({ backgroundColor, foregroundColor, isBackgroundActive }) => {
  console.log(backgroundColor)
  const highlightedColor = '#427EE3'
  const strokeColor = '#5A5A5A'

  const getStrokeProps = (active) =>
    active ? {
      r: 14, stroke: highlightedColor, strokeWidth: 2
    } : {
        r: 14.5, stroke: strokeColor
      }
  const TopColorSwatch = () => (<g>
    <circle cx="15" cy="15" r="15" fill={Theme.panelColor} />
    <circle cx="15" cy="15" r="11" fill={foregroundColor} />
    {React.createElement('circle', { cx: 15, cy: 15, ...getStrokeProps(!isBackgroundActive) })}
  </g>)

  const BottomColorSwatch = () => (<g>
    <circle cx="15" cy="33" r="15" fill={Theme.panelColor} />
    <circle cx="15" cy="33" r="11" fill={backgroundColor} />
    {React.createElement('circle', { cx: 15, cy: 33, ...getStrokeProps(isBackgroundActive) })}
  </g>)

  return (<div style={{
    marginTop: '4px'
  }}>
    <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {isBackgroundActive ? (<TopColorSwatch />) : (<BottomColorSwatch />)}
      {isBackgroundActive ? (<BottomColorSwatch />) : (<TopColorSwatch />)}
    </svg>
  </div>)
}

const Toolbar = () => <Sidebar>
  <ToolGroup>
    <ToolIcon style={{ margin: '3px 0 0 2px' }} isActive={true} name='selectTool' />
    <ToolIcon name='transformTool' />
    <ToolIcon name='lassoTool' />
    <ToolIcon name='brushTool' />
    <ToolIcon name='eraserTool' />
    <ToolIcon name='paintBucketTool' />
    <ToolIcon name='patchTool' />
    <ToolIcon name='cropTool' />
    <ToolSeparator />
    <ToolIcon name='textTool' />
    <ToolIcon name='pictureTool' />
    <ToolSeparator />
    <ToolIcon name='eyeDropper' />
    <ColorSelector backgroundColor='#FFFFFF' foregroundColor='#000' isBackgroundActive={false} />
  </ToolGroup>
</Sidebar>

export default Toolbar