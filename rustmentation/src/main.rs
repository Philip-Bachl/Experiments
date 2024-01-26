use std::env;
use std::fs;

fn main() {
    let mut args: Vec<String> = env::args().collect();
    //let args: [String; 2] = [args[0], args[1]];
    args.truncate(2);

    let config = parse_config(args[0], args[1]);

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    let contents =
        fs::read_to_string(config.file_path).expect("Should have been able to read the file");

    // --snip--
}

struct Config {
    query: String,
    file_path: String,
}

fn parse_config(arg1: String, arg2: String) -> Config {
    let query = arg1;
    let file_path = arg2;

    Config { query, file_path }
}
