use std::iter;

use state::State;

use wgpu::{
    Color, CommandEncoderDescriptor, IndexFormat, LoadOp, Operations, RenderPassColorAttachment,
    RenderPassDescriptor, TextureViewDescriptor,
};
use winit::{event::*, event_loop::ControlFlow};

mod camera;
mod state;
mod texture;
mod vertex;

pub fn main() {
    env_logger::init();

    let state = State::new();

    state
        .event_loop
        .run(move |event, _, control_flow| match event {
            Event::WindowEvent {
                ref event,
                window_id,
            } if window_id == state.window.id() => match event {
                WindowEvent::CloseRequested => *control_flow = ControlFlow::Exit,
                WindowEvent::Resized(new_size) => {
                    let new_width = new_size.width.max(1);
                    let new_height = new_size.height.max(1);

                    state.surface.configure(
                        &state.device,
                        &state
                            .surface
                            .get_default_config(&state.adapter, new_width, new_height)
                            .unwrap(),
                    );
                }
                _ => {}
            },

            Event::RedrawRequested(_) => {
                let texture_output = state.surface.get_current_texture().unwrap();
                let view = texture_output
                    .texture
                    .create_view(&TextureViewDescriptor::default());
                let mut encoder = state
                    .device
                    .create_command_encoder(&CommandEncoderDescriptor {
                        label: Some("Render Encoder"),
                    });

                {
                    let mut render_pass = encoder.begin_render_pass(&RenderPassDescriptor {
                        label: Some("Render Pass"),
                        color_attachments: &[Some(RenderPassColorAttachment {
                            view: &view,
                            resolve_target: None,
                            ops: Operations {
                                load: LoadOp::Clear(Color {
                                    r: 0.35,
                                    g: 0.5,
                                    b: 0.6,
                                    a: 1.0,
                                }),
                                store: wgpu::StoreOp::Store,
                            },
                        })],
                        depth_stencil_attachment: None,
                        timestamp_writes: None,
                        occlusion_query_set: None,
                    });

                    render_pass.set_pipeline(&state.render_pipeline);

                    render_pass.set_bind_group(0, &state.texture_bind_group, &[]);
                    render_pass.set_bind_group(1, &state.camera_bind_group, &[]);

                    render_pass.set_vertex_buffer(0, state.vertex_buffer.slice(..));
                    render_pass.set_index_buffer(state.index_buffer.slice(..), IndexFormat::Uint16);

                    render_pass.draw_indexed(0..state::INDICES.len() as u32, 0, 0..1);
                }

                state.queue.submit(iter::once(encoder.finish()));
                texture_output.present();
            }
            Event::MainEventsCleared => {
                //To continue rendering after first time
                state.window.request_redraw();
            }
            _ => {}
        });
}
