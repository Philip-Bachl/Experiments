fn main() {
    let vec = vec![
        1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9,
    ];
    let result = first_index_of(vec, 8);
    println!("{}", result);
}

fn first_index_of(vec: Vec<i32>, element: i32) -> usize {
    let mut adding = true;

    let mut current_index = vec.len() / 2;
    let mut current_distance = current_index;

    //find an element
    while vec[current_index] != element {
        let before = adding;
        adding = vec[current_index] < element;

        if adding != before {
            current_distance /= 2
        }

        current_index = if adding {
            current_index + current_distance
        } else {
            current_index - current_distance
        };
    }

    //got to first occurrence of element
    while vec[current_index - 1] == element {
        current_index -= 1;
    }

    current_index
}
