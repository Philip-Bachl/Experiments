use std::{
    iter::Sum,
    ops::{Add, Index, Mul},
};

#[derive(Clone, Debug)]
pub struct VectorF32 {
    pub entries: Vec<f32>,
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
        Self::new(entries)
    }
}

impl From<Vec<f32>> for VectorF32 {
    fn from(value: Vec<f32>) -> Self {
        Self::new(value)
    }
}

impl Mul<f32> for VectorF32 {
    type Output = VectorF32;

    fn mul(self, rhs: f32) -> Self::Output {
        self.scale(rhs)
    }
}

impl Add<VectorF32> for VectorF32 {
    type Output = VectorF32;

    fn add(self, rhs: VectorF32) -> Self::Output {
        let entries = self
            .entries
            .iter()
            .zip(rhs.entries.iter())
            .map(|(a, b)| a + b)
            .collect();
        Self::new(entries)
    }
}

impl Sum for VectorF32 {
    fn sum<I: Iterator<Item = Self>>(mut iter: I) -> Self {
        if let Some(first) = iter.next() {
            let mut sum = first;

            while let Some(v) = iter.next() {
                sum = sum + v;
            }

            return sum;
        }

        VectorF32::new(Vec::new())
    }
}

impl Index<usize> for VectorF32 {
    type Output = f32;

    fn index(&self, index: usize) -> &Self::Output {
        &self.entries[index]
    }
}
