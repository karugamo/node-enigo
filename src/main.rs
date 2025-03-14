use enigo::{
    Button,
    Direction::{Click, Press, Release},
    Enigo, Mouse, Settings,
    {Axis::Horizontal, Axis::Vertical},
    {Coordinate::Abs, Coordinate::Rel},
};
use std::thread;
use std::time::Duration;

fn main() {

    #[cfg(target_os = "windows")]
    // This is needed on Windows if you want the application to respect the users scaling settings.
    // Please look at the documentation of the function to see better ways to achive this and
    // important gotchas
    enigo::set_dpi_awareness().unwrap();

    let wait_time = Duration::from_secs(1);
    let mut enigo = Enigo::new(&Settings::default()).unwrap();

    thread::sleep(Duration::from_secs(4));
    println!("screen dimensions: {:?}", enigo.main_display().unwrap());
    println!("mouse location: {:?}", enigo.location().unwrap());

    thread::sleep(wait_time);

    enigo.move_mouse(500, 200, Abs).unwrap();
    println!("mouse location: {:?}", enigo.location().unwrap());
}