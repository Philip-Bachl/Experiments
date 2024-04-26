use std::iter;

use wgpu::{
    Color, CommandEncoderDescriptor, DeviceDescriptor, Features, Instance, InstanceDescriptor,
    Limits, LoadOp, Operations, PowerPreference, RenderPassColorAttachment, RenderPassDescriptor,
    RequestAdapterOptions, TextureViewDescriptor,
};
use winit::{
    event::*,
    event_loop::{ControlFlow, EventLoop},
    window::WindowBuilder,
};

pub fn main() {
    env_logger::init();
    let event_loop = EventLoop::new();
    let window = WindowBuilder::new().build(&event_loop).unwrap();

    let wgpu = Instance::new(InstanceDescriptor::default());
    let surface = unsafe { wgpu.create_surface(&window).unwrap() };

    let adapter = pollster::block_on(wgpu.request_adapter(&RequestAdapterOptions {
        power_preference: PowerPreference::default(),
        compatible_surface: Some(&surface),
        force_fallback_adapter: false,
    }))
    .unwrap();

    let (device, queue) = pollster::block_on(adapter.request_device(
        &DeviceDescriptor {
            label: None,
            features: Features::empty(),
            limits: Limits::default(),
        },
        None,
    ))
    .unwrap();

    let size = window.inner_size();
    let default_surface_config = surface
        .get_default_config(&adapter, size.width, size.height)
        .unwrap();
    surface.configure(&device, &default_surface_config);

    event_loop.run(move |event, _, control_flow| match event {
        Event::WindowEvent {
            ref event,
            window_id,
        } if window_id == window.id() => match event {
            WindowEvent::CloseRequested => *control_flow = ControlFlow::Exit,
            WindowEvent::Resized(new_size) => {
                let new_width: u32 = if new_size.width > 0 {
                    new_size.width
                } else {
                    1
                };
                let new_height: u32 = if new_size.height > 0 {
                    new_size.height
                } else {
                    1
                };
                surface.configure(
                    &device,
                    &surface
                        .get_default_config(&adapter, new_width, new_height)
                        .unwrap(),
                );
            }
            _ => {}
        },

        Event::RedrawRequested(_) => {
            let texture_output = surface.get_current_texture().unwrap();
            let view = texture_output
                .texture
                .create_view(&TextureViewDescriptor::default());
            let mut encoder = device.create_command_encoder(&CommandEncoderDescriptor {
                label: Some("Render Encoder"),
            });

            {
                let _render_pass = encoder.begin_render_pass(&RenderPassDescriptor {
                    label: Some("Render Pass"),
                    color_attachments: &[Some(RenderPassColorAttachment {
                        view: &view,
                        resolve_target: None,
                        ops: Operations {
                            load: LoadOp::Clear(Color {
                                r: 0.5,
                                g: 0.0,
                                b: 0.5,
                                a: 1.0,
                            }),
                            store: wgpu::StoreOp::Store,
                        },
                    })],
                    depth_stencil_attachment: None,
                    timestamp_writes: None,
                    occlusion_query_set: None,
                });
            }

            queue.submit(iter::once(encoder.finish()));
            texture_output.present();
        }
        _ => {}
    });
}
