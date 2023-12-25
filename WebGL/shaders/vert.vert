precision mediump float;

attribute vec2 a_position;
uniform vec2 u_resolution;

void main() {
    vec2 zero_to_one = a_position / u_resolution;
    vec2 zero_to_two = zero_to_one * 2.0;
    vec2 final = zero_to_two - 1.0;
    vec2 final_y_flipped = final * vec2(1, -1);
    gl_Position = vec4(final_y_flipped, 0, 1);
}