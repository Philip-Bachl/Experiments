use crate::piece::Piece;
use crate::piece::PieceType;

pub struct Board {
    pub pieces: Vec<Piece>,
    pub is_white_turn: bool,
    pub white_can_caste: bool,
    pub black_can_caste: bool,
}

impl Board {
    pub fn new() -> Board {
        Board {
            pieces: PIECES.to_vec(),
            is_white_turn: true,
            white_can_caste: true,
            black_can_caste: true,
        }
    }
}

pub const PIECES: [Piece; 32] = [
    Piece {
        is_white: true,
        piece_type: PieceType::ROOK,
        file: 0,
        rank: 0,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::KNIGHT,
        file: 1,
        rank: 0,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::BISHOP,
        file: 2,
        rank: 0,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::QUEEN,
        file: 3,
        rank: 0,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::KING,
        file: 4,
        rank: 0,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::BISHOP,
        file: 5,
        rank: 0,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::KNIGHT,
        file: 6,
        rank: 0,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::ROOK,
        file: 7,
        rank: 0,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: 0,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: 1,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: 2,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: 3,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: 4,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: 5,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: 6,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: 7,
        rank: 1,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::ROOK,
        file: 0,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::KNIGHT,
        file: 1,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::BISHOP,
        file: 2,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::QUEEN,
        file: 3,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::KING,
        file: 4,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::BISHOP,
        file: 5,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::KNIGHT,
        file: 6,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::ROOK,
        file: 7,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: 0,
        rank: 6,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: 1,
        rank: 6,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: 2,
        rank: 6,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: 3,
        rank: 6,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: 4,
        rank: 6,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: 5,
        rank: 6,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: 6,
        rank: 6,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: 7,
        rank: 6,
    },
];
