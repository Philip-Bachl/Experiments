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

impl Piece {
    pub fn symbol(&self) -> char {
        if self.is_white {
            return match self.piece_type {
                PieceType::PAWN => 'P',
                PieceType::KNIGHT => 'N',
                PieceType::BISHOP => 'B',
                PieceType::KING => 'K',
                PieceType::ROOK => 'R',
                PieceType::QUEEN => 'Q',
            };
        }
        match self.piece_type {
            PieceType::PAWN => 'p',
            PieceType::KNIGHT => 'n',
            PieceType::BISHOP => 'b',
            PieceType::KING => 'k',
            PieceType::ROOK => 'r',
            PieceType::QUEEN => 'q',
        }
    }
}
