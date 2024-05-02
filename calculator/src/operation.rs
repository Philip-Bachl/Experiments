pub enum Operations {}

pub trait Operation {
    fn run(&self, first_register: &String, second_register: &String, output: &mut String);
}

pub struct AddOperation {}

impl Operation for AddOperation {
    fn run(&self, first_register: &String, second_register: &String, output: &mut String) {
        todo!();
    }
}
