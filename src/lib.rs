#![deny(clippy::all)]

use enigo::{
    Enigo, Keyboard, Settings, Mouse, Coordinate,
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