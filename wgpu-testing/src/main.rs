use wgpu::{Instance, InstanceDescriptor, PowerPreference, RequestAdapterOptions};
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
    }));

    /*let adapter = wgpu.request_adapter(&RequestAdapterOptions {
        power_preference: PowerPreference::default(),
        compatible_surface: Some(&surface),
        force_fallback_adapter: false,
    });*/

    event_loop.run(move |event, _, control_flow| match event {
        Event::WindowEvent {
            ref event,
            window_id,
        } if window_id == window.id() => match event {
            WindowEvent::CloseRequested => *control_flow = ControlFlow::Exit,
            _ => {}
        },
        _ => {}
    });
}
