use std::{
    char,
    error::Error,
    fmt::{Display, Write},
};

pub const DEFAULT_EMPTY_CHAR: char = '.';
pub const DEFAULT_FILLED_CHAR: char = '#';

#[derive(Debug)]
pub struct ScreenError {
    msg: String,
}

impl ScreenError {
    pub fn get_smg(&self) -> &String {
        &self.msg
    }

    pub fn buffer_index_out_of_bounds() -> ScreenError {
        ScreenError {
            msg: String::from("Buffer Index was out of bounds!"),
        }
    }

    pub fn position_out_of_bounds() -> ScreenError {
        ScreenError {
            msg: String::from("The Pixel Position was out of Bounds!"),
        }
    }
}

impl Display for ScreenError {
    fn fmt(&self, formatter: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        formatter.write_str(&self.msg)?;
        Ok(())
    }
}

impl Error for ScreenError {}

#[derive(Debug)]
pub struct Screen {
    width: usize,
    height: usize,
    buffer: Vec<char>,
}

impl Screen {
    pub fn new(width: usize, height: usize) -> Screen {
        Screen {
            width,
            height,
            buffer: vec![DEFAULT_EMPTY_CHAR; width * height],
        }
    }

    pub fn clear(&mut self) {
        self.buffer.fill(DEFAULT_EMPTY_CHAR);
    }

    fn draw(&mut self, x: usize, y: usize, symbol: char) -> Result<(), ScreenError> {
        let index = y * self.width + x;

        if index >= self.buffer.len() {
            return Err(ScreenError::buffer_index_out_of_bounds());
        }

        self.buffer[index] = symbol;
        Ok(())
    }

    pub fn draw_flipped(&mut self, x: usize, y: usize, symbol: char) -> Result<(), ScreenError> {
        if x > self.width || y > self.width {
            return Err(ScreenError::position_out_of_bounds());
        }

        self.draw(x, self.width - y, symbol)?;
        Ok(())
    }

    pub fn get_size(&self) -> (usize, usize) {
        (self.width, self.height)
    }
}

impl Display for Screen {
    fn fmt(&self, formatter: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for (i, c) in self.buffer.iter().enumerate() {
            if i % self.width == 0 {
                formatter.write_char('\n')?;
            }

            formatter.write_char(*c)?;
        }
        Ok(())
    }
}
