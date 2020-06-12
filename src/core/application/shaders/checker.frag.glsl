precision mediump float;
varying vec2 uv;
uniform vec3 aspect;
void main(void) {
  float Size = 0.02 * aspect.y;
  vec2 tc = vec2(uv.x, uv.y/aspect.x);
  vec2 Pos = floor(tc / Size);
  float PatternMask = mod(Pos.x + mod(Pos.y, 2.0), 2.0);
  // gl_FragColor = PatternMask * vec4(1.0, 1.0, 1.0, 1.0);
  PatternMask = PatternMask < 0.0 ? 0.0 : PatternMask>1.0 ? 1.0: PatternMask;
  float m = 0.80392156862;
  gl_FragColor = mix(vec4(m,m,m,1), vec4(1), PatternMask);
}


// precision mediump float;
// varying vec2 uv;
// uniform sampler2D texture;
// uniform float alpha;
// void main(void) {
//   vec4 t = texture2D(texture, vec2(uv.x, uv.y));
//   gl_FragColor = vec4(t.xyz, alpha * t.w);
//   // gl_FragColor = vec4(1,0,0,1);

// }
