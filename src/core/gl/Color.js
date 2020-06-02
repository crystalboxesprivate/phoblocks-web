import parse from 'color-parse'

const divisor = 1 / 255.0

export class Color {
  static validate(o) {
    if (!o) {
      return null
    }
    if (Array.isArray(o) && o.length === 1) {
      o = o[0]
    }
    let objectType = typeof o
    if (objectType === 'string') {
      return Color.parse(o)
    } else if (objectType === 'object' && !Array.isArray(o)) {
      if ('r' in o && 'g' in o && 'b' in o && 'a' in o) {
        return o
      }
    } else if (objectType === 'number') {
      return Color.make(o * 255, o * 255, o * 255)
    } else if (Array.isArray(o)) {
      if (o.length > 2) {
        return Color.make(o[0], o[1], o[2], o.length > 3 ? o[3] : null)
      }
    }
    return null
  }

  static parse(str) {
    let parsed = parse(str)
    return Color.make(
      parsed.values[0],
      parsed.values[0],
      parsed.values[0],
      parsed.space === 'rgb' ? null : parsed.alpha
    )
  }

  static make(r, g, b, a) {
    if (r && !g && !b) {
      g = r
      b = r
    }
    let c = new Color()
    c.red = r | 0
    c.green = g | 0
    c.blue = b | 0

    if (a) {
      c.alpha = a
    }
    return c
  }

  __paramsConfig = {
    red: { rangeMin: 0, rangeMax: 255, step: 1 },
    green: { rangeMin: 0, rangeMax: 255, step: 1 },
    blue: { rangeMin: 0, rangeMax: 255, step: 1 },
  }

  get r() {
    return this.red
  }
  get g() {
    return this.green
  }
  get b() {
    return this.blue
  }
  get a() {
    return 'alpha' in this ? this.alpha : 1.0
  }

  set r(value) {
    this.red = value
  }
  set g(value) {
    this.green = value
  }
  set b(value) {
    this.blue = value
  }
  set a(value) {
    if (!('alpha' in this)) {
      return
    }
    this.alpha = value
  }

  static getFloat(col) {
    let c = Color.validate(col)
    if (!c) {
      return null
    }
    return {
      r: c.r * divisor,
      g: c.g * divisor,
      b: c.b * divisor,
      a: c.a,
    }
  }
}

export default Color
