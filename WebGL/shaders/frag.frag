precision mediump float;

uniform float time;
uniform vec2 iResolution;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 / iResolution.xy) - 1.0;

    float red = smoothstep(-0.5, 0.5, sin(10.0 * uv.x + time * 5.0));
    float blue = 0.0;
    //red = sin(red * 10.0 + 5.0);

    gl_FragColor = vec4(red, 0.0, blue, 1.0);
}