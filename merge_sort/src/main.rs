use rand::{thread_rng, Rng};

fn main() {
    let mut rng = thread_rng();
    let size = rng.gen_range(10..30);

    let mut values = Vec::with_capacity(size);
    for _ in 0..size {
        values.push(rng.gen_range(0..100));
    }

    for n in merge_sort(&values) {
        print!("{}, ", n);
    }
}

fn merge_sort<T: Copy + PartialOrd>(list: &[T]) -> Vec<T> {
    if list.len() <= 1 {
        return list.to_vec();
    }

    let left = &list[..(list.len() / 2)];
    let right = &list[(list.len() / 2)..];

    let left = merge_sort(left);
    let right = merge_sort(right);

    let mut result: Vec<T> = Vec::with_capacity(list.len());

    let mut left_index = 0;
    let mut right_index = 0;

    loop {
        if left_index == left.len() {
            for i in right_index..right.len() {
                result.push(right[i]);
            }
            break;
        }

        if right_index == right.len() {
            for i in left_index..left.len() {
                result.push(left[i]);
            }
            break;
        }

        let n = left[left_index];
        let m = right[right_index];

        if n >= m {
            result.push(m);
            right_index += 1;
        } else {
            result.push(n);
            left_index += 1;
        }
    }

    result
}
