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

        let mut buffer = Vec::with_capacity(width * height);
        buffer.fill(clear);

        Screen { resolution, buffer }
    }

    pub fn resulution(&self) -> &Resolution {
        &self.resolution
    }

    pub fn draw_fragment(&mut self, x: usize, y: usize, char: char) {
        self.buffer[x + y * self.resolution.width] = char;
    }

    pub fn draw_line(&mut self, start_x: usize, start_y: usize, end_x: usize, end_y: usize) {
        todo!()
    }
}
