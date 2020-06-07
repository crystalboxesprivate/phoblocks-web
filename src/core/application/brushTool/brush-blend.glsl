precision mediump float;
varying vec2 uv;
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform vec4 color;
void main(void) {
  vec4 A = texture2D(textureA, vec2(uv.x, uv.y));
  vec4 B = texture2D(textureB, vec2(uv.x, uv.y));
  float opacity = (1.0 - B.r) * color.a;
  gl_FragColor = mix(A,vec4(color.rgb, 1), opacity);
}
