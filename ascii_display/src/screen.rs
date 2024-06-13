use core::f64;
use std::{
    char,
    ops::{Add, Mul, Sub},
};

pub struct Resolution {
    pub width: usize,
    pub height: usize,
}

pub struct Screen {
    resolution: Resolution,
    buffer: Vec<char>,
}

impl Screen {
    pub fn new(resolution: Resolution, clear: char) -> Screen {
        let width = resolution.width;
        let height = resolution.height;

        let mut buffer = Vec::with_capacity(width * height);
        buffer.fill(clear);

        Screen { resolution, buffer }
    }

    pub fn resulution(&self) -> &Resolution {
        &self.resolution
    }

    pub fn draw_fragment(&mut self, pos: (usize, usize), char: char) {
        self.buffer[pos.0 + pos.1 * self.resolution.width] = char;
    }

    /*
        start, end
        f(x) = kx + d
        k = (end.1 - start.1) / (end.0 - start.0)
        start.1 = d + start.0 * (end.1 - start.1) / (end.0 - start.0)
        d = start.1 + start.0 * (start.1 - end.1) / (end.0 - start.0)
    */

    const PRECISION_EXPONENT: u32 = 1;
    const PRECISION: u32 = 10_u32.pow(Self::PRECISION_EXPONENT);
    pub fn draw_line(&mut self, start: (usize, usize), end: (usize, usize)) {
        let delta_x: f64 = end.0 as f64 - start.0 as f64;
        let delta_y: f64 = end.1 as f64 - start.1 as f64;
        let length = delta_x.hypot(delta_y);

        for t in 0..Self::PRECISION {
            let t: f64 = t.into();
            let precision: f64 = Self::PRECISION.into();
            let t: f64 = t / precision;

            let start_f64 = (start.0 as f64, start.1 as f64);
            let end_f64 = (end.0 as f64, end.1 as f64);

            let pos = lerp_f64_pos(start_f64, end_f64, t);
            todo!()
        }

        todo!()
    }
}

fn lerp_f64(start: f64, end: f64, t: f64) -> f64 {
    start + (end - start) * t
}

fn lerp_f64_pos(start: (f64, f64), end: (f64, f64), t: f64) -> (f64, f64) {
    (lerp_f64(start.0, end.0, t), lerp_f64(start.1, end.1, t))
}
