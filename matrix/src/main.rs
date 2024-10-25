use matrix::MatrixF32;
use vector::VectorF32;

pub mod matrix;
pub mod vector;

fn main() {
    let vector = VectorF32::new(vec![2.0, 3.0]);
    let matrix: MatrixF32 = vec![vec![0.0, -2.0], vec![1.0, 0.0]].into();

    let result = matrix.transform_vecf32(&vector);
    println!("{result:?}");
}
