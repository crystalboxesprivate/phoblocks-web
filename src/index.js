import React from 'react'
import ReactDOM from 'react-dom'
import frag from './frag.glsl'
import WebGLCanvas from './components/WebGLCanvas.jsx'

import {
  disableBodyScroll,
} from 'body-scroll-lock'
import { DebugOverlay } from './components/DebugOverlay.jsx'

import App from './components/App.jsx'
import DrawingCanvasDisplay from './components/DrawingCanvasDisplay.jsx'
import AppState from './core/application/app-state.js'
import Header from './components/Header.jsx'
import Toolbar from './components/Toolbar.jsx'
import LayersToolbar from './components/LayersToolbar.jsx'
import LayersPanel from './components/LayersPanel.jsx'
import GlobalStyle from './components/GlobalStyle.jsx'

disableBodyScroll(document.body)

// make the canvas - render the document
ReactDOM.render(
  <App state={new AppState()}>
    <GlobalStyle />
    <DebugOverlay maxMessages={12} />
    <Header />
    <Toolbar />
    <LayersToolbar />
    <DrawingCanvasDisplay />
    <LayersPanel />
  </App>,
  document.getElementById('main')
)
