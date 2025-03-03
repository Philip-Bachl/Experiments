use crate::vector::VectorF32;

pub struct MatrixF32 {
    pub columns: Vec<VectorF32>,
}

impl From<Vec<Vec<f32>>> for MatrixF32 {
    fn from(value: Vec<Vec<f32>>) -> Self {
        let entries = value.into_iter().map(|v| v.into()).collect();
        Self::new(entries)
    }
}

impl MatrixF32 {
    pub fn new(entries: Vec<VectorF32>) -> MatrixF32 {
        Self { columns: entries }
    }

    pub fn get_entry_at(&self, row: usize, column: usize) -> f32 {
        self.columns[column][row]
    }

    pub fn scale(&self, scalar: f32) -> MatrixF32 {
        let entries = self.columns.iter().map(|v| v.scale(scalar)).collect();
        Self::new(entries)
    }

    pub fn transform_vecf32(&self, vector: &VectorF32) -> VectorF32 {
        let mut result = Vec::with_capacity(self.columns.len());
        for (index, vec) in self.columns.iter().enumerate() {
            result.push(vec.scale(vector[index]));
        }

        result.into_iter().sum()
    }

    pub fn transform_matf32(&self, matrix: &MatrixF32) -> MatrixF32 {
        let columns = matrix
            .columns
            .iter()
            .map(|v| self.transform_vecf32(v))
            .collect();
        MatrixF32::new(columns)
    }
}
