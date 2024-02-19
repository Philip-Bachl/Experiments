use crate::piece::File;
use crate::piece::Piece;
use crate::piece::PieceType;

pub const PIECES: [Piece; 32] = [
    Piece {
        is_white: true,
        piece_type: PieceType::ROOK,
        file: File::A,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::KNIGHT,
        file: File::B,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::BISHOP,
        file: File::C,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::QUEEN,
        file: File::D,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::KING,
        file: File::E,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::BISHOP,
        file: File::F,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::KNIGHT,
        file: File::G,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::ROOK,
        file: File::H,
        rank: 1,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: File::A,
        rank: 2,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: File::B,
        rank: 2,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: File::C,
        rank: 2,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: File::D,
        rank: 2,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: File::E,
        rank: 2,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: File::F,
        rank: 2,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: File::G,
        rank: 2,
    },
    Piece {
        is_white: true,
        piece_type: PieceType::PAWN,
        file: File::H,
        rank: 2,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::ROOK,
        file: File::A,
        rank: 8,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::KNIGHT,
        file: File::B,
        rank: 8,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::BISHOP,
        file: File::C,
        rank: 8,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::QUEEN,
        file: File::D,
        rank: 8,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::KING,
        file: File::E,
        rank: 8,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::BISHOP,
        file: File::F,
        rank: 8,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::KNIGHT,
        file: File::G,
        rank: 8,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::ROOK,
        file: File::H,
        rank: 8,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: File::A,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: File::B,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: File::C,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: File::D,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: File::E,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: File::F,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: File::G,
        rank: 7,
    },
    Piece {
        is_white: false,
        piece_type: PieceType::PAWN,
        file: File::H,
        rank: 7,
    },
];

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
