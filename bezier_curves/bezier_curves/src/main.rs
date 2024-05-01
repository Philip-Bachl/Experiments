use crate::{
    curves::BezierCurve,
    screen::{Screen, DEFAULT_FILLED_CHAR},
};

pub mod curves;
pub mod screen;

const PRECISION: f64 = 100.0;
const ACTUAL_PRECISION: f64 = 1.0 / PRECISION;
const SCREEN_SIZE: usize = 50;

fn main() {
    let mut screen = Screen::new(SCREEN_SIZE, SCREEN_SIZE);
    let curve = BezierCurve::new([1.0, 1.0], [50.0, 1.0], [1.0, 50.0], [50.0, 50.0]);
    let mut current_pos: [f64; 2];

    let mut current_t = 0.0;

    while current_t <= 1.0 {
        current_pos = curve.get(current_t);

        if current_pos[0] < 0.0 || current_pos[1] < 0.0 {
            continue;
        }

        let x: usize = (current_pos[0] as i64).try_into().ok().unwrap();
        let y: usize = (current_pos[1] as i64).try_into().ok().unwrap();

        let result = screen.draw_flipped(x, y, DEFAULT_FILLED_CHAR);
        if let Err(err) = result {
            println!("{0}, {1}", x, y);
            println!("{}", err);
        }

        //println!("{0}, {1}", x, y);

        current_t += ACTUAL_PRECISION;
    }

    print!("{}", screen);
}
