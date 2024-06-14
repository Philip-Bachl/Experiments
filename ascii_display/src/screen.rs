use core::f64;
use std::char;

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

        let buffer = vec![clear; width * height];

        Screen { resolution, buffer }
    }

    pub fn resulution(&self) -> &Resolution {
        &self.resolution
    }

    pub fn print(&self) {
        for (i, c) in (&self.buffer).into_iter().enumerate() {
            print!("{}", c);
            if (i + 1) % self.resolution.width == 0 {
                println!();
            }
        }
    }

    pub fn draw_fragment(&mut self, pos: (usize, usize), char: char) {
        let index = pos.0 + pos.1 * self.resolution.width;
        if index > self.buffer.len() {
            return;
        }
        self.buffer[index] = char;
    }

    /*
        start, end
        f(x) = kx + d
        k = (end.1 - start.1) / (end.0 - start.0)
        start.1 = d + start.0 * (end.1 - start.1) / (end.0 - start.0)
        d = start.1 + start.0 * (start.1 - end.1) / (end.0 - start.0)
    */

    pub fn draw_line(&mut self, start: (usize, usize), end: (usize, usize), char: char) {
        let delta_x = end.0 as f64 - start.0 as f64;
        let delta_y = end.1 as f64 - start.1 as f64;

        if delta_x == 0.0 {
            self.draw_vertical_line(end.0, start.1, end.1, char);
            return;
        }

        if delta_y == 0.0 {
            self.draw_horizontal_line(end.1, start.0, end.0, char);
            return;
        }

        let k = delta_y / delta_x;
        let d = start.1 as f64 - start.0 as f64 * k;

        for x in start.0.min(end.0)..end.0.max(start.0) {
            let y = k * x as f64 + d;
            let y = y.round().max(0.0) as usize;
            self.draw_fragment((x, y), char);
        }

        for y in start.1.min(end.1)..end.1.max(start.1) {
            let x = (y as f64 - d) / k;
            let x = x.round().max(0.0) as usize;
            self.draw_fragment((x, y), char);
        }
    }

    fn draw_vertical_line(&mut self, x: usize, y1: usize, y2: usize, char: char) {
        let range = if y1 <= y2 { y1..y2 } else { y2..y1 };

        for y in range {
            self.draw_fragment((x, y), char);
        }
    }

    fn draw_horizontal_line(&mut self, y: usize, x1: usize, x2: usize, char: char) {
        let range = if x1 <= x2 { x1..x2 } else { x2..x1 };

        for x in range {
            self.draw_fragment((x, y), char);
        }
    }
}
