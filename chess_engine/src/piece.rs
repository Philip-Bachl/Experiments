#[derive(Clone)]
pub enum PieceType {
    PAWN,
    KNIGHT,
    BISHOP,
    KING,
    ROOK,
    QUEEN,
}

#[derive(Clone)]
pub enum File {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
}

pub struct Piece {
    pub is_white: bool,
    pub piece_type: PieceType,
    pub file: File,
    pub rank: u8,
}

impl Clone for Piece {
    fn clone(&self) -> Self {
        Self {
            is_white: self.is_white,
            piece_type: self.piece_type.clone(),
            file: self.file.clone(),
            rank: self.rank,
        }
    }
}
