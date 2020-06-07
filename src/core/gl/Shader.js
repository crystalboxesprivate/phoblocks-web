const UniformType = {
  FLOAT: 'float',
  VEC3: 'vec3',
  VEC4: 'vec4',
  INT: 'int',
  MAT4: 'mat4'
}

class Shader {
  constructor(gl, program) {
    this.gl = gl
    this.program = program
    this.uniforms = {}
    this.textures = {}
  }

  setTexture(id, texture) {
    this.textures[id] = texture
  }

  setFloat(id, floatVal) {
    this.uniforms[id] = [UniformType.FLOAT, floatVal]
  }

  setInt(id, intVal) {
    this.uniforms[id] = [UniformType.INT, intVal]
  }

  setVector(id, vec3) {
    this.uniforms[id] = [UniformType.VEC3, vec3]
  }

  setVector4(id, vec4) {
    this.uniforms[id] = [UniformType.VEC4, vec4]
  }

  setMatrix(id, mat4) {
    this.uniforms[id] = [UniformType.MAT4, mat4]
  }

  submitUniforms() {
    const gl = this.gl

    gl.useProgram(this.program)
    const validateId = id => {
      let newId = id
      if (typeof (id) === 'string') {
        newId = gl.getUniformLocation(this.program, id)
      }
      return newId
    }

    Object.entries(this.uniforms).map(x => {
      const id = validateId(x[0])
      const type = x[1][0]
      const value = x[1][1]


      switch (type) {
        case UniformType.FLOAT:
          gl.uniform1f(id, value)
          break;
        case UniformType.VEC3:
          gl.uniform3f(id, value[0], value[1], value[2])
          break;
        case UniformType.VEC4:
          gl.uniform4f(id, value[0], value[1], value[2], value[3])
          break;
        case UniformType.MAT4:
          gl.uniformMatrix4fv(id, false, value)
          break;
      }
    })

    Object.entries(this.textures).map((texData, index) => {
      // 0 is the id (name), 1 is webGL texture
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, texData[1]);
      gl.uniform1i(validateId(texData[0]), index);
    })
  }
}

export default Shader