use core::f32;
use std::{ops::Index, result};

use crate::piece::{self, Piece, PieceType};

#[derive(Clone)]
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

    pub fn get_piece_at(&self, x: usize, y: usize) -> Option<&Piece> {
        self.board[x + y * 8].as_ref()
    }

    fn set_piece_at(&mut self, x: usize, y: usize, piece: Option<Piece>) {
        self.board[x + y * 8] = piece
    }

    pub fn move_piece_force(&mut self, from_x: usize, from_y: usize, to_x: usize, to_y: usize) {
        let piece = self.board[from_x + from_y * 8].take();
        self.set_piece_at(to_x, to_y, piece);
    }

    fn simulate_piece_move(
        &self,
        from_x: usize,
        from_y: usize,
        to_x: usize,
        to_y: usize,
        result: &mut Vec<BoardState>,
    ) {
        let mut clone = self.clone();
        clone.move_piece_force(from_x, from_y, to_x, to_y);
        result.push(clone);
    }

    fn rook_moves(&self, piece: &Piece, position_index: usize) -> Vec<BoardState> {
        let mut result = Vec::with_capacity(14); // Max Rook moves
        let y = position_index / 8;
        let x = position_index - y * 8;

        //right
        for reg_x in x + 1..8 {
            let col_piece = self.get_piece_at(reg_x, y);

            if let Some(col_piece) = col_piece {
                if col_piece.is_white == piece.is_white {
                    break;
                }

                self.simulate_piece_move(x, y, reg_x, y, &mut result);
                break;
            }

            self.simulate_piece_move(x, y, reg_x, y, &mut result);
        }

        //left
        for reg_x in (0..x - 1).rev() {
            let col_piece = self.get_piece_at(reg_x, y);

            if let Some(col_piece) = col_piece {
                if col_piece.is_white == piece.is_white {
                    break;
                }

                self.simulate_piece_move(x, y, reg_x, y, &mut result);
                break;
            }

            self.simulate_piece_move(x, y, reg_x, y, &mut result);
        }

        //up
        for reg_y in y + 1..8 {
            let col_piece = self.get_piece_at(x, reg_y);

            if let Some(col_piece) = col_piece {
                if col_piece.is_white == piece.is_white {
                    break;
                }

                self.simulate_piece_move(x, y, x, reg_y, &mut result);
                break;
            }

            self.simulate_piece_move(x, y, x, reg_y, &mut result);
        }

        //down
        for reg_y in (0..y - 1).rev() {
            let col_piece = self.get_piece_at(x, reg_y);

            if let Some(col_piece) = col_piece {
                if col_piece.is_white == piece.is_white {
                    break;
                }

                self.simulate_piece_move(x, y, x, reg_y, &mut result);
                break;
            }

            self.simulate_piece_move(x, y, x, reg_y, &mut result);
        }

        todo!("restrict moves based on check");
        result
    }

    fn gen_piece_moves(&self, piece: &Piece, position_index: usize) -> Vec<BoardState> {
        match piece.piece_type {
            PieceType::BISHOP => todo!(),
            PieceType::KING => todo!(),
            PieceType::KNIGHT => todo!(),
            PieceType::PAWN => todo!(),
            PieceType::QUEEN => todo!(),
            PieceType::ROOK => self.rook_moves(piece, position_index),
        }
    }

    fn gen_all_piece_moves(&self) -> Vec<BoardState> {
        let mut result = Vec::with_capacity(30); // 30 should be a good estimation of the moves available

        for (index, piece) in self.board.iter().enumerate() {
            let piece = piece.as_ref();
            if piece.is_none() {
                continue;
            }
            let piece = piece.unwrap();

            let mut moves = self.gen_piece_moves(piece, index);
            result.append(&mut moves);
        }
        todo!()
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
