pub const DIMENSION: usize = 2;

pub struct BezierCurve {
    start_pos: [f64; DIMENSION],
    first_control_pos: [f64; DIMENSION],
    second_control_pos: [f64; DIMENSION],
    end_pos: [f64; DIMENSION],
}

impl BezierCurve {
    pub fn new(
        start_pos: [f64; DIMENSION],
        first_control_pos: [f64; DIMENSION],
        second_control_pos: [f64; DIMENSION],
        end_pos: [f64; DIMENSION],
    ) -> BezierCurve {
        BezierCurve {
            start_pos,
            first_control_pos,
            second_control_pos,
            end_pos,
        }
    }

    pub fn get(&self, t: f64) -> [f64; DIMENSION] {
        //cubic iteration
        let left_pos = pos_lerp(&self.start_pos, &self.first_control_pos, t);
        let middle_pos = pos_lerp(&self.first_control_pos, &self.second_control_pos, t);
        let right_pos = pos_lerp(&self.second_control_pos, &self.end_pos, t);

        //quadratic iteration
        let left_pos = pos_lerp(&left_pos, &middle_pos, t);
        let right_pos = pos_lerp(&middle_pos, &right_pos, t);

        pos_lerp(&left_pos, &right_pos, t)
    }
}

pub fn lerp(from: f64, to: f64, t: f64) -> f64 {
    (to - from) * t + from
}

pub fn pos_lerp(from: &[f64; DIMENSION], to: &[f64; DIMENSION], t: f64) -> [f64; DIMENSION] {
    let mut new_pos = [0.0; DIMENSION];
    for i in 0..DIMENSION {
        new_pos[i] = lerp(from[i], to[i], t);
    }
    new_pos
}
