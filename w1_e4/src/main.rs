fn main() {
    println!("Welcome!");
    fizz_buzz();
}

fn fizz_buzz() {
    let mut fizz_buzz_counter = 0;
    for counter in 1..301 {
        match (counter % 3, counter % 5) {
            (0, 0) => {
                println!("fizz buzz");
                fizz_buzz_counter += 1;
            }
            (0, _) => println!("fizz"),
            (_, 0) => println!("buzz"),
            _ => {}
        }
    }
    println!("{} times fizz buzz occurred", fizz_buzz_counter);
}
