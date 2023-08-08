//! Binary for the Jolt app.
//! This binary contains commands for management of login, web socket connection and doing other requests.

#![warn(
    clippy::all,
    clippy::pedantic,
    clippy::style,
    clippy::nursery,
    clippy::unwrap_used,
    clippy::expect_used
)]
#![allow(clippy::used_underscore_binding, clippy::module_name_repetitions)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tokio::sync::Mutex;
use websocket::Cache;

#[macro_use]
mod macros;

mod fetch;
mod login;
mod websocket;

use fetch::{fetch_channel, fetch_members, fetch_messages, fetch_server, fetch_user, send_message};
use login::{login, login_with_token};
use websocket::{run_client, start_typing};

#[derive(Debug, Default)]
pub struct Client {
    pub driver: Mutex<reywen::client::Client>,
    pub cache: Mutex<Cache>,
}

impl Client {
    #[must_use]
    pub fn new() -> Self {
        Self::default()
    }
}

fn main() {
    #[allow(clippy::expect_used)]
    tauri::Builder::default()
        .manage(Client::new())
        .invoke_handler(tauri::generate_handler![
            login,
            login_with_token,
            fetch_user,
            fetch_members,
            fetch_server,
            fetch_channel,
            fetch_messages,
            send_message,
            start_typing,
            run_client
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
