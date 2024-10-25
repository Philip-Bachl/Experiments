use crate::vector::VectorF32;

pub struct MatrixF32 {
    pub entries: Vec<VectorF32>,
}

impl From<Vec<Vec<f32>>> for MatrixF32 {
    fn from(value: Vec<Vec<f32>>) -> Self {
        let entries = value.into_iter().map(|v| v.into()).collect();
        Self::new(entries)
    }
}

impl MatrixF32 {
    pub fn new(entries: Vec<VectorF32>) -> MatrixF32 {
        Self { entries }
    }

    pub fn get_entry_at(&self, row: usize, column: usize) -> f32 {
        self.entries[column][row]
    }

    pub fn scale(&self, scalar: f32) -> MatrixF32 {
        let entries = self.entries.iter().map(|v| v.scale(scalar)).collect();
        Self::new(entries)
    }

    pub fn transform_vecf32(&self, vector: &VectorF32) -> VectorF32 {
        let mut result = Vec::with_capacity(self.entries.len());
        for (index, vec) in self.entries.iter().enumerate() {
            result.push(vec.scale(vector[index]));
        }

        result.into_iter().sum()
    }
}
