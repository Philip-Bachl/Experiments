pub const NULL_CHAR: char = '.';

pub const SCREEN_WIDTH: usize = 100;
pub const SCREEN_HEIGHT: usize = 100;
pub const SCREEN_LENGTH: usize = SCREEN_WIDTH * SCREEN_HEIGHT;

pub struct Screen {
    data: [char; SCREEN_LENGTH],
}

impl Screen {
    pub fn get_data(&self) -> &[char; SCREEN_LENGTH] {
        &self.data
    }

    pub fn new() -> Screen {
        let data = [NULL_CHAR; SCREEN_LENGTH];

        Screen { data }
    }

    pub fn draw_fragment(&mut self, x: usize, y: usize, frag: char) {
        if x + y * SCREEN_WIDTH < self.data.len() {
            self.data[x + y * SCREEN_WIDTH] = frag;
        }
    }

    pub fn draw_linear_function(&mut self, k: f32, d: f32, frag: char) {
        //kx + d
        //TODO check if function is horizontal or vertical
        let mut i: usize = 0;
        while i < SCREEN_WIDTH {
            let x = i;
            let y = (i as f32) * k;

            if (y + d) < 0.0 {
                i += 1;
                continue;
            }

            self.draw_fragment(x, (y + d) as usize, frag);

            i += 1;
        }
    }
}
