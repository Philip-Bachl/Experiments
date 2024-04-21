use wgpu::{
    DeviceDescriptor, Features, Instance, InstanceDescriptor, Limits, PowerPreference,
    RequestAdapterOptions, Surface, SurfaceConfiguration, TextureUsages,
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
            _ => {}
        },
        _ => {}
    });
}
