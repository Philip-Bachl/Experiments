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

    pub fn output_as_number(&self) -> Option<f64> {
        let mut dot_index = self.output.find('.')?;

        let (wholes, decimals) = self.output.split_at(dot_index);

        let wholes = wholes.chars();
        let mut decimals = decimals.chars();

        decimals.next();
        let all = wholes.chain(decimals);

        let mut output = 0.0;
        for (i, c) in all.rev().enumerate() {
            let n = u32::try_from(self.output.len() - dot_index + i);

            if n.is_err() {
                return None;
            }

            let n = 10_u32.pow(n.unwrap());
            let n = c.to_digit(10)? * n;

            let n = f64::from(n);
            output += n;
        }

        Some(output)
    }
}
