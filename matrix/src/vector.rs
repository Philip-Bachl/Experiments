use std::ops::Mul;

#[derive(Clone, Debug)]
pub struct VectorF32 {
    pub entries: Vec<f32>,
}

impl Mul<f32> for VectorF32 {
    type Output = VectorF32;

    fn mul(self, rhs: f32) -> Self::Output {
        self.scale(rhs)
    }
}

impl VectorF32 {
    pub fn new(entries: Vec<f32>) -> VectorF32 {
        Self { entries }
    }

    pub fn get_dimension(&self) -> usize {
        self.entries.len()
    }

    pub fn scale(&self, scalar: f32) -> VectorF32 {
        let entries: Vec<f32> = self.entries.iter().map(|e| e * scalar).collect();
        Self { entries }
    }
}
