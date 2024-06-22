use crate::piece::Piece;

pub struct BoardState {
    is_white_turn: bool,
    white_pieces: Vec<Piece>,
    black_pieces: Vec<Piece>,
}

const NO_PIECE: Option<Piece> = None;

impl BoardState {
    pub fn new() -> BoardState {
        BoardState {
            is_white_turn: true,
            white_pieces: Vec::new(),
            black_pieces: Vec::new(),
        }
    }

    //row, column = zero based
    pub fn get_piece_white(&mut self, row: usize, column: usize) -> Option<Piece> {
        for p in self.white_pieces {
            if p.row == row && p.column == column {
                return Some(p);
            }
        }
        None
    }

    pub fn get_piece_black(&mut self, row: usize, column: usize) -> Option<Piece> {
        for p in self.black_pieces {
            if p.row == row && p.column == column {
                return Some(p);
            }
        }
        None
    }

    fn eval_raw(&self) -> f32 {
        let mut white_eval = 0;
        let mut black_eval = 0;

        for (wp, bp) in self.white_pieces.iter().zip(self.black_pieces.iter()) {
            white_eval += wp.get_value();
            black_eval += bp.get_value();
        }

        (white_eval - black_eval) as f32
    }

    pub fn eval(&self) -> f32 {}
}
