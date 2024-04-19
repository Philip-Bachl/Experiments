use std::{ops::ControlFlow, process::exit};

use winit::{
    event::{Event, WindowEvent},
    event_loop::{self, EventLoop},
    window::WindowBuilder,
};

fn main() {
    env_logger::init();
    let event_loop = EventLoop::new().unwrap();
    let window = WindowBuilder::new().build(&event_loop).unwrap();

    let result = event_loop.run(move |event, event_loop| {
        if let Event::WindowEvent {
            event: WindowEvent::CloseRequested,
            window_id,
        } = event
        {
            if window_id != window.id() {
                return;
            }
            event_loop.exit();
        }
    });

    if let Ok(_) = result {
        return;
    }

    exit(1);
}
