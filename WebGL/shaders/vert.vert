precision mediump float;

uniform vec2 u_resolution;

attribute vec2 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;

void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 final = zeroToTwo - 1.0;
    vec2 finalYFlipped = final * vec2(1, -1);
    gl_Position = vec4(finalYFlipped, 0, 1);

    v_texCoord = a_texCoord;
}