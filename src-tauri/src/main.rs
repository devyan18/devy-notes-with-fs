#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs::File;
use std::io::prelude::*;

#[tauri::command]
fn create_file(name: String, content:String) {
    println!("{} \n\n {}", name, content);
}


fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![create_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
