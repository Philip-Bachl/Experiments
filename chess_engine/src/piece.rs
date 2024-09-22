#[derive(Clone)]
pub enum PieceType {
    BISHOP,
    KING,
    KNIGHT,
    PAWN,
    QUEEN,
    ROOK,
}

impl PartialEq for PieceType {
    fn eq(&self, other: &Self) -> bool {
        core::mem::discriminant(self) == core::mem::discriminant(other)
    }
}

#[derive(Clone)]
pub struct Piece {
    pub piece_type: PieceType,
    pub is_white: bool,
    pub value: u8,
}

impl Piece {
    pub fn new(piece_type: PieceType, is_white: bool) -> Piece {
        let value = match piece_type {
            PieceType::KING => 0,
            PieceType::PAWN => 1,
            PieceType::BISHOP | PieceType::KNIGHT => 3,
            PieceType::ROOK => 5,
            PieceType::QUEEN => 9,
        };

        Piece {
            piece_type,
            is_white,
            value,
        }
    }
}

impl PartialEq for Piece {
    fn eq(&self, other: &Self) -> bool {
        self.piece_type == other.piece_type && self.is_white == other.is_white
    }
}
