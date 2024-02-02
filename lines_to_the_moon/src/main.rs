use std::env;

use crate::screen::Screen;
use crate::screen::SCREEN_HEIGHT;
use crate::screen::SCREEN_LENGTH;
use crate::screen::SCREEN_WIDTH;

pub mod screen;

fn main() {
    env::set_var("RUST_BACKTRACE", "1");

    let args: Vec<String> = env::args().collect();

    let k: &String = args.get(1).unwrap();
    let k: f32 = k.parse().expect("Argument 0 is invalid!");

    let d: &String = args.get(2).unwrap();
    let d: f32 = d.parse().expect("Argument 1 is invalid!");

    let mut screen = Screen::new();

    //screen.draw_linear_function(1.0, 0.5, '#');
    screen.draw_linear_function(k, d, '#');
    draw_screen_data(screen.get_data());
}

fn draw_screen_data(data: &[char; SCREEN_LENGTH]) {
    println!("draw_screen_data called");
    let mut y: usize = 0;
    while y < SCREEN_HEIGHT {
        let mut x: usize = 0;
        while x < SCREEN_WIDTH {
            print!("{}", data[y * SCREEN_WIDTH + x]);
            x += 1;
        }
        println!();
        y += 1;
    }
}
