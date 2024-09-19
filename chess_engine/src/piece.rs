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

pub struct Piece {
    pub piece_type: PieceType,
    pub is_white: bool,
    pub row: usize,
    pub column: usize,
}

impl Piece {
    pub fn new(piece_type: PieceType, is_white: bool, row: usize, column: usize) -> Piece {
        return Piece {
            piece_type,
            is_white,
            row,
            column,
        };
    }

    pub fn get_value(&self) -> u8 {
        match self.piece_type {
            PieceType::KING => 0,
            PieceType::PAWN => 1,
            PieceType::BISHOP | PieceType::KNIGHT => 3,
            PieceType::ROOK => 5,
            PieceType::QUEEN => 9,
        }
    }
}

impl PartialEq for Piece {
    fn eq(&self, other: &Self) -> bool {
        self.piece_type == other.piece_type
            && self.is_white == other.is_white
            && self.row == other.row
            && self.column == other.column
    }
}
