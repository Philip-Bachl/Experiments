use screen::{Resolution, Screen};

pub mod screen;

fn main() {
    let mut screen = Screen::new(
        Resolution {
            width: 30,
            height: 30,
        },
        '.',
    );
    screen.draw_line((20, 20), (15, 5), '#');
    screen.print();
}
