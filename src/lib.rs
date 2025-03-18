#![deny(clippy::all)]

use enigo::{
    Enigo, Keyboard, Settings, Mouse, Coordinate, Button, Direction, Key,
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

#[napi]
pub async fn key(key_name: String, action: String) -> napi::Result<String> {
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
    
    // Parse the key name to Key enum
    let key = match key_name.to_lowercase().as_str() {
        // Alphabetic keys (a-z)
        "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | 
        "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | 
        "u" | "v" | "w" | "x" | "y" | "z" => {
            // Get the first character from the key_name string
            let ch = key_name.chars().next().unwrap_or('a');
            Key::Unicode(ch)
        },
        
        // Numeric keys
        "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" => {
            let ch = key_name.chars().next().unwrap_or('0');
            Key::Unicode(ch)
        },
        
        // Special keys
        "space" => Key::Space,
        "return" | "enter" => Key::Return,
        "tab" => Key::Tab,
        "backspace" => Key::Backspace,
        "escape" | "esc" => Key::Escape,
        "up" => Key::UpArrow,
        "down" => Key::DownArrow,
        "left" => Key::LeftArrow,
        "right" => Key::RightArrow,
        "home" => Key::Home,
        "end" => Key::End,
        "pageup" => Key::PageUp,
        "pagedown" => Key::PageDown,
        "delete" | "del" => Key::Delete,
        
        // Function keys
        "f1" => Key::F1,
        "f2" => Key::F2,
        "f3" => Key::F3,
        "f4" => Key::F4,
        "f5" => Key::F5,
        "f6" => Key::F6,
        "f7" => Key::F7,
        "f8" => Key::F8,
        "f9" => Key::F9,
        "f10" => Key::F10,
        "f11" => Key::F11,
        "f12" => Key::F12,
        
        // Modifier keys
        "shift" => Key::Shift,
        "lshift" => Key::LShift,
        "rshift" => Key::RShift,
        "control" | "ctrl" => Key::Control,
        "lcontrol" | "lctrl" => Key::LControl,
        "rcontrol" | "rctrl" => Key::RControl,
        "alt" => Key::Alt,
        "option" => Key::Option,
        "meta" | "super" | "command" | "cmd" | "windows" | "win" => Key::Meta,
        
        // Symbol keys and other characters
        "-" | "minus" => Key::Unicode('-'),
        "=" | "equals" => Key::Unicode('='),
        "[" | "leftbracket" => Key::Unicode('['),
        "]" | "rightbracket" => Key::Unicode(']'),
        "\\" | "backslash" => Key::Unicode('\\'),
        ";" | "semicolon" => Key::Unicode(';'),
        "'" | "apostrophe" | "quote" => Key::Unicode('\''),
        "," | "comma" => Key::Unicode(','),
        "." | "period" => Key::Unicode('.'),
        "/" | "slash" => Key::Unicode('/'),
        "`" | "backtick" | "grave" => Key::Unicode('`'),
        
        // If the key name doesn't match any of the above
        // If it's a single character, use Unicode, otherwise return an error
        _ => {
            if key_name.chars().count() == 1 {
                Key::Unicode(key_name.chars().next().unwrap())
            } else {
                return Ok(format!("Invalid key name: {}. Please use a valid key name.", key_name));
            }
        },
    };
    
    // Parse the action
    let direction = match action.to_lowercase().as_str() {
        "press" => Direction::Press,
        "release" => Direction::Release,
        "click" => Direction::Click,
        _ => return Ok(format!("Invalid action: {}. Valid options are: press, release, click", action)),
    };
    
    // Execute the key action with error handling
    let key_result = match enigo.key(key, direction) {
        Ok(_) => {
            match direction {
                Direction::Press => format!("Successfully pressed key: {}", key_name),
                Direction::Release => format!("Successfully released key: {}", key_name),
                Direction::Click => format!("Successfully clicked key: {}", key_name),
            }
        },
        Err(e) => format!("Error performing key action: {:?}", e),
    };
    
    Ok(key_result)
} 

#[napi]
pub async fn keys(keys: Vec<String>) -> napi::Result<String> {
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
    
    if keys.is_empty() {
        return Ok("No keys provided".to_string());
    }
    
    // Track modifier keys that need to be pressed
    let mut modifier_keys = Vec::new();
    
    // Function to get Key enum from string
    let get_key = |key_name: &str| -> Result<Key, String> {
        match key_name.to_lowercase().as_str() {
            // Alphabetic keys (a-z)
            "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | 
            "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | 
            "u" | "v" | "w" | "x" | "y" | "z" => {
                // Get the first character from the key_name string
                let ch = key_name.chars().next().unwrap_or('a');
                Ok(Key::Unicode(ch))
            },
            
            // Numeric keys
            "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" => {
                let ch = key_name.chars().next().unwrap_or('0');
                Ok(Key::Unicode(ch))
            },
            
            // Special keys
            "space" => Ok(Key::Space),
            "return" | "enter" => Ok(Key::Return),
            "tab" => Ok(Key::Tab),
            "backspace" => Ok(Key::Backspace),
            "escape" | "esc" => Ok(Key::Escape),
            "up" => Ok(Key::UpArrow),
            "down" => Ok(Key::DownArrow),
            "left" => Ok(Key::LeftArrow),
            "right" => Ok(Key::RightArrow),
            "home" => Ok(Key::Home),
            "end" => Ok(Key::End),
            "pageup" => Ok(Key::PageUp),
            "pagedown" => Ok(Key::PageDown),
            "delete" | "del" => Ok(Key::Delete),
            
            // Function keys
            "f1" => Ok(Key::F1),
            "f2" => Ok(Key::F2),
            "f3" => Ok(Key::F3),
            "f4" => Ok(Key::F4),
            "f5" => Ok(Key::F5),
            "f6" => Ok(Key::F6),
            "f7" => Ok(Key::F7),
            "f8" => Ok(Key::F8),
            "f9" => Ok(Key::F9),
            "f10" => Ok(Key::F10),
            "f11" => Ok(Key::F11),
            "f12" => Ok(Key::F12),
            
            // Modifier keys
            "shift" => Ok(Key::Shift),
            "lshift" => Ok(Key::LShift),
            "rshift" => Ok(Key::RShift),
            "control" | "ctrl" => Ok(Key::Control),
            "lcontrol" | "lctrl" => Ok(Key::LControl),
            "rcontrol" | "rctrl" => Ok(Key::RControl),
            "alt" => Ok(Key::Alt),
            "option" => Ok(Key::Option),
            "meta" | "super" | "command" | "cmd" | "windows" | "win" => Ok(Key::Meta),
            
            // Symbol keys and other characters
            "-" | "minus" => Ok(Key::Unicode('-')),
            "=" | "equals" => Ok(Key::Unicode('=')),
            "[" | "leftbracket" => Ok(Key::Unicode('[')),
            "]" | "rightbracket" => Ok(Key::Unicode(']')),
            "\\" | "backslash" => Ok(Key::Unicode('\\')),
            ";" | "semicolon" => Ok(Key::Unicode(';')),
            "'" | "apostrophe" | "quote" => Ok(Key::Unicode('\'')),
            "," | "comma" => Ok(Key::Unicode(',')),
            "." | "period" => Ok(Key::Unicode('.')),
            "/" | "slash" => Ok(Key::Unicode('/')),
            "`" | "backtick" | "grave" => Ok(Key::Unicode('`')),
            
            // If it's a single character, use Unicode
            _ if key_name.chars().count() == 1 => {
                Ok(Key::Unicode(key_name.chars().next().unwrap()))
            },
            
            // If the key name doesn't match any of the above
            _ => Err(format!("Invalid key name: {}", key_name)),
        }
    };
    
    // Check if a key is a modifier key
    let is_modifier = |key: &Key| -> bool {
        matches!(key, Key::Shift | Key::LShift | Key::RShift | 
                     Key::Control | Key::LControl | Key::RControl | 
                     Key::Alt | Key::Option | Key::Meta)
    };
    
    // First, process all keys to identify modifiers and non-modifiers
    let mut key_actions = Vec::new();
    
    for key_name in &keys {
        match get_key(key_name) {
            Ok(key) => {
                if is_modifier(&key) {
                    modifier_keys.push(key);
                } else {
                    key_actions.push(key);
                }
            },
            Err(e) => return Ok(e),
        }
    }
    
    // Press all modifier keys first
    for &modifier in &modifier_keys {
        if let Err(e) = enigo.key(modifier, Direction::Press) {
            return Ok(format!("Error pressing modifier key: {:?}", e));
        }
        // Small delay after pressing each modifier
        std::thread::sleep(std::time::Duration::from_millis(50));
    }
    
    // Press and release each non-modifier key with a small delay
    for &key in &key_actions {
        // Press the key
        if let Err(e) = enigo.key(key, Direction::Press) {
            // If there's an error, release all modifiers before returning
            for &modifier in &modifier_keys {
                let _ = enigo.key(modifier, Direction::Release);
            }
            return Ok(format!("Error pressing key: {:?}", e));
        }
        std::thread::sleep(std::time::Duration::from_millis(50));
        
        // Release the key
        if let Err(e) = enigo.key(key, Direction::Release) {
            // If there's an error, release all modifiers before returning
            for &modifier in &modifier_keys {
                let _ = enigo.key(modifier, Direction::Release);
            }
            return Ok(format!("Error releasing key: {:?}", e));
        }
        std::thread::sleep(std::time::Duration::from_millis(50));
    }
    
    // Release all modifier keys in reverse order
    for &modifier in modifier_keys.iter().rev() {
        if let Err(e) = enigo.key(modifier, Direction::Release) {
            return Ok(format!("Error releasing modifier key: {:?}", e));
        }
        // Small delay after releasing each modifier
        std::thread::sleep(std::time::Duration::from_millis(50));
    }
    
    Ok(format!("Successfully executed key combination: {:?}", keys))
} 