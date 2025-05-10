use tauri::Emitter;
use tauri_plugin_oauth::OauthConfig;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn start_oauth(window: tauri::Window) -> Result<u16, String> {
    let config = OauthConfig {
        response: Some(include_str!("../resources/oauth.html").into()),
        ..Default::default()
    };
    let port = tauri_plugin_oauth::start_with_config(config, move |url| {
        window.emit("redirect_url", url).map_err(|e| e.to_string());
    })
    .unwrap();
    Ok(port)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_oauth::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![start_oauth])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
