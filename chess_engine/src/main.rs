use board::Board;

pub mod board;
pub mod piece;

fn main() {
    let board = Board::new();
    board.print();
}
