use crate::operation::Operation;

const DEFAULT_REGISTER_LENGTH: usize = 16;

pub struct Calculator {
    pub first_register: String,
    pub second_register: String,
    pub output: String,
}

impl Calculator {
    pub fn new() -> Calculator {
        Self::with_registry_length(DEFAULT_REGISTER_LENGTH)
    }

    pub fn with_registry_length(length: usize) -> Calculator {
        Calculator {
            first_register: String::with_capacity(length),
            second_register: String::with_capacity(length),
            output: String::with_capacity(length),
        }
    }

    pub fn run_operation<T: Operation>(&mut self, operation: &T) {
        operation.run(
            self.first_register.chars().rev(),
            self.second_register.chars().rev(),
            &mut self.output,
        );
    }

    pub fn output_as_number() -> Option<f64> {
        todo!()
    }
}
