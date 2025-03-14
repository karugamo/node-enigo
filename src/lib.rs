#![deny(clippy::all)]

use enigo::{
    Enigo, Keyboard, Settings,
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