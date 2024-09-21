use wgpu::{
    util::{BufferInitDescriptor, DeviceExt},
    Adapter, BlendState, Buffer, BufferUsages, ColorTargetState, ColorWrites, Device,
    DeviceDescriptor, Face, Features, FragmentState, FrontFace, Instance, InstanceDescriptor,
    Limits, MultisampleState, PolygonMode, PowerPreference, PrimitiveState, PrimitiveTopology,
    Queue, RenderPipeline, RenderPipelineDescriptor, RequestAdapterOptions, ShaderModule, Surface,
    SurfaceConfiguration, VertexState,
};
use winit::{
    dpi::PhysicalSize,
    event_loop::EventLoop,
    window::{Window, WindowBuilder},
};

use crate::vertex::Vertex;

pub const VERTICES: &[Vertex] = &[
    Vertex {
        position: [-0.0868241, 0.49240386, 0.0],
        color: [0.5, 0.0, 0.5],
    }, // A
    Vertex {
        position: [-0.49513406, 0.06958647, 0.0],
        color: [0.5, 0.0, 0.5],
    }, // B
    Vertex {
        position: [-0.21918549, -0.44939706, 0.0],
        color: [0.5, 0.0, 0.5],
    }, // C
    Vertex {
        position: [0.35966998, -0.3473291, 0.0],
        color: [0.5, 0.0, 0.5],
    }, // D
    Vertex {
        position: [0.44147372, 0.2347359, 0.0],
        color: [0.5, 0.0, 0.5],
    }, // E
];

pub const INDICES: &[u16] = &[0, 1, 4, 1, 2, 4, 2, 3, 4];

#[allow(dead_code)]
pub struct State {
    pub event_loop: EventLoop<()>,
    pub window: Window,

    pub wgpu: Instance,
    pub surface: Surface,

    pub adapter: Adapter,
    pub device: Device,
    pub queue: Queue,

    pub size: PhysicalSize<u32>,
    pub default_surface_config: SurfaceConfiguration,

    pub shader: ShaderModule,
    pub render_pipeline: RenderPipeline,

    pub vertex_buffer: Buffer,
    pub index_buffer: Buffer,
}

impl State {
    pub fn new() -> State {
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

        let shader = device.create_shader_module(wgpu::include_wgsl!("shader.wgsl"));
        let render_pipeline_layout =
            device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
                label: Some("Render Pipeline Layout"),
                bind_group_layouts: &[],
                push_constant_ranges: &[],
            });

        let render_pipeline = device.create_render_pipeline(&RenderPipelineDescriptor {
            label: Some("Render Pipeline"),
            layout: Some(&render_pipeline_layout),
            vertex: VertexState {
                module: &shader,
                entry_point: "vs_main",
                buffers: &[Vertex::desc()],
            },
            fragment: Some(FragmentState {
                module: &shader,
                entry_point: "fs_main",
                targets: &[Some(ColorTargetState {
                    format: default_surface_config.format,
                    blend: Some(BlendState::REPLACE),
                    write_mask: ColorWrites::ALL,
                })],
            }),
            primitive: PrimitiveState {
                topology: PrimitiveTopology::TriangleList,
                strip_index_format: None,
                front_face: FrontFace::Ccw,
                cull_mode: Some(Face::Back),
                unclipped_depth: false,
                polygon_mode: PolygonMode::Fill,
                conservative: false,
            },
            depth_stencil: None,
            multisample: MultisampleState {
                count: 1,
                mask: !0,
                alpha_to_coverage_enabled: false,
            },
            multiview: None,
        });

        let vertex_buffer = device.create_buffer_init(&BufferInitDescriptor {
            label: Some("Vertex Buffer"),
            contents: bytemuck::cast_slice(VERTICES),
            usage: BufferUsages::VERTEX,
        });

        let index_buffer = device.create_buffer_init(&BufferInitDescriptor {
            label: Some("Index Buffer"),
            contents: bytemuck::cast_slice(INDICES),
            usage: BufferUsages::INDEX,
        });

        State {
            event_loop,
            window,

            wgpu,
            surface,

            adapter,
            device,
            queue,

            size,
            default_surface_config,

            shader,
            render_pipeline,

            vertex_buffer,
            index_buffer,
        }
    }
}
