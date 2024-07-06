use std::vec;

use crate::vector::VectorF32;

pub struct MatrixF32 {
    pub columns: Vec<VectorF32>,
}

impl MatrixF32 {
    pub fn new(columns: Vec<VectorF32>) -> MatrixF32 {
        Self { columns }
    }

    pub fn get_dimension_x(&self) -> usize {
        self.columns.len()
    }

    pub fn get_dimension_y(&self) -> usize {
        if self.columns.is_empty() {
            return 0;
        }

        self.columns[0].get_dimension()
    }

    pub fn scale(&self, scalar: f32) -> MatrixF32 {
        let columns = self.columns.iter().map(|c| c.clone() * scalar).collect();
        Self { columns }
    }

    pub fn transform_vecf32(&self, vector: &VectorF32) -> VectorF32 {
        let mut result = Vec::new();

        //r = row, c = column
        for r in 0..self.get_dimension_x() {
            let mut sum_of_products = 0.0;

            for (c, v) in vector.entries.iter().enumerate() {
                sum_of_products += self.columns[c].entries[r] * v;
            }

            result.push(sum_of_products);
        }
        VectorF32::new(result)
    }
}
