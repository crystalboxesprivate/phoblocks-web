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

disableBodyScroll(document.body)

// make the canvas - render the document
console.log(DebugOverlay)
ReactDOM.render(
  <div>
    <DebugOverlay maxMessages={12} />
    <WebGLCanvas />
  </div>,
  document.getElementById('main')
)
