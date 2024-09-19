use std::{
    fs::{self, read},
    io::{BufRead, BufReader, Read, Write},
    net::{TcpListener, TcpStream},
    thread,
    time::Duration,
};

use rust_webserver::ThreadPool;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(5);

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        pool.execute(|| {
            println!(
                "Connection to {:?} established.",
                stream.peer_addr().unwrap()
            );
            handle_request(stream);
        });
    }
}

fn handle_request(mut stream: TcpStream) {
    let reader = BufReader::new(&mut stream);
    let request_line = reader.lines().next().unwrap().unwrap();

    let (status_line, file_name) = match request_line.as_str() {
        "GET / HTTP/1.1" => ("HTTP/1.1 200 OK", "index.html"),
        "GET /sleep HTTP/1.1" => {
            thread::sleep(Duration::from_secs(5));
            ("HTTP/1.1 200 OK", "index.html")
        }
        _ => ("HTTP/1.1 404 NOT FOUND", "404.html"),
    };

    let data = fs::read_to_string(file_name).unwrap();
    let content_length = data.len();
    let response = format!("{status_line}\r\nContent-Length: {content_length}\r\n\r\n{data}");

    write_to_stream(&mut stream, &response);
}

fn write_to_stream(stream: &mut TcpStream, data: &str) {
    stream.write_all(data.as_bytes()).unwrap();
}
