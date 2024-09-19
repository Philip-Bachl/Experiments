use core::f32;
use std::vec;

use crate::piece::{self, Piece, PieceType};

pub struct BoardState {
    is_white_turn: bool,
    white_pieces: Vec<Piece>,
    black_pieces: Vec<Piece>,
}

struct EvalBoardState {
    board_state: BoardState,
    eval: f32,
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
        let result: Vec<BoardState> = Vec::new();
        let list_to_test = if piece.is_white {
            &self.white_pieces
        } else {
            &self.black_pieces
        };

        todo!();
    }

    fn generate_valid_moves_for_pieces(&self, pieces: &Vec<Piece>) -> Vec<BoardState> {
        pieces
            .iter()
            .flat_map(|p| self.generate_valid_moves_for_piece(p))
            .collect()
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

        let mut best_eval;

        //its white's turn
        if self.is_white_turn && current_depth % 2 == 0
            || !(self.is_white_turn || current_depth % 2 == 0)
        {
            let states = self.generate_valid_moves_for_pieces(&self.white_pieces);
            best_eval = f32::MIN; // TODO could mess up checkmating

            for state in states {
                let eval = state.eval(current_depth + 1);
                if eval > best_eval {
                    best_eval = eval;
                }
            }

            return best_eval;
        }

        //its black's turn
        let states = self.generate_valid_moves_for_pieces(&self.black_pieces);
        best_eval = f32::MAX; // TODO could mess up checkmating

        for state in states {
            let eval = state.eval(current_depth + 1);
            if eval < best_eval {
                best_eval = eval;
            }
        }

        best_eval
    }

    pub fn best_next_move(&self) -> BoardState {
        if self.is_white_turn {
            let states = self.generate_valid_moves_for_pieces(&self.white_pieces);
            states
                .into_iter()
                .map(|s| EvalBoardState::new(s, 0))
                .max_by(|s1, s2| s1.eval.partial_cmp(&s2.eval).unwrap())
                .unwrap()
                .board_state
        } else {
            let states = self.generate_valid_moves_for_pieces(&self.black_pieces);
            states
                .into_iter()
                .map(|s| EvalBoardState::new(s, 0))
                .min_by(|s1, s2| s1.eval.partial_cmp(&s2.eval).unwrap())
                .unwrap()
                .board_state
        }
    }
}

impl EvalBoardState {
    fn new(board_state: BoardState, current_depth: u8) -> EvalBoardState {
        let eval = board_state.eval(current_depth);
        EvalBoardState { board_state, eval }
    }
}
