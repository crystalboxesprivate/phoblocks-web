import React from 'react'
import ReactDOM from 'react-dom'
import frag from './frag.glsl'
import WebGLCanvas from './components/WebGLCanvas.jsx'

import style from './App.scss'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import { DebugOverlay } from './components/DebugOverlay.jsx'

import App from './components/App.jsx'
import DrawingCanvasDisplay from './components/DrawingCanvasDisplay.jsx'
import AppState from './core/application/app-state.js'

disableBodyScroll(document.body)

// make the canvas - render the document
ReactDOM.render(
  <App state={new AppState()}>
    <DebugOverlay maxMessages={12} />
    <DrawingCanvasDisplay />
  </App>,
  document.getElementById('main')
)
