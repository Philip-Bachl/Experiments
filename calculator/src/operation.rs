use std::{iter::Rev, str::Chars};

pub enum Operations {}

pub trait Operation {
    fn run(&self, first_register: Rev<Chars>, second_register: Rev<Chars>, output: &mut String);
}

pub struct AddOperation {}

impl Operation for AddOperation {
    fn run(&self, first_register: Rev<Chars>, second_register: Rev<Chars>, output: &mut String) {
        *output = String::new();

        for (c1, c2) in first_register.zip(second_register) {
            let char1 = c1.to_digit(10);
            let char2 = c2.to_digit(10);

            if char1.is_none() || char2.is_none() {
                continue;
            }

            //TODO need to add carry function!!!

            let digit = char::from_digit(char1.unwrap() + char2.unwrap(), 10);

            if digit.is_none() {
                continue;
            }

            output.push(digit.unwrap());
        }
    }
}
