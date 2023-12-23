precision mediump float;

uniform float time;

void main() {
    gl_FragColor = vec4(sin(time) + 0.5, sin(time + 90.0) + 0.5, sin(time + 180.0) + 0.5, 0.5);
}