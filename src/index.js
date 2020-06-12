import React from 'react'
import ReactDOM from 'react-dom'
import WebGLCanvas from './components/WebGLCanvas.jsx'

import { disableBodyScroll } from 'body-scroll-lock'
import { DebugOverlay,overlayLog } from './components/DebugOverlay.jsx'

import App from './components/App.jsx'
import DrawingCanvasDisplay from './components/DrawingCanvasDisplay.jsx'
import AppState from './core/application/app-state.js'
import Header from './components/Header.jsx'
import Toolbar from './components/Toolbar.jsx'
import LayersToolbar from './components/LayersToolbar.jsx'
import LayersThumbnails from './components/LayersThumbnails.jsx'
import LayersPanel from './components/LayersPanel.jsx'
import GlobalStyle from './components/GlobalStyle.jsx'

// make the canvas - render the document
ReactDOM.render(
  <App state={new AppState()}>
    <GlobalStyle />
    <DebugOverlay maxMessages={12} />
    <Header />
    <Toolbar />
    <LayersToolbar />
    <LayersThumbnails />
    {/* <LayersPanel />  */}
    <DrawingCanvasDisplay /> 
  </App>,
  document.getElementById('main')
)

