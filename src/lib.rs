#![deny(clippy::all)]

use enigo::{
    Enigo, Keyboard, Settings, Mouse, Coordinate, Button, Direction,
};
use napi_derive::napi;

#[napi]
pub async fn type_text(text: String) -> napi::Result<String> {
    #[cfg(target_os = "windows")]
    // This is needed on Windows if you want the application to respect the users scaling settings.
    let _ = enigo::set_dpi_awareness();
    
    // Create Enigo instance with error handling
    let enigo_result = Enigo::new(&Settings::default());
    
    if let Err(e) = enigo_result {
        return Ok(format!(
            "Error creating Enigo instance: {:?}\n\nOn macOS, you need to grant accessibility permissions to the terminal or application running this code.\nGo to System Preferences > Security & Privacy > Privacy > Accessibility and add the application.",
            e
        ));
    }
    
    let mut enigo = enigo_result.unwrap();
    
    // Type the text with error handling
    let type_result = match enigo.text(&text) {
        Ok(_) => format!("Successfully typed text: {}", text),
        Err(e) => format!("Error typing text: {:?}", e),
    };
    
    Ok(type_result)
} 

#[napi]
pub async fn move_mouse(x: i32, y: i32, is_relative: Option<bool>) -> napi::Result<String> {
    #[cfg(target_os = "windows")]
    // This is needed on Windows if you want the application to respect the users scaling settings.
    let _ = enigo::set_dpi_awareness();
    
    // Create Enigo instance with error handling
    let enigo_result = Enigo::new(&Settings::default());
    
    if let Err(e) = enigo_result {
        return Ok(format!(
            "Error creating Enigo instance: {:?}\n\nOn macOS, you need to grant accessibility permissions to the terminal or application running this code.\nGo to System Preferences > Security & Privacy > Privacy > Accessibility and add the application.",
            e
        ));
    }
    
    let mut enigo = enigo_result.unwrap();
    
    // Determine coordinate type (absolute or relative)
    let coordinate = if is_relative.unwrap_or(false) {
        Coordinate::Rel
    } else {
        Coordinate::Abs
    };
    
    // Move the mouse with error handling
    let move_result = match enigo.move_mouse(x, y, coordinate) {
        Ok(_) => {
            let coord_type = if coordinate == Coordinate::Rel { "relative" } else { "absolute" };
            format!("Successfully moved mouse to {} position: ({}, {})", coord_type, x, y)
        },
        Err(e) => format!("Error moving mouse: {:?}", e),
    };
    
    Ok(move_result)
} 

#[napi]
pub async fn mouse_button(button_name: String, action: String) -> napi::Result<String> {
    #[cfg(target_os = "windows")]
    // This is needed on Windows if you want the application to respect the users scaling settings.
    let _ = enigo::set_dpi_awareness();
    
    // Create Enigo instance with error handling
    let enigo_result = Enigo::new(&Settings::default());
    
    if let Err(e) = enigo_result {
        return Ok(format!(
            "Error creating Enigo instance: {:?}\n\nOn macOS, you need to grant accessibility permissions to the terminal or application running this code.\nGo to System Preferences > Security & Privacy > Privacy > Accessibility and add the application.",
            e
        ));
    }
    
    let mut enigo = enigo_result.unwrap();
    
    // Parse the button
    let button = match button_name.to_lowercase().as_str() {
        "left" => Button::Left,
        "right" => Button::Right,
        "middle" => Button::Middle,
        "scrollup" | "scroll_up" => Button::ScrollUp,
        "scrolldown" | "scroll_down" => Button::ScrollDown,
        "scrollleft" | "scroll_left" => Button::ScrollLeft,
        "scrollright" | "scroll_right" => Button::ScrollRight,
        _ => return Ok(format!("Invalid button name: {}. Valid options are: left, right, middle, scrollUp, scrollDown, scrollLeft, scrollRight", button_name)),
    };
    
    // Parse the action
    let direction = match action.to_lowercase().as_str() {
        "press" => Direction::Press,
        "release" => Direction::Release,
        "click" => Direction::Click,
        _ => return Ok(format!("Invalid action: {}. Valid options are: press, release, click", action)),
    };
    
    // Execute the button action with error handling
    let button_result = match enigo.button(button, direction) {
        Ok(_) => {
            match direction {
                Direction::Press => format!("Successfully pressed {} mouse button", button_name),
                Direction::Release => format!("Successfully released {} mouse button", button_name),
                Direction::Click => format!("Successfully clicked {} mouse button", button_name),
            }
        },
        Err(e) => format!("Error performing button action: {:?}", e),
    };
    
    Ok(button_result)
} 