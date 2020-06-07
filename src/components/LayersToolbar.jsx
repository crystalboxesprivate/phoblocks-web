import React from 'react'
import Icon from './Icon.jsx'
import Theme from './Theme'
import { Sidebar, ToolGroup } from './Sidebar.jsx'
import { ToolIcon, ToolSeparator } from './ToolIcon.jsx'


const LayersToolbar = () => <Sidebar alignment='right' style={{
  justifyContent: 'space-between',
  alignItems: 'center'
}} >
  <ToolGroup style={{ flexBasis: 0 }}>
    <ToolIcon isActive={true} activeColor="rgba(196, 196, 196, 0.5)" name="layers" />
    <ToolIcon name="layersParameters" />
    <ToolSeparator color={Theme.separatorColor0} />
    <ToolIcon name="parameters" />
  </ToolGroup>
  <ToolGroup style={{ margin: 'auto' }}>
    <ToolIcon name="addLayer" />
    <ToolIcon name="eye" />
    <ToolIcon name="mask" />
    <ToolIcon name="mergeDown" />
    <ToolIcon name="energy" />
    <ToolIcon name="dots" />
  </ToolGroup>
</Sidebar>
export default LayersToolbar
