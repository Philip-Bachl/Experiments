use crate::vector::VectorF32;

pub struct MatrixF32 {
    pub entries: Vec<f32>,

    pub column_count: usize,
    pub row_count: usize,
}

impl MatrixF32 {
    pub fn new(entries: Vec<f32>, column_count: usize) -> MatrixF32 {
        let row_count = entries.len() / column_count;

        Self {
            entries,
            column_count,
            row_count,
        }
    }

    pub fn get_entry_at(&self, row: usize, column: usize) -> f32 {
        self.entries[column + self.column_count * row]
    }

    pub fn scale(&self, scalar: f32) -> MatrixF32 {
        let entries = self.entries.iter().map(|e| e * scalar).collect();
        Self::new(entries, self.column_count)
    }

    pub fn transform_vecf32(&self, vector: &VectorF32) -> VectorF32 {
        let dimension = vector.get_dimension();

        let mut result = Vec::with_capacity(dimension);

        for r in 0..self.row_count {
            let sum: f32 = self.entries[r * self.column_count..(r + 1) * self.column_count]
                .iter()
                .zip(vector.entries.iter())
                .map(|(me, ve)| me * ve)
                .sum();

            result.push(sum);
        }

        VectorF32::new(result)
    }
}
