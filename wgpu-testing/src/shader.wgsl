struct CameraUniform {
    projection_matrix: mat4x4<f32>,
}

@group(1) @binding(0)
var<uniform> camera: CameraUniform;

struct VertexInput {
    @location(0) position: vec3<f32>,
    @location(1) tex_coords: vec2<f32>,
}

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) tex_coords: vec2<f32>,
};

@vertex
fn vs_main(model: VertexInput) -> VertexOutput {
    var out: VertexOutput;

    out.tex_coords = model.tex_coords;
    out.clip_position = camera.projection_matrix * vec4<f32>(model.position, 1.0);
    
    return out;
}

@group(0) @binding(0)
var texture: texture_2d<f32>;

@group(0) @binding(1)
var textureSampler: sampler;

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    return textureSample(texture, textureSampler, in.tex_coords);
}
