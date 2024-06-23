use std::vec;

use crate::piece::{self, Piece};

pub struct BoardState {
    is_white_turn: bool,
    white_pieces: Vec<Piece>,
    black_pieces: Vec<Piece>,
}

pub const MAX_EVAL_DEPTH: u8 = 3;

impl BoardState {
    pub fn new() -> BoardState {
        BoardState {
            is_white_turn: true,
            white_pieces: Vec::new(),
            black_pieces: Vec::new(),
        }
    }

    //row, column = zero based
    pub fn get_piece_white(&mut self, row: usize, column: usize) -> Option<&Piece> {
        for p in &self.white_pieces {
            if p.row == row && p.column == column {
                return Some(p);
            }
        }
        None
    }

    pub fn get_piece_black(&mut self, row: usize, column: usize) -> Option<&Piece> {
        for p in &self.black_pieces {
            if p.row == row && p.column == column {
                return Some(p);
            }
        }
        None
    }

    fn generate_valid_moves_for_piece(&self, piece: &Piece) -> Vec<BoardState> {
        let list_to_test = if piece.is_white {
            &self.white_pieces
        } else {
            &self.black_pieces
        };

        if !list_to_test.contains(piece) {
            return Vec::new();
        }

        todo!()
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

    fn eval(&self, current_depth: u8) -> f32 {
        if current_depth == MAX_EVAL_DEPTH {
            return self.eval_raw();
        }
        todo!()
    }

    pub fn evaluate(&self) -> f32 {
        self.eval(0)
    }
}
