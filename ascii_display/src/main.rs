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
    screen.draw_line((18, 0), (24, 30), '#');
    screen.print();
}
