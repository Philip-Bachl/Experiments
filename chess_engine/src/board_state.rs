use core::f32;

use crate::piece::Piece;

pub struct BoardState {
    is_white_turn: bool,
    board: [Option<Piece>; 64],
}

struct EvalBoardState {
    board_state: BoardState,
    eval: f32,
}

pub const EMPTY_PIECE: Option<Piece> = None;
pub const MAX_EVAL_DEPTH: u8 = 3;

impl BoardState {
    pub fn new() -> BoardState {
        let board = [EMPTY_PIECE; 64];
        BoardState {
            is_white_turn: true,
            board,
        }
    }

    pub fn get_piece_at(&self, row: usize, column: usize) -> &Option<Piece> {
        &self.board[row + column * 8]
    }

    pub fn is_white_check(&self) -> bool {
        todo!()
    }

    pub fn is_black_check(&self) -> bool {
        todo!()
    }

    fn eval_raw(&self) -> f32 {
        let mut eval = self
            .board
            .iter()
            .filter_map(|p| p.as_ref())
            .map(|p| p.value as f32 * if p.is_white { 1_f32 } else { -1_f32 })
            .sum();

        todo!("Implement Stalemate, please!");
        eval
    }

    fn eval(&self, current_depth: u8) -> f32 {
        if self.is_white_turn && self.is_white_check() {
            return f32::MAX;
        }

        if !self.is_white_turn && self.is_black_check() {
            return f32::MIN;
        }

        if current_depth == MAX_EVAL_DEPTH {
            return self.eval_raw();
        }

        todo!()
    }

    pub fn best_next_move(&self) -> BoardState {
        todo!()
    }
}

impl EvalBoardState {
    fn new(board_state: BoardState, current_depth: u8) -> EvalBoardState {
        let eval = board_state.eval(current_depth);
        EvalBoardState { board_state, eval }
    }
}
