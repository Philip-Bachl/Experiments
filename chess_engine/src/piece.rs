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
pub struct Piece {
    pub is_white: bool,
    pub piece_type: PieceType,
    pub file: u8,
    pub rank: u8,
}
