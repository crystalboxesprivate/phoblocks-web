import Shader from './Shader.js'
import SolidShape from './SolidShape.js'
import Color from './Color.js'
import { TransformStack, Transform } from './TransformStack.js'
import { vec2 } from 'gl-matrix'

import WebGLDebugUtils from 'webgl-debug'

let gl = null
let rect = new SolidShape()
let currentFbo = null

function err(msg) {
  console.error(msg)
}

class State {
  color = Color.make(1, 1, 1, 1)
}

let state = new State()
let transformStack = new TransformStack()

function getCurrentTransformStack() {
  if (currentFbo != null) {
    return currentFbo.transformStack
  }
  return transformStack
}


 function throwOnGLError(err, funcName, args) {
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
  }
 function logGLCall(functionName, args) {
    console.log("gl." + functionName + "(" +
      WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
  }
 function validateNoneOfTheArgsAreUndefined(functionName, args) {
    for (var ii = 0; ii < args.length; ++ii) {
      if (args[ii] === undefined) {
        console.error("undefined passed to gl." + functionName + "(" +
          WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
      }
    }
  }
 function logAndValidate(functionName, args) {
    logGLCall(functionName, args);
    validateNoneOfTheArgsAreUndefined(functionName, args);
  }

class Graphics {
  static init(canvas) {
    gl = canvas.getContext('webgl')
    // gl = WebGLDebugUtils.makeDebugContext(canvas.getContext('webgl'), throwOnGLError, logAndValidate)
    if (!gl) {
      console.error("The browser doesn't support webgl, quitting...")
      return
    }

    // TODO handle resolution correctly

    Graphics.setViewport()
    rect.init()
  }

  static initializeWithGL(inGl) {
    gl = inGl

    Graphics.setViewport()
    rect.init()
  }

  static get width() {
    return Graphics.resolution.width
  }

  static get height() {
    return Graphics.resolution.height
  }

  static get resolution() {
    return {
      width: currentFbo ? currentFbo.width : gl.canvas.width,
      height: currentFbo ? currentFbo.height : gl.canvas.height,
    }
  }

  static get currentFbo() {
    return currentFbo
  }

  static set currentFbo(value) {
    currentFbo = value
  }

  static get color() {
    return state.color
  }

  static setColor(...color) {
    state.color = Color.getFloat(color)
  }

  static get solidShape() {
    return rect
  }

  static drawRect(x, y, w, h, ...color) {
    rect.draw(
      rect.shapeType.rect,
      x,
      y,
      w,
      h,
      Color.getFloat(color) || state.color
    )
  }

  static drawImage(image, x, y, w, h) {
    if (!image.texture) {
      return
    }
    w = w || image.width
    h = h || image.height
    rect.draw(image, x, y, w, h)
  }

  static get circleResolution() {
    return rect.shapes.circle.resolution
  }

  static set circleResolution(value) {
    rect.SetCircleResolution(value)
  }

  static drawCircle(x, y, r, color) {
    rect.draw(
      rect.shapeType.circle,
      x,
      y,
      r,
      r,
      Color.getFloat(color) || state.color
    )
  }

  static setViewport(x, y, w, h) {
    gl.viewport(x || 0, y || 0, w || gl.canvas.width, h || gl.canvas.height)
  }

  static clearColor(...color) {
    color = Color.getFloat(color) || Color.getFloat(0)
    gl.clearColor(color.r, color.g, color.b, color.a)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Enable transparency
    // TODO move to a separate function (if it's necessary)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST)
  }

  static get gl() {
    return gl
  }

  static createShader(vtxSrc, fragSrc, errorCallback) {
    if (!errorCallback) {
      errorCallback = err
    }
    let getGlShader = function (shaderSource, shaderType) {
      if (shaderSource.endsWith('.glsl')) {
        shaderSource = require('./shaders/' + shaderSource)
      }

      const shader = gl.createShader(shaderType)
      gl.shaderSource(shader, shaderSource)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        errorCallback(
          `Compile error of ${shader}: ${gl.getShaderInfoLog(shader)}`
        )
        gl.deleteShader(shader)
        return null
      }
      return shader
    }
    let program = gl.createProgram()
    gl.attachShader(program, getGlShader(vtxSrc, gl.VERTEX_SHADER))
    gl.attachShader(program, getGlShader(fragSrc, gl.FRAGMENT_SHADER))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      errorCallback(`Link error: ${gl.getProgramInfoLog(program)}`)
    }
    return new Shader(gl, program)
  }

  static bindShader(shader) {
    gl.useProgram(shader.program)
  }

  static draw(shader, inputNames, inputLayout, offset, count, vertexBuffer, indexBuffer) {
    // bind shader
    const program = shader.program
    gl.useProgram(program)
    shader.submitUniforms()

    // attach index buffer
    if (indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer)
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer)
    for (let x = 0; x < inputNames.length; x++) {
      const name = inputNames[x]
      const desc = inputLayout[x]

      const attr = gl.getAttribLocation(program, name)
      gl.enableVertexAttribArray(attr)
      gl.vertexAttribPointer(attr, desc.size, desc.glType, desc.normalized, desc.stride, desc.offset)

    }

    const primitiveType = gl.TRIANGLES;
    if (indexBuffer) {
      const indexType = gl.UNSIGNED_SHORT;
      gl.drawElements(primitiveType, count, indexType, offset);
    } else {
      gl.drawArrays(primitiveType, offset, count)
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.useProgram(null)
  }


  static pushMatrix() {
    const ts = getCurrentTransformStack()
    ts.transforms.push(new Transform)
    ts.setDirty()
  }

  static popMatrix() {
    const ts = getCurrentTransformStack()
    ts.setDirty()
    return ts.transforms.pop()
  }

  static translate(x, y) {
    x = x || 0
    y = y || 0

    const ts = getCurrentTransformStack()
    ts.transforms[
      ts.transforms.length - 1].translate = vec2.fromValues(x, y)
    ts.setDirty()
  }

  static scale(x, y) {
    x = x || 1
    y = y || 1

    const ts = getCurrentTransformStack()

    ts.transforms[
      ts.transforms.length - 1].scale = vec2.fromValues(x, y)
    ts.setDirty()
  }

  static rotate(theta) {
    x = x || 0
    y = y || 0

    const ts = getCurrentTransformStack()

    ts.transforms[
      ts.transforms.length - 1].rotate = theta * Math.PI / 180
    ts.setDirty()
  }

  static get currentMatrix() {
    return getCurrentTransformStack().matrix
  }

}

export default Graphics
